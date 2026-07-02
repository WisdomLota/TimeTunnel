"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const TAP_ZOOM = 2.5;
const EASE = [0.16, 1, 0.3, 1] as const;

export default function DeepZoom({ src, title = "Nevruz" }: { src: string; title?: string }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const s = useMotionValue(1);
  const [scaleLabel, setScaleLabel] = useState(1);
  const [control, setControl] = useState<{ x: number; y: number } | null>(null);

  const dragging = useRef(false);
  const moved = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const unsub = s.on("change", (v) => setScaleLabel(v));
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

  // animate to a target transform
  const glideTo = useCallback((tx: number, ty: number, ts: number) => {
    const c = clamp(tx, ty, ts);
    animate(s, ts, { duration: 0.7, ease: EASE });
    animate(x, c.x, { duration: 0.7, ease: EASE });
    animate(y, c.y, { duration: 0.7, ease: EASE });
  }, [clamp, s, x, y]);

  // tap a point → glide it to centre and zoom in
  const focusPoint = useCallback((clientX: number, clientY: number) => {
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

    // place the floating control near the tap
    setControl({ x: clientX - rect.left, y: clientY - rect.top });
  }, [glideTo, s, x, y]);

  // wheel / pinch — immediate, cursor-anchored
  const onWheel = useCallback((e: React.WheelEvent) => {
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
    s.set(next); x.set(c.x); y.set(c.y);
  }, [clamp, s, x, y]);

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
    x.set(c.x); y.set(c.y);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    if (!moved.current) focusPoint(e.clientX, e.clientY); // it was a tap, not a drag
  };

  const stepZoom = (dir: 1 | -1) => {
    const next = Math.max(MIN_SCALE, Math.min(MAX_SCALE, s.get() + dir * 0.5));
    const c = clamp(x.get(), y.get(), next);
    glideTo(c.x, c.y, next);
  };

  const reset = () => {
    glideTo(0, 0, 1);
    setControl(null);
  };

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
          Ten metres of ink on silk. Tap anywhere to draw closer; drag to move across the work.
        </p>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div
          ref={viewportRef}
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="relative w-full aspect-[21/9] overflow-hidden rounded-sm cursor-grab active:cursor-grabbing select-none"
          style={{ boxShadow: "inset 0 0 0 1px var(--color-brass), 0 40px 100px rgba(0,0,0,0.6)" }}
        >
          <motion.img
            src={src}
            alt={title}
            draggable={false}
            style={{ x, y, scale: s, width: "100%", height: "100%", objectFit: "cover" }}
            className="absolute inset-0 will-change-transform"
          />

          {/* floating zoom control near the tapped point */}
          {control && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ left: control.x, top: control.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 rounded-full px-1 py-1 backdrop-blur-md z-10"
            >
              <button onClick={(e) => { e.stopPropagation(); stepZoom(-1); }}
                className="w-7 h-7 rounded-full bg-void/70 border border-brass/50 text-brass text-sm">−</button>
              <button onClick={(e) => { e.stopPropagation(); stepZoom(1); }}
                className="w-7 h-7 rounded-full bg-void/70 border border-brass/50 text-brass text-sm">+</button>
            </motion.div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-[10px] tracking-[0.2em] text-bone/30 uppercase">
            {Math.round(scaleLabel * 100)}%
          </span>
          <button onClick={reset}
            className="text-xs tracking-[0.2em] uppercase text-bone/50 hover:text-brass focus-visible:text-brass focus-visible:outline-none transition-colors">
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}