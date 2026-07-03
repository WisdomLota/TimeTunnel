"use client";
import ReceiverCanvas from "@/components/ReceiverCanvas";

export default function ReceiverTest() {
  return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: "#0B0F0E" }}>
      <div className="relative w-96 h-72 rounded-sm overflow-hidden"
           style={{ boxShadow: "inset 0 0 0 1px #C69A4B" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#C69A4B,#5A1E22)" }} />
        <ReceiverCanvas sessionId="test123" />
      </div>
    </main>
  );
}