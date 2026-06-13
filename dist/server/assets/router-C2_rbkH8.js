import { QueryClientProvider, useQuery, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Toaster as Toaster$1 } from "sonner";
import { useState, useRef, useEffect } from "react";
import { X, MessageCircle, Send } from "lucide-react";
import { s as supabase } from "./client-DoNzAdgV.js";
import { generateText } from "ai";
import { createClient } from "@supabase/supabase-js";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const LS_KEY = "sr_chat_v1";
const SID_KEY = "sr_chat_sid_v1";
function makeSid() {
  return Math.random().toString(36).slice(2, 12) + Date.now().toString(36).slice(-6);
}
const WELCOME = {
  role: "assistant",
  content: "Hi! I'm SR Photo Studio's assistant. Ask me about sessions, pricing, or booking — I'm happy to help."
};
function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sid, setSid] = useState("");
  const scrollerRef = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    let id = localStorage.getItem(SID_KEY);
    if (!id) {
      id = makeSid();
      localStorage.setItem(SID_KEY, id);
    }
    setSid(id);
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) setMessages(parsed);
      }
    } catch {
    }
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(LS_KEY, JSON.stringify(messages));
  }, [messages]);
  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open, sending]);
  async function send() {
    const text = input.trim();
    if (!text || sending || !sid) return;
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sid, messages: next })
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Sorry, I couldn't reach the assistant. Please try again in a moment, or use the contact form."
        }
      ]);
    } finally {
      setSending(false);
    }
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        "aria-label": open ? "Close chat" : "Open chat",
        onClick: () => setOpen((v) => !v),
        className: "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-2xl ring-1 ring-accent/40 transition hover:scale-105",
        children: open ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(MessageCircle, { className: "h-6 w-6" })
      }
    ),
    open && /* @__PURE__ */ jsxs("div", { className: "fixed bottom-24 right-5 z-50 flex h-[32rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-accent/30 bg-background shadow-2xl", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between border-b border-accent/20 bg-foreground px-4 py-3 text-background", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.25em] text-accent", children: "SR Photo" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", children: "Studio Assistant" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setOpen(false),
            "aria-label": "Close",
            className: "rounded p-1 text-background/70 hover:text-background",
            children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          ref: scrollerRef,
          className: "flex-1 space-y-3 overflow-y-auto bg-background px-4 py-4",
          children: [
            messages.map((m, i) => /* @__PURE__ */ jsx(
              "div",
              {
                className: m.role === "user" ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-accent px-3 py-2 text-sm text-accent-foreground" : "mr-auto max-w-[90%] text-sm leading-relaxed text-foreground",
                children: m.content
              },
              i
            )),
            sending && /* @__PURE__ */ jsxs("div", { className: "mr-auto flex items-center gap-1 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.3s]" }),
              /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.15s]" }),
              /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 animate-bounce rounded-full bg-accent" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            void send();
          },
          className: "flex items-center gap-2 border-t border-accent/20 bg-background px-3 py-3",
          children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                autoFocus: true,
                value: input,
                onChange: (e) => setInput(e.target.value),
                placeholder: "Type your message…",
                className: "flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground outline-none focus:border-accent",
                disabled: sending
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: sending || !input.trim(),
                "aria-label": "Send",
                className: "flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground disabled:opacity-50",
                children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" })
              }
            )
          ]
        }
      )
    ] })
  ] });
}
function LoadingScreen({ logoUrl, brand = "S. R. Photo Studio" }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("intro_seen") === "1") {
      setDone(true);
      setHidden(true);
      return;
    }
    const start = performance.now();
    const duration = 2400;
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(100, (t - start) / duration * 100);
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else {
        setDone(true);
        sessionStorage.setItem("intro_seen", "1");
        window.setTimeout(() => setHidden(true), 650);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  if (hidden) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${done ? "opacity-0 pointer-events-none" : "opacity-100"}`,
      "aria-hidden": done,
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 overflow-hidden", children: Array.from({ length: 30 }).map((_, i) => /* @__PURE__ */ jsx(
          "span",
          {
            className: "absolute size-[3px] rounded-full bg-accent/40 animate-pulse",
            style: {
              left: `${i * 37 % 100}%`,
              top: `${i * 53 % 100}%`,
              animationDelay: `${i % 10 * 0.2}s`,
              animationDuration: `${2 + i % 5}s`
            }
          },
          i
        )) }),
        /* @__PURE__ */ jsx(Drone, { className: "top-[18%] animate-drone-1" }),
        /* @__PURE__ */ jsx(Drone, { className: "top-[68%] animate-drone-2", reverse: true }),
        /* @__PURE__ */ jsx(Drone, { className: "top-[42%] animate-drone-3" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-center gap-6 px-6 text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("span", { className: "absolute inset-0 -m-6 rounded-full bg-accent/20 blur-2xl animate-pulse" }),
            logoUrl ? /* @__PURE__ */ jsx(
              "img",
              {
                src: logoUrl,
                alt: brand,
                className: "relative size-24 md:size-32 object-contain animate-float"
              }
            ) : /* @__PURE__ */ jsx("span", { className: "relative inline-flex items-center justify-center size-24 md:size-32 border-2 border-accent text-accent rounded-full animate-float", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.2", className: "size-10", children: [
              /* @__PURE__ */ jsx("path", { d: "M4 7h3l2-2h6l2 2h3v12H4z" }),
              /* @__PURE__ */ jsx("circle", { cx: "12", cy: "13", r: "3.5" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-serif text-2xl md:text-3xl tracking-[0.22em] uppercase text-foreground", children: brand }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-[10px] md:text-xs uppercase tracking-[0.4em] text-accent", children: "Fine Art Editorial" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground animate-pulse", children: "Loading your experience" }),
          /* @__PURE__ */ jsx("div", { className: "w-56 md:w-72 h-px bg-border overflow-hidden", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-full bg-accent transition-[width] duration-150",
              style: { width: `${progress}%` }
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "text-[10px] tracking-[0.3em] text-muted-foreground tabular-nums", children: [
            Math.floor(progress).toString().padStart(2, "0"),
            "%"
          ] })
        ] })
      ]
    }
  );
}
function Drone({ className = "", reverse = false }) {
  return /* @__PURE__ */ jsx("div", { className: `absolute ${reverse ? "right-0" : "left-0"} ${className} pointer-events-none`, children: /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 64 32",
      className: `w-20 md:w-28 text-accent ${reverse ? "scale-x-[-1]" : ""}`,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.2",
      children: [
        /* @__PURE__ */ jsx("ellipse", { cx: "10", cy: "10", rx: "8", ry: "1.5", className: "animate-spin origin-[10px_10px]", style: { animationDuration: "0.15s" } }),
        /* @__PURE__ */ jsx("ellipse", { cx: "54", cy: "10", rx: "8", ry: "1.5", className: "animate-spin origin-[54px_10px]", style: { animationDuration: "0.15s" } }),
        /* @__PURE__ */ jsx("line", { x1: "10", y1: "10", x2: "24", y2: "18" }),
        /* @__PURE__ */ jsx("line", { x1: "54", y1: "10", x2: "40", y2: "18" }),
        /* @__PURE__ */ jsx("rect", { x: "24", y: "14", width: "16", height: "8", rx: "2", fill: "currentColor", fillOpacity: "0.15" }),
        /* @__PURE__ */ jsx("circle", { cx: "32", cy: "26", r: "2.5", fill: "currentColor", fillOpacity: "0.3" })
      ]
    }
  ) });
}
async function fetchExperiences() {
  const { data, error } = await supabase.from("experiences").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}
async function fetchReviews() {
  const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
async function fetchSiteSettings() {
  const { data, error } = await supabase.from("site_settings").select("*");
  if (error) throw error;
  const map = {};
  (data ?? []).forEach((r) => map[r.key] = r.value);
  return map;
}
async function fetchGalleries() {
  const { data, error } = await supabase.from("galleries").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}
async function fetchGalleryPhotos() {
  const { data, error } = await supabase.from("gallery_photos").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}
async function fetchSocialLinks() {
  const { data, error } = await supabase.from("social_links").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}
async function fetchIndexEntries() {
  const { data, error } = await supabase.from("index_entries").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}
async function uploadPhoto(file) {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("gallery").upload(path, file, {
    cacheControl: "3600",
    upsert: false
  });
  if (error) throw error;
  const { data } = supabase.storage.from("gallery").getPublicUrl(path);
  return data.publicUrl;
}
const appCss = "/assets/styles-BnThKqOB.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$7 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "S. R. Photo Studio" },
      { name: "description", content: "My Best Shots creates professional photographer portfolio websites with customizable galleries and an admin panel." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "S.R. Photo Studio" },
      { property: "og:description", content: "My Best Shots creates professional photographer portfolio websites with customizable galleries and an admin panel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "S.R. Photo Studio" },
      { name: "twitter:description", content: "My Best Shots creates professional photographer portfolio websites with customizable galleries and an admin panel." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c667d257-fc58-40d8-a576-5acc57472c5e/id-preview-e730c0a7--832aa9ad-8fcb-43c5-8027-f722958fe441.lovable.app-1780392628743.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c667d257-fc58-40d8-a576-5acc57472c5e/id-preview-e730c0a7--832aa9ad-8fcb-43c5-8027-f722958fe441.lovable.app-1780392628743.png" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$7.useRouteContext();
  return /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx(IntroLoader, {}),
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(ChatWidget, {}),
    /* @__PURE__ */ jsx(Toaster, { richColors: true, position: "top-right" })
  ] });
}
function IntroLoader() {
  const { data } = useQuery({ queryKey: ["site_settings"], queryFn: fetchSiteSettings });
  return /* @__PURE__ */ jsx(LoadingScreen, { logoUrl: data?.nav_logo, brand: data?.nav_brand ?? "S. R. Photo Studio" });
}
const $$splitComponentImporter$5 = () => import("./contact-BrsU_1oV.js");
const Route$6 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact"
    }, {
      name: "description",
      content: "Get in touch — WhatsApp, Instagram, or email."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./book-DC6IXLz-.js");
const Route$5 = createFileRoute("/book")({
  head: () => ({
    meta: [{
      title: "Book a Session — Reserve Your Date"
    }, {
      name: "description",
      content: "Reserve your photography session. Share your details and we'll be in touch within 24 hours."
    }, {
      property: "og:title",
      content: "Book a Session"
    }, {
      property: "og:description",
      content: "Reserve your photography session."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./index-CXb0wNY9.js");
const Route$4 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Photographer Portfolio"
    }, {
      name: "description",
      content: "Editorial and architectural photography."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.index-DUAyWVni.js");
const Route$3 = createFileRoute("/admin/")({
  head: () => ({
    meta: [{
      title: "Admin Panel"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./gallery._slug-DnQK3NAd.js");
const Route$2 = createFileRoute("/gallery/$slug")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `Gallery — ${params.slug}`
    }, {
      name: "description",
      content: "Photo gallery"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const createLovableAiGatewayProvider = (lovableApiKey) => createOpenAICompatible({
  name: "lovable",
  baseURL: "https://ai.gateway.lovable.dev/v1",
  headers: {
    "Lovable-API-Key": lovableApiKey,
    "X-Lovable-AIG-SDK": "vercel-ai-sdk"
  }
});
const SYSTEM_PROMPT = `You are the friendly assistant for SR Photo Studio, a wedding and portrait photography studio.
Help visitors with questions about photography sessions, pricing, availability, locations, and the booking process.
Be warm, concise, and professional. If asked about exact prices or specific dates, say the studio will follow up by email
and encourage them to share their name, email, and what kind of session they're interested in. Keep replies under 120 words.`;
const RATE_WINDOW_MS = 6e4;
const MAX_PER_IP_PER_MIN = 15;
const MAX_PER_SESSION_PER_MIN = 12;
const ipHits = /* @__PURE__ */ new Map();
const sessionHits = /* @__PURE__ */ new Map();
function hit(map, key, max) {
  const now = Date.now();
  const arr = (map.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  arr.push(now);
  map.set(key, arr);
  return arr.length > max;
}
const Route$1 = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
          const body = await request.json();
          const sessionId = String(body.sessionId || "").slice(0, 80);
          const rawMessages = Array.isArray(body.messages) ? body.messages.slice(-30) : [];
          if (sessionId.length < 8 || !/^[A-Za-z0-9_-]+$/.test(sessionId)) {
            return new Response("Bad request", { status: 400 });
          }
          if (rawMessages.length === 0) {
            return new Response("Bad request", { status: 400 });
          }
          const messages = [];
          for (const m of rawMessages) {
            if (!m || typeof m.content !== "string") continue;
            if (m.role !== "user" && m.role !== "assistant") continue;
            const content = m.content.slice(0, 8e3);
            if (!content) continue;
            messages.push({ role: m.role, content });
          }
          if (messages.length === 0) return new Response("Bad request", { status: 400 });
          const lastUser = [...messages].reverse().find((m) => m.role === "user");
          if (!lastUser) return new Response("No user message", { status: 400 });
          if (hit(ipHits, ip, MAX_PER_IP_PER_MIN) || hit(sessionHits, sessionId, MAX_PER_SESSION_PER_MIN)) {
            return new Response("Too many requests", { status: 429 });
          }
          const key = process.env.LOVABLE_API_KEY;
          if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });
          const supabase2 = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
          );
          await supabase2.from("chat_sessions").upsert(
            {
              session_id: sessionId,
              visitor_name: (body.visitorName || "").slice(0, 120),
              visitor_email: (body.visitorEmail || "").slice(0, 200),
              updated_at: (/* @__PURE__ */ new Date()).toISOString()
            },
            { onConflict: "session_id" }
          );
          await supabase2.from("chat_messages").insert({
            session_id: sessionId,
            role: "user",
            content: lastUser.content.slice(0, 8e3)
          });
          const gateway = createLovableAiGatewayProvider(key);
          const { text } = await generateText({
            model: gateway("google/gemini-2.5-flash"),
            system: SYSTEM_PROMPT,
            messages: messages.map((m) => ({ role: m.role, content: m.content }))
          });
          await supabase2.from("chat_messages").insert({
            session_id: sessionId,
            role: "assistant",
            content: text
          });
          queueTranscriptEmail(supabase2, sessionId).catch(
            (err) => console.error("[chat] email queue failed:", err)
          );
          return Response.json({ reply: text });
        } catch (err) {
          console.error("[chat] error", err);
          return new Response("Chat failed", { status: 500 });
        }
      }
    }
  }
});
async function queueTranscriptEmail(supabase2, sessionId) {
  const { data: setting } = await supabase2.from("site_settings").select("value").eq("key", "chat_transcript_email").maybeSingle();
  const to = setting?.value || "";
  if (!to) return;
  const { data: msgs } = await supabase2.from("chat_messages").select("role, content, created_at").eq("session_id", sessionId).order("created_at", { ascending: true });
  const { data: session } = await supabase2.from("chat_sessions").select("visitor_name, visitor_email").eq("session_id", sessionId).maybeSingle();
  const lines = (msgs ?? []).map(
    (m) => `[${new Date(m.created_at).toLocaleString()}] ${m.role.toUpperCase()}: ${m.content}`
  );
  const transcript = lines.join("\n\n");
  const visitorName = session?.visitor_name || "(unknown)";
  const visitorEmail = session?.visitor_email || "n/a";
  const visitorText = `Visitor: ${visitorName} <${visitorEmail}>`;
  const subject = `New chat message — session ${sessionId.slice(0, 8)}`;
  const html = `<h2>${escapeHtml(subject)}</h2><p>Visitor: ${escapeHtml(visitorName)} &lt;${escapeHtml(visitorEmail)}&gt;</p><pre style="white-space:pre-wrap;font-family:ui-monospace,monospace">${escapeHtml(transcript)}</pre>`;
  try {
    await supabase2.rpc("enqueue_email", {
      p_queue: "transactional_emails",
      p_payload: {
        to,
        subject,
        html,
        text: `${visitorText}

${transcript}`
      }
    });
    await supabase2.from("chat_sessions").update({ last_emailed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("session_id", sessionId);
  } catch (err) {
    console.warn("[chat] transcript email skipped (email infra not ready)", err);
  }
}
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
const $$splitComponentImporter = () => import("./admin.login-oj5eD7a3.js");
const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{
      title: "Admin · Sign in"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ContactRoute = Route$6.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$7
});
const BookRoute = Route$5.update({
  id: "/book",
  path: "/book",
  getParentRoute: () => Route$7
});
const IndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const AdminIndexRoute = Route$3.update({
  id: "/admin/",
  path: "/admin/",
  getParentRoute: () => Route$7
});
const GallerySlugRoute = Route$2.update({
  id: "/gallery/$slug",
  path: "/gallery/$slug",
  getParentRoute: () => Route$7
});
const ApiChatRoute = Route$1.update({
  id: "/api/chat",
  path: "/api/chat",
  getParentRoute: () => Route$7
});
const AdminLoginRoute = Route.update({
  id: "/admin/login",
  path: "/admin/login",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  BookRoute,
  ContactRoute,
  AdminLoginRoute,
  ApiChatRoute,
  GallerySlugRoute,
  AdminIndexRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$2 as R,
  fetchGalleries as a,
  fetchGalleryPhotos as b,
  fetchSocialLinks as c,
  fetchIndexEntries as d,
  fetchExperiences as e,
  fetchSiteSettings as f,
  fetchReviews as g,
  router as r,
  uploadPhoto as u
};
