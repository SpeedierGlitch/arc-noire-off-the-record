import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { CATALOG_NO, SEASON, formatPrice, getProduct, products } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { useBag } from "@/lib/bag";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found — ARC NOIRE" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    const title = `${p.name} — ${p.sku} / ARC NOIRE`;
    const description = `${p.name}, ${p.colorway}. Side ${p.side}, track ${p.track}. ARC NOIRE ${SEASON}, catalog no. ${CATALOG_NO}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
});

const PANELS = ["fit", "material", "care", "shipping"] as const;

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useBag();
  const [size, setSize] = useState<string | null>(null);
  const [err, setErr] = useState(false);
  const [open, setOpen] = useState<string | null>("fit");

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  const onAdd = () => {
    if (!size) {
      setErr(true);
      return;
    }
    add(product.slug, size);
  };

  return (
    <main className="pb-28 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-2 md:px-6 md:py-12">
        <div className="space-y-3">
          {product.gallery.map((src, i) => (
            <div key={i} className="scanlines aspect-square overflow-hidden border border-border bg-charcoal">
              <img
                src={src}
                alt={`${product.name} view ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                width={1024}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="md:sticky md:top-24 md:self-start">
          <p className="mono-meta text-primary">
            ARC NOIRE · {product.sku} · SIDE {product.side} / TRACK {product.track}
          </p>
          <h1 className="display mt-3 text-4xl md:text-6xl">{product.name}</h1>
          <p className="mono-meta mt-2 text-muted-foreground">
            {product.colorway} · {SEASON} · {CATALOG_NO}
          </p>
          <p className="label-sans mt-4 text-lg">{formatPrice(product.price)}</p>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="mono-meta text-muted-foreground">SELECT SIZE</p>
              {err && !size && <p className="mono-meta text-primary">CHOOSE A SIZE</p>}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSize(s);
                    setErr(false);
                  }}
                  aria-pressed={size === s}
                  className={`label-sans min-w-12 border px-3 py-2 ${size === s ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onAdd}
            className="label-sans mt-6 hidden w-full bg-primary py-4 text-primary-foreground md:block"
          >
            ADD TO BAG — {formatPrice(product.price)}
          </button>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.liner}</p>

          <div className="mt-8 border-t border-border">
            {PANELS.map((k) => (
              <div key={k} className="border-b border-border">
                <button
                  className="label-sans flex w-full items-center justify-between py-3"
                  onClick={() => setOpen(open === k ? null : k)}
                  aria-expanded={open === k}
                >
                  {k === "shipping" ? "SHIPPING + RETURNS" : k.toUpperCase()}
                  <span className="text-primary">{open === k ? "–" : "+"}</span>
                </button>
                {open === k && (
                  <p className="pb-4 text-sm text-muted-foreground">
                    {k === "shipping"
                      ? "Dispatched in 1–2 working days. Delivery 3–7 days. Returns accepted within 14 days, unworn, with the catalog tag attached."
                      : product[k]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="border-t border-border py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="display text-3xl md:text-5xl">FROM THE SAME RELEASE</h2>
            <Link to="/shop" className="label-sans text-primary underline underline-offset-4">
              ALL RECORDS
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* mobile sticky add to bag */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t-2 border-primary bg-background/95 p-3 md:hidden">
        <div className="min-w-0">
          <p className="mono-meta truncate text-muted-foreground">{product.sku}</p>
          <p className="label-sans">{formatPrice(product.price)}</p>
        </div>
        <button
          onClick={onAdd}
          className="label-sans ml-auto flex-1 bg-primary py-3 text-primary-foreground"
        >
          ADD TO BAG
        </button>
      </div>
    </main>
  );
}
