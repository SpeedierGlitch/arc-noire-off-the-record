import { Link } from "@tanstack/react-router";
import { CATALOG_NO, DROP, RELEASE, SEASON } from "@/lib/catalog";

export function Footer() {
  return (
    <footer className="grain border-t-2 border-primary bg-charcoal">
      <div className="grid gap-8 px-4 py-10 md:grid-cols-4 md:px-6">
        <div>
          <p className="label-sans text-base tracking-[0.28em]">ARC NOIRE</p>
          <p className="mono-meta mt-2 text-muted-foreground">
            {RELEASE} · {SEASON}
            <br />
            CATALOG NO. {CATALOG_NO} · {DROP}
          </p>
        </div>
        <div>
          <p className="mono-meta text-primary">INDEX</p>
          <ul className="mt-2 space-y-1">
            {[
              { to: "/shop", l: "SHOP" },
              { to: "/off-the-record", l: "OFF THE RECORD" },
              { to: "/archive", l: "ARCHIVE" },
              { to: "/about", l: "ABOUT" },
            ].map((i) => (
              <li key={i.to}>
                <Link to={i.to} className="label-sans text-muted-foreground hover:text-foreground">
                  {i.l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mono-meta text-primary">SERVICE</p>
          <ul className="mono-meta mt-2 space-y-1 text-muted-foreground">
            <li>SHIPPING 3–7 DAYS</li>
            <li>RETURNS 14 DAYS</li>
            <li>SIZE + FIT ON EACH PAGE</li>
            <li>CONTACT: MAIL@ARCNOIRE.INDEX</li>
          </ul>
        </div>
        <div>
          <p className="mono-meta text-primary">PRESSING INFO</p>
          <p className="mono-meta mt-2 text-muted-foreground">
            SLEEVE 12" × 12" · 4 COLOUR
            <br />
            MASTERED AT NIGHT
            <br />
            ALL RIGHTS OF THE MAKER RESERVED
            <br />
            © {new Date().getFullYear()} ARC NOIRE
          </p>
        </div>
      </div>
      <div className="overflow-hidden border-t border-border bg-primary py-1">
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="mono-meta text-primary-foreground">
              {Array.from({ length: 8 })
                .map(() => `ARC NOIRE · ${CATALOG_NO} · ${RELEASE} · ${SEASON}`)
                .join("   ///   ")}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
