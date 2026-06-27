"use client";
import { HeroSection } from "@/components/Home/HeroSection";
import { BrandSection } from "@/components/Home/BrandSection";
import { ServicesGrid } from "@/components/Home/ServicesGrid";
import { Timeline } from "@/components/Home/Timeline";
import { TrustSection } from "@/components/Home/TrustSection";
import { Gallery } from "@/components/Home/Gallery";
import { CTASection } from "@/components/Home/CTASection";
import { ContactForm } from "@/components/Home/ContactForm";
import { Footer } from "@/components/Home/Footer";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { motion } from "framer-motion";

export default function HomePage() {
  const progress = useScrollProgress();

  return (
    <div className="relative">
      <ParticlesBackground />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-500 to-blue-500 z-50 origin-left"
        style={{ scaleX: progress }}
      />

      {/* Navigation bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-lg font-black tracking-tighter text-white">
            LORE:BAU
          </a>
          <div className="flex items-center gap-8">
            {["Leistungen", "Projekte", "Kontakt"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[10px] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <HeroSection />
      <BrandSection />
      <ServicesGrid />
      <Timeline />
      <TrustSection />
      <Gallery />
      <CTASection />
      <ContactForm />
      <Footer />
    </div>
  );
}
