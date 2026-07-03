"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

// mint a short random session id
function mintSession() {
  return Math.random().toString(36).slice(2, 10);
}

type Props = {
  onSessionStart: (sessionId: string) => void; // parent switches ReceiverCanvas to this session
};

export default function CastButton({ onSessionStart }: Props) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const presenceRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const startCast = () => {
    const id = mintSession();
    const controllerUrl = `${window.location.origin}/scratch/${id}`;
    setSessionId(id);
    setUrl(controllerUrl);
    setOpen(true);
    setConnected(false);
    onSessionStart(id);
  };

  // watch the session channel: when the phone joins, auto-dismiss the QR
  useEffect(() => {
    if (!sessionId) return;
    const channel = supabase.channel(`scratch:${sessionId}`, {
      config: { broadcast: { self: false } },
    });
    // first incoming scratch means the phone is live → dismiss overlay
    channel.on("broadcast", { event: "scratch" }, () => {
      setConnected(true);
      setOpen(false);
    });
    channel.subscribe();
    presenceRef.current = channel;
    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  return (
    <>
      <button
        onClick={startCast}
        className="text-xs tracking-[0.2em] uppercase text-brass/80 hover:text-brass border border-brass/40 hover:border-brass rounded-full px-4 py-2 transition-colors"
      >
        {connected ? "Phone connected" : "Cast to phone"}
      </button>

      <AnimatePresence>
        {open && sessionId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-60 flex items-center justify-center bg-void/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-lg p-8 flex flex-col items-center gap-5"
              style={{ background: "var(--color-patina)", boxShadow: "0 30px 90px rgba(0,0,0,0.7), inset 0 0 0 1px var(--color-brass)" }}
            >
              <p className="display text-brass text-sm tracking-[0.3em] uppercase">
                Scan to restore
              </p>
              <div className="bg-bone p-4 rounded-md">
                <QRCodeSVG value={url} size={200} bgColor="#E8E4DA" fgColor="#0B0F0E" />
              </div>
              <p className="text-bone/50 text-xs max-w-220px text-center leading-relaxed">
                Point your camera here, then scratch on your phone — it appears on this screen.
              </p>
              <button
                onClick={() => setOpen(false)}
                className="text-[10px] tracking-[0.25em] uppercase text-bone/40 hover:text-brass transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}