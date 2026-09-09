import { useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";
import { formatMoney } from "@/lib/shopify";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { items, isOpen, setOpen, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } =
    useCartStore();

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "USD";

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
      setOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-background/80"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className="relative flex h-full w-full max-w-md flex-col border-l border-border bg-background"
        role="dialog"
        aria-label="Bag"
      >
        <div className="flex items-center justify-between border-b border-border p-5">
          <p className="mono-meta text-primary">BAG [{totalItems}]</p>
          <Button variant="ghost" onClick={() => setOpen(false)} className="mono-meta" aria-label="Close bag">
            CLOSE ✕
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center p-8">
            <p className="mono-meta text-muted-foreground">NOTHING FILED YET.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4 border-b border-border p-5">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden border border-border bg-charcoal">
                    {item.product.node.images?.edges?.[0]?.node && (
                      <img
                        src={item.product.node.images.edges[0].node.url}
                        alt={item.product.node.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="label-sans truncate text-sm">{item.product.node.title}</p>
                    <p className="mono-meta mt-1 text-muted-foreground">
                      {item.selectedOptions.map((o) => o.value).join(" · ")}
                    </p>
                    <p className="mono-meta mt-2">{formatMoney(item.price.amount, item.price.currencyCode)}</p>
                    <div className="mt-3 flex items-center gap-px bg-border">
                      <Button
                        variant="ghost"
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="mono-meta bg-background px-3 py-1"
                        aria-label="Decrease quantity"
                      >
                        −
                      </Button>
                      <span className="mono-meta bg-background px-3 py-1">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="mono-meta bg-background px-3 py-1"
                        aria-label="Increase quantity"
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => removeItem(item.variantId)}
                        className="mono-meta bg-background px-3 py-1 text-muted-foreground hover:text-primary"
                        aria-label="Remove item"
                      >
                        REMOVE
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border p-5">
              <div className="flex items-baseline justify-between">
                <span className="mono-meta text-muted-foreground">SUBTOTAL</span>
                <span className="label-sans text-lg">{formatMoney(String(total), currency)}</span>
              </div>
              <Button
                variant="ghost"
                onClick={handleCheckout}
                disabled={isLoading || isSyncing}
                className="label-sans mt-4 w-full bg-primary py-4 text-primary-foreground hover:bg-foreground hover:text-background"
              >
                {isLoading || isSyncing ? "WORKING…" : "CHECKOUT ↗"}
              </Button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
