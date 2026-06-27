"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { trustItems } from "@/lib/utils";
import { Shield, ClipboardCheck, Cpu, HardHat, Building2 } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "Alles aus einer Hand": <Building2 className="w-6 h-6" />,
  "Präzise Planung": <ClipboardCheck className="w-6 h-6" />,
  "Moderne Technik": <Cpu className="w-6 h-6" />,
  "Fachgerechte Umsetzung": <HardHat className="w-6 h-6" />,
  "Für Privat & Industrie": <Shield className="w-6 h-6" />,
};

function TrustCard({ title, desc, index }: { title: string; desc: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500"
    >
      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 text-amber-400">
        {iconMap[title]}
      </div>
      <div>
        <h3 className="text-white font-semibold mb-1.5">{title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

export function TrustSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500/60 font-medium mb-4 block">
            Warum LORE:BAU
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
            <span className="text-white">Ihr Partner für</span>
            <br />
            <span className="text-gradient-blue">professionelle Lösungen</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {trustItems.map((item, index) => (
            <TrustCard key={item.title} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
