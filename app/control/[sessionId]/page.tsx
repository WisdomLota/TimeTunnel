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
                className="relative aspect-[3/4] rounded-sm flex flex-col items-center justify-center active:scale-95 transition-transform"
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
        <div className="flex flex-col items-center mt-10 gap-3">
          <p className="display text-2xl brass-text">Card {String(FEATURED.findIndex((a) => a.num === picked) + 1).padStart(2, "0")} opened</p>
          <p className="text-bone/50 text-sm text-center max-w-xs">Look at the screen — then get ready to scratch. (Scratch surface next.)</p>
        </div>
      )}
    </main>
  );
}