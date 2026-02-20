"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onLoginClick }: { onLoginClick?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthClick = () => {
    if (session) {
      supabase.auth.signOut();
    } else {
      if (onLoginClick) onLoginClick();
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-2xl bg-black/60 border-b border-white/5" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => handleNavClick("#home")}
          >
            <div className="relative w-10 h-10 lg:w-16 lg:h-16 -ml-2 flex items-center justify-center">
            </div>
            <div>
              <span className="font-orbitron text-lg lg:text-xl font-black tracking-widest" style={{ fontFamily: "var(--font-orbitron)", color: "#ffffff", textShadow: "0 0 10px rgba(0,243,255,0.5)" }}>
                SHASWAT <span style={{ color: "#00f3ff" }}>2.0</span>
              </span>
              <div className="text-[9px] text-white/40 tracking-[0.25em] uppercase font-light -mt-0.5">The Eternal Quest</div>
            </div>
          </motion.div>
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button key={link.href} onClick={() => handleNavClick(link.href)} className="relative px-4 py-2 text-sm text-white/60 hover:text-white transition-colors duration-200 group font-medium tracking-wider">
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#00f3ff] group-hover:w-4/5 transition-all duration-300" />
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={handleAuthClick} className="px-5 py-2 text-sm font-semibold rounded-full tracking-wider" style={{ background: "linear-gradient(135deg,#00f3ff20,#ff00ff20)", border: "1px solid #00f3ff60", color: "#00f3ff", boxShadow: "0 0 20px rgba(0,243,255,0.15)" }}>
              {session ? "LOGOUT" : "LOGIN"}
            </motion.button>
          </div>
          <button className="md:hidden text-white/70 hover:text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-white/5" style={{ background: "rgba(5,5,5,0.95)", backdropFilter: "blur(24px)" }}>
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <button key={link.href} onClick={() => handleNavClick(link.href)} className="block w-full text-left px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors tracking-wider text-sm">
                  {link.label}
                </button>
              ))}
              <div className="pt-2">
                <button onClick={() => { setMenuOpen(false); handleAuthClick(); }} className="w-full py-3 text-sm font-semibold rounded-lg tracking-wider" style={{ background: "linear-gradient(135deg,#00f3ff15,#ff00ff15)", border: "1px solid #00f3ff50", color: "#00f3ff" }}>
                  {session ? "LOGOUT" : "LOGIN"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
