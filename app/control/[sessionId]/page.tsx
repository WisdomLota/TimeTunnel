"use client";

import { useEffect, useRef, use, useState } from "react";
import { supabase } from "@/lib/supabase";
import { channelName, FEATURED } from "@/lib/tunnel";

export default function ControlPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = use(params);
  const [connected, setConnected] = useState(false);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const [picked, setPicked] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastSend = useRef(0);
  const lastPt = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!picked) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * dpr; canvas.height = height * dpr; ctx.scale(dpr, dpr);
    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, "#3a3226"); g.addColorStop(0.5, "#5c4a2e"); g.addColorStop(1, "#2e2a20");
    ctx.fillStyle = g; ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgba(240,217,168,0.5)"; ctx.font = "600 15px sans-serif";
    ctx.textAlign = "center"; ctx.fillText("SCRATCH HERE", width / 2, height / 2);
  }, [picked]);

  const scratch = (cx: number, cy: number) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const r = canvas.getBoundingClientRect();
    const lx = cx - r.left, ly = cy - r.top;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 30;
    const p = lastPt.current;
    if (p) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(lx, ly); ctx.stroke(); }
    else { ctx.beginPath(); ctx.arc(lx, ly, 15, 0, Math.PI * 2); ctx.fill(); }
    lastPt.current = { x: lx, y: ly };
    const now = performance.now();
    if (now - lastSend.current > 45) {
      lastSend.current = now;
      channelRef.current?.send({ type: "broadcast", event: "scratch",
        payload: { nx: lx / r.width, ny: ly / r.height } });
    }
  };

  const pick = (num: string) => {
    setPicked(num);
    channelRef.current?.send({ type: "broadcast", event: "select", payload: { num } });
  };

  useEffect(() => {
    const channel = supabase.channel(channelName(sessionId), {
      config: { broadcast: { self: false } },
    });
    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        channel.send({ type: "broadcast", event: "hello", payload: {} });
        setConnected(true);
      }
    });
    channelRef.current = channel;
    return () => { supabase.removeChannel(channel); };
  }, [sessionId]);

  return (
    <main className="min-h-screen flex flex-col items-center p-6 gap-5" style={{ background: "var(--color-void)" }}>
      <p className="text-xs tracking-[0.4em] text-brass/70 uppercase mt-4">Near East University</p>

      {!connected && <p className="display text-2xl brass-text mt-10">Connecting…</p>}

      {connected && !picked && (
        <>
          <h1 className="display text-2xl brass-text text-center">Choose a sealed work</h1>
          <p className="text-bone/50 text-xs text-center mb-2">It opens on the screen.</p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {FEATURED.map((art, i) => (
              <button
                key={art.id}
                onClick={() => pick(art.num)}
                className="relative aspect-3/4 rounded-sm flex flex-col items-center justify-center active:scale-95 transition-transform"
                style={{ background: "linear-gradient(160deg, var(--color-patina), var(--color-void))",
                         boxShadow: "inset 0 0 0 1px var(--color-brass)" }}
              >
                <span className="display text-3xl brass-text">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[8px] tracking-[0.3em] text-bone/40 uppercase mt-1">Sealed</span>
              </button>
            ))}
          </div>
        </>
      )}

      {connected && picked && (
        <div className="flex flex-col items-center w-full max-w-sm gap-4 mt-2">
          <h1 className="display text-xl brass-text text-center">
            Scratch to reveal — watch the screen
          </h1>
          <div className="relative w-full aspect-3/4 rounded-sm overflow-hidden touch-none"
               style={{ boxShadow: "inset 0 0 0 1px #C69A4B" }}>
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#C69A4B,#5A1E22)" }} />
            <canvas ref={canvasRef}
              className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
              onPointerDown={(e) => { drawing.current = true; lastPt.current = null; e.currentTarget.setPointerCapture(e.pointerId); scratch(e.clientX, e.clientY); }}
              onPointerMove={(e) => drawing.current && scratch(e.clientX, e.clientY)}
              onPointerUp={() => { drawing.current = false; lastPt.current = null;
                channelRef.current?.send({ type: "broadcast", event: "scratch", payload: { lift: true } }); }}
            />
          </div>
          <p className="text-bone/40 text-xs text-center">Keep scratching until the work appears.</p>
        </div>
      )}
    </main>
  );
}