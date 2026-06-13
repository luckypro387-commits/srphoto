import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRouter, isRedirect, useNavigate, Link } from "@tanstack/react-router";
import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-DoNzAdgV.js";
import { c as cn, u as useAuth, B as Button, L as Label, I as Input } from "./label-vWs9rHRt.js";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, a as createServerFn } from "./server-PAKT5bVl.js";
import { z } from "zod";
import { r as requireSupabaseAuth } from "./auth-middleware-BhSvEo0q.js";
import { f as fetchSiteSettings, a as fetchGalleries, c as fetchSocialLinks, d as fetchIndexEntries, e as fetchExperiences, g as fetchReviews, u as uploadPhoto, b as fetchGalleryPhotos } from "./router-C2_rbkH8.js";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { toast } from "sonner";
import { ArrowLeft, LogOut, Upload, Plus, Trash2, Search, Mail } from "lucide-react";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "ai";
import "@ai-sdk/openai-compatible";
function useServerFn(serverFn) {
  const router = useRouter();
  return React.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const resendChatTranscript = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => z.object({
  sessionId: z.string().min(8).max(80)
}).parse(input)).handler(createSsrRpc("61fa2bd978a7dec1959aaf623d300b8d3cd1c7b1a78dccc703d535116293a18a"));
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
const Card = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
function AdminPage() {
  const {
    user,
    isAdmin,
    loading
  } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate({
      to: "/admin/login"
    });
  }, [loading, user, isAdmin, navigate]);
  if (loading || !user || !isAdmin) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center text-muted-foreground", children: "Loading…" });
  }
  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({
      to: "/admin/login"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxs("header", { className: "border-b border-border px-6 py-4 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "size-4" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-lg font-medium", children: "Admin Panel" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: user.email }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: signOut, children: [
          /* @__PURE__ */ jsx(LogOut, { className: "size-3 mr-1" }),
          " Sign out"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "max-w-5xl mx-auto p-6", children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "settings", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "mb-6 flex-wrap h-auto", children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "settings", children: "Site content" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "galleries", children: "Galleries" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "social", children: "Social links" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "archive", children: "Archive" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "experience", children: "Experience" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "reviews", children: "Reviews" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "chats", children: "Chats" })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "settings", children: /* @__PURE__ */ jsx(SiteSettingsEditor, {}) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "galleries", children: /* @__PURE__ */ jsx(GalleriesEditor, {}) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "social", children: /* @__PURE__ */ jsx(SocialLinksEditor, {}) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "archive", children: /* @__PURE__ */ jsx(ArchiveEditor, {}) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "experience", children: /* @__PURE__ */ jsx(ExperienceEditor, {}) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "reviews", children: /* @__PURE__ */ jsx(ReviewsEditor, {}) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "chats", children: /* @__PURE__ */ jsx(ChatsViewer, {}) })
    ] }) })
  ] });
}
function ChatsViewer() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [resending, setResending] = useState(false);
  const resend = useServerFn(resendChatTranscript);
  const sessionsQ = useQuery({
    queryKey: ["admin-chat-sessions"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("chat_sessions").select("session_id, visitor_name, visitor_email, last_emailed_at, created_at, updated_at").order("updated_at", {
        ascending: false
      }).limit(500);
      if (error) throw error;
      return data ?? [];
    }
  });
  const messagesQ = useQuery({
    queryKey: ["admin-chat-messages", selected],
    enabled: !!selected,
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("chat_messages").select("id, session_id, role, content, created_at").eq("session_id", selected).order("created_at", {
        ascending: true
      });
      if (error) throw error;
      return data ?? [];
    }
  });
  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return sessionsQ.data ?? [];
    return (sessionsQ.data ?? []).filter((x) => x.session_id.toLowerCase().includes(s) || x.visitor_email.toLowerCase().includes(s) || x.visitor_name.toLowerCase().includes(s));
  }, [search, sessionsQ.data]);
  const onResend = async (sessionId) => {
    setResending(true);
    try {
      const res = await resend({
        data: {
          sessionId
        }
      });
      toast.success(`Transcript queued to ${res.to}`);
    } catch (err) {
      toast.error(err?.message || "Failed to resend transcript");
    } finally {
      setResending(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-[1fr_1.3fr] gap-4", children: [
    /* @__PURE__ */ jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsx(Search, { className: "size-4 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { placeholder: "Search by session ID, name, or email", value: search, onChange: (e) => setSearch(e.target.value) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mb-2", children: sessionsQ.isLoading ? "Loading…" : `${filtered.length} session(s)` }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1 max-h-[70vh] overflow-y-auto", children: [
        filtered.map((s) => /* @__PURE__ */ jsxs("button", { onClick: () => setSelected(s.session_id), className: `w-full text-left p-3 rounded border transition-colors ${selected === s.session_id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40"}`, children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium truncate", children: s.visitor_name || s.visitor_email || "Anonymous visitor" }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground truncate", children: [
            s.visitor_email || "no email",
            " · ",
            s.session_id.slice(0, 8)
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-muted-foreground mt-1", children: [
            "Updated ",
            new Date(s.updated_at).toLocaleString(),
            s.last_emailed_at && " · emailed"
          ] })
        ] }, s.session_id)),
        !sessionsQ.isLoading && filtered.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground p-3", children: "No sessions found." })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "p-4", children: !selected ? /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Select a session to view messages." }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3 gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground font-mono break-all", children: selected }),
        /* @__PURE__ */ jsxs(Button, { size: "sm", onClick: () => onResend(selected), disabled: resending || messagesQ.isLoading, children: [
          /* @__PURE__ */ jsx(Mail, { className: "size-3 mr-1" }),
          resending ? "Sending…" : "Resend transcript"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 max-h-[70vh] overflow-y-auto", children: [
        (messagesQ.data ?? []).map((m) => /* @__PURE__ */ jsxs("div", { className: `p-3 rounded text-sm ${m.role === "user" ? "bg-primary/10 border border-primary/20" : "bg-muted/50 border border-border"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "text-[10px] uppercase tracking-wide text-muted-foreground mb-1", children: [
            m.role,
            " · ",
            new Date(m.created_at).toLocaleString()
          ] }),
          /* @__PURE__ */ jsx("div", { className: "whitespace-pre-wrap", children: m.content })
        ] }, m.id)),
        messagesQ.isLoading && /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Loading messages…" }),
        !messagesQ.isLoading && (messagesQ.data ?? []).length === 0 && /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "No messages." })
      ] })
    ] }) })
  ] });
}
const SETTING_FIELDS = [{
  key: "nav_brand",
  label: "Navigation brand / name",
  type: "text"
}, {
  key: "nav_logo",
  label: "Company logo (replaces camera icon in nav)",
  type: "image"
}, {
  key: "site_name",
  label: "Site name",
  type: "text"
}, {
  key: "hero_image",
  label: "Hero background image",
  type: "image"
}, {
  key: "hero_portrait",
  label: "Hero side image (right side, behind text)",
  type: "image"
}, {
  key: "hero_headline",
  label: "Hero headline",
  type: "textarea"
}, {
  key: "hero_eyebrow",
  label: "Hero subtitle",
  type: "text"
}, {
  key: "works_eyebrow",
  label: "Works section eyebrow",
  type: "text"
}, {
  key: "works_title",
  label: "Works section title",
  type: "text"
}, {
  key: "archive_title",
  label: "Archive title",
  type: "text"
}, {
  key: "archive_caption",
  label: "Archive caption",
  type: "text"
}, {
  key: "about_bio",
  label: "About / bio paragraph",
  type: "textarea"
}, {
  key: "contact_email",
  label: "Contact email",
  type: "text"
}, {
  key: "contact_phone",
  label: "Contact phone",
  type: "text"
}, {
  key: "contact_title",
  label: "Contact page title",
  type: "text"
}, {
  key: "contact_subtitle",
  label: "Contact page subtitle",
  type: "textarea"
}, {
  key: "whatsapp_number",
  label: "WhatsApp number (with country code, no +)",
  type: "text"
}, {
  key: "whatsapp_message",
  label: "WhatsApp prefilled message",
  type: "textarea"
}, {
  key: "instagram_url",
  label: "Instagram URL",
  type: "text"
}, {
  key: "instagram_handle",
  label: "Instagram handle (e.g. @studio)",
  type: "text"
}, {
  key: "chat_message",
  label: "Email prefilled message",
  type: "textarea"
}, {
  key: "chat_subject",
  label: "Email subject",
  type: "text"
}, {
  key: "represented_by_label",
  label: "“Represented by” label",
  type: "text"
}, {
  key: "represented_by",
  label: "Representation (one per line)",
  type: "textarea"
}, {
  key: "clients_label",
  label: "Clients label",
  type: "text"
}, {
  key: "clients",
  label: "Clients (one per line)",
  type: "textarea"
}, {
  key: "experience_eyebrow",
  label: "Experience section eyebrow",
  type: "text"
}, {
  key: "experience_title",
  label: "Experience section title",
  type: "text"
}, {
  key: "reviews_eyebrow",
  label: "Reviews section eyebrow",
  type: "text"
}, {
  key: "reviews_title",
  label: "Reviews section title",
  type: "text"
}, {
  key: "copyright",
  label: "Copyright text",
  type: "text"
}];
function SiteSettingsEditor() {
  const qc = useQueryClient();
  const {
    data
  } = useQuery({
    queryKey: ["site_settings"],
    queryFn: fetchSiteSettings
  });
  const [values, setValues] = useState({});
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (data) setValues(data);
  }, [data]);
  const save = async () => {
    setBusy(true);
    try {
      const rows = SETTING_FIELDS.map((f) => ({
        key: f.key,
        value: values[f.key] ?? "",
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }));
      const {
        error
      } = await supabase.from("site_settings").upsert(rows, {
        onConflict: "key"
      });
      if (error) throw error;
      toast.success("Saved");
      qc.invalidateQueries({
        queryKey: ["site_settings"]
      });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };
  const onImageUpload = async (key, file) => {
    try {
      const url = await uploadPhoto(file);
      setValues((v) => ({
        ...v,
        [key]: url
      }));
      toast.success("Image uploaded — remember to save");
    } catch (e) {
      toast.error(e.message);
    }
  };
  return /* @__PURE__ */ jsxs(Card, { className: "p-6 space-y-5", children: [
    SETTING_FIELDS.map((f) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: f.key, children: f.label }),
      f.type === "textarea" ? /* @__PURE__ */ jsx(Textarea, { id: f.key, rows: 3, value: values[f.key] ?? "", onChange: (e) => setValues((v) => ({
        ...v,
        [f.key]: e.target.value
      })) }) : f.type === "image" ? /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Input, { id: f.key, value: values[f.key] ?? "", onChange: (e) => setValues((v) => ({
          ...v,
          [f.key]: e.target.value
        })), placeholder: "Image URL" }),
        values[f.key] && /* @__PURE__ */ jsx("img", { src: values[f.key], alt: "", className: "w-40 h-24 object-cover border border-border rounded" }),
        /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center gap-2 text-xs text-muted-foreground cursor-pointer hover:text-foreground", children: [
          /* @__PURE__ */ jsx(Upload, { className: "size-3" }),
          " Upload new image",
          /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => e.target.files?.[0] && onImageUpload(f.key, e.target.files[0]) })
        ] })
      ] }) : /* @__PURE__ */ jsx(Input, { id: f.key, value: values[f.key] ?? "", onChange: (e) => setValues((v) => ({
        ...v,
        [f.key]: e.target.value
      })) })
    ] }, f.key)),
    /* @__PURE__ */ jsx(Button, { onClick: save, disabled: busy, children: busy ? "Saving…" : "Save changes" })
  ] });
}
function SocialLinksEditor() {
  const qc = useQueryClient();
  const {
    data
  } = useQuery({
    queryKey: ["social_links"],
    queryFn: fetchSocialLinks
  });
  const links = data ?? [];
  const add = async () => {
    const {
      error
    } = await supabase.from("social_links").insert({
      label: "New link",
      url: "https://",
      sort_order: links.length + 1
    });
    if (error) toast.error(error.message);
    else qc.invalidateQueries({
      queryKey: ["social_links"]
    });
  };
  const update = async (id, patch) => {
    const {
      error
    } = await supabase.from("social_links").update(patch).eq("id", id);
    if (error) toast.error(error.message);
    else qc.invalidateQueries({
      queryKey: ["social_links"]
    });
  };
  const remove = async (id) => {
    const {
      error
    } = await supabase.from("social_links").delete().eq("id", id);
    if (error) toast.error(error.message);
    else qc.invalidateQueries({
      queryKey: ["social_links"]
    });
  };
  const uploadIcon = async (id, file) => {
    try {
      const url = await uploadPhoto(file);
      await update(id, {
        icon_url: url
      });
      toast.success("Icon uploaded");
    } catch (e) {
      toast.error(e.message);
    }
  };
  return /* @__PURE__ */ jsxs(Card, { className: "p-6 space-y-4", children: [
    links.map((l) => /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-end border-b border-border pb-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Icon" }),
        /* @__PURE__ */ jsx("div", { className: "size-12 border border-border rounded overflow-hidden bg-muted flex items-center justify-center", children: l.icon_url ? /* @__PURE__ */ jsx("img", { src: l.icon_url, alt: "", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("span", { className: "text-[9px] uppercase text-muted-foreground", children: l.label.slice(0, 2) }) }),
        /* @__PURE__ */ jsxs("label", { className: "text-[10px] text-muted-foreground cursor-pointer hover:text-foreground inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Upload, { className: "size-3" }),
          " Upload",
          /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => e.target.files?.[0] && uploadIcon(l.id, e.target.files[0]) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-1", children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Label" }),
        /* @__PURE__ */ jsx(Input, { defaultValue: l.label, onBlur: (e) => e.target.value !== l.label && update(l.id, {
          label: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-[2] space-y-1", children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "URL" }),
        /* @__PURE__ */ jsx(Input, { defaultValue: l.url, onBlur: (e) => e.target.value !== l.url && update(l.id, {
          url: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => remove(l.id), children: /* @__PURE__ */ jsx(Trash2, { className: "size-4 text-destructive" }) })
    ] }, l.id)),
    /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: add, children: [
      /* @__PURE__ */ jsx(Plus, { className: "size-3 mr-1" }),
      " Add link"
    ] })
  ] });
}
function ExperienceEditor() {
  const qc = useQueryClient();
  const {
    data
  } = useQuery({
    queryKey: ["experiences"],
    queryFn: fetchExperiences
  });
  const entries = data ?? [];
  const add = async () => {
    const {
      error
    } = await supabase.from("experiences").insert({
      title: "New project",
      role: "Lead photographer",
      description: "",
      year: String((/* @__PURE__ */ new Date()).getFullYear()),
      sort_order: entries.length + 1
    });
    if (error) toast.error(error.message);
    else qc.invalidateQueries({
      queryKey: ["experiences"]
    });
  };
  const update = async (id, patch) => {
    const {
      error
    } = await supabase.from("experiences").update(patch).eq("id", id);
    if (error) toast.error(error.message);
    else qc.invalidateQueries({
      queryKey: ["experiences"]
    });
  };
  const remove = async (id) => {
    const {
      error
    } = await supabase.from("experiences").delete().eq("id", id);
    if (error) toast.error(error.message);
    else qc.invalidateQueries({
      queryKey: ["experiences"]
    });
  };
  return /* @__PURE__ */ jsxs(Card, { className: "p-6 space-y-4", children: [
    entries.map((e) => /* @__PURE__ */ jsxs("div", { className: "border border-border rounded p-4 space-y-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-6", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Title" }),
          /* @__PURE__ */ jsx(Input, { defaultValue: e.title, onBlur: (ev) => ev.target.value !== e.title && update(e.id, {
            title: ev.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-4", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Role" }),
          /* @__PURE__ */ jsx(Input, { defaultValue: e.role, onBlur: (ev) => ev.target.value !== e.role && update(e.id, {
            role: ev.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Year" }),
          /* @__PURE__ */ jsx(Input, { defaultValue: e.year, onBlur: (ev) => ev.target.value !== e.year && update(e.id, {
            year: ev.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Description" }),
        /* @__PURE__ */ jsx(Textarea, { rows: 3, defaultValue: e.description, onBlur: (ev) => ev.target.value !== e.description && update(e.id, {
          description: ev.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => remove(e.id), children: /* @__PURE__ */ jsx(Trash2, { className: "size-4 text-destructive" }) }) })
    ] }, e.id)),
    /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: add, children: [
      /* @__PURE__ */ jsx(Plus, { className: "size-3 mr-1" }),
      " Add entry"
    ] })
  ] });
}
function ReviewsEditor() {
  const qc = useQueryClient();
  const {
    data
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews
  });
  const reviews = data ?? [];
  const remove = async (id) => {
    if (!confirm("Delete this review?")) return;
    const {
      error
    } = await supabase.from("reviews").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      qc.invalidateQueries({
        queryKey: ["reviews"]
      });
    }
  };
  return /* @__PURE__ */ jsxs(Card, { className: "p-6 space-y-3", children: [
    reviews.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No reviews yet." }),
    reviews.map((r) => /* @__PURE__ */ jsxs("div", { className: "border border-border rounded p-4 flex gap-4 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: r.name }),
          /* @__PURE__ */ jsx("span", { className: "text-accent text-sm", children: "★".repeat(r.rating) }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: new Date(r.created_at).toLocaleDateString() })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground whitespace-pre-line", children: r.message })
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => remove(r.id), children: /* @__PURE__ */ jsx(Trash2, { className: "size-4 text-destructive" }) })
    ] }, r.id))
  ] });
}
function ArchiveEditor() {
  const qc = useQueryClient();
  const {
    data
  } = useQuery({
    queryKey: ["index_entries"],
    queryFn: fetchIndexEntries
  });
  const entries = data ?? [];
  const add = async () => {
    const next = entries.length + 1;
    const {
      error
    } = await supabase.from("index_entries").insert({
      number: String(next).padStart(2, "0"),
      title: "New entry",
      place: "",
      note: "",
      sort_order: next
    });
    if (error) toast.error(error.message);
    else qc.invalidateQueries({
      queryKey: ["index_entries"]
    });
  };
  const update = async (id, patch) => {
    const {
      error
    } = await supabase.from("index_entries").update(patch).eq("id", id);
    if (error) toast.error(error.message);
    else qc.invalidateQueries({
      queryKey: ["index_entries"]
    });
  };
  const remove = async (id) => {
    const {
      error
    } = await supabase.from("index_entries").delete().eq("id", id);
    if (error) toast.error(error.message);
    else qc.invalidateQueries({
      queryKey: ["index_entries"]
    });
  };
  return /* @__PURE__ */ jsxs(Card, { className: "p-6 space-y-4", children: [
    entries.map((e) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-2 items-end", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-1", children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "#" }),
        /* @__PURE__ */ jsx(Input, { defaultValue: e.number, onBlur: (ev) => ev.target.value !== e.number && update(e.id, {
          number: ev.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-4", children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Title" }),
        /* @__PURE__ */ jsx(Input, { defaultValue: e.title, onBlur: (ev) => ev.target.value !== e.title && update(e.id, {
          title: ev.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-3", children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Place" }),
        /* @__PURE__ */ jsx(Input, { defaultValue: e.place, onBlur: (ev) => ev.target.value !== e.place && update(e.id, {
          place: ev.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-3", children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Note" }),
        /* @__PURE__ */ jsx(Input, { defaultValue: e.note, onBlur: (ev) => ev.target.value !== e.note && update(e.id, {
          note: ev.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "col-span-1", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => remove(e.id), children: /* @__PURE__ */ jsx(Trash2, { className: "size-4 text-destructive" }) }) })
    ] }, e.id)),
    /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: add, children: [
      /* @__PURE__ */ jsx(Plus, { className: "size-3 mr-1" }),
      " Add entry"
    ] })
  ] });
}
function GalleriesEditor() {
  const qc = useQueryClient();
  const {
    data: galleries
  } = useQuery({
    queryKey: ["galleries"],
    queryFn: fetchGalleries
  });
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    if (selected && galleries) {
      const fresh = galleries.find((g) => g.id === selected.id);
      if (fresh) setSelected(fresh);
    }
  }, [galleries]);
  const add = async () => {
    const slug = `gallery-${Date.now()}`;
    const {
      error
    } = await supabase.from("galleries").insert({
      slug,
      title: "New Gallery",
      place: "",
      year: "",
      category: "",
      description: "",
      cover_url: "",
      sort_order: (galleries?.length ?? 0) + 1
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Gallery created");
      qc.invalidateQueries({
        queryKey: ["galleries"]
      });
    }
  };
  if (selected) {
    return /* @__PURE__ */ jsx(GalleryDetail, { gallery: selected, onBack: () => setSelected(null) });
  }
  return /* @__PURE__ */ jsxs(Card, { className: "p-6 space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-sm font-medium", children: "All galleries" }),
      /* @__PURE__ */ jsxs(Button, { size: "sm", onClick: add, children: [
        /* @__PURE__ */ jsx(Plus, { className: "size-3 mr-1" }),
        " New gallery"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: (galleries ?? []).map((g) => /* @__PURE__ */ jsxs("button", { onClick: () => setSelected(g), className: "text-left border border-border rounded overflow-hidden hover:border-accent transition-colors", children: [
      /* @__PURE__ */ jsx("div", { className: "aspect-[16/10] bg-muted", children: g.cover_url && /* @__PURE__ */ jsx("img", { src: g.cover_url, alt: g.title, className: "w-full h-full object-cover" }) }),
      /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: g.title }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
          g.place,
          " · ",
          g.year
        ] })
      ] })
    ] }, g.id)) })
  ] });
}
function GalleryDetail({
  gallery,
  onBack
}) {
  const qc = useQueryClient();
  const {
    data: allPhotos
  } = useQuery({
    queryKey: ["gallery_photos"],
    queryFn: fetchGalleryPhotos
  });
  const photos = (allPhotos ?? []).filter((p) => p.gallery_id === gallery.id);
  const [form, setForm] = useState({
    title: gallery.title,
    slug: gallery.slug,
    place: gallery.place,
    year: gallery.year,
    category: gallery.category ?? "",
    description: gallery.description,
    cover_url: gallery.cover_url
  });
  const [savingMeta, setSavingMeta] = useState(false);
  const saveMeta = async () => {
    setSavingMeta(true);
    const {
      error
    } = await supabase.from("galleries").update(form).eq("id", gallery.id);
    setSavingMeta(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Gallery saved");
      qc.invalidateQueries({
        queryKey: ["galleries"]
      });
    }
  };
  const deleteGallery = async () => {
    if (!confirm(`Delete gallery "${gallery.title}" and all its photos?`)) return;
    const {
      error
    } = await supabase.from("galleries").delete().eq("id", gallery.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Gallery deleted");
      qc.invalidateQueries({
        queryKey: ["galleries"]
      });
      qc.invalidateQueries({
        queryKey: ["gallery_photos"]
      });
      onBack();
    }
  };
  const uploadCover = async (file) => {
    try {
      const url = await uploadPhoto(file);
      setForm((f) => ({
        ...f,
        cover_url: url
      }));
      toast.success("Cover uploaded — click Save");
    } catch (e) {
      toast.error(e.message);
    }
  };
  const addPhotos = async (files) => {
    try {
      const startOrder = photos.length;
      for (let i = 0; i < files.length; i++) {
        const url = await uploadPhoto(files[i]);
        const {
          error
        } = await supabase.from("gallery_photos").insert({
          gallery_id: gallery.id,
          url,
          caption: "",
          sort_order: startOrder + i + 1
        });
        if (error) throw error;
      }
      toast.success(`${files.length} photo(s) added`);
      qc.invalidateQueries({
        queryKey: ["gallery_photos"]
      });
    } catch (e) {
      toast.error(e.message);
    }
  };
  const updatePhoto = async (id, patch) => {
    const {
      error
    } = await supabase.from("gallery_photos").update(patch).eq("id", id);
    if (error) toast.error(error.message);
    else qc.invalidateQueries({
      queryKey: ["gallery_photos"]
    });
  };
  const removePhoto = async (id) => {
    const {
      error
    } = await supabase.from("gallery_photos").delete().eq("id", id);
    if (error) toast.error(error.message);
    else qc.invalidateQueries({
      queryKey: ["gallery_photos"]
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: onBack, children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "size-3 mr-1" }),
      " Back to galleries"
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-sm font-medium", children: "Gallery details" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Title" }),
          /* @__PURE__ */ jsx(Input, { value: form.title, onChange: (e) => setForm({
            ...form,
            title: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Slug" }),
          /* @__PURE__ */ jsx(Input, { value: form.slug, onChange: (e) => setForm({
            ...form,
            slug: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Place" }),
          /* @__PURE__ */ jsx(Input, { value: form.place, onChange: (e) => setForm({
            ...form,
            place: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Year" }),
          /* @__PURE__ */ jsx(Input, { value: form.year, onChange: (e) => setForm({
            ...form,
            year: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1 md:col-span-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Category (filter tag, e.g. Wedding, Maternity)" }),
          /* @__PURE__ */ jsx(Input, { value: form.category, onChange: (e) => setForm({
            ...form,
            category: e.target.value
          }), placeholder: "Wedding" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Label, { children: "Description" }),
        /* @__PURE__ */ jsx(Textarea, { rows: 3, value: form.description, onChange: (e) => setForm({
          ...form,
          description: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { children: "Cover image" }),
        /* @__PURE__ */ jsx(Input, { value: form.cover_url, onChange: (e) => setForm({
          ...form,
          cover_url: e.target.value
        }), placeholder: "URL" }),
        form.cover_url && /* @__PURE__ */ jsx("img", { src: form.cover_url, alt: "", className: "w-40 h-24 object-cover border border-border rounded" }),
        /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center gap-2 text-xs text-muted-foreground cursor-pointer hover:text-foreground", children: [
          /* @__PURE__ */ jsx(Upload, { className: "size-3" }),
          " Upload cover",
          /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => e.target.files?.[0] && uploadCover(e.target.files[0]) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between pt-2", children: [
        /* @__PURE__ */ jsx(Button, { onClick: saveMeta, disabled: savingMeta, children: savingMeta ? "Saving…" : "Save" }),
        /* @__PURE__ */ jsxs(Button, { variant: "destructive", onClick: deleteGallery, children: [
          /* @__PURE__ */ jsx(Trash2, { className: "size-3 mr-1" }),
          " Delete gallery"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-sm font-medium", children: [
          "Photos (",
          photos.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center gap-2 text-xs bg-primary text-primary-foreground px-3 py-2 rounded cursor-pointer hover:bg-primary/90", children: [
          /* @__PURE__ */ jsx(Upload, { className: "size-3" }),
          " Upload photos",
          /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", multiple: true, className: "hidden", onChange: (e) => e.target.files && addPhotos(e.target.files) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: photos.map((p) => /* @__PURE__ */ jsxs("div", { className: "border border-border rounded overflow-hidden", children: [
        /* @__PURE__ */ jsx("img", { src: p.url, alt: p.caption, className: "w-full h-40 object-cover" }),
        /* @__PURE__ */ jsxs("div", { className: "p-3 space-y-2", children: [
          /* @__PURE__ */ jsx(Input, { defaultValue: p.caption, placeholder: "Caption", onBlur: (e) => e.target.value !== p.caption && updatePhoto(p.id, {
            caption: e.target.value
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx(Input, { type: "number", defaultValue: p.sort_order, className: "w-24", onBlur: (e) => Number(e.target.value) !== p.sort_order && updatePhoto(p.id, {
              sort_order: Number(e.target.value)
            }) }),
            /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => removePhoto(p.id), children: /* @__PURE__ */ jsx(Trash2, { className: "size-4 text-destructive" }) })
          ] })
        ] })
      ] }, p.id)) })
    ] })
  ] });
}
export {
  AdminPage as component
};
