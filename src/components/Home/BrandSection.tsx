"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/lib/utils";

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="text-center"
    >
      <div className="text-5xl md:text-6xl font-black tracking-tighter mb-2">
        <span className="text-gradient">{value}</span>
      </div>
      <div className="text-sm text-zinc-500 uppercase tracking-[0.15em] font-medium">{label}</div>
    </motion.div>
  );
}

export function BrandSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500/60 font-medium mb-4 block">Über uns</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
            <span className="text-white">Präzision trifft auf</span>
            <br />
            <span className="text-gradient-orange">Leidenschaft</span>
          </h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            LORE:BAU verbindet präzises Handwerk mit moderner Technik und professioneller Projektsteuerung.
            Von der ersten Besichtigung bis zur Übergabe – wir stehen für Qualität, Sicherheit und Termintreue.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
