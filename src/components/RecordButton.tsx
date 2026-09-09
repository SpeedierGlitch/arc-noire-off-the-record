import { Link } from "@tanstack/react-router";

/** Small vinyl record that links back to the homepage. */
export function RecordButton({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="ARC NOIRE — back to the homepage"
      className={`group relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-charcoal ${className}`}
    >
      <span className="absolute inset-1 rounded-full border border-foreground/20" />
      <span className="absolute inset-2.5 rounded-full border border-foreground/10" />
      <span className="h-3 w-3 rounded-full bg-primary transition-transform group-hover:scale-110" />
    </Link>
  );
}
