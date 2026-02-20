"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventsHub from "@/components/EventsHub";
import SponsorsSection from "@/components/SponsorsSection";
import Footer from "@/components/Footer";
import RegistrationModal from "@/components/RegistrationModal";
import AuthModal from "@/components/AuthModal";
import type { Event } from "@/lib/events";

// Dynamically import the 3D background to avoid SSR issues
const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#050505] z-0" />,
});

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleExploreClick = () => {
    const el = document.getElementById("events");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleRegister = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <main className="relative min-h-screen bg-[#050505]">
      {/* Fixed 3D background */}
      <ParticleBackground />

      {/* Scanlines cyberpunk overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,243,255,0.008) 3px, rgba(0,243,255,0.008) 4px)" }} />

      {/* Content */}
      <div className="relative z-10">
        <Navbar onLoginClick={() => setIsAuthOpen(true)} />
        <HeroSection onExploreClick={handleExploreClick} />
        <AboutSection />
        <EventsHub onRegister={handleRegister} />
        <SponsorsSection />
        <Footer />
      </div>

      {/* Registration Modal */}
      <RegistrationModal event={selectedEvent} onClose={handleCloseModal} />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </main>
  );
}
