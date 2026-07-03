"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  sessionId: string | null;        // null = no live session → local scratch
  onProgress?: (ratio: number) => void;
  onConnected?: () => void;         // fires when the phone sends its hello ping
};

// Sole owner of the session channel. Scratches locally by touch until a
// session is live, then becomes receive-only and paints the phone's strokes.
export default function ReceiverCanvas({ sessionId, onProgress, onConnected }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const cleared = useRef(false);
  const lastCheck = useRef(0);
  const lastLocal = useRef<{ x: number; y: number } | null>(null);
  const lastRemote = useRef<{ x: number; y: number } | null>(null);
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

  // line-based brush stroke between last point and current
  const stroke = (
    px: number,
    py: number,
    lastRef: React.MutableRefObject<{ x: number; y: number } | null>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas || cleared.current) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 26;

    const prev = lastRef.current;
    if (prev) {
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(px, py);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(px, py, 13, 0, Math.PI * 2);
      ctx.fill();
    }
    lastRef.current = { x: px, y: py };

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

  // subscribe to the session channel (ALL .on before subscribe)
  useEffect(() => {
    if (!sessionId) {
      setLive(false);
      return;
    }
    const channel = supabase.channel(`scratch:${sessionId}`, {
      config: { broadcast: { self: false } },
    });

    channel.on("broadcast", { event: "hello" }, () => {
      onConnected?.();
    });

    channel.on("broadcast", { event: "scratch" }, ({ payload }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (payload.lift) {
        lastRemote.current = null;
        return;
      }
      stroke(payload.nx * rect.width, payload.ny * rect.height, lastRemote);
    });

    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") setLive(true);
    });

    return () => {
      supabase.removeChannel(channel);
      setLive(false);
    };
  }, [sessionId]);

  const localScratch = (e: React.PointerEvent) => {
    if (live) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    stroke(e.clientX - rect.left, e.clientY - rect.top, lastLocal);
  };

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full touch-none ${live ? "cursor-default" : "cursor-crosshair"}`}
      onPointerDown={(e) => {
        if (live) return;
        drawing.current = true;
        lastLocal.current = null;
        e.currentTarget.setPointerCapture(e.pointerId);
        localScratch(e);
      }}
      onPointerMove={(e) => !live && drawing.current && localScratch(e)}
      onPointerUp={() => {
        drawing.current = false;
        lastLocal.current = null;
      }}
    />
  );
}