"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useMuseum } from "@/lib/museums/context";
import { watchPresence } from "@/lib/museums/presence";
import { mintSession } from "@/lib/tunnel";

export default function MuseumScreenPage() {
  const config = useMuseum();
  const [sessionId, setSessionId] = useState("");
  useEffect(() => { setSessionId(mintSession()); }, []);
  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set());

  useEffect(() => {
    const channel = watchPresence(config.slug, setActiveLayers);
    return () => { channel.unsubscribe(); };
  }, [config.slug]);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const controlUrl = `${origin}/m/${config.slug}/control/${sessionId}`;
  const categories = config.categories;

  return (
    <div
      className="relative flex h-dvh w-full overflow-hidden"
      style={{ fontFamily: config.branding.font || "Chakra Petch" }}
    >
      {/* Background — Prof Dux anchored left */}
      <div
        className="absolute inset-0 flex items-end justify-start pointer-events-none"
        style={{ paddingLeft: "5%" }}
      >
        <img
          src="/museums/prof-dux.png"
          alt=""
          className="h-[80%] w-auto object-contain opacity-80"
          style={{
            maskImage: "linear-gradient(to top, black 50%, transparent 90%), linear-gradient(to left, transparent 0%, black 20%)",
            WebkitMaskImage: "linear-gradient(to top, black 50%, transparent 90%), linear-gradient(to left, transparent 0%, black 20%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "destination-in",
          }}
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, ${config.branding.colors.void}77 0%, ${config.branding.colors.void}aa 50%, ${config.branding.colors.void}cc 100%)`,
        }}
      />

      {/* ─── LEFT: Discover + single QR ─── */}
      <div className="relative z-10 w-[38%] flex flex-col justify-center pl-[4%] pr-2">
        <p className="text-sm tracking-[0.4em] uppercase opacity-60 text-white">
          Discover with
        </p>
        <h1
          className="text-3xl font-bold tracking-widest uppercase mt-1"
          style={{ color: config.branding.colors.accent }}
        >
          Prof DUX
        </h1>
        <p className="text-sm tracking-[0.4em] uppercase opacity-60 text-white mt-1">
          ile keşfet
        </p>

        {sessionId && (
          <motion.div
            className="mt-6 self-start rounded-xl p-2 bg-white"
            style={{
              boxShadow: `0 0 30px ${config.branding.colors.accent}33`,
            }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <QRCodeSVG
              value={controlUrl}
              size={140}
              bgColor="#ffffff"
              fgColor="#000000"
              level="M"
            />
          </motion.div>
        )}

        <p className="text-[9px] tracking-[0.2em] uppercase opacity-30 text-white mt-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          Scan to explore · Keşfetmek için tarayın
        </p>
      </div>

      {/* ─── RIGHT: Category rings ─── */}
      <div className="relative z-10 w-[62%] flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url(/museums/teal/teal-background.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage: "radial-gradient(circle at center, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 70%)",
          }}
        />

        <div className="relative flex items-center justify-center">
          {categories.map((cat, i) => {
            const isActive = activeLayers.has(cat.id);
            const size = 160 + i * 55;
            const radius = size / 2;

            return (
              <motion.div
                key={cat.id}
                className="absolute"
                style={{ width: size, height: size }}
                animate={{
                  opacity: isActive ? [0.7, 1, 0.7] : 1,
                  scale: isActive ? [1, 1.012, 1] : 1,
                }}
                transition={{
                  duration: isActive ? 2.5 : 0.6,
                  repeat: isActive ? Infinity : 0,
                  ease: "easeInOut",
                }}
              >
                <svg
                  viewBox={`0 0 ${size} ${size}`}
                  className="w-full h-full"
                  overflow="visible"
                >
                  <circle
                    cx={radius}
                    cy={radius}
                    r={radius - 3}
                    fill="none"
                    stroke={cat.color}
                    strokeWidth={isActive ? 5 : 2.5}
                    opacity={isActive ? 1 : 0.4}
                    filter={isActive ? `drop-shadow(0 0 10px ${cat.color})` : "none"}
                  />
                  <defs>
                    <path
                      id={`arc-${cat.id}`}
                      d={`M ${radius - (radius - 3)},${radius} A ${radius - 3},${radius - 3} 0 0,1 ${radius + (radius - 3)},${radius}`}
                      fill="none"
                    />
                  </defs>
                  <text
                    fill={cat.color}
                    opacity={isActive ? 1 : 0.75}
                    fontSize={11}
                    fontFamily={config.branding.font || "Chakra Petch"}
                    fontWeight={600}
                    letterSpacing="0.15em"
                    style={{ filter: "drop-shadow(0 0 4px rgba(0,0,0,0.9))" }}
                  >
                    <textPath
                      href={`#arc-${cat.id}`}
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      {cat.label.en.toUpperCase()} / {cat.label.tr.toLocaleUpperCase("tr")}
                    </textPath>
                  </text>
                </svg>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Logo — bottom left */}
      {config.branding.logo && (
        <img
          src={config.branding.logo}
          alt={config.name}
          className="absolute bottom-4 left-6 h-10 w-auto object-contain z-10"
        />
      )}

      {/* Name — bottom right */}
      <div className="absolute bottom-4 right-6 text-right z-10">
        <p
          className="text-sm font-bold tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          style={{ color: config.branding.colors.accent }}
        >
          {config.name}
        </p>
      </div>
    </div>
  );
}