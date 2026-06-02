import { createFileRoute } from "@tanstack/react-router";
import { generateText } from "ai";
import { createClient } from "@supabase/supabase-js";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `You are the friendly assistant for SR Photo Studio, a wedding and portrait photography studio.
Help visitors with questions about photography sessions, pricing, availability, locations, and the booking process.
Be warm, concise, and professional. If asked about exact prices or specific dates, say the studio will follow up by email
and encourage them to share their name, email, and what kind of session they're interested in. Keep replies under 120 words.`;

// Best-effort in-memory rate limiter (per-worker instance).
// Limits abuse of the public chat endpoint without breaking the widget UX.
const RATE_WINDOW_MS = 60_000;
const MAX_PER_IP_PER_MIN = 15;
const MAX_PER_SESSION_PER_MIN = 12;
const ipHits = new Map<string, number[]>();
const sessionHits = new Map<string, number[]>();

function hit(map: Map<string, number[]>, key: string, max: number) {
  const now = Date.now();
  const arr = (map.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  arr.push(now);
  map.set(key, arr);
  return arr.length > max;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const ip =
            request.headers.get("cf-connecting-ip") ||
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            "unknown";

          const body = (await request.json()) as {
            sessionId?: string;
            messages?: Msg[];
            visitorName?: string;
            visitorEmail?: string;
          };
          const sessionId = String(body.sessionId || "").slice(0, 80);
          const rawMessages = Array.isArray(body.messages) ? body.messages.slice(-30) : [];

          // Strict validation
          if (sessionId.length < 8 || !/^[A-Za-z0-9_-]+$/.test(sessionId)) {
            return new Response("Bad request", { status: 400 });
          }
          if (rawMessages.length === 0) {
            return new Response("Bad request", { status: 400 });
          }

          // Only allow user/assistant roles from the client. Reject anything else
          // (system, tool, function, etc.) to prevent prompt-injection via role.
          const messages: Msg[] = [];
          for (const m of rawMessages) {
            if (!m || typeof m.content !== "string") continue;
            if (m.role !== "user" && m.role !== "assistant") continue;
            const content = m.content.slice(0, 8000);
            if (!content) continue;
            messages.push({ role: m.role, content });
          }
          if (messages.length === 0) return new Response("Bad request", { status: 400 });

          const lastUser = [...messages].reverse().find((m) => m.role === "user");
          if (!lastUser) return new Response("No user message", { status: 400 });

          // Rate limit
          if (hit(ipHits, ip, MAX_PER_IP_PER_MIN) || hit(sessionHits, sessionId, MAX_PER_SESSION_PER_MIN)) {
            return new Response("Too many requests", { status: 429 });
          }

          const key = process.env.LOVABLE_API_KEY;
          if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

          const supabase = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
          );

          // Upsert session
          await supabase.from("chat_sessions").upsert(
            {
              session_id: sessionId,
              visitor_name: (body.visitorName || "").slice(0, 120),
              visitor_email: (body.visitorEmail || "").slice(0, 200),
              updated_at: new Date().toISOString(),
            },
            { onConflict: "session_id" },
          );

          // Persist the new user message
          await supabase.from("chat_messages").insert({
            session_id: sessionId,
            role: "user",
            content: lastUser.content.slice(0, 8000),
          });

          // Generate AI reply. SYSTEM_PROMPT is the authoritative system message.
          const gateway = createLovableAiGatewayProvider(key);
          const { text } = await generateText({
            model: gateway("google/gemini-2.5-flash"),
            system: SYSTEM_PROMPT,
            messages: messages.map((m) => ({ role: m.role, content: m.content })),
          });

          await supabase.from("chat_messages").insert({
            session_id: sessionId,
            role: "assistant",
            content: text,
          });

          // Fire-and-forget transcript email after every visitor message.
          queueTranscriptEmail(supabase, sessionId).catch((err) =>
            console.error("[chat] email queue failed:", err),
          );

          return Response.json({ reply: text });
        } catch (err) {
          console.error("[chat] error", err);
          return new Response("Chat failed", { status: 500 });
        }
      },
    },
  },
});

async function queueTranscriptEmail(
  supabase: any,
  sessionId: string,
) {
  // Lookup recipient
  const { data: setting } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "chat_transcript_email")
    .maybeSingle();
  const to = (setting?.value as string | undefined) || "";
  if (!to) return;

  // Build transcript
  const { data: msgs } = await supabase
    .from("chat_messages")
    .select("role, content, created_at")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  const { data: session } = await supabase
    .from("chat_sessions")
    .select("visitor_name, visitor_email")
    .eq("session_id", sessionId)
    .maybeSingle();

  const lines = (msgs ?? []).map(
    (m: any) =>
      `[${new Date(m.created_at).toLocaleString()}] ${m.role.toUpperCase()}: ${m.content}`,
  );
  const transcript = lines.join("\n\n");
  const visitorName = session?.visitor_name || "(unknown)";
  const visitorEmail = session?.visitor_email || "n/a";
  const visitorText = `Visitor: ${visitorName} <${visitorEmail}>`;
  const subject = `New chat message — session ${sessionId.slice(0, 8)}`;
  const html = `<h2>${escapeHtml(subject)}</h2><p>Visitor: ${escapeHtml(visitorName)} &lt;${escapeHtml(visitorEmail)}&gt;</p><pre style="white-space:pre-wrap;font-family:ui-monospace,monospace">${escapeHtml(transcript)}</pre>`;

  try {
    await supabase.rpc("enqueue_email" as any, {
      p_queue: "transactional_emails",
      p_payload: {
        to,
        subject,
        html,
        text: `${visitorText}\n\n${transcript}`,
      },
    });
    await supabase
      .from("chat_sessions")
      .update({ last_emailed_at: new Date().toISOString() })
      .eq("session_id", sessionId);
  } catch (err) {
    console.warn("[chat] transcript email skipped (email infra not ready)", err);
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
