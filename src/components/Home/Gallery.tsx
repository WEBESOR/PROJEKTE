"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const images = [
  { id: 1, label: "Rückbau", desc: "Industrieanlage vor dem Rückbau" },
  { id: 2, label: "Sanierung", desc: "Kontrollierte Asbestsanierung" },
  { id: 3, label: "Entsorgung", desc: "Baustellenlogistik im Einsatz" },
  { id: 4, label: "Glasfaser", desc: "Glasfaserinstallation" },
  { id: 5, label: "Elektrotechnik", desc: "Schaltschrankmontage" },
  { id: 6, label: "Projekt", desc: "Schlüsselfertige Übergabe" },
];

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500/60 font-medium mb-4 block">
            Referenzen
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
            <span className="text-white">Einblicke in unsere</span>
            <br />
            <span className="text-gradient-orange">Arbeit</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative rounded-2xl overflow-hidden border border-white/5 cursor-pointer group",
                index === 0 ? "md:col-span-2 md:row-span-2" : "",
                index === 5 ? "md:col-span-2" : ""
              )}
              style={{ minHeight: index === 0 ? '400px' : '250px' }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <img
                src={`/images/gallery-${img.id}.jpg`}
                alt={img.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-black/30" />

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-bold text-lg mb-1 group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                  {img.label}
                </h3>
                <p className="text-zinc-400 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  {img.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
