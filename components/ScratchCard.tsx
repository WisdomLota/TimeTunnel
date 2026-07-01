"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  name: string;
  year: string;
  story: string;
  src: string; // one image: aged on top, pristine beneath
};

export default function ScratchCard({ name, year, story, src }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const cleared = useRef(false);
  const lastCheck = useRef(0);
  const [revealed, setRevealed] = useState(false);

  // paint the aged version of the photo onto the canvas
  useEffect(() => {
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

    // patina speckle — aged metal, not flat grey
    for (let i = 0; i < 900; i++) {
      ctx.fillStyle = `rgba(${180 + Math.random() * 40},${140 + Math.random() * 40},${80 + Math.random() * 30},${Math.random() * 0.08})`;
      ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }
    ctx.fillStyle = "rgba(240,217,168,0.45)";
    ctx.font = "600 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH TO RESTORE", width / 2, height / 2);
  }, [src]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || cleared.current) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const px = x - rect.left;
    const py = y - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(px, py, 16, 0, Math.PI * 2);
    ctx.fill();

    // throttle the expensive progress read
    const now = performance.now();
    if (now - lastCheck.current > 200) {
      lastCheck.current = now;
      checkProgress(ctx, canvas);
    }
  };

  const checkProgress = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let clear = 0;
    let total = 0;
    // sample every 20th pixel's alpha
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
  };

  const pos = (e: React.PointerEvent) => scratch(e.clientX, e.clientY);

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center max-w-3xl mx-auto p-8">
      <div
        className="relative w-80 h-56 rounded-sm overflow-hidden shrink-0"
        style={{ boxShadow: "inset 0 0 0 1px var(--color-brass), 0 20px 60px rgba(0,0,0,0.6)" }}
      >
        {/* pristine, full-colour photo beneath */}
        <div
          className="absolute inset-0"
          style={{ background: `url(${src}) center/cover` }}
        />
        {/* aged photo coating on top */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
          onPointerDown={(e) => {
            drawing.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            pos(e);
          }}
          onPointerMove={(e) => drawing.current && pos(e)}
          onPointerUp={() => (drawing.current = false)}
        />
      </div>

      <div className="flex-1">
        <p className="display text-brass text-sm tracking-widest">{year}</p>
        <h3 className="display text-3xl brass-text mt-1">{name}</h3>
        <motion.p
          animate={{ opacity: revealed ? 1 : 0.5 }}
          className="mt-4 text-bone/70 leading-relaxed text-sm"
        >
          {story}
        </motion.p>
      </div>
    </div>
  );
}