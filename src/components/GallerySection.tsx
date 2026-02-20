"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const PLACEHOLDER_PHOTOS = [
    { id: 1, url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop", title: "Cultural Night" },
    { id: 2, url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop", title: "Tech Symposium" },
    { id: 3, url: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop", title: "Hackathon Final" },
    { id: 4, url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop", title: "Grand Concert" },
    { id: 5, url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop", title: "Closing Ceremony" },
];

export default function GallerySection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="gallery" className="relative py-24 lg:py-36 px-4 overflow-hidden border-y border-white/5">
            <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div
                        className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs tracking-[0.3em] uppercase"
                        style={{
                            background: "rgba(0,243,255,0.06)",
                            border: "1px solid rgba(0,243,255,0.2)",
                            color: "#00f3ff",
                        }}
                    >
                        <span className="w-1 h-1 rounded-full bg-[#00f3ff]" />
                        Memories
                    </div>
                    <h2
                        className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4"
                        style={{ fontFamily: "var(--font-orbitron)" }}
                    >
                        <span style={{ color: "#ffffff", textShadow: "0 0 20px rgba(255,255,255,0.6)" }}>
                            The Hall of
                        </span>
                        <span
                            className="mt-2 block sm:inline sm:mt-0 sm:ml-3 text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#00f3ff]"
                            style={{ textShadow: "0 0 20px rgba(255,0,255,0.3)" }}
                        >
                            Fame
                        </span>
                    </h2>
                    <p className="text-white/50 text-lg max-w-2xl mx-auto">
                        Glimpses of our vibrant past. Swipe through the unforgettable moments of previous editions.
                    </p>
                </motion.div>

                {/* Carousel Slider */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="mx-auto max-w-[90vw]"
                >
                    <Carousel
                        opts={{
                            align: "center",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {PLACEHOLDER_PHOTOS.map((photo, index) => (
                                <CarouselItem key={photo.id} className="pl-2 md:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10"
                                        style={{ background: "rgba(255,255,255,0.02)" }}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={photo.url}
                                            alt={photo.title}
                                            className="w-full h-full object-cover opacity-50 transition-all duration-700 group-hover:scale-110 group-hover:opacity-80"
                                            style={{ mixBlendMode: "luminosity" }}
                                        />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-[#050505]/30 to-transparent transition-opacity duration-300" />

                                        {/* Caption */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                                            <div className="text-xs font-black tracking-[0.2em] text-[#00f3ff] uppercase mb-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                {index + 1} // {PLACEHOLDER_PHOTOS.length}
                                            </div>
                                            <h3
                                                className="text-xl font-bold text-white drop-shadow-md"
                                                style={{ fontFamily: "var(--font-orbitron)" }}
                                            >
                                                {photo.title}
                                            </h3>
                                        </div>

                                        {/* Cyberpunk borders on hover */}
                                        <div className="absolute -inset-px border-2 border-transparent transition-colors duration-300 group-hover:border-[#ff00ff]/50 rounded-2xl pointer-events-none" />
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Custom styled navigation arrows */}
                        <CarouselPrevious className="hidden md:flex -left-16 bg-black/50 border-[#00f3ff]/30 text-[#00f3ff] hover:bg-[#00f3ff]/20 hover:text-white" />
                        <CarouselNext className="hidden md:flex -right-16 bg-black/50 border-[#ff00ff]/30 text-[#ff00ff] hover:bg-[#ff00ff]/20 hover:text-white" />
                    </Carousel>
                </motion.div>
            </div>
        </section>
    );
}
