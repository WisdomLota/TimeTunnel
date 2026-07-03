"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  sessionId: string | null; // null = no live session → local scratch mode
  onProgress?: (ratio: number) => void;
};

// Paints the tarnished plate; scratches locally by touch UNLESS a live
// session is active, in which case it becomes receive-only and paints
// incoming scratch coords from the phone controller.
export default function ReceiverCanvas({ sessionId, onProgress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const cleared = useRef(false);
  const lastCheck = useRef(0);
  const [live, setLive] = useState(false);

  // paint the coating once
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
    for (let i = 0; i < 1200; i++) {
      ctx.fillStyle = `rgba(${180 + Math.random() * 40},${140 + Math.random() * 40},${80 + Math.random() * 30},${Math.random() * 0.08})`;
      ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }
    ctx.fillStyle = "rgba(240,217,168,0.45)";
    ctx.font = "600 13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH TO RESTORE", width / 2, height / 2);
  }, []);

  // erase a circle at canvas pixel coords
  const erase = (px: number, py: number) => {
    const canvas = canvasRef.current;
    if (!canvas || cleared.current) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(px, py, 22, 0, Math.PI * 2);
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
      const ratio = clear / total;
      onProgress?.(ratio);
      if (ratio > 0.6 && !cleared.current) {
        cleared.current = true;
        canvas.style.transition = "opacity 0.9s ease";
        canvas.style.opacity = "0";
      }
    }
  };

  // subscribe to the session channel when one is live
  useEffect(() => {
    if (!sessionId) {
      setLive(false);
      return;
    }
    const channel = supabase.channel(`scratch:${sessionId}`, {
      config: { broadcast: { self: false } },
    });
    channel.on("broadcast", { event: "scratch" }, ({ payload }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      // map normalized phone coords → this canvas's pixel space
      erase(payload.nx * rect.width, payload.ny * rect.height);
    });
    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") setLive(true);
    });
    return () => {
      supabase.removeChannel(channel);
      setLive(false);
    };
  }, [sessionId]);

  // local touch scratching — disabled while a session is live (receive-only)
  const localScratch = (e: React.PointerEvent) => {
    if (live) return; // receive-only
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    erase(e.clientX - rect.left, e.clientY - rect.top);
  };

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full touch-none ${live ? "cursor-default" : "cursor-crosshair"}`}
      onPointerDown={(e) => {
        if (live) return;
        drawing.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        localScratch(e);
      }}
      onPointerMove={(e) => !live && drawing.current && localScratch(e)}
      onPointerUp={() => (drawing.current = false)}
    />
  );
}