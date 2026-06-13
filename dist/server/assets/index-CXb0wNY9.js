import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { s as supabase } from "./client-DoNzAdgV.js";
import { toast } from "sonner";
import { f as fetchSiteSettings, a as fetchGalleries, b as fetchGalleryPhotos, c as fetchSocialLinks, d as fetchIndexEntries, e as fetchExperiences, g as fetchReviews } from "./router-C2_rbkH8.js";
import "@supabase/supabase-js";
import "lucide-react";
import "ai";
import "@ai-sdk/openai-compatible";
function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}
function Index() {
  const settings = useQuery({
    queryKey: ["site_settings"],
    queryFn: fetchSiteSettings
  });
  const galleriesQ = useQuery({
    queryKey: ["galleries"],
    queryFn: fetchGalleries
  });
  const photosQ = useQuery({
    queryKey: ["gallery_photos"],
    queryFn: fetchGalleryPhotos
  });
  const socialQ = useQuery({
    queryKey: ["social_links"],
    queryFn: fetchSocialLinks
  });
  const indexQ = useQuery({
    queryKey: ["index_entries"],
    queryFn: fetchIndexEntries
  });
  const experiencesQ = useQuery({
    queryKey: ["experiences"],
    queryFn: fetchExperiences
  });
  const reviewsQ = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews
  });
  const s = settings.data ?? {};
  const galleries = (galleriesQ.data ?? []).map((g) => ({
    ...g,
    photos: (photosQ.data ?? []).filter((p) => p.gallery_id === g.id)
  }));
  const navigate = useNavigate();
  useScrollReveal();
  const [ctaActive, setCtaActive] = useState(false);
  const handleCta = () => {
    if (ctaActive) return;
    setCtaActive(true);
    window.setTimeout(() => navigate({
      to: "/contact"
    }), 650);
  };
  const renderHeadline = (text) => {
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((p, i) => p.startsWith("*") && p.endsWith("*") ? /* @__PURE__ */ jsx("em", { className: "italic font-normal text-accent", children: p.slice(1, -1) }, i) : /* @__PURE__ */ jsx("span", { children: p }, i));
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
    /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" }),
    /* @__PURE__ */ jsx("link", { href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap", rel: "stylesheet" }),
    /* @__PURE__ */ jsxs("nav", { className: "fixed top-0 w-full z-40 px-6 md:px-10 py-5 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-border", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        s.nav_logo ? /* @__PURE__ */ jsx("img", { src: s.nav_logo, alt: s.nav_brand ?? "Logo", className: "size-9 object-contain" }) : /* @__PURE__ */ jsx("span", { className: "inline-flex items-center justify-center size-9 border border-accent/60 text-accent", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "size-4", children: [
          /* @__PURE__ */ jsx("path", { d: "M4 7h3l2-2h6l2 2h3v12H4z" }),
          /* @__PURE__ */ jsx("circle", { cx: "12", cy: "13", r: "3.5" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "leading-tight", children: [
          /* @__PURE__ */ jsx("div", { className: "font-serif text-lg tracking-[0.18em] uppercase", children: s.nav_brand ?? "Studio" }),
          /* @__PURE__ */ jsx("div", { className: "text-[9px] tracking-[0.28em] uppercase text-muted-foreground", children: s.hero_eyebrow ?? "Fine Art Editorial" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.22em] font-medium", children: [
        /* @__PURE__ */ jsx("a", { href: "#works", className: "text-accent border-b border-accent pb-1", children: "Showcase" }),
        /* @__PURE__ */ jsx("a", { href: "#works", className: "hover:text-accent transition-colors", children: "Portfolio" }),
        /* @__PURE__ */ jsx("a", { href: "#about", className: "hover:text-accent transition-colors", children: "Story" }),
        /* @__PURE__ */ jsx("a", { href: "#archive", className: "hover:text-accent transition-colors", children: "Archive" }),
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "hover:text-accent transition-colors", children: "Contact" })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/book", className: "btn-press hidden md:inline-flex items-center gap-2 bg-accent text-background px-5 py-3 text-[11px] uppercase tracking-[0.22em] font-semibold hover:brightness-110 transition", children: "Book Session" })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-32 pb-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 -z-10 overflow-hidden", children: [
        s.hero_image && /* @__PURE__ */ jsx("img", { src: s.hero_image, alt: "Hero", width: 1920, height: 1280, className: "w-full h-full object-cover animate-ken-burns" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" })
      ] }),
      s.hero_portrait && /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-y-0 right-0 w-full md:w-[55%] lg:w-[48%] -z-[5] overflow-hidden", children: [
        /* @__PURE__ */ jsx("img", { src: s.hero_portrait, alt: "", className: "w-full h-full object-cover object-center opacity-90" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl animate-fade-up", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 border border-accent/40 bg-accent/5 px-4 py-2 mb-10", children: [
          /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "size-3.5 text-accent", children: [
            /* @__PURE__ */ jsx("circle", { cx: "12", cy: "9", r: "5" }),
            /* @__PURE__ */ jsx("path", { d: "M9 14l-2 7 5-3 5 3-2-7" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.3em] text-accent font-semibold", children: s.hero_eyebrow ?? "Est. Studio" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "font-serif text-[clamp(2.75rem,7.5vw,6rem)] leading-[1.02] tracking-tight text-balance mb-10 font-normal", children: renderHeadline(s.hero_headline ?? "Capturing the *Infinite Beauty* of Your Most Precious Moments.") }),
        s.about_bio && /* @__PURE__ */ jsx("p", { className: "max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed mb-12", children: s.about_bio }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 items-center", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/book", className: "btn-press group inline-flex items-center gap-3 bg-accent text-background px-7 py-4 text-[11px] uppercase tracking-[0.25em] font-semibold hover:brightness-110 transition", children: [
            "Book Your Session",
            /* @__PURE__ */ jsx("span", { className: "transition-transform group-hover:translate-x-1", children: "↳" })
          ] }),
          /* @__PURE__ */ jsx("a", { href: "#works", className: "btn-press inline-flex items-center gap-3 border border-foreground/30 text-foreground px-7 py-4 text-[11px] uppercase tracking-[0.25em] font-semibold hover:border-accent hover:text-accent transition", children: "Explore Portfolio" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-8 right-6 md:right-10 text-[10px] uppercase tracking-[0.25em] text-muted-foreground hidden md:block", children: "Global Coverage" })
    ] }),
    /* @__PURE__ */ jsx(WorksSection, { galleries, eyebrow: s.works_eyebrow, title: s.works_title }),
    /* @__PURE__ */ jsx("section", { id: "archive", className: "px-8 py-24 bg-background text-foreground border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end mb-16", "data-reveal": true, children: [
        /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl font-light font-serif", children: s.archive_title ?? "" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-widest text-accent uppercase", children: s.archive_caption ?? "" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "border-t border-accent/30", children: (indexQ.data ?? []).map((e, i) => /* @__PURE__ */ jsxs("div", { "data-reveal": true, "data-reveal-delay": Math.min(i, 4), className: "grid grid-cols-12 py-6 border-b border-accent/20 group cursor-pointer hover:bg-accent/5 transition-colors", children: [
        /* @__PURE__ */ jsx("span", { className: "col-span-2 md:col-span-1 text-[10px] self-center text-accent/70", children: e.number }),
        /* @__PURE__ */ jsx("span", { className: "col-span-10 md:col-span-5 text-xl md:text-2xl font-light group-hover:text-accent transition-colors", children: e.title }),
        /* @__PURE__ */ jsx("span", { className: "hidden md:flex col-span-3 text-[10px] self-center text-muted-foreground uppercase tracking-widest", children: e.place }),
        /* @__PURE__ */ jsx("span", { className: "hidden md:flex col-span-3 justify-end text-[10px] self-center text-muted-foreground uppercase tracking-widest", children: e.note })
      ] }, e.id)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "experience", className: "px-6 md:px-10 py-32 bg-background border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-16", "data-reveal": true, children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.25em] text-accent", children: s.experience_eyebrow ?? "Chronicle" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-4 font-serif text-4xl md:text-5xl font-normal tracking-tight", children: s.experience_title ?? "Projects & Experience" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
        (experiencesQ.data ?? []).map((x, i) => /* @__PURE__ */ jsxs("div", { "data-reveal": true, "data-reveal-delay": i % 4, className: "border border-border p-8 hover:border-accent/60 hover:-translate-y-1 transition-all duration-500 group", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-baseline mb-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl", children: x.title }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.25em] text-accent", children: x.year })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4", children: x.role }),
          /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-muted-foreground whitespace-pre-line", children: x.description })
        ] }, x.id)),
        (experiencesQ.data ?? []).length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground col-span-full", children: "No experience entries yet — add some from the admin panel." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(ReviewsSection, { reviews: reviewsQ.data ?? [], eyebrow: s.reviews_eyebrow, title: s.reviews_title }),
    /* @__PURE__ */ jsx("section", { className: "px-6 md:px-8 py-32 bg-background border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto text-center", "data-reveal": true, children: [
      /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.25em] text-accent", children: "Ready to create" }),
      /* @__PURE__ */ jsx("h3", { className: "mt-4 text-3xl md:text-5xl font-light tracking-tight", children: "Have a project in mind?" }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 flex justify-center", children: /* @__PURE__ */ jsxs("button", { onClick: handleCta, "aria-label": "Contact us", className: `group relative overflow-hidden rounded-full px-12 md:px-20 py-6 md:py-8 bg-foreground text-background text-lg md:text-2xl font-light tracking-wide uppercase transition-all duration-300 hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${ctaActive ? "scale-95" : ""}`, children: [
        /* @__PURE__ */ jsx("span", { className: `absolute inset-0 rounded-full bg-accent transition-transform duration-700 ease-out origin-center ${ctaActive ? "scale-[20]" : "scale-0"}`, "aria-hidden": true }),
        /* @__PURE__ */ jsx("span", { className: `absolute inset-0 rounded-full border border-background/20 ${ctaActive ? "animate-ping" : ""}`, "aria-hidden": true }),
        /* @__PURE__ */ jsxs("span", { className: "relative z-10 flex items-center gap-3", children: [
          "Contact Us",
          /* @__PURE__ */ jsx("span", { className: `inline-block transition-transform duration-500 ${ctaActive ? "translate-x-3" : "group-hover:translate-x-2"}`, children: "→" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-8 text-xs text-muted-foreground uppercase tracking-widest", children: "WhatsApp · Instagram · Email" })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { id: "about", className: "bg-background border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
            s.nav_logo ? /* @__PURE__ */ jsx("img", { src: s.nav_logo, alt: s.nav_brand ?? "Logo", className: "size-9 object-contain" }) : /* @__PURE__ */ jsx("span", { className: "inline-flex items-center justify-center size-9 border border-accent/60 text-accent", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "size-4", children: [
              /* @__PURE__ */ jsx("path", { d: "M4 7h3l2-2h6l2 2h3v12H4z" }),
              /* @__PURE__ */ jsx("circle", { cx: "12", cy: "13", r: "3.5" })
            ] }) }),
            /* @__PURE__ */ jsx("span", { className: "font-serif text-lg tracking-[0.22em] uppercase", children: s.nav_brand ?? "Studio" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-muted-foreground max-w-sm whitespace-pre-line", children: s.about_bio ?? "" }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-3 mt-8", children: (socialQ.data ?? []).map((l) => /* @__PURE__ */ jsx("a", { href: l.url, target: "_blank", rel: "noreferrer", "aria-label": l.label, title: l.label, className: "inline-flex items-center justify-center size-10 border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors overflow-hidden", children: l.icon_url ? /* @__PURE__ */ jsx("img", { src: l.icon_url, alt: l.label, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-widest", children: l.label.slice(0, 2) }) }, l.id)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-serif text-lg tracking-[0.22em] uppercase mb-8", children: "Location" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm leading-relaxed text-muted-foreground whitespace-pre-line", children: s.represented_by ?? "" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-serif text-lg tracking-[0.22em] uppercase mb-8", children: "Enquiry" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm", children: [
            s.contact_email && /* @__PURE__ */ jsxs("a", { href: `mailto:${s.contact_email}`, className: "flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors", children: [
              /* @__PURE__ */ jsx("span", { children: "✉" }),
              " ",
              s.contact_email
            ] }),
            s.contact_phone && /* @__PURE__ */ jsxs("a", { href: `tel:${s.contact_phone.replace(/\s+/g, "")}`, className: "flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors", children: [
              /* @__PURE__ */ jsx("span", { children: "☎" }),
              " ",
              s.contact_phone
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: s.copyright ?? "" }),
        /* @__PURE__ */ jsxs("button", { onClick: () => window.scrollTo({
          top: 0,
          behavior: "smooth"
        }), className: "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-foreground hover:text-accent transition-colors", children: [
          "Re-ascend to Sky ",
          /* @__PURE__ */ jsx("span", { children: "↑" })
        ] })
      ] })
    ] }) })
  ] });
}
function Stars({
  n
}) {
  return /* @__PURE__ */ jsxs("span", { className: "text-accent text-sm tracking-widest", children: [
    "★".repeat(Math.max(0, Math.min(5, n))),
    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/40", children: "★".repeat(5 - Math.max(0, Math.min(5, n))) })
  ] });
}
function ReviewsSection({
  reviews,
  eyebrow,
  title
}) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(null);
  const [form, setForm] = useState({
    name: "",
    message: "",
    rating: 5
  });
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      toast.error("Please fill in your name and review");
      return;
    }
    setBusy(true);
    const {
      error
    } = await supabase.from("reviews").insert({
      name: form.name.trim(),
      message: form.message.trim(),
      rating: form.rating
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Thank you for your review!");
    setForm({
      name: "",
      message: "",
      rating: 5
    });
    qc.invalidateQueries({
      queryKey: ["reviews"]
    });
  };
  const loop = reviews.length > 0 ? [...reviews, ...reviews] : [];
  return /* @__PURE__ */ jsxs("section", { id: "reviews", className: "py-32 bg-foreground/[0.02] border-t border-border overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 md:px-10 mb-12", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.25em] text-accent", children: eyebrow ?? "Voices" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-4 font-serif text-4xl md:text-5xl font-normal tracking-tight", children: title ?? "What clients say" })
    ] }),
    reviews.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "marquee-pause relative", children: [
      /* @__PURE__ */ jsx("div", { className: "flex gap-6 w-max animate-marquee", children: loop.map((r, i) => /* @__PURE__ */ jsxs("button", { onClick: () => setOpen(r), className: "text-left w-[320px] md:w-[380px] shrink-0 border border-border bg-background p-7 hover:border-accent/60 hover:-translate-y-1 transition-all", children: [
        /* @__PURE__ */ jsx(Stars, { n: r.rating }),
        /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-4", children: [
          "“",
          r.message,
          "”"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-4 border-t border-border flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "font-serif text-base", children: r.name }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.22em] text-accent", children: "Read →" })
        ] })
      ] }, `${r.id}-${i}`)) }),
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" }),
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" })
    ] }) : /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-muted-foreground", children: "Be the first to leave a review." }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto px-6 md:px-10 mt-20", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl mb-6 text-center", children: "Leave a review" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Your name", value: form.name, maxLength: 80, onChange: (e) => setForm((f) => ({
          ...f,
          name: e.target.value
        })), className: "w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" }),
        /* @__PURE__ */ jsx("textarea", { placeholder: "Your experience…", rows: 4, value: form.message, maxLength: 2e3, onChange: (e) => setForm((f) => ({
          ...f,
          message: e.target.value
        })), className: "w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.22em] text-muted-foreground", children: "Rating" }),
            [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setForm((f) => ({
              ...f,
              rating: n
            })), className: `text-xl ${n <= form.rating ? "text-accent" : "text-muted-foreground/40"} hover:text-accent transition-colors`, "aria-label": `${n} stars`, children: "★" }, n))
          ] }),
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: busy, className: "bg-accent text-background px-6 py-3 text-[11px] uppercase tracking-[0.22em] font-semibold hover:brightness-110 transition disabled:opacity-50", children: busy ? "Sending…" : "Submit Review" })
        ] })
      ] })
    ] }),
    open && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-up", onClick: () => setOpen(null), children: /* @__PURE__ */ jsxs("div", { className: "bg-background border border-accent/40 max-w-xl w-full p-10 relative", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setOpen(null), className: "absolute top-4 right-4 text-muted-foreground hover:text-accent text-xl", "aria-label": "Close", children: "✕" }),
      /* @__PURE__ */ jsx(Stars, { n: open.rating }),
      /* @__PURE__ */ jsxs("p", { className: "mt-6 font-serif text-xl md:text-2xl leading-relaxed whitespace-pre-line", children: [
        "“",
        open.message,
        "”"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-6 border-t border-border flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-serif text-lg", children: [
          "— ",
          open.name
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.22em] text-muted-foreground", children: new Date(open.created_at).toLocaleDateString() })
      ] })
    ] }) })
  ] });
}
function WorksSection({
  galleries,
  eyebrow,
  title
}) {
  const [filter, setFilter] = useState("ALL");
  const categoryOf = (g) => (g.category || g.year || "Featured").toString().toUpperCase();
  const categories = Array.from(new Set(galleries.map(categoryOf).filter(Boolean)));
  const visible = filter === "ALL" ? galleries : galleries.filter((g) => categoryOf(g) === filter);
  const renderTitle = (text) => text.split(/(\*[^*]+\*)/g).map((p, i) => p.startsWith("*") && p.endsWith("*") ? /* @__PURE__ */ jsx("em", { className: "italic font-normal text-accent", children: p.slice(1, -1) }, i) : /* @__PURE__ */ jsx("span", { children: p }, i));
  return /* @__PURE__ */ jsx("section", { id: "works", className: "px-6 md:px-10 py-32", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center mb-14", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 border border-accent/40 bg-accent/5 px-4 py-2 mb-8", children: [
        /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "size-3.5 text-accent", children: /* @__PURE__ */ jsx("path", { d: "M3 5h18l-7 8v6l-4-2v-4z" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.3em] text-accent font-semibold", children: eyebrow ?? "Curated Archive" })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-tight font-normal", children: renderTitle(title ?? "Life, *Captured*") }),
      /* @__PURE__ */ jsx("span", { className: "mt-6 block h-px w-16 bg-accent" })
    ] }),
    categories.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-3 mb-16", children: ["ALL", ...categories].map((c) => {
      const active = filter === c;
      return /* @__PURE__ */ jsx("button", { onClick: () => setFilter(c), className: `px-6 py-3 text-[11px] uppercase tracking-[0.22em] font-semibold transition-all ${active ? "bg-accent text-background" : "bg-muted/40 text-foreground/80 hover:bg-muted hover:text-accent"}`, children: c }, c);
    }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10", children: visible.map((g, i) => /* @__PURE__ */ jsx(Link, { to: "/gallery/$slug", params: {
      slug: g.slug
    }, "data-reveal": true, "data-reveal-delay": i % 4, className: "group relative block bg-card border border-border hover:border-accent transition-all duration-500 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.4)] hover:shadow-[0_18px_50px_-12px_color-mix(in_oklab,var(--accent)_45%,transparent)] hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent", children: /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden aspect-[3/4] bg-gradient-to-br from-muted via-muted/60 to-muted/30 ring-1 ring-border group-hover:ring-accent/60 transition-colors", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,color-mix(in_oklab,var(--accent)_10%,transparent)_50%,transparent_70%)] bg-[length:200%_100%] animate-[shimmer_1.8s_ease-in-out_infinite] pointer-events-none" }),
        g.cover_url && /* @__PURE__ */ jsx("img", { src: g.cover_url, alt: g.title, loading: i < 3 ? "eager" : "lazy", fetchPriority: i < 3 ? "high" : "auto", decoding: "async", onLoad: (e) => e.currentTarget.classList.add("loaded"), className: "relative w-full h-full object-cover opacity-0 [&.loaded]:opacity-100 transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" }),
        /* @__PURE__ */ jsx("span", { className: "absolute top-4 right-4 z-10 text-[10px] uppercase tracking-[0.22em] font-semibold text-accent bg-background/85 backdrop-blur-sm px-3 py-1.5 border border-accent/40", children: categoryOf(g) }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-0 bottom-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[var(--ease-out-expo)]", children: [
          /* @__PURE__ */ jsxs("p", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-accent mb-2", children: [
            g.photos.length,
            " Frames · ",
            g.year
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl text-foreground italic leading-tight", children: g.title }),
          g.place && /* @__PURE__ */ jsxs("p", { className: "mt-2 flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "size-3.5 text-accent", children: [
              /* @__PURE__ */ jsx("path", { d: "M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" }),
              /* @__PURE__ */ jsx("circle", { cx: "12", cy: "9", r: "2.5" })
            ] }),
            g.place
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "px-2 pt-4 pb-2 flex items-baseline justify-between gap-3", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-serif text-lg leading-tight truncate group-hover:text-accent transition-colors", children: g.title }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.22em] text-muted-foreground shrink-0", children: g.year })
      ] })
    ] }) }, g.id)) }),
    visible.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-muted-foreground mt-12", children: "No galleries in this category yet." })
  ] }) });
}
export {
  Index as component
};
