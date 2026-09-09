import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CATALOG_NO, SEASON } from "@/lib/catalog";
import { fetchProductByHandle, formatMoney, trackFor } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { RecordButton } from "@/components/RecordButton";

export const Route = createFileRoute("/product/$handle")({
  head: ({ params }) => {
    const name = params.handle.replace(/-/g, " ").toUpperCase();
    return {
      meta: [
        { title: `${name} — ARC NOIRE / ${CATALOG_NO}` },
        { name: "description", content: `${name} from ARC NOIRE OFF THE RECORD, catalog ${CATALOG_NO}.` },
        { property: "og:title", content: `${name} — ARC NOIRE` },
        { property: "og:description", content: `${name} from ARC NOIRE, catalog ${CATALOG_NO}.` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product, isPending } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
  });

  const addItem = useCartStore((s) => s.addItem);
  const setOpen = useCartStore((s) => s.setOpen);
  const isLoading = useCartStore((s) => s.isLoading);
  const count = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  const [variantId, setVariantId] = useState("");
  const variants = product?.node.variants.edges.map((e) => e.node) ?? [];
  const selectedVariant = variants.find((v) => v.id === variantId) ?? variants[0];
  const images = product?.node.images.edges.map((e) => e.node) ?? [];
  const spec = product ? trackFor(product.node.title) : undefined;

  useEffect(() => {
    if (!product) return;
    const firstAvailable = product.node.variants.edges.find((e) => e.node.availableForSale)?.node;
    setVariantId(firstAvailable?.id ?? product.node.variants.edges[0]?.node.id ?? "");
  }, [product]);

  const handleAdd = async () => {
    if (!product || !selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions ?? [],
    });
    setOpen(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border p-4 md:p-6">
        <div className="flex items-center gap-3">
          <RecordButton />
          <Link to="/" className="label-sans text-lg tracking-[0.08em]">ARC NOIRE</Link>
        </div>
        <nav className="flex items-center gap-5" aria-label="Main">
          <Link to="/archive" className="mono-meta text-muted-foreground hover:text-foreground">ARCHIVE</Link>
          <Button variant="ghost" onClick={() => setOpen(true)} className="mono-meta hover:text-primary" aria-label={`Open bag, ${count} items`}>
            BAG [{count}]
          </Button>
        </nav>
      </header>

      {isPending && <p className="mono-meta p-8 text-muted-foreground">LOADING…</p>}

      {!isPending && !product && (
        <div className="p-8">
          <p className="mono-meta text-primary">ERR / NO PRESSING FOUND</p>
          <Link to="/" className="label-sans mt-6 inline-block bg-primary px-4 py-2 text-primary-foreground">BACK TO {CATALOG_NO}</Link>
        </div>
      )}

      {product && selectedVariant && (
        <div className="grid md:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="bg-charcoal p-4 md:p-10">
            <div className="grid gap-4">
              {images.map((img, i) => (
                <img
                  key={img.url}
                  src={img.url}
                  alt={img.altText ?? product.node.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="w-full border border-border object-cover"
                />
              ))}
            </div>
          </div>

          <aside className="border-t border-border p-5 md:border-l md:border-t-0 md:p-8">
            <p className="mono-meta text-primary">
              {CATALOG_NO}{spec ? `-${spec.track}` : ""} / {SEASON}
            </p>
            <h1 className="label-sans mt-2 text-2xl leading-tight">{product.node.title}</h1>
            <p className="label-sans mt-4 text-lg">
              {formatMoney(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
            </p>

            <div className="mt-6 flex flex-wrap gap-px bg-border" aria-label="Select option">
              {variants.map((variant) => (
                <Button
                  variant="ghost"
                  key={variant.id}
                  onClick={() => setVariantId(variant.id)}
                  disabled={!variant.availableForSale}
                  className={`min-w-12 flex-1 bg-background px-3 py-3 mono-meta ${variant.id === selectedVariant.id ? "bg-foreground text-background" : "hover:bg-muted"} ${variant.availableForSale ? "" : "opacity-30 line-through"}`}
                  aria-pressed={variant.id === selectedVariant.id}
                >
                  {variant.title}
                </Button>
              ))}
            </div>

            <Button
              variant="ghost"
              onClick={handleAdd}
              disabled={isLoading || !selectedVariant.availableForSale}
              className="label-sans mt-px w-full bg-primary py-4 text-primary-foreground hover:bg-foreground hover:text-background"
            >
              {isLoading ? "ADDING…" : selectedVariant.availableForSale ? "ADD TO BAG" : "SOLD OUT"}
            </Button>

            {product.node.description && (
              <p className="mt-8 whitespace-pre-line text-xs leading-relaxed text-muted-foreground">
                {product.node.description}
              </p>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
