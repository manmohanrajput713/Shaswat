"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const SOCIAL_LINKS = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

const QUICK_LINKS = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Contact", href: "#contact" },
];

const POLICY_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Refund Policy", href: "#" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative pt-20 pb-8 px-4">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, #00f3ff40 30%, #ff00ff40 70%, transparent 100%)" }} />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,243,255,0.03) 0%, transparent 50%)" }} />

      <div className="max-w-7xl mx-auto">
        {/* Big CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative text-center mb-20 py-14 px-6 rounded-2xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(0,243,255,0.06), rgba(255,0,255,0.06))", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#00f3ff]/30" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#00f3ff]/30" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#ff00ff]/30" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#ff00ff]/30" />

          <div className="text-xs tracking-[0.4em] text-white/40 uppercase mb-3">Limited Slots Available</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ fontFamily: "var(--font-orbitron)" }}>
            <span style={{ color: "#ffffff", textShadow: "0 0 20px rgba(255,255,255,0.6)" }}>BOOK YOUR SLOTS NOW</span>
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto mb-8">
            Don&apos;t miss the eternal quest. Register for events, grab your concert tickets, and be part of history.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,168,176,0.5)" }} whileTap={{ scale: 0.97 }} onClick={() => scrollTo("#events")} className="px-8 py-4 text-sm font-black tracking-[0.2em] uppercase rounded-xl" style={{ backgroundColor: "#008b8b", color: "#ffffff", border: "1px solid #00f3ff", boxShadow: "0 0 20px rgba(0,243,255,0.3)" }}>
              Register for Events
            </motion.button>
            <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }} whileTap={{ scale: 0.97 }} onClick={() => scrollTo("#events")} className="px-8 py-4 text-sm font-black tracking-[0.2em] uppercase rounded-xl" style={{ backgroundColor: "transparent", color: "#ffffff", border: "1px solid rgba(255,255,255,0.4)" }}>
              Buy Concert Tickets
            </motion.button>
          </div>
        </motion.div>

        {/* Footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center">
              </div>
              <div>
                <div className="font-black text-base tracking-widest" style={{ fontFamily: "var(--font-orbitron)", color: "#ffffff", textShadow: "0 0 10px rgba(0,243,255,0.5)" }}>SHASWAT 2.0</div>
                <div className="text-[8px] text-white/30 tracking-[0.2em] uppercase">The Eternal Quest</div>
              </div>
            </div>
            <p className="text-xs text-white/35 leading-relaxed mb-5">
              Annual technical & cultural fest celebrating innovation, creativity, and human expression.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} aria-label={label} className="w-9 h-9 flex items-center justify-center rounded-lg text-white/40 hover:text-[#00f3ff] transition-colors duration-200" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <button onClick={() => scrollTo(link.href)} className="text-sm text-white/50 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-4">Policies</h4>
            <ul className="space-y-2.5">
              {POLICY_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/50">
                <Mail size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#ffffff" }} />
                <span>shaswat@college.edu</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/50">
                <Phone size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#ffffff" }} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/50">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#ffffff" }} />
                <span>Main Auditorium, College Campus</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-xs text-white/20 tracking-wider">
            © 2026 Shaswat. All rights reserved.
          </p>
          <p className="text-xs text-white/20 tracking-wider">
            Made with{" "}
            <span style={{ color: "#ff00ff" }}>♥</span>
            {" "}by the Fest Committee
          </p>
        </div>
      </div>
    </footer>
  );
}
