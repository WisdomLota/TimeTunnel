"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useMuseum } from "@/lib/museums/context";

export default function MuseumAdminPage() {
  const config = useMuseum();
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);

  return (
    <main className="min-h-screen px-8 py-12 print:p-0" style={{ background: config.branding.colors.void }}>
      {/* screen-only header */}
      <div className="max-w-6xl mx-auto mb-10 flex items-end justify-between print:hidden">
        <div>
          <p className="text-xs tracking-[0.4em] uppercase" style={{ color: `${config.branding.colors.accent}77` }}>
            {config.name}
          </p>
          <h1
            className="text-4xl font-bold tracking-widest uppercase mt-2"
            style={{ color: config.branding.colors.accent, fontFamily: config.branding.font }}
          >
            Collection Plaques
          </h1>
          <p className="text-sm mt-2" style={{ color: `${config.branding.colors.accent}88` }}>
            {config.works.length} works. Each plaque's QR opens its Prof Dux page. Print all, or one at a time.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="text-xs tracking-[0.2em] uppercase rounded-full px-5 py-3 transition-colors"
          style={{
            color: config.branding.colors.accent,
            border: `1px solid ${config.branding.colors.accent}44`,
          }}
        >
          Print all
        </button>
      </div>

      {/* plaque grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 print:grid-cols-2 print:gap-4">
        {config.works.map((work) => {
          const url = origin ? `${origin}/m/${config.slug}/work/${work.id}` : "";
          return (
            <div
              key={work.id}
              id={`plaque-${work.id}`}
              className="plaque relative bg-white text-neutral-900 rounded-md p-5 break-inside-avoid"
              style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
            >
              {/* museum header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {config.branding.logo && (
                    <img src={config.branding.logo} alt="" className="h-6 w-auto" />
                  )}
                  <div className="leading-tight">
                    <p className="text-[9px] tracking-wide text-neutral-500 uppercase">
                      {config.name}
                    </p>
                    <p className="text-[11px] font-semibold tracking-wide" style={{ color: config.branding.colors.primary }}>
                      Floating Maritime Museum
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-4">
                {/* details */}
                <div className="flex-1">
                  <p className="text-sm font-bold leading-tight">{work.title.en}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{work.title.tr}</p>
                  {work.year && (
                    <p className="text-xs text-neutral-400 mt-2">{work.year}</p>
                  )}
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed line-clamp-3">
                    {work.description.en}
                  </p>
                </div>

                {/* QR */}
                <div className="flex flex-col items-center shrink-0">
                  {url ? (
                    <QRCodeSVG value={url} size={92} bgColor="#ffffff" fgColor="#0B0F0E" />
                  ) : (
                    <div className="w-92px h-92px" />
                  )}
                  <p
                    className="text-[8px] tracking-wide text-center mt-1 font-semibold"
                    style={{ color: config.branding.colors.primary }}
                  >
                    SCAN · ASK PROF DUX
                  </p>
                </div>
              </div>

              <p className="text-[10px] tracking-widest text-neutral-400 mt-3 text-right">{work.id}</p>

              {/* per-plaque print button */}
              <button
                onClick={() => {
                  const el = document.getElementById(`plaque-${work.id}`);
                  document.querySelectorAll(".plaque").forEach((p) => p.classList.add("print-hide"));
                  el?.classList.remove("print-hide");
                  el?.classList.add("print-only");
                  window.print();
                  document.querySelectorAll(".plaque").forEach((p) => p.classList.remove("print-hide", "print-only"));
                }}
                className="print:hidden absolute -top-2 -right-2 text-[9px] tracking-widest uppercase rounded-full px-2 py-1"
                style={{
                  background: config.branding.colors.accent,
                  color: config.branding.colors.void,
                }}
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