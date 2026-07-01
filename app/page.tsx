"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import CarWall from "@/components/CarWall";
import Nav from "@/components/Nav";

export default function Page() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <section id="collection">
        <CarWall />
      </section>

      <AnimatePresence>
        {entered && <Nav key="nav" onReturn={() => setEntered(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!entered && <Hero key="hero" onEnter={() => setEntered(true)} />}
      </AnimatePresence>
    </>
  );
}