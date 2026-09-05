import { createFileRoute, Link } from "@tanstack/react-router";
import { CATALOG_NO, DROP, SEASON, editorial, products } from "@/lib/catalog";

export const Route = createFileRoute("/off-the-record")({
  head: () => ({
    meta: [
      { title: "OFF THE RECORD — LINER NOTES / AN-001" },
      {
        name: "description",
        content:
          "Liner notes for OFF THE RECORD, ARC NOIRE Fall 2026: tracklist, campaign plates and pressing information for catalog no. AN-001.",
      },
      { property: "og:title", content: "OFF THE RECORD — LINER NOTES / AN-001" },
      {
        property: "og:description",
        content: "Liner notes and tracklist for ARC NOIRE catalog no. AN-001.",
      },
    ],
  }),
  component: Release,
});

function Release() {
  return (
    <main>
      <section className="grain border-b border-border bg-primary py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="mono-meta text-primary-foreground/80">
            {DROP} · {CATALOG_NO} · {SEASON}
          </p>
          <h1 className="display mt-3 text-[14vw] leading-[0.85] text-background md:text-[8vw]">
            OFF THE RECORD
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <p className="mono-meta text-primary">LINER NOTES</p>
          <div className="space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p className="display text-3xl text-foreground md:text-4xl">
              Filed at night. Documented under flash. Returned to the crate.
            </p>
            <p>
              AN-001 was assembled the way a record is assembled: a running order first, garments
              second. Side A is weight and colour. Side B is structure and wear.
            </p>
            <p>
              Nothing here is limited by theatre. It is limited because it was pressed once.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-8">
          <h2 className="display text-4xl md:text-6xl">RUNNING ORDER</h2>
          <ul className="mt-6">
            {products.map((p) => (
              <li key={p.slug} className="border-b border-border">
                <Link
                  to="/product/$slug"
                  params={{ slug: p.slug }}
                  className="group flex flex-wrap items-baseline gap-3 py-4"
                >
                  <span className="mono-meta w-8 text-primary">{p.track}</span>
                  <span className="label-sans group-hover:underline group-hover:decoration-primary group-hover:decoration-2 group-hover:underline-offset-4">
                    {p.name}
                  </span>
                  <span className="mono-meta text-muted-foreground">{p.colorway}</span>
                  <span className="mono-meta ml-auto text-muted-foreground">{p.sku}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <h2 className="display text-4xl md:text-6xl">PLATES</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {editorial.map((e) => (
              <figure key={e.caption} className="scanlines border border-border">
                <div className="aspect-[4/3] overflow-hidden bg-charcoal">
                  <img
                    src={e.src}
                    alt={e.caption}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover contrast-125 grayscale-[30%]"
                  />
                </div>
                <figcaption className="mono-meta border-t border-border px-2 py-1 text-muted-foreground">
                  {e.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
