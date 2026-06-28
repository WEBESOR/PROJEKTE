"use client";
import { motion } from "framer-motion";
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

function FilmGrain() {
  return (
    <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    }} />
  );
}

function Scanlines() {
  return (
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
      backgroundSize: "100% 4px",
    }} />
  );
}

export function EnterPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      <FilmGrain />
      <Scanlines />

      {/* Background atmos */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.04),transparent_70%)]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Cinematic letterbox bars */}
      <div className="fixed top-0 left-0 right-0 h-0 md:h-[48px] bg-black z-30 pointer-events-none" />
      <div className="fixed bottom-0 left-0 right-0 h-0 md:h-[48px] bg-black z-30 pointer-events-none" />

      {/* Film reel decorative corners */}
      <div className="fixed top-2 left-2 w-8 h-8 border-t border-l border-white/10 z-20" />
      <div className="fixed top-2 right-2 w-8 h-8 border-t border-r border-white/10 z-20" />
      <div className="fixed bottom-2 left-2 w-8 h-8 border-b border-l border-white/10 z-20" />
      <div className="fixed bottom-2 right-2 w-8 h-8 border-b border-r border-white/10 z-20" />

      <div className="relative z-10 min-h-screen flex flex-col md:flex-row">
        {films.map((film, index) => (
          <FilmCard key={film.title} {...film} index={index} />
        ))}
      </div>

      {/* Bottom film strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20"
      >
        <div className="w-2 h-2 rounded-full border border-white/20" />
        <div className="w-2 h-2 rounded-full border border-white/20" />
        <div className="text-[7px] uppercase tracking-[0.4em] text-zinc-700 mx-2">
          Programmauswahl
        </div>
        <div className="w-2 h-2 rounded-full border border-white/20" />
        <div className="w-2 h-2 rounded-full border border-white/20" />
      </motion.div>
    </div>
  );
}
