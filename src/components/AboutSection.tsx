"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

const FEATURES = [
  { icon: "⚡", label: "Technical Events", desc: "Coding battles, quizzes, case studies & workshops", color: "#00f3ff" },
  { icon: "🎭", label: "Cultural Events", desc: "Music, dance, art, fashion & much more", color: "#ff00ff" },
  { icon: "🏆", label: "Prizes Worth ₹1L+", desc: "Compete for glory and massive prize pools", color: "#ffffff" },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="about" className="relative py-24 lg:py-36 px-4">
      {/* Subtle gradient backdrop */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,243,255,0.03) 0%, transparent 70%)" }} />

      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-center mb-16">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs tracking-[0.3em] uppercase" style={{ background: "rgba(0,243,255,0.06)", border: "1px solid rgba(0,243,255,0.2)", color: "#00f3ff" }}>
            <span className="w-1 h-1 rounded-full bg-[#00f3ff]" />
            About the Fest
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6" style={{ fontFamily: "var(--font-orbitron)" }}>
            <span style={{ color: "#ffffff", textShadow: "0 0 20px rgba(255,255,255,0.6)" }}>What is</span>
            <span className="ml-4 text-white" style={{ textShadow: "0 0 20px rgba(0,243,255,0.5)" }}>Shaswat 2.0?</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed text-white/60">
            <span className="text-white font-medium">Shaswat 2.0</span> — meaning{" "}
            <span className="italic" style={{ color: "#00f3ff" }}>"eternal"</span> in Sanskrit — is our college&apos;s flagship annual fest where the boundaries of technology and culture dissolve. For three electrifying days, the brightest minds, most creative artists, and sharpest innovators converge to compete, collaborate, and celebrate.
          </motion.p>
          <motion.p variants={itemVariants} className="max-w-2xl mx-auto mt-4 text-base text-white/40 leading-relaxed">
            This is not just a fest. It&apos;s a movement. A declaration that innovation and expression are eternal — unstoppable forces that define our generation.
          </motion.p>
        </motion.div>

        {/* Feature cards */}
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {FEATURES.map((f) => (
            <motion.div key={f.label} variants={itemVariants} whileHover={{ y: -6, scale: 1.02 }} className="relative p-6 rounded-2xl text-center cursor-default" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${f.color}25`, boxShadow: `0 0 30px ${f.color}10` }}>
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold tracking-wide mb-2" style={{ color: f.color, fontFamily: "var(--font-orbitron)" }}>{f.label}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px" style={{ background: `linear-gradient(90deg, transparent, ${f.color}60, transparent)` }} />
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline / key facts */}
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, #00f3ff50, #ff00ff50, transparent)" }} />
          <div className="space-y-12">
            {[
              { side: "left", title: "Day 1 – Ignition", body: "Opening ceremony, technical workshops, and the first wave of competitive events kick off.", color: "#00f3ff" },
              { side: "right", title: "Day 2 – Apex", body: "Cultural performances peak alongside intense coding battles, case study presentations, and quiz finals.", color: "#ff00ff" },
              { side: "left", title: "Day 3 – Legacy", body: "Grand finale events, prize distribution, and a star-studded concert to close out the eternal quest.", color: "#ffffff" },
            ].map((item, i) => (
              <motion.div key={i} variants={itemVariants} className={`flex ${item.side === "right" ? "flex-row-reverse" : "flex-row"} items-center gap-6`}>
                <div className={`flex-1 ${item.side === "right" ? "text-left" : "text-right"}`}>
                  <div className="inline-block p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${item.color}20` }}>
                    <h4 className="font-bold text-lg mb-2 font-orbitron" style={{ color: item.color, fontFamily: "var(--font-orbitron)" }}>{item.title}</h4>
                    <p className="text-sm text-white/50 leading-relaxed max-w-xs">{item.body}</p>
                  </div>
                </div>
                <div className="relative z-10 w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.color, boxShadow: `0 0 12px ${item.color}` }} />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
