import { createFileRoute } from "@tanstack/react-router";
import { CATALOG_NO, SEASON } from "@/lib/catalog";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "ABOUT — ARC NOIRE" },
      {
        name: "description",
        content:
          "ARC NOIRE is a clothing label run like a record label: numbered pressings, liner notes and no repressings.",
      },
      { property: "og:title", content: "ABOUT — ARC NOIRE" },
      {
        property: "og:description",
        content: "A clothing label run like a record label. Numbered pressings, no repressings.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-20">
      <p className="mono-meta text-primary">INFORMATION SHEET</p>
      <h1 className="display mt-2 text-5xl md:text-7xl">ARC NOIRE</h1>

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
        <p className="display text-3xl text-foreground md:text-4xl">
          A clothing label operated as a record label.
        </p>
        <p>
          Every release is given a catalogue number, a running order and liner notes. Garments are
          tracks. Seasons are pressings. {CATALOG_NO} — OFF THE RECORD — is the current release for{" "}
          {SEASON}.
        </p>
        <p>
          Production is small and deliberate. Pieces are made once, documented under flash, and
          filed. We do not repress, and we do not manufacture urgency: when a size is gone, it is
          simply gone.
        </p>
      </div>

      <dl className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
        {[
          ["FOUNDED", "2025"],
          ["CURRENT RELEASE", `${CATALOG_NO} — OFF THE RECORD`],
          ["PRODUCTION", "SMALL RUN, NO REPRESSING"],
          ["CONTACT", "MAIL@ARCNOIRE.INDEX"],
        ].map(([k, v]) => (
          <div key={k} className="bg-background p-5">
            <dt className="mono-meta text-primary">{k}</dt>
            <dd className="label-sans mt-2">{v}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
