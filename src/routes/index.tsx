import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import plate042 from "@/assets/plate-042.jpg";
import plate089 from "@/assets/plate-089.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elias Thorne — Photographer, Copenhagen" },
      {
        name: "description",
        content:
          "Visual artist Elias Thorne. Editorial and architectural photography exploring the quiet tension of space. Based in Copenhagen, available worldwide.",
      },
      { property: "og:title", content: "Elias Thorne — Photographer, Copenhagen" },
      {
        property: "og:description",
        content:
          "Editorial and architectural photography. The quiet tension of space.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Index,
});

const indexEntries = [
  { n: "01", title: "Faded Interiors", place: "Paris, FR", note: "Published Cereal Vol. 22" },
  { n: "02", title: "Dust & Bone", place: "Marfa, US", note: "Exhibited at Tate" },
  { n: "03", title: "Submerged", place: "Iceland", note: "Private Collection" },
  { n: "04", title: "The Long Hour", place: "Faroe Islands", note: "Personal Series" },
  { n: "05", title: "Quiet Rooms", place: "Kyoto, JP", note: "Phaidon Monograph" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Inter:wght@400;500&family=JetBrains+Mono&display=swap"
        rel="stylesheet"
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-10 flex justify-between items-baseline mix-blend-difference text-background">
        <span className="font-display italic text-2xl tracking-tight">Elias Thorne</span>
        <div className="hidden md:flex gap-12 text-[11px] uppercase tracking-[0.2em] font-medium">
          <a href="#works" className="hover:opacity-60 transition-opacity">Works</a>
          <a href="#archive" className="hover:opacity-60 transition-opacity">Archive</a>
          <a href="#about" className="hover:opacity-60 transition-opacity">Journal</a>
          <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex flex-col justify-end p-8 pb-16">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Misty Nordic coastline at dawn"
            width={1920}
            height={1280}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        </div>
        <div className="max-w-4xl animate-fade-up">
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] text-balance mb-8 font-light">
            Capturing the <em>quiet</em> tension of space.
          </h1>
          <div className="flex gap-4 items-center">
            <div className="w-12 h-px bg-foreground/30" />
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Series 01: Nordic Silence
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="works" className="px-8 py-32 space-y-48">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-7">
            <img
              src={plate042}
              alt="Brutalist concrete architecture, Copenhagen"
              loading="lazy"
              width={1200}
              height={1600}
              className="w-full aspect-[3/4] object-cover"
            />
          </div>
          <div className="col-span-12 md:col-start-9 md:col-span-4 space-y-6">
            <span className="font-mono text-[10px] text-accent tracking-tighter">
              01 / FEATURED
            </span>
            <h2 className="font-display text-5xl leading-tight">Monoliths of the North</h2>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
              An ongoing study of Brutalist architecture across Scandinavia, focusing on the dialogue between raw concrete and the changing Baltic light.
            </p>
            <button className="group flex items-center gap-4 text-[11px] uppercase tracking-widest pt-4">
              View Series
              <span className="block w-8 h-px bg-foreground group-hover:w-12 transition-all duration-500" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-4 order-2 md:order-1 space-y-6">
            <span className="font-mono text-[10px] text-accent tracking-tighter">
              02 / ONGOING
            </span>
            <h2 className="font-display text-5xl leading-tight">The Glass Hour</h2>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
              Refractions, surface tension, and the distortion of time through liquid interfaces. A macro-study on temporary states.
            </p>
            <button className="group flex items-center gap-4 text-[11px] uppercase tracking-widest pt-4">
              Enter Gallery
              <span className="block w-8 h-px bg-foreground group-hover:w-12 transition-all duration-500" />
            </button>
          </div>
          <div className="col-span-12 md:col-start-6 md:col-span-7 order-1 md:order-2">
            <img
              src={plate089}
              alt="Macro water ripples and refractions"
              loading="lazy"
              width={1600}
              height={1000}
              className="w-full aspect-[16/10] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Full Index */}
      <section id="archive" className="px-8 py-24 bg-foreground text-background">
        <div className="flex justify-between items-end mb-16">
          <h3 className="font-display text-4xl italic">Full Index</h3>
          <span className="font-mono text-[10px] tracking-widest opacity-50">
            RECORDS 2018—2024
          </span>
        </div>
        <div className="border-t border-background/10">
          {indexEntries.map((e) => (
            <div
              key={e.n}
              className="grid grid-cols-12 py-6 border-b border-background/10 group cursor-pointer hover:bg-background/5 transition-colors"
            >
              <span className="col-span-1 font-mono text-[10px] self-center opacity-40">
                {e.n}
              </span>
              <span className="col-span-5 font-display text-2xl">{e.title}</span>
              <span className="col-span-3 font-mono text-[10px] self-center opacity-40 uppercase tracking-widest">
                {e.place}
              </span>
              <span className="col-span-3 text-right font-mono text-[10px] self-center opacity-40 italic">
                {e.note}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* About & Contact */}
      <footer id="about" className="px-8 pt-32 pb-16">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5 space-y-8">
            <p className="font-display text-3xl leading-snug">
              Elias Thorne is a visual artist based in Copenhagen. His work explores the intersection of man-made structures and the relentless patience of nature.
            </p>
            <div className="pt-8">
              <a
                href="mailto:studio@eliasthorne.com"
                className="text-3xl md:text-4xl font-display underline decoration-foreground/10 underline-offset-8 hover:decoration-accent transition-all break-all"
              >
                studio@eliasthorne.com
              </a>
            </div>
          </div>
          <div className="col-span-12 md:col-start-8 md:col-span-5 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-12 font-mono text-[10px] uppercase tracking-widest leading-loose">
              <div className="space-y-4">
                <p className="text-accent">Represented by</p>
                <p>
                  Galleri Lumina
                  <br />
                  Stockholm, SE
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-accent">Selected Clients</p>
                <p>
                  Kinfolk
                  <br />
                  The Row
                  <br />
                  Arket
                  <br />
                  Phaidon
                </p>
              </div>
            </div>
            <div className="pt-24 flex justify-between items-end border-t border-border mt-12">
              <span className="font-mono text-[10px] opacity-40">
                © 2024 Thorne Studio
              </span>
              <div className="flex gap-6">
                <a href="#" className="font-mono text-[10px] hover:text-accent transition-colors">
                  Instagram
                </a>
                <a href="#" className="font-mono text-[10px] hover:text-accent transition-colors">
                  Archive
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
