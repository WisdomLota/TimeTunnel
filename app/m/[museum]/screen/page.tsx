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

  return (
    <div
      className="relative flex h-dvh w-full overflow-hidden"
      style={{ fontFamily: config.branding.font || "Chakra Petch" }}
    >
      {/* Background — Prof Dux, positioned right & low to not dominate */}
      <div
        className="absolute inset-0 flex items-end justify-start pointer-events-none"
        style={{ paddingLeft: "5%" }}
      >
        <img
          src="/museums/prof-dux.png"
          alt=""
          className="h-[80%] w-auto object-contain opacity-60"
          style={{
            maskImage: "linear-gradient(to top, black 50%, transparent 90%), linear-gradient(to left, transparent 0%, black 20%)",
            WebkitMaskImage: "linear-gradient(to top, black 50%, transparent 90%), linear-gradient(to left, transparent 0%, black 20%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "destination-in",
          }}
        />
      </div>

      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, ${config.branding.colors.void}99 0%, ${config.branding.colors.void}cc 50%, ${config.branding.colors.void}dd 100%)`,
        }}
      />

      {/* ─── LEFT: Discover + QR ─── */}
      <div className="relative z-10 w-[35%] flex flex-col justify-center pl-[5%] pr-4">
        <p className="text-base tracking-[0.4em] uppercase opacity-60 text-white">
          Discover with
        </p>
        <h1
          className="text-4xl font-bold tracking-widest uppercase mt-1"
          style={{ color: config.branding.colors.accent }}
        >
          Prof DUX
        </h1>
        <p className="text-base tracking-[0.4em] uppercase opacity-60 text-white mt-1">
          ile keşfet
        </p>

        {sessionId && (
          <motion.div
            className="mt-6 rounded-2xl p-3 self-start"
            style={{
              background: `${config.branding.colors.void}cc`,
              border: `1px solid ${config.branding.colors.accent}44`,
              boxShadow: `0 0 30px ${config.branding.colors.accent}22`,
            }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <QRCodeSVG
              value={controlUrl}
              size={140}
              bgColor="transparent"
              fgColor={config.branding.colors.accent}
              level="M"
            />
          </motion.div>
        )}

        <p className="text-[11px] tracking-[0.2em] uppercase opacity-40 text-white mt-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          Scan to be drawn into our time tunnel
        </p>
        <p className="text-[9px] tracking-[0.2em] uppercase opacity-25 text-white mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          Zaman tünelimize çekilmek için tarayın
        </p>
      </div>

      {/* ─── RIGHT: Memory rings ─── */}
      <div className="relative z-10 w-[65%] flex items-center justify-center">
        {/* Ship image behind rings */}
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
          {config.layers.map((layer, i) => {
            const isActive = activeLayers.has(layer.id);
            // Scale rings based on viewport height for 4:3 compat
            const size = 180 + i * 60;
            const radius = size / 2;

            return (
              <motion.div
                key={layer.id}
                className="absolute"
                style={{ width: `${size}px`, height: `${size}px` }}
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
                    stroke={layer.color}
                    strokeWidth={isActive ? 5 : 2.5}
                    opacity={isActive ? 1 : 0.4}
                    filter={isActive ? `drop-shadow(0 0 10px ${layer.color})` : "none"}
                  />

                  <defs>
                    <path
                      id={`arc-${layer.id}`}
                      d={`M ${radius - (radius - 3)},${radius} A ${radius - 3},${radius - 3} 0 0,1 ${radius + (radius - 3)},${radius}`}
                      fill="none"
                    />
                  </defs>
                  <text
                    fill={layer.color}
                    opacity={isActive ? 1 : 0.75}
                    fontSize={11}
                    fontFamily={config.branding.font || "Chakra Petch"}
                    fontWeight={600}
                    letterSpacing="0.15em"
                    style={{ filter: "drop-shadow(0 0 4px rgba(0,0,0,0.9))" }}
                  >
                    <textPath
                      href={`#arc-${layer.id}`}
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      {layer.label.en.toUpperCase()} / {layer.label.tr.toLocaleUpperCase("tr")} · {layer.yearRange[0]}–{layer.yearRange[1]}
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