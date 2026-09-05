import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { CATALOG_NO, SEASON } from "@/lib/catalog";
import { useBag } from "@/lib/bag";

const NAV = [
  { to: "/shop", label: "SHOP" },
  { to: "/off-the-record", label: "OFF THE RECORD" },
  { to: "/archive", label: "ARCHIVE" },
  { to: "/about", label: "ABOUT" },
] as const;

export function Header() {
  const { count, setOpen } = useBag();
  const [menu, setMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-[2px]">
      <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex items-baseline gap-4">
          <Link to="/" className="label-sans text-base tracking-[0.28em] hover:text-primary">
            ARC NOIRE
          </Link>
          <span className="mono-meta hidden text-muted-foreground lg:inline">
            {CATALOG_NO} / {SEASON}
          </span>
        </div>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="label-sans text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground underline decoration-primary decoration-2 underline-offset-4" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/shop" className="label-sans hidden text-muted-foreground hover:text-foreground sm:inline">
            SEARCH
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="label-sans border border-primary px-2 py-1 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label={`Open bag, ${count} items`}
          >
            BAG ({count})
          </button>
          <button
            className="label-sans md:hidden"
            onClick={() => setMenu((v) => !v)}
            aria-expanded={menu}
            aria-label="Toggle menu"
          >
            {menu ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {menu && (
        <nav className="border-t border-border md:hidden" aria-label="Mobile">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setMenu(false)}
              className="label-sans block border-b border-border px-4 py-3"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
