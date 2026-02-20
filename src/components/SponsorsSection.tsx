"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SPONSORS = [
  { name: "TechCorp", tier: "Title Sponsor", placeholder: "TC" },
  { name: "InnovateLab", tier: "Gold Sponsor", placeholder: "IL" },
  { name: "CloudBase", tier: "Gold Sponsor", placeholder: "CB" },
  { name: "DevStudio", tier: "Silver Sponsor", placeholder: "DS" },
  { name: "NexGen", tier: "Silver Sponsor", placeholder: "NG" },
  { name: "DataFlow", tier: "Silver Sponsor", placeholder: "DF" },
  { name: "CyberNet", tier: "Partner", placeholder: "CN" },
  { name: "StartupHub", tier: "Partner", placeholder: "SH" },
  { name: "MediaBlast", tier: "Media Partner", placeholder: "MB" },
  { name: "CreativeX", tier: "Creative Partner", placeholder: "CX" },
];

export default function SponsorsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="sponsors" className="relative py-24 lg:py-32 px-4">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,243,255,0.025) 0%, transparent 60%)" }} />

      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs tracking-[0.3em] uppercase" style={{ background: "rgba(255,215,0,0.06)", border: "1px solid rgba(255,215,0,0.2)", color: "#ffd700" }}>
            <span className="w-1 h-1 rounded-full bg-[#ffd700]" />
            Sponsors & Partners
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4" style={{ fontFamily: "var(--font-orbitron)" }}>
            <span className="text-white">Powered by</span>{" "}
            <span style={{ color: "#ffffff", textShadow: "0 0 20px rgba(0,243,255,0.5)" }}>Visionaries</span>
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto">
            The organizations that make Shaswat possible — leading companies and innovative startups investing in the future.
          </p>
        </motion.div>

        {/* Title Sponsor - featured */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.8 }} className="flex justify-center mb-12">
          <div className="relative flex flex-col items-center justify-center w-64 h-32 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,170,0,0.04))", border: "1px solid rgba(255,215,0,0.35)", boxShadow: "0 0 40px rgba(255,215,0,0.08)" }}>
            <div className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-orbitron)" }}>TC</div>
            <div className="text-xs text-white/50 mt-1">TechCorp</div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase" style={{ background: "rgba(255,215,0,0.15)", border: "1px solid rgba(255,215,0,0.5)", color: "#ffd700" }}>
              Title Sponsor
            </div>
          </div>
        </motion.div>

        {/* Gold & Silver sponsors grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.8 }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          {SPONSORS.slice(1).map((sponsor, i) => {
            const isGold = sponsor.tier === "Gold Sponsor";
            const isSilver = sponsor.tier === "Silver Sponsor";
            const color = isGold ? "#ffd700" : isSilver ? "#c0c0c0" : "rgba(255,255,255,0.3)";
            return (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 * i + 0.4, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.04 }}
                className="flex flex-col items-center justify-center p-5 rounded-xl cursor-default group"
                style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${color}20`, minHeight: "80px" }}
              >
                <div className="text-xl font-black text-white/50 group-hover:text-white/80 transition-colors" style={{ fontFamily: "var(--font-orbitron)" }}>{sponsor.placeholder}</div>
                <div className="text-[9px] text-white/25 mt-1 tracking-wider">{sponsor.tier}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Become a sponsor CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6, duration: 0.8 }} className="text-center mt-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-left">
              <p className="text-sm font-semibold text-white/80">Interested in sponsoring Shaswat?</p>
              <p className="text-xs text-white/40 mt-0.5">Reach 500+ college students. Gain massive brand visibility.</p>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="flex-shrink-0 px-6 py-2.5 text-xs font-bold tracking-widest uppercase rounded-lg" style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,215,0,0.08))", border: "1px solid rgba(255,215,0,0.4)", color: "#ffd700" }}>
              Partner With Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
