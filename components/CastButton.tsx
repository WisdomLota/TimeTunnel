"use client";

import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";

// Purely presentational: shows the button + QR overlay. It owns NO channel.
// The parent controls `connected` (via ReceiverCanvas's onConnected) and
// closes the overlay when the phone connects.
type Props = {
  url: string;              // controller URL to encode; empty until a session starts
  open: boolean;            // is the QR overlay showing
  connected: boolean;       // has the phone connected
  onStart: () => void;      // parent mints a session + opens overlay
  onClose: () => void;      // dismiss overlay
};

export default function CastButton({ url, open, connected, onStart, onClose }: Props) {
  return (
    <>
      <button
        onClick={onStart}
        className="text-xs tracking-[0.2em] uppercase text-brass/80 hover:text-brass border border-brass/40 hover:border-brass rounded-full px-4 py-2 transition-colors"
      >
        {connected ? "Phone connected" : "Cast to phone"}
      </button>

      <AnimatePresence>
        {open && url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-void/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-lg p-8 flex flex-col items-center gap-5"
              style={{ background: "var(--color-patina)", boxShadow: "0 30px 90px rgba(0,0,0,0.7), inset 0 0 0 1px var(--color-brass)" }}
            >
              <p className="display text-brass text-sm tracking-[0.3em] uppercase">Scan to restore</p>
              <div className="bg-bone p-4 rounded-md">
                <QRCodeSVG value={url} size={200} bgColor="#E8E4DA" fgColor="#0B0F0E" />
              </div>
              <p className="text-bone/50 text-xs max-w-[220px] text-center leading-relaxed">
                Point your camera here — the moment you connect, this closes and your phone takes over.
              </p>
              <button
                onClick={onClose}
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