"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilmCard } from "./FilmCard";
import { Building2, Shield, Truck, Zap } from "lucide-react";

const films = [
  {
    title: "Rückbau & Entkernung",
    icon: <Building2 className="w-7 h-7" />,
    href: "/services/rueckbau",
    accentColor: "#f59e0b",
    image: "/images/enter-rueckbau.jpg",
  },
  {
    title: "Asbest & Schadstoffsanierung",
    icon: <Shield className="w-7 h-7" />,
    href: "/services/asbest",
    accentColor: "#3b82f6",
    image: "/images/enter-asbest.jpg",
  },
  {
    title: "Entsorgung & Logistik",
    icon: <Truck className="w-7 h-7" />,
    href: "/services/entsorgung",
    accentColor: "#f97316",
    image: "/images/enter-entsorgung.jpg",
  },
  {
    title: "Glasfaser & Elektrotechnik",
    icon: <Zap className="w-7 h-7" />,
    href: "/services/glasfaser",
    accentColor: "#06b6d4",
    image: "/images/enter-glasfaser.jpg",
  },
];

export function EnterPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.06),transparent_70%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="loader"
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-5xl font-black tracking-tighter mb-3">
                <span className="text-white">LORE</span>
                <span className="text-amber-500">:</span>
                <span className="text-white">BAU</span>
              </div>
              <div className="w-[60px] h-[2px] bg-amber-500 mx-auto" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {loaded && (
        <div className="relative z-10 min-h-screen flex flex-col md:flex-row">
          {films.map((film, index) => (
            <FilmCard key={film.title} {...film} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
