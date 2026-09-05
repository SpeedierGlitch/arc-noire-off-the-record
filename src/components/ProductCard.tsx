import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/catalog";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="tilt-hover group block border border-border bg-card"
    >
      <div className="scanlines relative aspect-square overflow-hidden bg-charcoal">
        <img
          src={product.image}
          alt={`${product.name} — ${product.colorway}`}
          loading={index < 2 ? "eager" : "lazy"}
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-[filter] duration-150 group-hover:contrast-125 group-hover:saturate-50"
        />
        <span className="mono-meta absolute left-0 top-0 bg-primary px-2 py-1 text-primary-foreground">
          {product.track}
        </span>
        <span className="mono-meta absolute bottom-0 right-0 bg-background/85 px-2 py-1 text-muted-foreground">
          {product.sku}
        </span>
      </div>
      <div className="flex items-start justify-between gap-3 border-t border-border p-3">
        <div>
          <p className="mono-meta text-muted-foreground">
            SIDE {product.side} · TRACK {product.track.slice(1).padStart(2, "0")}
          </p>
          <h3 className="label-sans mt-1 group-hover:underline group-hover:decoration-primary group-hover:decoration-2 group-hover:underline-offset-4">
            {product.name}
          </h3>
          <p className="mono-meta mt-1 text-muted-foreground">{product.colorway}</p>
        </div>
        <p className="mono-meta whitespace-nowrap">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
