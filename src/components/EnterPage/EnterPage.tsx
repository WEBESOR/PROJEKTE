"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { FilmCard } from "./FilmCard";
import { Building2, Shield, Truck, Zap, SkipForward } from "lucide-react";

type Phase = "loading" | "intro" | "sequence" | "grid";

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

const SCENE_DURATION = 5000;

export function EnterPage() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [sceneIndex, setSceneIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (phase !== "loading") return;
    const t = setTimeout(() => setPhase("intro"), 2000);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "intro") return;
    const t = setTimeout(() => setPhase("sequence"), 2500);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "sequence") return;
    if (sceneIndex >= films.length) {
      const t = setTimeout(() => setPhase("grid"), 800);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setSceneIndex((i) => i + 1), SCENE_DURATION);
    return () => clearTimeout(t);
  }, [phase, sceneIndex]);

  const skipToGrid = useCallback(() => {
    setPhase("grid");
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === "loading" && (
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
              <div className="w-0 h-[2px] bg-amber-500 mx-auto" style={{ animationDuration: '2s', width: '60px' }} />
            </motion.div>
          </motion.div>
        )}

        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4"
            >
              Cinematic Experience
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl font-black tracking-tighter leading-none text-center"
            >
              <span className="text-white">Willkommen bei</span>
              <br />
              <span className="text-gradient">LORE:BAU</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-12 flex flex-col items-center gap-2"
            >
              <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-600">Film startet</span>
              <motion.div
                className="w-6 h-6 border-2 border-zinc-600 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {phase === "sequence" && sceneIndex < films.length && (
          <SequenceScene
            key={`scene-${sceneIndex}`}
            film={films[sceneIndex]}
            index={sceneIndex}
            total={films.length}
            onSkip={skipToGrid}
          />
        )}

        {phase === "grid" && (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-30"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.08),transparent_70%)]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />

            <div className="relative z-10 min-h-screen flex flex-col">
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

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="px-8 pt-28 pb-8 text-center flex-shrink-0"
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

              <div className="flex-1 px-4 md:px-8 pb-20 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-7xl mx-auto">
                  {films.map((film, index) => (
                    <motion.div
                      key={film.title}
                      initial={{ opacity: 0, y: 60 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <FilmCard {...film} index={index} />
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-zinc-600"
              >
                Wählen Sie einen Bereich zum Erkunden
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SequenceScene({
  film,
  index,
  total,
  onSkip,
}: {
  film: (typeof films)[0];
  index: number;
  total: number;
  onSkip: () => void;
}) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-40 cursor-pointer"
      onClick={() => router.push(film.href)}
    >
      <img src={film.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Accent gradient orb */}
      <motion.div
        className="absolute -inset-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2 }}
        style={{
          background: `radial-gradient(800px circle at 50% 50%, ${film.accentColor}44, transparent 60%)`,
        }}
      />

      {/* Scanline overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        backgroundSize: '100% 4px',
      }} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          {/* Number */}
          <span
            className="text-[10px] uppercase tracking-[0.3em] font-medium mb-6 block"
            style={{ color: film.accentColor }}
          >
            Kapitel {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>

          {/* Title */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-6">
            <span className="text-white">{film.title}</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-xl mb-8">
            {film.subtitle}
          </p>

          {/* Enter indicator */}
          <motion.div
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-semibold"
            style={{ color: film.accentColor }}
            animate={{ gap: ["8px", "14px", "8px"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Zum Bereich
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5">
        <motion.div
          className="h-full"
          style={{ background: `linear-gradient(90deg, ${film.accentColor}, ${film.accentColor}88)` }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: SCENE_DURATION / 1000, ease: "linear" }}
        />
      </div>

      {/* Film reel dots */}
      <div className="absolute top-8 right-8 flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-500"
            style={{
              background: i === index ? film.accentColor : "rgba(255,255,255,0.15)",
              boxShadow: i === index ? `0 0 8px ${film.accentColor}` : "none",
            }}
          />
        ))}
      </div>

      {/* Skip button */}
      <button
        onClick={(e) => { e.stopPropagation(); onSkip(); }}
        className="absolute top-8 left-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors z-10"
      >
        <SkipForward className="w-3.5 h-3.5" />
        Überspringen
      </button>
    </motion.div>
  );
}
