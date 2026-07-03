"use client";
import { useState } from "react";
import CastButton from "@/components/CastButton";
import ReceiverCanvas from "@/components/ReceiverCanvas";

export default function CastTest() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8" style={{ background: "#0B0F0E" }}>
      <div className="relative w-lg h-80 rounded-sm overflow-hidden" style={{ boxShadow: "inset 0 0 0 1px #C69A4B" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#C69A4B,#5A1E22)" }} />
        <ReceiverCanvas sessionId={sessionId} />
      </div>
      <CastButton onSessionStart={setSessionId} />
    </main>
  );
}