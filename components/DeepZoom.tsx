"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const TAP_ZOOM = 2.5;
const EASE = [0.16, 1, 0.3, 1] as const;

type Hotspot = { id: string; xPct: number; yPct: number; title: string; note: string };

const HOTSPOTS: Hotspot[] = [
  {
    id: "h1", xPct: 22, yPct: 32, title: "The Cavalry Charge",
    note: "Mounted riders press forward in tight formation — placeholder narrative. Replace with the real Nevruz detail and story for this region of the work.",
  },
  {
    id: "h2", xPct: 50, yPct: 20, title: "The Inscription",
    note: "A line of lettering anchors the scene above the figures — placeholder. Swap for Nevruz's own symbolism and meaning here.",
  },
  {
    id: "h3", xPct: 76, yPct: 60, title: "The Fallen",
    note: "Figures scattered along the lower border close the movement — placeholder narrative for the final passage of the piece.",
  },
];

// brass teardrop map-pin that bounces to draw the eye
function MapPin({ onTap, label }: { onTap: (e: React.PointerEvent) => void; label: string }) {
  return (
    <button
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={onTap}
      className="absolute -translate-x-1/2 -translate-y-full z-10"
      aria-label={label}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex flex-col items-center"
      >
        <svg width="26" height="34" viewBox="0 0 26 34" className="drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
          <path
            d="M13 0C5.82 0 0 5.82 0 13c0 9.2 13 21 13 21s13-11.8 13-21C26 5.82 20.18 0 13 0z"
            fill="var(--color-brass)"
            stroke="var(--color-void)"
            strokeWidth="1.5"
          />
          <circle cx="13" cy="13" r="5" fill="var(--color-void)" />
        </svg>
      </motion.div>
      <motion.span
        animate={{ scaleX: [1, 0.6, 1], opacity: [0.5, 0.25, 0.5] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-1 w-4 rounded-full bg-void/60 blur-[1px]"
      />
    </button>
  );
}

export default function DeepZoom({ src, title = "Nevruz" }: { src: string; title?: string }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const s = useMotionValue(1);
  const [scaleLabel, setScaleLabel] = useState(1);
  const [control, setControl] = useState<{ x: number; y: number } | null>(null);
  const [activeSpot, setActiveSpot] = useState<Hotspot | null>(null);
  const [engaged, setEngaged] = useState(false);

  const dragging = useRef(false);
  const moved = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const unsub = s.on("change", (v) => {
      setScaleLabel(v);
      setEngaged(v > 1.01);
    });
    return () => unsub();
  }, [s]);

  const clamp = useCallback((nx: number, ny: number, sc: number) => {
    const vp = viewportRef.current;
    if (!vp) return { x: nx, y: ny };
    const maxX = (vp.clientWidth * (sc - 1)) / 2;
    const maxY = (vp.clientHeight * (sc - 1)) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, nx)),
      y: Math.max(-maxY, Math.min(maxY, ny)),
    };
  }, []);

  const glideTo = useCallback(
    (tx: number, ty: number, ts: number) => {
      const c = clamp(tx, ty, ts);
      animate(s, ts, { duration: 0.7, ease: EASE });
      animate(x, c.x, { duration: 0.7, ease: EASE });
      animate(y, c.y, { duration: 0.7, ease: EASE });
    },
    [clamp, s, x, y]
  );

  const focusPoint = useCallback(
    (clientX: number, clientY: number) => {
      const vp = viewportRef.current;
      if (!vp) return;
      const rect = vp.getBoundingClientRect();
      const cx = clientX - rect.left - rect.width / 2;
      const cy = clientY - rect.top - rect.height / 2;

      const cur = s.get();
      const next = cur < TAP_ZOOM ? TAP_ZOOM : Math.min(MAX_SCALE, cur + 1);
      const ratio = next / cur;
      const nx = x.get() - (cx - x.get()) * (ratio - 1);
      const ny = y.get() - (cy - y.get()) * (ratio - 1);
      glideTo(nx, ny, next);

      setControl({ x: clientX - rect.left, y: clientY - rect.top });
    },
    [glideTo, s, x, y]
  );

  const focusHotspot = useCallback(
    (h: Hotspot) => {
      const vp = viewportRef.current;
      if (!vp) return;
      const w = vp.clientWidth;
      const ht = vp.clientHeight;
      const dx = (h.xPct / 100 - 0.5) * w;
      const dy = (h.yPct / 100 - 0.5) * ht;
      glideTo(-dx * TAP_ZOOM, -dy * TAP_ZOOM, TAP_ZOOM);
      setControl(null);
    },
    [glideTo]
  );

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const vp = viewportRef.current;
      if (!vp) return;
      const rect = vp.getBoundingClientRect();
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;
      const intensity = e.ctrlKey ? 0.02 : 0.006;
      const cur = s.get();
      const next = Math.max(MIN_SCALE, Math.min(MAX_SCALE, cur * (1 - e.deltaY * intensity)));
      if (next === cur) return;
      const ratio = next / cur;
      const nx = x.get() - (cx - x.get()) * (ratio - 1);
      const ny = y.get() - (cy - y.get()) * (ratio - 1);
      const c = clamp(nx, ny, next);
      s.set(next);
      x.set(c.x);
      y.set(c.y);
    },
    [clamp, s, x, y]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    moved.current = false;
    last.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    const c = clamp(x.get() + dx, y.get() + dy, s.get());
    x.set(c.x);
    y.set(c.y);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    if (!moved.current) focusPoint(e.clientX, e.clientY);
  };

  const stepZoom = (dir: 1 | -1) => {
    const next = Math.max(MIN_SCALE, Math.min(MAX_SCALE, s.get() + dir * 0.5));
    const c = clamp(x.get(), y.get(), next);
    glideTo(c.x, c.y, next);
  };

  const reset = useCallback(() => {
    glideTo(0, 0, 1);
    setControl(null);
    setActiveSpot(null);
  }, [glideTo]);

  const closePanel = useCallback(() => {
    setActiveSpot(null);
    reset();
  }, [reset]);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const h = (e: WheelEvent) => e.preventDefault();
    vp.addEventListener("wheel", h, { passive: false });
    return () => vp.removeEventListener("wheel", h);
  }, []);

  return (
    <section id="art" className="min-h-screen flex flex-col justify-center px-8 py-24">
      <div className="max-w-6xl mx-auto w-full mb-8">
        <p className="text-xs tracking-[0.4em] text-bone/40 uppercase">Günsel Art Museum</p>
        <h2 className="display text-5xl md:text-6xl brass-text mt-3">{title}</h2>
        <p className="text-bone/50 text-sm mt-3 max-w-lg">
          Ten metres of ink on silk. Tap anywhere to draw closer, drag to move across the work, or
          tap a marker to hear its story.
        </p>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          animate={engaged || activeSpot ? { scale: 1 } : { scale: [1, 1.03, 1] }}
          transition={
            engaged || activeSpot
              ? { duration: 0.6, ease: "easeOut" }
              : { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <div
            ref={viewportRef}
            onWheel={onWheel}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            className="relative w-full aspect-[21/9] overflow-hidden rounded-sm cursor-grab active:cursor-grabbing select-none"
            style={{ boxShadow: "inset 0 0 0 1px var(--color-brass), 0 40px 100px rgba(0,0,0,0.6)" }}
          >
            <motion.div
              style={{ x, y, scale: s, width: "100%", height: "100%" }}
              className="absolute inset-0 will-change-transform"
            >
              <img
                src={src}
                alt={title}
                draggable={false}
                className="w-full h-full object-cover pointer-events-none"
              />
              {HOTSPOTS.map((h) => (
                <div
                  key={h.id}
                  style={{ position: "absolute", left: h.xPct + "%", top: h.yPct + "%" }}
                >
                  <MapPin
                    label={h.title}
                    onTap={(e) => {
                      e.stopPropagation();
                      dragging.current = false;
                      focusHotspot(h);
                      setActiveSpot(h);
                    }}
                  />
                </div>
              ))}
            </motion.div>

            {control && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ left: control.x, top: control.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 rounded-full p-1 backdrop-blur-md z-20"
              >
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); stepZoom(-1); }}
                  className="w-7 h-7 rounded-full bg-void/70 border border-brass/50 text-brass text-sm"
                  aria-label="Zoom out"
                >
                  &minus;
                </button>
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); stepZoom(1); }}
                  className="w-7 h-7 rounded-full bg-void/70 border border-brass/50 text-brass text-sm"
                  aria-label="Zoom in"
                >
                  +
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-[10px] tracking-[0.2em] text-bone/30 uppercase">
            {Math.round(scaleLabel * 100)}%
          </span>
          <button
            onClick={reset}
            className="text-xs tracking-[0.2em] uppercase text-bone/50 hover:text-brass focus-visible:text-brass focus-visible:outline-none transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ x: activeSpot ? 0 : "110%", opacity: activeSpot ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed top-0 right-0 h-full w-full max-w-sm z-50 p-8 flex flex-col justify-center"
        style={{ background: "var(--color-patina)", boxShadow: "-20px 0 80px rgba(0,0,0,0.6)" }}
      >
        {activeSpot && (
          <>
            <button
              onClick={closePanel}
              className="absolute top-6 right-6 text-bone/50 hover:text-brass text-sm tracking-widest"
            >
              CLOSE
            </button>
            <p className="text-xs tracking-[0.3em] text-brass/70 uppercase">Detail</p>
            <h3 className="display text-3xl brass-text mt-3">{activeSpot.title}</h3>
            <p className="text-bone/70 text-sm leading-relaxed mt-4">{activeSpot.note}</p>
          </>
        )}
      </motion.div>
    </section>
  );
}