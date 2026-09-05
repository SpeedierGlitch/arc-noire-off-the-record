import { useEffect, useRef, useState } from "react";
import { CATALOG_NO } from "@/lib/catalog";

/**
 * Small persistent audio unit. NEVER autoplays.
 * Swap PLACEHOLDER_SRC with the Arc Noire original track when it's mastered.
 */
const PLACEHOLDER_SRC =
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=lofi-study-112191.mp3";

const fmt = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function ArchivalPlayer() {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(0);
  const [min, setMin] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onTime = () => setT(el.currentTime);
    const onMeta = () => setDur(el.duration || 0);
    const onEnd = () => setPlaying(false);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = async () => {
    const el = ref.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      try {
        await el.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  const stop = () => {
    const el = ref.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    setPlaying(false);
  };

  const pct = dur ? (t / dur) * 100 : 0;

  return (
    <div className="fixed bottom-3 left-3 z-40 select-none">
      <audio ref={ref} src={PLACEHOLDER_SRC} preload="none" />
      <div className="scanlines border border-border bg-charcoal/95 shadow-[4px_4px_0_0_var(--primary)]">
        <div className="flex items-center gap-2 border-b border-border bg-primary px-2 py-[3px]">
          <span className="mono-meta text-primary-foreground">{CATALOG_NO} PLAYER</span>
          <button
            className="mono-meta ml-auto text-primary-foreground"
            onClick={() => setMin((v) => !v)}
            aria-label={min ? "Expand player" : "Collapse player"}
          >
            {min ? "OPEN" : "HIDE"}
          </button>
        </div>
        {!min && (
          <div className="w-[220px] p-2">
            <p className="mono-meta text-muted-foreground">TRACK 01 — UNTITLED (DEMO)</p>
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={toggle}
                className="label-sans border border-primary px-2 py-1 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {playing ? "PAUSE" : "PLAY"}
              </button>
              <button onClick={stop} className="label-sans border border-border px-2 py-1">
                STOP
              </button>
              <span className="mono-meta ml-auto text-muted-foreground">
                {fmt(t)} / {dur ? fmt(dur) : "--:--"}
              </span>
            </div>
            <div className="mt-2 h-[6px] w-full border border-border" role="presentation">
              <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
