"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ARTWORKS } from "@/lib/artworks";

export default function QRAdminPage() {
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);

  return (
    <main className="min-h-screen px-8 py-12 print:p-0" style={{ background: "var(--color-void)" }}>
      {/* screen-only header */}
      <div className="max-w-6xl mx-auto mb-10 flex items-end justify-between print:hidden">
        <div>
          <p className="text-xs tracking-[0.4em] text-bone/40 uppercase">Cyprus Museum of Modern Arts</p>
          <h1 className="display text-4xl brass-text mt-2">Artwork Plaques</h1>
          <p className="text-bone/50 text-sm mt-2">
            {ARTWORKS.length} works. Each plaque's QR opens its Prof Dux page. Print all, or one at a time.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="text-xs tracking-[0.2em] uppercase text-brass border border-brass/40 hover:border-brass rounded-full px-5 py-3 transition-colors"
        >
          Print all
        </button>
      </div>

      {/* plaque grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 print:grid-cols-2 print:gap-4">
        {ARTWORKS.map((art) => {
          const url = origin ? `${origin}/artwork/${art.num}` : "";
          return (
            <div
              key={art.id}
              className="plaque relative bg-white text-neutral-900 rounded-md p-5 break-inside-avoid"
              style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
            >
              {/* museum header row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full" style={{ background: "#C8102E" }} />
                  <div className="leading-tight">
                    <p className="text-[9px] tracking-wide text-neutral-500">YAKIN DOĞU ÜNİVERSİTESİ</p>
                    <p className="text-[11px] font-semibold tracking-wide" style={{ color: "#0E7C9B" }}>
                      KIBRIS MODERN SANAT MÜZESİ
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-4">
                {/* details */}
                <div className="flex-1">
                  <p className="text-sm font-bold leading-tight">{art.artist}</p>
                  <p className="text-xs text-neutral-500 mb-3">{art.country}</p>

                  <p className="text-sm italic leading-tight">{art.title}</p>
                  <p className="text-xs text-neutral-600 mt-1">{art.category}</p>
                  {/* slots for data not in the source tables */}
                  <p className="text-[11px] text-neutral-400 mt-1">Year · Medium · Dimensions</p>
                </div>

                {/* QR + nudge */}
                <div className="flex flex-col items-center">
                  {url ? (
                    <QRCodeSVG value={url} size={92} bgColor="#ffffff" fgColor="#0B0F0E" />
                  ) : (
                    <div className="w-[92px] h-[92px]" />
                  )}
                  <p className="text-[8px] tracking-wide text-center mt-1 font-semibold" style={{ color: "#0E7C9B" }}>
                    SCAN · ASK PROF DUX
                  </p>
                </div>
              </div>

              <p className="text-[10px] tracking-widest text-neutral-400 mt-3 text-right">{art.id}</p>

              {/* per-plaque print button (screen only) */}
              <button
                onClick={() => {
                  document.body.classList.add("print-one");
                  (window as any).__printId = art.id;
                  window.print();
                  document.body.classList.remove("print-one");
                }}
                className="print:hidden absolute -top-2 -right-2 text-[9px] tracking-widest uppercase bg-brass text-void rounded-full px-2 py-1"
              >
                Print
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}