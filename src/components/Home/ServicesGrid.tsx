"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { services } from "@/lib/utils";
import { Building2, Shield, Truck, Zap, ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Truck: <Truck className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
};

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/services/${service.id}`)}
    >
      <div className="relative rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden h-[320px] p-8 flex flex-col justify-between">
        {/* Hover cinematic overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: isHovered
              ? `radial-gradient(ellipse at center, ${service.accent}22, transparent 70%)`
              : 'transparent',
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Top section */}
        <div className="relative z-10">
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 mb-5"
            style={{ background: `${service.accent}15` }}
            animate={{ borderColor: isHovered ? service.accent + '66' : 'rgba(255,255,255,0.1)' }}
          >
            <div style={{ color: service.accent }}>{iconMap[service.icon]}</div>
          </motion.div>
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-transition">
            {service.title}
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">{service.description}</p>
        </div>

        {/* Bottom CTA */}
        <div className="relative z-10">
          <motion.div
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold"
            style={{ color: service.accent }}
            animate={{ gap: isHovered ? '12px' : '8px' }}
            transition={{ duration: 0.3 }}
          >
            Mehr erfahren
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }}
          initial={{ width: '0%' }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />

        {/* Index number */}
        <span
          className="absolute top-6 right-6 text-6xl font-black opacity-[0.03] select-none"
          style={{ color: service.accent }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  );
}

export function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="leistungen" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500/60 font-medium mb-4 block">Unsere Leistungen</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
            <span className="text-white">Was wir für Sie</span>
            <br />
            <span className="text-gradient-blue">bewegen</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
