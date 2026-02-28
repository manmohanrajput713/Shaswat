"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CULTURAL_EVENTS, TECHNICAL_EVENTS, type Event } from "@/lib/events";

import { Info } from "lucide-react";
import EventDetailsModal from "./EventDetailsModal";

interface EventCardProps {
  event: Event;
  onRegister: (event: Event) => void;
  onDetails: (event: Event) => void;
  index: number;
}

function EventCard({ event, onRegister, onDetails, index }: EventCardProps) {
  const isBlue = event.track === "technical";
  const accentColor = isBlue ? "#00f3ff" : "#ff00ff";
  const bgColor = isBlue ? "rgba(0,243,255,0.08)" : "rgba(255,0,255,0.08)";
  const borderColor = isBlue ? "rgba(0,243,255,0.2)" : "rgba(255,0,255,0.2)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.6 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative flex-shrink-0 w-60 sm:w-64 p-5 rounded-2xl cursor-default group"
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
        willChange: "transform"
      }}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: `0 0 30px ${accentColor}20`, background: `radial-gradient(circle at 50% 0%, ${accentColor}08, transparent 70%)`, willChange: "opacity" }} />

      {/* Info Button */}
      <button
        onClick={() => onDetails(event)}
        className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-white/40 hover:text-white transition-colors"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        title="Event Details"
      >
        <Info size={16} />
      </button>

      {/* Event icon */}
      <div className="text-3xl mb-3">{event.icon}</div>

      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase" style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}30`, color: accentColor }}>
        <span className="w-1 h-1 rounded-full" style={{ background: accentColor }} />
        {event.type === "solo" ? "Solo Event" : "Team Event"}
      </div>

      {/* Name */}
      <h3 className="font-bold text-base text-white mb-2 leading-tight" style={{ fontFamily: "var(--font-orbitron)" }}>{event.name}</h3>

      {/* Description */}
      <p className="text-xs text-white/45 leading-relaxed mb-4">{event.description}</p>

      {/* Prize */}
      {event.prize && (
        <div className="text-xs mb-4" style={{ color: "#ffd700" }}>
          🏆 Prize: <span className="font-semibold">{event.prize}</span>
        </div>
      )}

      {/* Register button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onRegister(event)}
        className="w-full py-2.5 text-xs font-bold tracking-widest uppercase rounded-lg transition-all duration-300"
        style={{ background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`, border: `1px solid ${accentColor}40`, color: accentColor }}
      >
        Register
      </motion.button>
    </motion.div>
  );
}

interface EventsHubProps {
  onRegister: (event: Event) => void;
}

export default function EventsHub({ onRegister }: EventsHubProps) {
  const [activeTrack, setActiveTrack] = useState<"cultural" | "technical">("technical");
  const [selectedDetailsEvent, setSelectedDetailsEvent] = useState<Event | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const scrollRef = useRef<HTMLDivElement>(null);

  const events = activeTrack === "cultural" ? CULTURAL_EVENTS : TECHNICAL_EVENTS;

  return (
    <section id="events" className="relative py-24 lg:py-36 px-4">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(255,0,255,0.04) 0%, transparent 60%)" }} />

      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs tracking-[0.3em] uppercase" style={{ background: "rgba(255,0,255,0.06)", border: "1px solid rgba(255,0,255,0.2)", color: "#ff00ff" }}>
            <span className="w-1 h-1 rounded-full bg-[#ff00ff]" />
            Events Hub
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4" style={{ fontFamily: "var(--font-orbitron)" }}>
            <span style={{ color: "#ffffff", textShadow: "0 0 20px rgba(255,255,255,0.6)" }}>Choose Your</span>
            <span className="text-white ml-3" style={{ textShadow: "0 0 20px rgba(0,243,255,0.5)" }}>Arena</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Two worlds of competition. One eternal quest. Pick your path and leave your mark.
          </p>
        </motion.div>

        {/* Track Toggle */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.8 }} className="flex justify-center mb-12">
          <div className="relative flex p-1 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {/* Sliding indicator */}
            <motion.div
              layout
              className="absolute top-1 bottom-1 rounded-xl"
              style={{
                width: "calc(50% - 4px)",
                left: activeTrack === "technical" ? "4px" : "calc(50%)",
                background: activeTrack === "technical" ? "linear-gradient(135deg, rgba(0,243,255,0.2), rgba(0,243,255,0.1))" : "linear-gradient(135deg, rgba(255,0,255,0.2), rgba(255,0,255,0.1))",
                border: `1px solid ${activeTrack === "technical" ? "rgba(0,243,255,0.4)" : "rgba(255,0,255,0.4)"}`,
                boxShadow: activeTrack === "technical" ? "0 0 20px rgba(0,243,255,0.2)" : "0 0 20px rgba(255,0,255,0.2)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            {[
              { id: "technical" as const, label: "Technical Track", icon: "⚡", color: "#00f3ff" },
              { id: "cultural" as const, label: "Cultural Track", icon: "🎭", color: "#ff00ff" },
            ].map((track) => (
              <button
                key={track.id}
                onClick={() => { setActiveTrack(track.id); scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" }); }}
                className="relative z-10 flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wider transition-colors duration-300 rounded-xl"
                style={{ color: activeTrack === track.id ? track.color : "rgba(255,255,255,0.4)", fontFamily: "var(--font-orbitron)" }}
              >
                <span>{track.icon}</span>
                <span className="hidden sm:inline">{track.label}</span>
                <span className="sm:hidden">{track.id === "technical" ? "Technical" : "Cultural"}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Track description */}
        <motion.div
          key={activeTrack}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <p className="text-sm text-white/40 tracking-widest uppercase">
            {activeTrack === "technical" ? "⚡ Technical Track — Battle of Minds" : "🎭 Cultural Track — Expression Unleashed"}
          </p>
        </motion.div>

        {/* Horizontal scroll cards */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(5,5,5,0.8), transparent)" }} />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, rgba(5,5,5,0.8), transparent)" }} />

          <motion.div
            key={activeTrack}
            ref={scrollRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex gap-5 overflow-x-auto pb-6 px-4 scroll-smooth"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0,243,255,0.3) transparent", WebkitOverflowScrolling: "touch" }}
          >
            {events.map((event, i) => (
              <EventCard key={event.id} event={event} onRegister={onRegister} onDetails={(e) => setSelectedDetailsEvent(e)} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="text-center mt-4">
          <span className="text-xs text-white/25 tracking-[0.2em] uppercase">← Scroll to see all events →</span>
        </div>


      </div>

      <EventDetailsModal event={selectedDetailsEvent} onClose={() => setSelectedDetailsEvent(null)} onRegister={onRegister} />
    </section>
  );
}
