"use client";

import { useState } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventsHub from "@/components/EventsHub";
import GallerySection from "@/components/GallerySection";
import SponsorsSection from "@/components/SponsorsSection";
import Footer from "@/components/Footer";
import RegistrationModal from "@/components/RegistrationModal";
import AuthModal from "@/components/AuthModal";
import type { Event } from "@/lib/events";
import { supabase } from "@/lib/supabase";

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

  const handleRegister = async (event: Event) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        toast.error("Authentication Required", {
          description: "Please log in or sign up to view and purchase event passes.",
          className: "bg-[#050505] border border-[#00f3ff]/30 text-white",
        });
        setIsAuthOpen(true);
        return;
      }
      setSelectedEvent(event);
    } catch (error) {
      console.error("Auth check failed:", error);
      toast.error("Auth service unavailable", {
        description: "Please try again later.",
        className: "bg-[#050505] border border-red-500/30 text-white",
      });
    }
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
        <GallerySection />
        <SponsorsSection />
        <Footer />
      </div>

      {/* Registration Modal */}
      <RegistrationModal event={selectedEvent} onClose={handleCloseModal} onLoginRequest={() => setIsAuthOpen(true)} />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </main>
  );
}
