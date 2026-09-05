import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CATALOG_NO, SEASON, products, type Category, type Side } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "SHOP — ARC NOIRE / AN-001 CATALOG" },
      {
        name: "description",
        content:
          "The full OFF THE RECORD catalog: six garments filed as Side A and Side B, with catalog numbers, sizes and prices.",
      },
      { property: "og:title", content: "SHOP — ARC NOIRE / AN-001" },
      {
        property: "og:description",
        content: "Six garments from ARC NOIRE Fall 2026, filed by catalog number.",
      },
    ],
  }),
  component: Shop,
});

const CATS: Array<Category | "ALL"> = ["ALL", "OUTERWEAR", "TOPS", "BOTTOMS"];
const SIDES: Array<Side | "ALL"> = ["ALL", "A", "B"];

function Shop() {
  const [cat, setCat] = useState<Category | "ALL">("ALL");
  const [side, setSide] = useState<Side | "ALL">("ALL");

  const list = useMemo(
    () =>
      products.filter(
        (p) => (cat === "ALL" || p.category === cat) && (side === "ALL" || p.side === side),
      ),
    [cat, side],
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <p className="mono-meta text-primary">
        CATALOG NO. {CATALOG_NO} · {SEASON}
      </p>
      <h1 className="display mt-2 text-5xl md:text-7xl">THE CATALOG</h1>

      <div className="mt-8 flex flex-wrap items-center gap-2 border-y border-border py-3">
        <span className="mono-meta mr-2 text-muted-foreground">FILE BY</span>
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`label-sans border px-3 py-1 ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}
          >
            {c}
          </button>
        ))}
        <span className="mono-meta ml-4 mr-2 text-muted-foreground">SIDE</span>
        {SIDES.map((s) => (
          <button
            key={s}
            onClick={() => setSide(s)}
            className={`label-sans border px-3 py-1 ${side === s ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}
          >
            {s}
          </button>
        ))}
        <span className="mono-meta ml-auto text-muted-foreground">
          {String(list.length).padStart(2, "0")} ITEMS
        </span>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
      {list.length === 0 && (
        <p className="mono-meta mt-10 text-muted-foreground">NO RECORDS MATCH THAT FILING.</p>
      )}
    </main>
  );
}
