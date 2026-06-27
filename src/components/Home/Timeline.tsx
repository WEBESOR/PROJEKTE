"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { timeline } from "@/lib/utils";

function TimelineStep({ step, title, desc, index }: { step: string; title: string; desc: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-6 pb-12 last:pb-0"
    >
      {/* Step number */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center bg-[#0a0a0a] relative z-10">
          <span className="text-amber-500 font-bold text-sm">{step}</span>
        </div>
        {index < timeline.length - 1 && (
          <motion.div
            className="w-px flex-1 bg-gradient-to-b from-zinc-700 to-transparent mt-2"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            style={{ transformOrigin: 'top' }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">{desc}</p>
      </div>
    </motion.div>
  );
}

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500/60 font-medium mb-4 block">Projektablauf</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
            <span className="text-white">So arbeiten wir</span>
            <br />
            <span className="text-gradient-orange">für Sie</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {timeline.map((item, index) => (
            <TimelineStep key={item.step} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
