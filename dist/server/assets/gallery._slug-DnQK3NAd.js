import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { R as Route, a as fetchGalleries, b as fetchGalleryPhotos } from "./router-C2_rbkH8.js";
import "sonner";
import "react";
import "./client-DoNzAdgV.js";
import "@supabase/supabase-js";
import "ai";
import "@ai-sdk/openai-compatible";
function GalleryPage() {
  const {
    slug
  } = Route.useParams();
  const galleriesQ = useQuery({
    queryKey: ["galleries"],
    queryFn: fetchGalleries
  });
  const photosQ = useQuery({
    queryKey: ["gallery_photos"],
    queryFn: fetchGalleryPhotos
  });
  const gallery = (galleriesQ.data ?? []).find((g) => g.slug === slug);
  const photos = (photosQ.data ?? []).filter((p) => gallery && p.gallery_id === gallery.id);
  if (galleriesQ.isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center text-muted-foreground text-sm", children: "Loading…" });
  }
  if (!gallery) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center gap-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Gallery not found." }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "text-[10px] uppercase tracking-widest underline", children: "Back home" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxs("nav", { className: "sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border px-6 md:px-8 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] hover:text-accent transition-colors", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "size-4" }),
        " Back"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: [
        photos.length,
        " images"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("header", { className: "px-6 md:px-8 pt-20 pb-16 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-[10px] uppercase tracking-[0.25em] text-accent", children: [
        gallery.place,
        " ",
        gallery.year && `· ${gallery.year}`
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 text-4xl md:text-6xl font-light tracking-tight", children: gallery.title }),
      gallery.description && /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line", children: gallery.description })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "px-6 md:px-8 pb-32 max-w-7xl mx-auto", children: photos.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center py-24", children: "No photos in this gallery yet." }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8", children: photos.map((p, i) => /* @__PURE__ */ jsxs("figure", { className: "group", children: [
      /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden aspect-[4/5] bg-muted", children: /* @__PURE__ */ jsx("img", { src: p.url, alt: p.caption || `${gallery.title} ${i + 1}`, loading: "lazy", className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" }) }),
      /* @__PURE__ */ jsxs("figcaption", { className: "mt-3 flex gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground shrink-0 pt-1", children: String(i + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed whitespace-pre-line", children: p.caption || /* @__PURE__ */ jsx("span", { className: "text-muted-foreground italic", children: "No description" }) })
      ] })
    ] }, p.id)) }) })
  ] });
}
export {
  GalleryPage as component
};
