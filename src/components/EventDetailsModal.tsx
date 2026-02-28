"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText } from "lucide-react";
import type { Event } from "@/lib/events";

interface EventDetailsModalProps {
    event: Event | null;
    onClose: () => void;
    onRegister: (event: Event) => void;
}

export default function EventDetailsModal({ event, onClose, onRegister }: EventDetailsModalProps) {
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
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl overscroll-contain flex flex-col md:flex-row"
                        style={{ background: "rgba(8,8,12,0.95)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(24px)" }}
                        data-lenis-prevent="true"
                    >
                        {/* Close Button Mobile */}
                        <button onClick={onClose} className="md:hidden absolute top-4 right-4 z-20 p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors bg-black/50 backdrop-blur-md">
                            <X size={20} />
                        </button>

                        {/* Left: Poster */}
                        <div className="w-full md:w-2/5 md:min-h-[500px] flex-shrink-0 relative bg-black/50 border-b md:border-b-0 md:border-r border-white/5 flex items-center justify-center p-6 lg:p-10">
                            {event.poster ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={event.poster} alt={`${event.name} Poster`} className="w-full h-auto max-h-[60vh] md:max-h-full object-contain rounded-xl shadow-2xl" />
                            ) : (
                                <div className="w-full aspect-[3/4] rounded-xl flex flex-col items-center justify-center text-white/20 border-2 border-dashed border-white/10" style={{ background: "rgba(255,255,255,0.02)" }}>
                                    <div className="text-6xl mb-4">{event.icon}</div>
                                    <p className="text-sm uppercase tracking-widest font-semibold">Poster Pending</p>
                                </div>
                            )}
                        </div>

                        {/* Right: Overview */}
                        <div className="w-full md:w-3/5 p-6 md:p-8 lg:p-10 flex flex-col">
                            <div className="flex justify-between items-start mb-6 hidden md:flex">
                                <div />
                                <button onClick={onClose} className="p-2 -mr-2 -mt-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1">
                                <div className="text-xs tracking-[0.3em] text-white/40 uppercase mb-2 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: event.track === "technical" ? "#00f3ff" : "#ff00ff" }} />
                                    {event.track === "technical" ? "Technical Event" : "Cultural Event"}
                                </div>

                                <h2 className="text-3xl md:text-4xl font-black text-white mb-2" style={{ fontFamily: "var(--font-orbitron)", textShadow: `0 0 20px ${event.track === "technical" ? "rgba(0,243,255,0.3)" : "rgba(255,0,255,0.3)"}` }}>
                                    {event.name}
                                </h2>

                                <div className="flex flex-wrap items-center gap-3 mt-4 mb-8">
                                    <span className="text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider" style={{ background: event.track === "technical" ? "rgba(0,243,255,0.1)" : "rgba(255,0,255,0.1)", color: event.track === "technical" ? "#00f3ff" : "#ff00ff", border: `1px solid ${event.track === "technical" ? "rgba(0,243,255,0.3)" : "rgba(255,0,255,0.3)"}` }}>
                                        {event.type === "solo" ? "Solo" : "Team"}
                                    </span>
                                    {event.prize && (
                                        <span className="text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider" style={{ background: "rgba(255,215,0,0.1)", color: "#ffd700", border: "1px solid rgba(255,215,0,0.3)" }}>
                                            Prize: {event.prize}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2" style={{ fontFamily: "var(--font-orbitron)" }}>
                                            <FileText size={18} className="text-white/50" /> Overview
                                        </h3>
                                        <p className="text-white/60 text-sm leading-relaxed" style={{ whiteSpace: "pre-line" }}>
                                            {event.overview || event.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action */}
                            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        onClose();
                                        onRegister(event);
                                    }}
                                    className="w-full sm:w-1/2 flex-1 py-4 text-sm font-black tracking-[0.2em] uppercase rounded-xl transition-all duration-300 flex items-center justify-center"
                                    style={{ background: `linear-gradient(135deg, ${event.track === "technical" ? "rgba(0,243,255,0.2), rgba(0,243,255,0.1)" : "rgba(255,0,255,0.2), rgba(255,0,255,0.1)"})`, border: `1px solid ${event.track === "technical" ? "rgba(0,243,255,0.4)" : "rgba(255,0,255,0.4)"}`, color: event.track === "technical" ? "#00f3ff" : "#ff00ff" }}
                                >
                                    Register Now
                                </motion.button>

                                {event.rulebookUrl ? (
                                    <a href={event.rulebookUrl} target="_blank" rel="noopener noreferrer" className="block w-full sm:w-1/2 flex-1">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full h-full py-4 text-sm font-black tracking-[0.2em] uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white/10"
                                            style={{ background: "rgba(255,255,255,0.05)", color: "white", border: "1px solid rgba(255,255,255,0.1)" }}
                                        >
                                            <Download size={18} /> Rulebook
                                        </motion.button>
                                    </a>
                                ) : (
                                    <button disabled className="w-full sm:w-1/2 flex-1 py-4 text-sm font-black tracking-[0.2em] uppercase rounded-xl flex items-center justify-center gap-2" style={{ background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.05)", cursor: "not-allowed" }}>
                                        <Download size={18} /> Rulebook Soon
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
