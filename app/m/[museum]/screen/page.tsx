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
      {/* Background — Prof Dux image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/museums/prof-dux.png)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute"
        style={{
          background: `radial-gradient(ellipse at center, ${config.branding.colors.void}cc 0%, ${config.branding.colors.void}ee 70%)`,
        }}
      />

      {/* ─── LEFT SIDE: Discover text + QR ─── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pl-16 pr-4">
        <p
          className="text-lg tracking-[0.4em] uppercase opacity-60 text-white"
        >
          Discover with
        </p>
        <h1
          className="text-5xl font-bold tracking-widest uppercase mt-2"
          style={{ color: config.branding.colors.accent }}
        >
          Prof DUX
        </h1>
        <p
          className="text-lg tracking-[0.4em] uppercase opacity-60 text-white mt-2"
        >
          ile keşfet
        </p>

        {/* QR */}
        {sessionId && (
          <motion.div
            className="mt-8 rounded-2xl p-4"
            style={{
              background: `${config.branding.colors.void}cc`,
              border: `1px solid ${config.branding.colors.accent}44`,
              boxShadow: `0 0 40px ${config.branding.colors.accent}22`,
            }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <QRCodeSVG
              value={controlUrl}
              size={160}
              bgColor="transparent"
              fgColor={config.branding.colors.accent}
              level="M"
            />
          </motion.div>
        )}

        <p className="text-xs tracking-[0.3em] uppercase opacity-40 text-white mt-4">
          Scan to be drawn into our time tunnel
        </p>
        <p className="text-[10px] tracking-[0.3em] uppercase opacity-25 text-white mt-1">
          Zaman tünelimize çekilmek için tarayın
        </p>
      </div>

      {/* ─── RIGHT SIDE: Memory rings ─── */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        {/* Ship image behind rings */}
        <div
          className="absolute inset-0 opacity-15"
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
            const size = 250 + i * 75;
            const radius = size / 2;

            return (
              <motion.div
                key={layer.id}
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
                    stroke={layer.color}
                    strokeWidth={isActive ? 6 : 3}
                    opacity={isActive ? 1 : 0.35}
                    filter={isActive ? `drop-shadow(0 0 12px ${layer.color})` : "none"}
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
                    fontSize={15}
                    fontFamily={config.branding.font || "Chakra Petch"}
                    fontWeight={600}
                    letterSpacing="0.2em"
                    style={{ filter: "drop-shadow(0 0 4px rgba(0,0,0,0.8))" }}
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
          className="absolute bottom-6 left-8 h-12 w-auto object-contain z-10"
        />
      )}

      {/* Name — bottom right */}
      <div className="absolute bottom-6 right-8 text-right z-10">
        <p
          className="text-base font-bold tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          style={{ color: config.branding.colors.accent }}
        >
          {config.name}
        </p>
      </div>
    </div>
  );
}