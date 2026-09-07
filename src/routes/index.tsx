import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { CATALOG_NO, DROP, RELEASE, SEASON, formatPrice, products } from "@/lib/catalog";
import { useBag } from "@/lib/bag";
import { Button } from "@/components/ui/button";

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
        <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between p-4 md:p-8">
          <div>
            <h1 className="label-sans text-lg tracking-[0.08em]">ARC NOIRE</h1>
            <p className="mono-meta mt-1 text-muted-foreground">{CATALOG_NO} / {SEASON}</p>
          </div>
          <nav className="flex items-center gap-5" aria-label="Main">
            <a href="#information" className="mono-meta text-muted-foreground hover:text-foreground">INFO</a>
            <Button variant="ghost" onClick={() => setOpen(true)} className="mono-meta hover:text-primary" aria-label={`Open bag, ${count} items`}>
              BAG [{count}]
            </Button>
          </nav>
        </header>

        <div className="grid min-h-[100svh] grid-rows-[1fr_auto] md:grid-cols-[minmax(0,1fr)_22rem] md:grid-rows-1">
          <div className="relative min-h-[62svh] overflow-hidden bg-charcoal md:min-h-screen">
            <img key={product.slug} src={product.image} alt={`${product.name} — ${product.colorway}`} className="carousel-image h-full w-full object-cover" width={1024} height={1024} />
            <div className="absolute inset-0 bg-background/10" />
            <p className="mono-meta absolute bottom-4 left-4 text-foreground/70 md:bottom-8 md:left-8">
              SIDE {product.side} / TRACK {product.track} · {String(active + 1).padStart(2, "0")}/{String(products.length).padStart(2, "0")}
            </p>
            <div className="absolute inset-y-0 left-4 z-20 hidden flex-col justify-center gap-3 md:flex">
              {products.map((item, index) => (
                <Button variant="ghost" key={item.slug} onClick={() => setActive(index)} className={`h-px transition-all ${index === active ? "w-10 bg-foreground" : "w-4 bg-foreground/30 hover:w-7"}`} aria-label={`View ${item.name}`} aria-current={index === active ? "true" : undefined} />
              ))}
            </div>
            <Button variant="ghost" onClick={() => move(-1)} className="absolute inset-y-20 left-0 z-10 w-1/3 cursor-w-resize" aria-label="Previous product" />
            <Button variant="ghost" onClick={() => move(1)} className="absolute inset-y-20 right-0 z-10 w-1/3 cursor-e-resize" aria-label="Next product" />
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

      <section id="information" className="border-t border-border px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <p className="mono-meta text-primary">INFORMATION / {CATALOG_NO}</p>
          <div className="max-w-2xl">
            <h2 className="label-sans text-2xl leading-tight md:text-4xl">A clothing label operated like a record label.</h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">Six garments. Two sides. One pressing. Every piece carries a track number and catalogue mark. Nothing is repressed.</p>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 mono-meta text-muted-foreground">
              <Link to="/about" className="hover:text-foreground">ABOUT + SERVICE</Link>
              <a href="mailto:MAIL@ARCNOIRE.INDEX" className="hover:text-foreground">CONTACT</a>
              <span>© 2026 ARC NOIRE</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
