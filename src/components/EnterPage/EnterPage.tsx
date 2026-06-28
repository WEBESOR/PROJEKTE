"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilmCard } from "./FilmCard";
import { Building2, Shield, Truck, Zap } from "lucide-react";

type Phase = "countdown" | "studio" | "ready";

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

function CountdownPhase({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(3);
  const [showLeader, setShowLeader] = useState(true);

  useEffect(() => {
    if (count > 0) {
      const t = setTimeout(() => setCount((c) => c - 1), 800);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setShowLeader(false);
        setTimeout(onDone, 600);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [count, onDone]);

  return (
    <AnimatePresence>
      {showLeader && (
        <motion.div
          key="countdown"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        >
          <FilmGrain />
          <Scanlines />

          {/* Film leader circle */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
            <motion.rect
              x="50" y="50" width="300" height="300"
              fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"
            />
            {/* Tick marks around the circle */}
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.line
                key={i}
                x1={200 + 140 * Math.cos((i * 15 * Math.PI) / 180)}
                y1={200 + 140 * Math.sin((i * 15 * Math.PI) / 180)}
                x2={200 + 150 * Math.cos((i * 15 * Math.PI) / 180)}
                y2={200 + 150 * Math.sin((i * 15 * Math.PI) / 180)}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
            ))}
          </svg>

          {/* Countdown number */}
          <AnimatePresence mode="wait">
            <motion.div
              key={count}
              initial={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="text-[200px] md:text-[300px] font-black tracking-tighter text-white/10 select-none">
                {count > 0 ? count : ""}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Age rating / film metadata stamp */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-12 text-center"
          >
            <div className="text-[8px] uppercase tracking-[0.3em] text-zinc-700 mb-2">FSK 12</div>
            <div className="text-[8px] uppercase tracking-[0.3em] text-zinc-700">LORE:BAU FILMWERKE</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StudioPhase({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <FilmGrain />
      <Scanlines />

      {/* Letterbox bars */}
      <div className="absolute top-0 left-0 right-0 h-[72px] md:h-[96px] bg-black z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-[72px] md:h-[96px] bg-black z-20" />

      {/* Studio emblem */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 mb-6"
        >
          Eine Produktion der
        </motion.div>

        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-6xl md:text-8xl font-black tracking-tighter">
            <span className="text-white">LORE</span>
            <span className="text-amber-500">:</span>
            <span className="text-white">BAU</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 80 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="h-[2px] bg-amber-500/50 mx-auto mt-6 mb-4"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-[10px] uppercase tracking-[0.4em] text-zinc-600"
        >
          Filmwerke · Gründau
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-[8px] uppercase tracking-[0.5em] text-zinc-800 mt-4"
        >
          präsentiert
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export function EnterPage() {
  const [phase, setPhase] = useState<Phase>("countdown");

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Background atmos */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.04),transparent_70%)]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Cinematic letterbox bars */}
      <div className="fixed top-0 left-0 right-0 h-0 md:h-[48px] bg-black z-30 pointer-events-none" />
      <div className="fixed bottom-0 left-0 right-0 h-0 md:h-[48px] bg-black z-30 pointer-events-none" />

      {/* Phase: Film Countdown */}
      {phase === "countdown" && (
        <CountdownPhase onDone={() => setPhase("studio")} />
      )}

      {/* Phase: Studio Logo */}
      {phase === "studio" && (
        <StudioPhase onDone={() => setPhase("ready")} />
      )}

      {/* Phase: Film Poster Wall */}
      {phase === "ready" && (
        <>
          <FilmGrain />
          <Scanlines />

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
            transition={{ delay: 2 }}
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
        </>
      )}
    </div>
  );
}