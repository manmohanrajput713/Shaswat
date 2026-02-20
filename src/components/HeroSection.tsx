"use client";

import { motion } from "framer-motion";

interface HeroSectionProps {
  onExploreClick: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none border-b border-[#00f3ff]/10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-[0.55]"
        >
          <source src="/gallery-bg.mp4" type="video/mp4" />
        </video>
        {/* Layer to blend the video with the dark background while highlighting the text */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/60 to-[#050505]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto flex flex-col items-center justify-center w-full">
        {/* Fest date badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-[0.3em] font-medium uppercase" style={{ background: "rgba(0,243,255,0.08)", border: "1px solid rgba(0,243,255,0.3)", color: "#00f3ff" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] animate-pulse" />
          Annual Technical & Cultural Fest
        </motion.div>

        {/* Main title */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="w-full">
          <h1 className="font-orbitron font-black leading-none tracking-[0.1em] sm:tracking-[0.15em] select-none mr-[-0.1em] sm:mr-[-0.15em]" style={{ fontFamily: "var(--font-orbitron)" }}>
            <span className="block text-[clamp(2.5rem,11vw,9.5rem)] whitespace-nowrap" style={{ color: "#ffffff", filter: "drop-shadow(0 0 15px rgba(0,243,255,0.4)) drop-shadow(0 0 30px rgba(255,0,255,0.2))" }}>
              SHASWAT 2.0
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }} className="mt-4 text-base sm:text-xl lg:text-2xl text-white/50 tracking-[0.2em] uppercase font-light">
          The Eternal Quest for{" "}
          <span style={{ color: "#00f3ff" }}>Innovation</span>
          {" "}&{" "}
          <span style={{ color: "#ff00ff" }}>Culture</span>
        </motion.p>

        {/* Divider line */}
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.1, duration: 1 }} className="my-8 mx-auto w-48 h-px" style={{ background: "linear-gradient(90deg, transparent, #00f3ff, #ff00ff, transparent)" }} />

        {/* Stats row */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="flex flex-wrap justify-center gap-8 mb-10">
          {[
            { value: "14+", label: "Events" },
            { value: "3", label: "Days" },
            { value: "∞", label: "Memories" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold font-orbitron" style={{ fontFamily: "var(--font-orbitron)", color: "#00f3ff" }}>
                {stat.value}
              </div>
              <div className="text-xs text-white/40 tracking-[0.2em] uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8 }} className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto px-4 sm:px-0">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,168,176,0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-[0.2em] uppercase rounded-lg"
            style={{ backgroundColor: "#008b8b", color: "#ffffff", border: "1px solid #00f3ff" }}
          >
            REGISTER
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-[0.2em] uppercase rounded-lg"
            style={{ backgroundColor: "transparent", color: "#ffffff", border: "1px solid rgba(255,255,255,0.4)" }}
          >
            BUY TICKETS
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="mt-16 flex flex-col items-center gap-2">
          <span className="text-xs text-white/25 tracking-[0.3em] uppercase">Scroll to explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-px h-12" style={{ background: "linear-gradient(to bottom, #00f3ff, transparent)" }} />
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-24 left-8 w-16 h-16 border-l-2 border-t-2 border-[#00f3ff]/20 pointer-events-none" />
      <div className="absolute top-24 right-8 w-16 h-16 border-r-2 border-t-2 border-[#00f3ff]/20 pointer-events-none" />
      <div className="absolute bottom-24 left-8 w-16 h-16 border-l-2 border-b-2 border-[#ff00ff]/20 pointer-events-none" />
      <div className="absolute bottom-24 right-8 w-16 h-16 border-r-2 border-b-2 border-[#ff00ff]/20 pointer-events-none" />
    </section>
  );
}
