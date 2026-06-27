"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CinematicButton } from "@/components/ui/CinematicButton";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-40 px-6 overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-[#0a0a0a] to-blue-950" />
        <div className="absolute inset-0 opacity-30" style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.15) 0%, transparent 60%)`,
        }} />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500/60 font-medium mb-4 block">
            Kontakt
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6">
            <span className="text-white">Ihr Projekt beginnt mit</span>
            <br />
            <span className="text-gradient">einer klaren Lösung.</span>
          </h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Vereinbaren Sie ein unverbindliches Erstgespräch. Wir analysieren Ihre Situation,
            beraten Sie fachkundig und erstellen ein maßgeschneidertes Angebot.
          </p>
          <CinematicButton variant="primary" size="lg" href="#kontakt">
            Kostenlose Erstberatung sichern
          </CinematicButton>
        </motion.div>
      </div>
    </section>
  );
}
