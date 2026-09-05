import { createFileRoute, Link } from "@tanstack/react-router";
import { CATALOG_NO } from "@/lib/catalog";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: "ARCHIVE — ARC NOIRE PRESSINGS" },
      {
        name: "description",
        content:
          "The ARC NOIRE archive: earlier pressings, test prints and offcuts filed alongside catalog no. AN-001.",
      },
      { property: "og:title", content: "ARCHIVE — ARC NOIRE PRESSINGS" },
      {
        property: "og:description",
        content: "Earlier ARC NOIRE pressings, test prints and offcuts.",
      },
    ],
  }),
  component: Archive,
});

const CRATE = [
  { no: "AN-000", title: "TEST PRESS", year: "2025", note: "FOUR PIECES. NEVER SOLD." },
  { no: "AN-00A", title: "STUDY / GREY", year: "2025", note: "PATTERN WORK, INTERNAL." },
  { no: "AN-00B", title: "OFFCUTS", year: "2026", note: "SALVAGED MATERIAL, ONE RUN." },
  { no: "AN-001", title: "OFF THE RECORD", year: "2026", note: "CURRENT PRESSING.", live: true },
];

function Archive() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <p className="mono-meta text-primary">CRATE INDEX</p>
      <h1 className="display mt-2 text-5xl md:text-7xl">ARCHIVE</h1>
      <p className="mono-meta mt-3 max-w-xl text-muted-foreground">
        EVERYTHING FILED UNDER ARC NOIRE. ONLY {CATALOG_NO} IS CURRENTLY AVAILABLE.
      </p>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {CRATE.map((c) => (
          <article
            key={c.no}
            className={`tilt-hover border p-5 ${c.live ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}
          >
            <div className="flex items-baseline justify-between">
              <p className="mono-meta">{c.no}</p>
              <p className="mono-meta">{c.year}</p>
            </div>
            <h2 className="display mt-6 text-3xl">{c.title}</h2>
            <p className="mono-meta mt-3 opacity-80">{c.note}</p>
            {c.live ? (
              <Link
                to="/shop"
                className="label-sans mt-6 inline-block border border-background px-4 py-2"
              >
                SHOP AN-001
              </Link>
            ) : (
              <p className="mono-meta mt-6 text-muted-foreground">ARCHIVED — NOT FOR SALE</p>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
