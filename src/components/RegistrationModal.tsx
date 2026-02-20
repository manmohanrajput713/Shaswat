"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Zap, Music, Crown, Diamond } from "lucide-react";
import type { Event } from "@/lib/events";

interface RegistrationModalProps {
  event: Event | null;
  onClose: () => void;
}

type PassType = "solo-particular" | "solo-gold" | "team-particular" | "team-diamond" | "concert-1" | "concert-3" | "concert-5" | "concert-7";

interface PassConfig {
  id: PassType;
  title: string;
  price: string;
  priceNum: number;
  desc: string;
  includes: string[];
  badge?: string;
  badgeColor?: string;
  glowColor: string;
  bgGradient: string;
  borderColor: string;
  icon: React.ReactNode;
  premium?: boolean;
}

export default function RegistrationModal({ event, onClose }: RegistrationModalProps) {
  const [selectedPass, setSelectedPass] = useState<PassType | null>(null);
  const [activeTab, setActiveTab] = useState<"solo" | "team" | "concert">(
    event?.type === "solo" ? "solo" : event?.type === "team" ? "team" : "solo"
  );

  useEffect(() => {
    if (event) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [event]);

  const soloPasses: PassConfig[] = [
    {
      id: "solo-particular",
      title: "Particular Pass",
      price: "₹49",
      priceNum: 49,
      desc: "Register for this single event",
      includes: [event?.name ?? "Selected Event"],
      glowColor: "#00f3ff",
      bgGradient: "linear-gradient(135deg, rgba(0,243,255,0.06), rgba(0,243,255,0.02))",
      borderColor: "rgba(0,243,255,0.25)",
      icon: <Zap size={20} />,
    },
    {
      id: "solo-gold",
      title: "Gold Pass",
      price: "₹350",
      priceNum: 350,
      desc: "The ultimate solo experience",
      includes: ["ALL Solo Events", "Concert Pass"],
      badge: "BEST VALUE",
      badgeColor: "#ffd700",
      glowColor: "#ffd700",
      bgGradient: "linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,170,0,0.04))",
      borderColor: "rgba(255,215,0,0.45)",
      icon: <Crown size={20} />,
      premium: true,
    },
  ];

  const teamPasses: PassConfig[] = [
    {
      id: "team-particular",
      title: "Team Particular",
      price: "₹130",
      priceNum: 130,
      desc: "Per team — register for this event",
      includes: [event?.name ?? "Selected Team Event"],
      glowColor: "#ff00ff",
      bgGradient: "linear-gradient(135deg, rgba(255,0,255,0.06), rgba(255,0,255,0.02))",
      borderColor: "rgba(255,0,255,0.25)",
      icon: <Star size={20} />,
    },
    {
      id: "team-diamond",
      title: "Diamond Super Pass",
      price: "₹1,499",
      priceNum: 1499,
      desc: "The apex team experience",
      includes: ["ALL Team Events", "Concert pass(all team member)"],
      badge: "ULTRA PREMIUM",
      badgeColor: "#a8d8ff",
      glowColor: "#64c8ff",
      bgGradient: "linear-gradient(135deg, rgba(100,200,255,0.08), rgba(100,200,255,0.02))",
      borderColor: "rgba(100,200,255,0.45)",
      icon: <Diamond size={20} />,
      premium: true,
    },
  ];

  const concertPasses: PassConfig[] = [
    {
      id: "concert-1",
      title: "Single Ticket",
      price: "₹199",
      priceNum: 199,
      desc: "1 concert entry",
      includes: ["Grand Concert Entry × 1"],
      glowColor: "#ff00ff",
      bgGradient: "linear-gradient(135deg, rgba(255,0,255,0.06), rgba(255,0,255,0.02))",
      borderColor: "rgba(255,0,255,0.2)",
      icon: <Music size={20} />,
    },
    {
      id: "concert-3",
      title: "Buy 3, Get 1 Free",
      price: "₹597",
      priceNum: 597,
      desc: "3+1 bundle — pay for 3, get 4",
      includes: ["Concert Entry × 4", "Save ₹199"],
      badge: "3+1 FREE",
      badgeColor: "#00f3ff",
      glowColor: "#00f3ff",
      bgGradient: "linear-gradient(135deg, rgba(0,243,255,0.06), rgba(0,243,255,0.02))",
      borderColor: "rgba(0,243,255,0.3)",
      icon: <Music size={20} />,
    },
    {
      id: "concert-5",
      title: "Buy 5, Get 2 Free",
      price: "₹995",
      priceNum: 995,
      desc: "5+2 bundle — pay for 5, get 7",
      includes: ["Concert Entry × 7", "Save ₹398"],
      badge: "5+2 FREE",
      badgeColor: "#ff00ff",
      glowColor: "#ff00ff",
      bgGradient: "linear-gradient(135deg, rgba(255,0,255,0.07), rgba(255,0,255,0.03))",
      borderColor: "rgba(255,0,255,0.35)",
      icon: <Music size={20} />,
    },
    {
      id: "concert-7",
      title: "Buy 7, Get 3 Free",
      price: "₹1,393",
      priceNum: 1393,
      desc: "7+3 bundle — pay for 7, get 10",
      includes: ["Concert Entry × 10", "Save ₹597", "Group Discount"],
      badge: "BEST DEAL 7+3",
      badgeColor: "#ffd700",
      glowColor: "#ffd700",
      bgGradient: "linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,170,0,0.04))",
      borderColor: "rgba(255,215,0,0.4)",
      icon: <Music size={20} />,
      premium: true,
    },
  ];

  const tabs = [
    { id: "solo" as const, label: "Solo", color: "#00f3ff" },
    { id: "team" as const, label: "Team", color: "#ff00ff" },
    { id: "concert" as const, label: "Concert", color: "#ffd700" },
  ];

  const currentPasses = activeTab === "solo" ? soloPasses : activeTab === "team" ? teamPasses : concertPasses;

  const handleConfirm = async () => {
    if (!selectedPass) return;
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: event?.id,
          passId: selectedPass,
        }),
      });

      if (response.ok) {
        alert(`Booking confirmed for: ${selectedPass}. Payment gateway coming soon!`);
      } else {
        alert('Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 overscroll-y-none"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", touchAction: "none" }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl overscroll-contain"
            style={{ background: "rgba(8,8,12,0.95)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(24px)", position: "relative" }}
            data-lenis-prevent="true"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between p-6 pb-4 rounded-t-2xl" style={{ background: "rgba(8,8,12,0.98)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div>
                <div className="text-xs tracking-[0.3em] text-white/40 uppercase mb-1">Registration</div>
                <h2 className="text-xl font-black text-white" style={{ fontFamily: "var(--font-orbitron)" }}>{event.name}</h2>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xl">{event.icon}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: event.track === "technical" ? "rgba(0,243,255,0.1)" : "rgba(255,0,255,0.1)", color: event.track === "technical" ? "#00f3ff" : "#ff00ff", border: `1px solid ${event.track === "technical" ? "rgba(0,243,255,0.3)" : "rgba(255,0,255,0.3)"}` }}>
                    {event.type === "solo" ? "Solo Event" : "Team Event"} · {event.track === "technical" ? "Technical" : "Cultural"} Track
                  </span>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {/* Pass type tabs */}
              <div className="flex gap-2 mb-6 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSelectedPass(null); }} className="flex-1 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all duration-300" style={activeTab === tab.id ? { background: `${tab.color}18`, border: `1px solid ${tab.color}40`, color: tab.color, boxShadow: `0 0 15px ${tab.color}15` } : { color: "rgba(255,255,255,0.35)", border: "1px solid transparent" }}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Pass cards */}
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-3 mb-6">
                {currentPasses.map((pass) => (
                  <motion.div
                    key={pass.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedPass(pass.id)}
                    className="relative p-5 rounded-xl cursor-pointer transition-all duration-300"
                    style={{
                      background: selectedPass === pass.id ? pass.bgGradient.replace("0.06", "0.12").replace("0.02", "0.06") : pass.bgGradient,
                      border: `1px solid ${selectedPass === pass.id ? pass.borderColor.replace("0.25", "0.7").replace("0.2", "0.6").replace("0.45", "0.8") : pass.borderColor}`,
                      boxShadow: selectedPass === pass.id ? `0 0 30px ${pass.glowColor}20` : "none",
                    }}
                  >
                    {/* Selection indicator */}
                    {selectedPass === pass.id && (
                      <div className="absolute top-3 left-3 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: pass.glowColor }}>
                        <div className="w-2 h-2 rounded-full bg-black" />
                      </div>
                    )}
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5" style={{ color: pass.glowColor }}>{pass.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-sm text-white" style={{ fontFamily: "var(--font-orbitron)", paddingLeft: selectedPass === pass.id ? "1.5rem" : "0" }}>{pass.title}</h3>
                          <div className="flex flex-col items-end text-right">
                            {pass.badge && (
                              <div className="px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase mb-1.5" style={{ background: `${pass.badgeColor}20`, border: `1px solid ${pass.badgeColor}50`, color: pass.badgeColor }}>
                                {pass.badge}
                              </div>
                            )}
                            <div className="text-xl font-black" style={{ color: pass.glowColor, fontFamily: "var(--font-orbitron)", lineHeight: 1 }}>{pass.price}</div>
                            {pass.id === "team-particular" && <div className="text-[9px] text-white/40 mt-1">per team</div>}
                          </div>
                        </div>
                        <p className="text-xs text-white/40 mb-2">{pass.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {pass.includes.map((item) => (
                            <span key={item} className="text-[10px] px-2 py-0.5 rounded-full text-white/60" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                              ✓ {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Confirm button */}
              <motion.button
                whileHover={selectedPass ? { scale: 1.02, boxShadow: "0 0 40px rgba(0,243,255,0.4)" } : {}}
                whileTap={selectedPass ? { scale: 0.98 } : {}}
                onClick={handleConfirm}
                disabled={!selectedPass}
                className="w-full py-4 text-sm font-black tracking-[0.2em] uppercase rounded-xl transition-all duration-300"
                style={
                  selectedPass
                    ? { background: "linear-gradient(135deg, #00f3ff, #0099ff)", color: "#050505", boxShadow: "0 0 30px rgba(0,243,255,0.3)" }
                    : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.06)", cursor: "not-allowed" }
                }
              >
                {selectedPass ? "Confirm & Proceed to Payment" : "Select a Pass to Continue"}
              </motion.button>

              <p className="text-center text-xs text-white/25 mt-3 tracking-wider">Secure payment · Instant confirmation</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
