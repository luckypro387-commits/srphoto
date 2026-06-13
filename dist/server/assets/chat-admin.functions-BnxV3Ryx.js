import { T as TSS_SERVER_FUNCTION, a as createServerFn } from "./server-PAKT5bVl.js";
import { z } from "zod";
import { r as requireSupabaseAuth } from "./auth-middleware-BhSvEo0q.js";
import { createClient } from "@supabase/supabase-js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
function createSupabaseAdminClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const missing = [
      ...!SUPABASE_URL ? ["SUPABASE_URL"] : [],
      ...!SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : []
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Connect Supabase in Lovable Cloud.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
let _supabaseAdmin;
const supabaseAdmin = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  }
});
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
const resendChatTranscript_createServerFn_handler = createServerRpc({
  id: "61fa2bd978a7dec1959aaf623d300b8d3cd1c7b1a78dccc703d535116293a18a",
  name: "resendChatTranscript",
  filename: "src/lib/chat-admin.functions.ts"
}, (opts) => resendChatTranscript.__executeServer(opts));
const resendChatTranscript = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => z.object({
  sessionId: z.string().min(8).max(80)
}).parse(input)).handler(resendChatTranscript_createServerFn_handler, async ({
  context,
  data
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: role
  } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (!role) throw new Error("Forbidden");
  const {
    sessionId
  } = data;
  const {
    data: setting
  } = await supabaseAdmin.from("site_settings").select("value").eq("key", "chat_transcript_email").maybeSingle();
  const to = setting?.value || "";
  if (!to) throw new Error("No recipient email set in site_settings.chat_transcript_email");
  const {
    data: msgs
  } = await supabaseAdmin.from("chat_messages").select("role, content, created_at").eq("session_id", sessionId).order("created_at", {
    ascending: true
  });
  const {
    data: session
  } = await supabaseAdmin.from("chat_sessions").select("visitor_name, visitor_email").eq("session_id", sessionId).maybeSingle();
  if (!msgs || msgs.length === 0) throw new Error("No messages for this session");
  const lines = msgs.map((m) => `[${new Date(m.created_at).toLocaleString()}] ${m.role.toUpperCase()}: ${m.content}`);
  const transcript = lines.join("\n\n");
  const visitorName = session?.visitor_name || "(unknown)";
  const visitorEmail = session?.visitor_email || "n/a";
  const visitor = `Visitor: ${visitorName} <${visitorEmail}>`;
  const subject = `Chat transcript (resend) — session ${sessionId.slice(0, 8)}`;
  const html = `<h2>${escapeHtml(subject)}</h2><p>Visitor: ${escapeHtml(visitorName)} &lt;${escapeHtml(visitorEmail)}&gt;</p><pre style="white-space:pre-wrap;font-family:ui-monospace,monospace">${escapeHtml(transcript)}</pre>`;
  try {
    await supabaseAdmin.rpc("enqueue_email", {
      p_queue: "transactional_emails",
      p_payload: {
        to,
        subject,
        html,
        text: `${visitor}

${transcript}`
      }
    });
    await supabaseAdmin.from("chat_sessions").update({
      last_emailed_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("session_id", sessionId);
    return {
      ok: true,
      to
    };
  } catch (err) {
    throw new Error("Email infrastructure not configured yet. Transcript could not be sent.");
  }
});
export {
  resendChatTranscript_createServerFn_handler
};
