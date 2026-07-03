"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReceiverCanvas from "@/components/ReceiverCanvas";
import CastButton from "@/components/CastButton";

type Props = { src: string; story: string; year: string; name: string };

function mintSession() {
  return Math.random().toString(36).slice(2, 10);
}

export default function TunnelReveal({ src, story, year, name }: Props) {
  const [beat, setBeat] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [qrOpen, setQrOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [shimmer, setShimmer] = useState(false);

  // hold the "entered the tunnel" beat, then dissolve
  useEffect(() => {
    const t = setTimeout(() => setBeat(false), 1600);
    return () => clearTimeout(t);
  }, []);

  const startCast = () => {
    const id = mintSession();
    setSessionId(id);
    setUrl(`${window.location.origin}/scratch/${id}`);
    setQrOpen(true);
    setConnected(false);
  };

  // ReceiverCanvas tells us the phone connected → close QR, flip label
  const handleConnected = () => {
    setConnected(true);
    setQrOpen(false);
  };

  // first remote progress → brass shimmer sweep
  const handleProgress = (ratio: number) => {
    if (sessionId && ratio > 0.02 && !shimmer) {
      setShimmer(true);
      setTimeout(() => setShimmer(false), 1200);
    }
  };

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
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="display text-2xl md:text-3xl brass-text uppercase text-center px-6"
            >
              You&apos;ve entered the tunnel
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!beat && (
        <>
          <ReceiverCanvas
            sessionId={sessionId}
            onProgress={handleProgress}
            onConnected={handleConnected}
          />

          <AnimatePresence>
            {shimmer && (
              <motion.div
                initial={{ x: "-30%", opacity: 0 }}
                animate={{ x: "130%", opacity: [0, 0.6, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="absolute top-0 h-full w-1/3 z-30 pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(240,217,168,0.35), transparent)" }}
              />
            )}
          </AnimatePresence>

          <div className="absolute bottom-4 right-4 z-40">
            <CastButton
              url={url}
              open={qrOpen}
              connected={connected}
              onStart={startCast}
              onClose={() => setQrOpen(false)}
            />
          </div>
        </>
      )}
    </div>
  );
}