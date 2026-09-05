import { Link } from "@tanstack/react-router";
import { useBag } from "@/lib/bag";
import { formatPrice } from "@/lib/catalog";

export function BagDrawer() {
  const { open, setOpen, lines, subtotal, setQty, remove, productFor, count } = useBag();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        className="absolute inset-0 bg-background/80"
        onClick={() => setOpen(false)}
        aria-label="Close bag"
      />
      <aside className="relative flex h-full w-full max-w-md flex-col border-l-2 border-primary bg-card">
        <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3">
          <p className="label-sans text-primary-foreground">BAG ({count})</p>
          <button onClick={() => setOpen(false)} className="label-sans text-primary-foreground">
            CLOSE
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {lines.length === 0 && (
            <p className="mono-meta p-6 text-muted-foreground">
              NOTHING SELECTED. SIDE A AND SIDE B ARE OPEN.
            </p>
          )}
          {lines.map((l) => {
            const p = productFor(l.slug);
            if (!p) return null;
            return (
              <div key={`${l.slug}-${l.size}`} className="flex gap-3 border-b border-border p-4">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-20 w-20 border border-border object-cover"
                />
                <div className="flex-1">
                  <p className="mono-meta text-primary">
                    {p.side}{p.track.slice(1)} · {p.sku}
                  </p>
                  <p className="label-sans mt-1">{p.name}</p>
                  <p className="mono-meta mt-1 text-muted-foreground">SIZE {l.size}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      className="label-sans h-6 w-6 border border-border"
                      onClick={() => setQty(l.slug, l.size, l.qty - 1)}
                      aria-label="Decrease quantity"
                    >
                      –
                    </button>
                    <span className="mono-meta w-6 text-center">{l.qty}</span>
                    <button
                      className="label-sans h-6 w-6 border border-border"
                      onClick={() => setQty(l.slug, l.size, l.qty + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <button
                      className="mono-meta ml-auto text-muted-foreground underline hover:text-primary"
                      onClick={() => remove(l.slug, l.size)}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
                <p className="mono-meta">{formatPrice(p.price * l.qty)}</p>
              </div>
            );
          })}
        </div>

        <div className="border-t-2 border-primary p-4">
          <div className="flex justify-between">
            <span className="label-sans">SUBTOTAL</span>
            <span className="label-sans">{formatPrice(subtotal)}</span>
          </div>
          <p className="mono-meta mt-1 text-muted-foreground">
            TAX AND SHIPPING CALCULATED AT CHECKOUT
          </p>
          <button
            disabled={lines.length === 0}
            className="label-sans mt-4 w-full bg-primary py-3 text-primary-foreground disabled:opacity-40"
          >
            CHECKOUT
          </button>
          <Link
            to="/shop"
            onClick={() => setOpen(false)}
            className="label-sans mt-2 block w-full border border-border py-3 text-center"
          >
            KEEP LOOKING
          </Link>
        </div>
      </aside>
    </div>
  );
}
