import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import {
  CATALOG_NO,
  DROP,
  RELEASE,
  SEASON,
  bySide,
  editorial,
  formatPrice,
  products,
} from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { useMounted, useReducedMotion } from "@/hooks/use-reduced-motion";

const Sleeve3D = lazy(() => import("@/components/Sleeve3D"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARC NOIRE — OFF THE RECORD / FALL 2026 / AN-001" },
      {
        name: "description",
        content:
          "OFF THE RECORD, ARC NOIRE Fall 2026, drop 001. Six garments pressed as Side A and Side B. Catalog no. AN-001.",
      },
      { property: "og:title", content: "ARC NOIRE — OFF THE RECORD / AN-001" },
      {
        property: "og:description",
        content: "ARC NOIRE Fall 2026. Six garments, two sides, one pressing.",
      },
    ],
  }),
  component: Home,
});

function Hero() {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const show3d = mounted && !reduced;

  return (
    <section className="relative border-b border-border">
      <div className="relative h-[78vh] min-h-[480px] w-full bg-charcoal">
        {show3d ? (
          <Suspense fallback={<StaticArtifact />}>
            <Sleeve3D />
          </Suspense>
        ) : (
          <StaticArtifact />
        )}

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 md:p-8">
          <div className="flex items-start justify-between">
            <p className="mono-meta text-muted-foreground">
              {SEASON}
              <br />
              {DROP}
            </p>
            <p className="mono-meta text-right text-muted-foreground">
              CATALOG NO. {CATALOG_NO}
              <br />
              06 TRACKS / 02 SIDES
            </p>
          </div>

          <div>
            <h1 className="display text-[15vw] leading-[0.82] md:text-[9vw]">
              OFF THE
              <br />
              <span className="text-primary">RECORD</span>
            </h1>
            <div className="pointer-events-auto mt-5 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="label-sans bg-primary px-6 py-3 text-primary-foreground transition-transform hover:-translate-y-[2px]"
              >
                ENTER DROP
              </Link>
              <Link to="/off-the-record" className="label-sans border border-border px-6 py-3">
                LINER NOTES
              </Link>
              <span className="mono-meta text-muted-foreground">DRAG THE SLEEVE TO ROTATE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StaticArtifact() {
  return (
    <div className="scanlines grain flex h-full w-full items-center justify-center bg-charcoal">
      <div className="w-[min(70vw,340px)] border border-border bg-background p-5 shadow-[10px_10px_0_0_var(--primary)]">
        <p className="label-sans">ARC NOIRE</p>
        <p className="mono-meta mt-1 text-muted-foreground">
          {SEASON} / {DROP}
        </p>
        <div className="mt-5 bg-primary px-3 py-6">
          <p className="label-sans text-2xl leading-none text-primary-foreground">
            OFF THE
            <br />
            RECORD
          </p>
        </div>
        <p className="mono-meta mt-5 text-muted-foreground">CATALOG NO. {CATALOG_NO}</p>
      </div>
    </div>
  );
}

function Home() {
  return (
    <main>
      <Hero />

      {/* red interruption */}
      <section className="grain bg-primary py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="mono-meta text-primary-foreground/80">A SIDE / B SIDE — ONE PRESSING</p>
          <p className="display mt-3 text-[13vw] leading-[0.85] text-background md:text-[7vw]">
            ARC NOIRE / {CATALOG_NO} / {SEASON}
          </p>
        </div>
      </section>

      {/* liner notes */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1fr_2fr] md:px-6">
          <p className="mono-meta text-primary">LINER NOTES / 001</p>
          <div className="max-w-2xl">
            <p className="display text-3xl md:text-5xl">
              Six garments, recorded in one winter, pressed without a master copy.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              {RELEASE} is filed as a release, not a season. Every piece carries a track number
              and a catalogue mark. Nothing is repressed. What is documented here was worn,
              photographed under flash, and returned to the archive.
            </p>
            <p className="mono-meta mt-6 text-muted-foreground">
              WRITTEN, CUT AND FILED BY ARC NOIRE · {CATALOG_NO} · {SEASON}
            </p>
          </div>
        </div>
      </section>

      {/* tracklist */}
      <section className="border-b border-border py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="display text-4xl md:text-6xl">TRACKLIST</h2>
            <Link to="/shop" className="label-sans text-primary underline underline-offset-4">
              VIEW FULL CATALOG
            </Link>
          </div>

          {(["A", "B"] as const).map((side) => (
            <div key={side} className="mt-12">
              <div className="flex items-center gap-4">
                <span className="label-sans bg-primary px-2 py-1 text-primary-foreground">
                  SIDE {side}
                </span>
                <span className="rule-crude h-px flex-1" />
                <span className="mono-meta text-muted-foreground">03 TRACKS</span>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {bySide(side).map((p, i) => (
                  <ProductCard key={p.slug} product={p} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* contact sheet */}
      <section className="border-b border-border bg-charcoal py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="display text-4xl md:text-6xl">CONTACT SHEET</h2>
            <p className="mono-meta text-muted-foreground">
              CAMPAIGN PLATES · 4:3 · FLASH · {CATALOG_NO}
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {editorial.map((e, i) => (
              <figure key={e.caption} className="scanlines border border-border">
                <div className="aspect-[4/3] overflow-hidden bg-background">
                  <img
                    src={e.src}
                    alt={e.caption}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover grayscale-[35%] contrast-125"
                  />
                </div>
                <figcaption className="mono-meta border-t border-border px-2 py-1 text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} — {e.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* campaign film placeholder */}
      <section className="border-b border-border py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="mono-meta text-primary">CAMPAIGN FILM / AN-001</p>
          <div className="mt-4 grid gap-4 md:grid-cols-[2fr_1fr]">
            <div className="scanlines flex aspect-video items-center justify-center border border-border bg-charcoal">
              <p className="mono-meta text-muted-foreground">
                REEL 01 — AWAITING TRANSFER (16:9 SLOT)
              </p>
            </div>
            <div className="scanlines flex aspect-[3/4] items-center justify-center border border-border bg-charcoal">
              <p className="mono-meta text-muted-foreground">REEL 02 — VERTICAL SLOT</p>
            </div>
          </div>
        </div>
      </section>

      {/* zine spread */}
      <section className="grain border-b border-border bg-paper py-14 text-paper-foreground md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="-rotate-1 border-2 border-paper-foreground bg-paper p-5">
              <p className="mono-meta">PHOTOCOPY / PAGE 01</p>
              <p className="display mt-3 text-4xl">NO MASTER COPY</p>
              <p className="mt-3 text-sm">
                Cut, taped, run through the machine twice. What degrades stays.
              </p>
            </div>
            <div className="rotate-[0.6deg] border-2 border-primary bg-paper p-5">
              <p className="display text-5xl text-primary">SIDE A</p>
              <p className="mono-meta mt-2">A1 / A2 / A3</p>
              <p className="display mt-6 text-5xl text-primary">SIDE B</p>
              <p className="mono-meta mt-2">B1 / B2 / B3</p>
            </div>
            <div className="-rotate-[1.4deg] bg-primary p-5">
              <p className="display text-4xl text-background">OFF THE RECORD</p>
              <p className="mono-meta mt-3 text-background">
                {CATALOG_NO} · {SEASON} · PRESSED ONCE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* archive teaser */}
      <section className="border-b border-border py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="display text-4xl md:text-6xl">THE CRATE</h2>
            <Link to="/archive" className="label-sans text-primary underline underline-offset-4">
              OPEN ARCHIVE
            </Link>
          </div>
          <div className="mt-8 grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {["AN-000 / TEST PRESS", "AN-00A / STUDY", "AN-00B / OFFCUTS", "AN-001 / CURRENT"].map(
              (t, i) => (
                <div
                  key={t}
                  className={`tilt-hover border border-border p-4 ${i === 3 ? "bg-primary text-primary-foreground" : "bg-card"}`}
                >
                  <p className="mono-meta">{t}</p>
                  <p className="display mt-8 text-2xl">
                    {i === 3 ? "IN PRESS" : "FILED"}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* signup */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <div className="grain -rotate-[0.6deg] border-2 border-background bg-primary p-6">
            <p className="mono-meta text-primary-foreground/80">CATALOG INSERT — CUT HERE</p>
            <h2 className="display mt-2 text-4xl text-background">
              JOIN THE MAILING LIST
            </h2>
            <form
              className="mt-5 flex flex-col gap-2 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="EMAIL ADDRESS"
                className="mono-meta flex-1 border border-background bg-background px-3 py-3 text-foreground placeholder:text-muted-foreground"
              />
              <button className="label-sans border border-background bg-background px-6 py-3 text-foreground">
                SUBMIT
              </button>
            </form>
            <p className="mono-meta mt-3 text-primary-foreground/80">
              DROP NOTICES ONLY. NO NOISE.
            </p>
          </div>
        </div>
      </section>

      <section className="sr-only">
        <h2>Full lineup</h2>
        <ul>
          {products.map((p) => (
            <li key={p.slug}>
              {p.sku} {p.name} {formatPrice(p.price)}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
