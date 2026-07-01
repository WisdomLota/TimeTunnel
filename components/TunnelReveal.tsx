"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = { src: string; story: string; year: string; name: string };

export default function TunnelReveal({ src, story, year, name }: Props) {
  const [beat, setBeat] = useState(true); // "entered the tunnel" beat
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const cleared = useRef(false);
  const lastCheck = useRef(0);
  const [revealed, setRevealed] = useState(false);

  // hold the beat, then dissolve to the scratch
  useEffect(() => {
    const t = setTimeout(() => setBeat(false), 1600);
    return () => clearTimeout(t);
  }, []);

  // paint the tarnished plate once the beat is gone
  useEffect(() => {
    if (beat) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, "#3a3226");
    g.addColorStop(0.5, "#5c4a2e");
    g.addColorStop(1, "#2e2a20");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 1400; i++) {
      ctx.fillStyle = `rgba(${180 + Math.random() * 40},${140 + Math.random() * 40},${80 + Math.random() * 30},${Math.random() * 0.08})`;
      ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }
    ctx.fillStyle = "rgba(240,217,168,0.45)";
    ctx.font = "600 13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH TO RESTORE", width / 2, height / 2);
  }, [beat]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || cleared.current) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x - rect.left, y - rect.top, 22, 0, Math.PI * 2);
    ctx.fill();

    const now = performance.now();
    if (now - lastCheck.current > 200) {
      lastCheck.current = now;
      const { width, height } = canvas;
      const data = ctx.getImageData(0, 0, width, height).data;
      let clear = 0, total = 0;
      for (let i = 3; i < data.length; i += 4 * 20) {
        total++;
        if (data[i] === 0) clear++;
      }
      if (clear / total > 0.6 && !cleared.current) {
        cleared.current = true;
        setRevealed(true);
        canvas.style.transition = "opacity 0.9s ease";
        canvas.style.opacity = "0";
      }
    }
  };

  const pos = (e: React.PointerEvent) => scratch(e.clientX, e.clientY);

  return (
    <div className="absolute inset-0">
      <AnimatePresence>
        {beat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-void/70 backdrop-blur-sm"
          >
            <motion.p
              initial={{ letterSpacing: "0.1em", opacity: 0 }}
              animate={{ letterSpacing: "0.35em", opacity: 1 }}
              transition={{ duration: 2, ease: [0.26, 1, 0.3, 1] }}
              className="display text-2xl md:text-3xl brass-text uppercase text-center px-6"
            >
              You&apos;ve entered the tunnel
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!beat && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full touch-none cursor-crosshair z-10"
          onPointerDown={(e) => {
            drawing.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            pos(e);
          }}
          onPointerMove={(e) => drawing.current && pos(e)}
          onPointerUp={() => (drawing.current = false)}
        />
      )}
    </div>
  );
}