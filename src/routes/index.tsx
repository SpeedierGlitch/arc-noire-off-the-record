import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { CATALOG_NO, DROP, RELEASE, SEASON, formatPrice, products } from "@/lib/catalog";
import { useBag } from "@/lib/bag";
import { Button } from "@/components/ui/button";
import { useMounted, useReducedMotion } from "@/hooks/use-reduced-motion";

const Sleeve3D = lazy(() => import("@/components/Sleeve3D"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARC NOIRE — OFF THE RECORD / AN-001" },
      { name: "description", content: "ARC NOIRE Fall 2026. Shop OFF THE RECORD, catalog AN-001." },
      { property: "og:title", content: "ARC NOIRE — OFF THE RECORD / AN-001" },
      { property: "og:description", content: "Six garments. Two sides. One pressing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Storefront,
});

function Storefront() {
  const { add, count, setOpen } = useBag();
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(products[0]?.sizes[0] ?? "");
  const [details, setDetails] = useState(false);
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();
  const product = products[active];

  const move = useCallback((step: number) => {
    setActive((current) => (current + step + products.length) % products.length);
  }, []);

  useEffect(() => {
    if (!product) return;
    setSize(product.sizes[0] ?? "");
    setDetails(false);
  }, [product]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  if (!product) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative min-h-[100svh] overflow-hidden">
        <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between p-4 md:p-8">
          <div className="pointer-events-auto">
            <h1 className="label-sans text-lg tracking-[0.08em]">ARC NOIRE</h1>
            <p className="mono-meta mt-1 text-muted-foreground">{CATALOG_NO} / {SEASON}</p>
          </div>
          <nav className="pointer-events-auto flex items-center gap-5" aria-label="Main">
            <Link to="/archive" className="mono-meta text-muted-foreground hover:text-foreground">ARCHIVE</Link>
            <a href="#information" className="mono-meta text-muted-foreground hover:text-foreground">INFO</a>
            <Button variant="ghost" onClick={() => setOpen(true)} className="mono-meta hover:text-primary" aria-label={`Open bag, ${count} items`}>
              BAG [{count}]
            </Button>
          </nav>
        </header>

        <div className="grid min-h-[100svh] grid-rows-[1fr_auto] md:grid-cols-[minmax(0,1fr)_22rem] md:grid-rows-1">
          <div className="relative flex min-h-[56svh] items-center justify-center overflow-hidden bg-charcoal px-5 pb-16 pt-24 md:min-h-screen md:px-16 md:py-24">
            <Link
              to="/product/$slug"
              params={{ slug: product.slug }}
              className="group relative block h-auto w-full max-w-[36rem] border border-border bg-background p-2 md:max-h-[70vh] md:w-auto md:p-3"
              aria-label={`View ${product.name} details`}
            >
              <img key={product.slug} src={product.image} alt={`${product.name} — ${product.colorway}`} className="carousel-image aspect-square h-auto max-h-[66vh] w-full object-cover transition-[filter] group-hover:contrast-125" width={1024} height={1024} />
              <span className="mono-meta absolute bottom-5 right-5 bg-background px-2 py-1 text-foreground">VIEW ITEM ↗</span>
            </Link>
            <p className="mono-meta absolute bottom-5 left-5 text-foreground/70 md:bottom-8 md:left-8">
              SIDE {product.side} / TRACK {product.track} · {String(active + 1).padStart(2, "0")}/{String(products.length).padStart(2, "0")}
            </p>
            <div className="absolute inset-y-0 left-4 z-20 hidden flex-col justify-center gap-3 md:flex">
              {products.map((item, index) => (
                <Button variant="ghost" key={item.slug} onClick={() => setActive(index)} className={`h-px transition-all ${index === active ? "w-10 bg-foreground" : "w-4 bg-foreground/30 hover:w-7"}`} aria-label={`View ${item.name}`} aria-current={index === active ? "true" : undefined} />
              ))}
            </div>
            <div className="absolute bottom-4 right-4 z-20 flex border border-border bg-background md:bottom-8 md:right-8">
              <Button variant="ghost" size="icon" onClick={() => move(-1)} className="border-r border-border" aria-label="Previous product">⏮</Button>
              <Button variant="ghost" size="icon" onClick={() => move(1)} aria-label="Next product">⏭</Button>
            </div>
          </div>

          <aside className="relative z-20 flex flex-col justify-end border-t border-border bg-background p-4 md:border-l md:border-t-0 md:p-8">
            <div className="mb-auto hidden pt-20 md:block">
              <p className="mono-meta text-muted-foreground">{DROP} / {RELEASE}</p>
            </div>
            <div>
              <p className="mono-meta text-primary">{product.sku}</p>
              <h2 className="label-sans mt-2 text-xl leading-tight tracking-[0.04em]">{product.name}</h2>
              <p className="mono-meta mt-2 text-muted-foreground">{product.colorway} · {product.material}</p>
              <p className="label-sans mt-5 text-lg">{formatPrice(product.price)}</p>

              <div className="mt-6 flex flex-wrap gap-px bg-border" aria-label="Select size">
                {product.sizes.map((item) => (
                  <Button variant="ghost" key={item} onClick={() => setSize(item)} className={`min-w-12 flex-1 bg-background px-3 py-3 text-center mono-meta ${size === item ? "bg-foreground text-background" : "hover:bg-muted"}`} aria-pressed={size === item}>{item}</Button>
                ))}
              </div>
              <Button variant="ghost" onClick={() => add(product.slug, size)} className="label-sans mt-px w-full bg-primary py-4 text-primary-foreground hover:bg-foreground hover:text-background">
                ADD TO BAG — {size}
              </Button>
              <Button variant="ghost" onClick={() => setDetails((value) => !value)} className="mono-meta flex w-full items-center justify-between border-b border-border py-4 text-muted-foreground" aria-expanded={details}>
                DETAILS + FIT <span>{details ? "−" : "+"}</span>
              </Button>
              {details && <p className="pt-4 text-xs leading-relaxed text-muted-foreground">{product.liner}<br /><br />{product.fit}</p>}
            </div>
          </aside>
        </div>
      </section>

      <section className="grid min-h-[70svh] border-t border-border md:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="relative min-h-[32rem] bg-charcoal">
          {mounted && !reducedMotion ? (
            <Suspense fallback={<SleeveFallback />}>
              <Sleeve3D />
            </Suspense>
          ) : (
            <SleeveFallback />
          )}
          <p className="mono-meta pointer-events-none absolute bottom-5 left-5 text-muted-foreground md:bottom-8 md:left-8">DRAG TO ROTATE / 3D RECORD SLEEVE</p>
        </div>
        <div className="flex flex-col justify-between border-t border-border p-5 md:border-l md:border-t-0 md:p-8">
          <p className="mono-meta text-primary">PHYSICAL EDITION / {CATALOG_NO}</p>
          <div className="mt-16">
            <h2 className="label-sans text-2xl leading-tight">OFF THE RECORD</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Rotate the original record sleeve. The physical edition is filed under {CATALOG_NO}.</p>
          </div>
        </div>
      </section>

      <section id="information" className="border-t border-border px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <p className="mono-meta text-primary">INFORMATION / {CATALOG_NO}</p>
          <div className="max-w-2xl">
            <h2 className="label-sans text-2xl leading-tight md:text-4xl">A clothing label operated like a record label.</h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">Six garments. Two sides. One pressing. Every piece carries a track number and catalogue mark. Nothing is repressed.</p>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 mono-meta text-muted-foreground">
              <Link to="/about" className="hover:text-foreground">ABOUT + SERVICE</Link>
              <Link to="/archive" className="hover:text-foreground">ARCHIVE</Link>
              <a href="mailto:MAIL@ARCNOIRE.INDEX" className="hover:text-foreground">CONTACT</a>
              <span>© 2026 ARC NOIRE</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SleeveFallback() {
  return (
    <div className="flex h-full min-h-[32rem] items-center justify-center p-8">
      <div className="aspect-square w-full max-w-sm border border-border bg-background p-6 shadow-[12px_12px_0_0_var(--primary)]">
        <p className="label-sans">ARC NOIRE</p>
        <div className="mt-12 bg-primary p-5 text-primary-foreground">
          <p className="label-sans text-xl">OFF THE RECORD</p>
        </div>
        <p className="mono-meta mt-12 text-muted-foreground">{SEASON} / {CATALOG_NO}</p>
      </div>
    </div>
  );
}
