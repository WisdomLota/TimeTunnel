"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ARTWORKS } from "@/lib/artworks";

export default function QRAdminPage() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <main className="min-h-screen px-8 py-12" style={{ background: "var(--color-void)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-10 print:mb-6">
          <div>
            <p className="text-xs tracking-[0.4em] text-bone/40 uppercase">Cyprus Museum of Modern Arts</p>
            <h1 className="display text-4xl brass-text mt-2">Artwork QR Codes</h1>
            <p className="text-bone/50 text-sm mt-2">
              Scan any code to open that piece's Prof Dux guide.
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="print:hidden text-xs tracking-[0.2em] uppercase text-brass border border-brass/40 hover:border-brass rounded-full px-5 py-3 transition-colors"
          >
            Print
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTWORKS.map((art) => {
            const url = origin ? `${origin}/artwork/${art.id}` : "";
            return (
              <div
                key={art.id}
                className="rounded-lg p-6 flex flex-col items-center text-center gap-4 break-inside-avoid"
                style={{ background: "var(--color-patina)", boxShadow: "inset 0 0 0 1px var(--color-brass)" }}
              >
                <div className="bg-bone p-3 rounded-md">
                  {url ? (
                    <QRCodeSVG value={url} size={150} bgColor="#E8E4DA" fgColor="#0B0F0E" />
                  ) : (
                    <div className="w-37.5 h-37.5" />
                  )}
                </div>
                <div>
                  <p className="display text-brass text-lg leading-tight">{art.title}</p>
                  <p className="text-bone/50 text-xs italic mt-0.5">{art.titleEn}</p>
                  <p className="text-bone/60 text-xs mt-2">{art.artist} · {art.country}</p>
                  <p className="text-bone/30 text-[10px] tracking-widest mt-2">{art.id}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}