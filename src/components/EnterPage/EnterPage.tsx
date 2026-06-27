"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilmCard } from "./FilmCard";
import { Building2, Shield, Truck, Zap } from "lucide-react";

const films = [
  {
    title: "Rückbau & Entkernung",
    subtitle: "Wir schaffen Raum für Neues",
    cta: "Bereich betreten",
    icon: <Building2 className="w-7 h-7" />,
    href: "/home?service=rueckbau",
    accentColor: "#f59e0b",
    gradientFrom: "#f59e0b",
    gradientTo: "#d97706",
    image: "/images/enter-rueckbau.jpg",
  },
  {
    title: "Asbest & Schadstoffsanierung",
    subtitle: "Sicherheit beginnt dort, wo andere stoppen",
    cta: "Bereich betreten",
    icon: <Shield className="w-7 h-7" />,
    href: "/home?service=asbest",
    accentColor: "#3b82f6",
    gradientFrom: "#3b82f6",
    gradientTo: "#1d4ed8",
    image: "/images/enter-asbest.jpg",
  },
  {
    title: "Entsorgung & Logistik",
    subtitle: "Effizienz auf jeder Baustelle",
    cta: "Bereich betreten",
    icon: <Truck className="w-7 h-7" />,
    href: "/home?service=entsorgung",
    accentColor: "#f97316",
    gradientFrom: "#f97316",
    gradientTo: "#ea580c",
    image: "/images/enter-entsorgung.jpg",
  },
  {
    title: "Glasfaser & Elektrotechnik",
    subtitle: "Die Infrastruktur der Zukunft",
    cta: "Bereich betreten",
    icon: <Zap className="w-7 h-7" />,
    href: "/home?service=glasfaser",
    accentColor: "#06b6d4",
    gradientFrom: "#06b6d4",
    gradientTo: "#0891b2",
    image: "/images/enter-glasfaser.jpg",
  },
];

export function EnterPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Background cinematic gradient */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.08),transparent_70%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="loader"
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-5xl font-black tracking-tighter mb-3">
                <span className="text-white">LORE</span>
                <span className="text-amber-500">:</span>
                <span className="text-white">BAU</span>
              </div>
              <div className="w-0 h-[2px] bg-amber-500 mx-auto animate-pulse" style={{ animationDuration: '2s', width: '60px' }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {loaded && (
        <div className="relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="fixed top-0 left-0 right-0 z-20 px-8 py-6 flex items-center justify-between"
          >
            <div className="text-2xl font-black tracking-tighter">
              <span className="text-white">LORE</span>
              <span className="text-amber-500">:</span>
              <span className="text-white">BAU</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-medium">
              Cinematic Experience
            </div>
          </motion.div>

          {/* Main content */}
          <div className="relative z-10 min-h-screen">
            {/* Hero text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="px-8 pt-28 pb-12 text-center"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4"
              >
                Wählen Sie Ihren Bereich
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none"
              >
                <span className="text-white">Willkommen bei</span>
                <br />
                <span className="text-gradient">LORE:BAU</span>
              </motion.h1>
            </motion.div>

            {/* Film Cards Grid */}
            <div className="px-4 md:px-8 pb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-7xl mx-auto">
                {films.map((film, index) => (
                  <FilmCard key={film.title} {...film} index={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-zinc-600"
          >
            Wählen Sie einen Bereich zum Erkunden
          </motion.div>
        </div>
      )}
    </div>
  );
}
