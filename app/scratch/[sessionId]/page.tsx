"use client";

import { useEffect, useRef, use } from "react";
import { supabase } from "@/lib/supabase";

export default function ScratchController({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = use(params);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const lastSend = useRef(0);
  const lastPt = useRef<{ x: number; y: number } | null>(null);

  // join channel; on subscribe, send a hello ping so the screen's QR closes
  useEffect(() => {
    const channel = supabase.channel(`scratch:${sessionId}`, {
      config: { broadcast: { self: false } },
    });
    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        channel.send({ type: "broadcast", event: "hello", payload: {} });
      }
    });
    channelRef.current = channel;
    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  // paint the tarnished plate
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
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
    ctx.fillStyle = "rgba(240,217,168,0.5)";
    ctx.font = "600 16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH TO RESTORE", width / 2, height / 2);
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const lx = clientX - rect.left;
    const ly = clientY - rect.top;
    const nx = lx / rect.width;
    const ny = ly / rect.height;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 26;
    const prev = lastPt.current;
    if (prev) {
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(lx, ly);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(lx, ly, 13, 0, Math.PI * 2);
      ctx.fill();
    }
    lastPt.current = { x: lx, y: ly };

    const now = performance.now();
    if (now - lastSend.current > 50 && channelRef.current) {
      lastSend.current = now;
      channelRef.current.send({
        type: "broadcast",
        event: "scratch",
        payload: { nx, ny },
      });
    }
  };

  const endStroke = () => {
    drawing.current = false;
    lastPt.current = null;
    channelRef.current?.send({ type: "broadcast", event: "scratch", payload: { lift: true } });
  };

  const pos = (e: React.PointerEvent) => scratch(e.clientX, e.clientY);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-6 gap-6"
      style={{ background: "#0B0F0E" }}
    >
      <div className="text-center">
        <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "#C69A4B" }}>
          NEU Time Tunnel
        </p>
        <p className="text-sm mt-1" style={{ color: "rgba(232,228,218,0.6)" }}>
          Scratch below — it appears on the big screen
        </p>
      </div>

      <div
        className="relative w-full max-w-md aspect-[4/3] rounded-sm overflow-hidden touch-none"
        style={{ boxShadow: "inset 0 0 0 1px #C69A4B" }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#C69A4B,#5A1E22)" }} />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
          onPointerDown={(e) => {
            drawing.current = true;
            lastPt.current = null;
            e.currentTarget.setPointerCapture(e.pointerId);
            pos(e);
          }}
          onPointerMove={(e) => drawing.current && pos(e)}
          onPointerUp={endStroke}
        />
      </div>

      <p className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(232,228,218,0.3)" }}>
        Session {sessionId.slice(0, 8)}
      </p>
    </main>
  );
}