import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { s as supabase } from "./client-DoNzAdgV.js";
import { toast } from "sonner";
import "@supabase/supabase-js";
const schema = z.object({
  name: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Invalid email").max(200),
  phone: z.string().trim().max(50),
  session_type: z.string().trim().max(80),
  preferred_date: z.string().trim().max(80),
  location: z.string().trim().max(200),
  message: z.string().trim().max(2e3)
});
const SESSION_TYPES = ["Wedding", "Engagement", "Maternity", "Family", "Portrait", "Editorial", "Event", "Other"];
function BookPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    session_type: "",
    preferred_date: "",
    location: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const update = (k) => (e) => setForm((f) => ({
    ...f,
    [k]: e.target.value
  }));
  async function onSubmit(e) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    const {
      error
    } = await supabase.from("bookings").insert(parsed.data);
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit. Please try again.");
      return;
    }
    setDone(true);
    toast.success("Booking request received");
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxs("nav", { className: "flex items-center justify-between px-6 md:px-10 py-6 border-b border-border/40", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "font-serif text-xl tracking-tight", children: [
        /* @__PURE__ */ jsx("span", { className: "text-accent", children: "●" }),
        " Studio"
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "text-[11px] uppercase tracking-[0.25em] hover:text-accent transition-colors", children: "← Back" })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "px-6 md:px-10 py-16 md:py-24 max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 border border-accent/40 bg-accent/5 px-4 py-2 mb-6", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.3em] text-accent font-semibold", children: "Reserve Your Date" }) }),
        /* @__PURE__ */ jsxs("h1", { className: "font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight mb-4", children: [
          "Book Your ",
          /* @__PURE__ */ jsx("span", { className: "italic text-accent", children: "Session" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground max-w-xl", children: "Share a few details and we'll get back to you within 24 hours to confirm availability and next steps." })
      ] }),
      done ? /* @__PURE__ */ jsxs("div", { className: "border border-accent/40 bg-accent/5 p-10 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "font-serif text-2xl mb-3", children: "Thank you — your request is in." }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6", children: "We'll reach out shortly to confirm your booking." }),
        /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-flex items-center gap-2 bg-accent text-background px-6 py-3 text-[11px] uppercase tracking-[0.25em] font-semibold hover:brightness-110 transition", children: "Return Home" })
      ] }) : /* @__PURE__ */ jsxs("form", { onSubmit, className: "grid gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsx(Field, { label: "Full Name *", children: /* @__PURE__ */ jsx("input", { required: true, value: form.name, onChange: update("name"), className: inputCls, placeholder: "Jane Doe" }) }),
          /* @__PURE__ */ jsx(Field, { label: "Email *", children: /* @__PURE__ */ jsx("input", { required: true, type: "email", value: form.email, onChange: update("email"), className: inputCls, placeholder: "you@email.com" }) }),
          /* @__PURE__ */ jsx(Field, { label: "Phone", children: /* @__PURE__ */ jsx("input", { value: form.phone, onChange: update("phone"), className: inputCls, placeholder: "+1 555 000 0000" }) }),
          /* @__PURE__ */ jsx(Field, { label: "Session Type", children: /* @__PURE__ */ jsxs("select", { value: form.session_type, onChange: update("session_type"), className: inputCls, children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Select…" }),
            SESSION_TYPES.map((t) => /* @__PURE__ */ jsx("option", { value: t, children: t }, t))
          ] }) }),
          /* @__PURE__ */ jsx(Field, { label: "Preferred Date", children: /* @__PURE__ */ jsx("input", { type: "date", value: form.preferred_date, onChange: update("preferred_date"), className: inputCls }) }),
          /* @__PURE__ */ jsx(Field, { label: "Location", children: /* @__PURE__ */ jsx("input", { value: form.location, onChange: update("location"), className: inputCls, placeholder: "City / Venue" }) })
        ] }),
        /* @__PURE__ */ jsx(Field, { label: "Tell us about your vision", children: /* @__PURE__ */ jsx("textarea", { rows: 5, value: form.message, onChange: update("message"), className: inputCls, placeholder: "Anything we should know…" }) }),
        /* @__PURE__ */ jsxs("button", { type: "submit", disabled: submitting, className: "group inline-flex items-center justify-center gap-3 bg-accent text-background px-8 py-4 text-[11px] uppercase tracking-[0.25em] font-semibold hover:brightness-110 transition disabled:opacity-60", children: [
          submitting ? "Submitting…" : "Submit Booking Request",
          /* @__PURE__ */ jsx("span", { className: "transition-transform group-hover:translate-x-1", children: "↳" })
        ] })
      ] })
    ] })
  ] });
}
const inputCls = "w-full bg-transparent border border-border/60 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors text-foreground";
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsx("span", { className: "block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2 font-semibold", children: label }),
    children
  ] });
}
export {
  BookPage as component
};
