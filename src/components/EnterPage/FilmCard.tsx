import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMousePosition } from "@/hooks/useMousePosition";

interface FilmCardProps {
  title: string;
  subtitle: string;
  cta: string;
  icon: React.ReactNode;
  index: number;
  href: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
}

export function FilmCard({
  title, subtitle, cta, icon, index, href,
  accentColor, gradientFrom, gradientTo,
}: FilmCardProps) {
  const router = useRouter();
  const mouse = useMousePosition();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(href)}
    >
      <div className="relative h-[70vh] min-h-[500px] rounded-2xl overflow-hidden border border-white/5">
        {/* Cinematic gradient background with parallax */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isHovered ? 1.08 : 1,
            background: isHovered
              ? `radial-gradient(ellipse at ${mouse.x}px ${mouse.y}px, ${gradientFrom}44, ${gradientTo}22, #0a0a0a)`
              : `linear-gradient(135deg, ${gradientFrom}22, ${gradientTo}11, #0a0a0a)`,
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -inset-40 opacity-30"
          animate={{
            background: isHovered
              ? `radial-gradient(800px circle at ${mouse.x}px ${mouse.y}px, ${accentColor}33, transparent 50%)`
              : `radial-gradient(800px circle at 50% 50%, ${accentColor}11, transparent 50%)`,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Particle grid lines (industrial feel) */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(${accentColor}22 1px, transparent 1px), linear-gradient(90deg, ${accentColor}22 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />

        {/* Cinematic bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 p-10 flex flex-col justify-end">
          {/* Icon */}
          <motion.div
            className="mb-4 w-14 h-14 rounded-xl flex items-center justify-center border border-white/10"
            style={{ background: `${accentColor}15` }}
            animate={{ scale: isHovered ? 1.1 : 1, borderColor: isHovered ? accentColor + '66' : 'rgba(255,255,255,0.1)' }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ color: accentColor }}>{icon}</div>
          </motion.div>

          {/* Number */}
          <span className="text-7xl font-black opacity-[0.04] absolute top-10 right-10 select-none" style={{ color: accentColor }}>
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Title */}
          <motion.h3
            className="text-3xl md:text-4xl font-bold mb-3 tracking-tight"
            animate={{ x: isHovered ? 8 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>

          {/* Subtitle */}
          <motion.p
            className="text-sm md:text-base text-zinc-400 max-w-md mb-6 leading-relaxed"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold"
            style={{ color: accentColor }}
            animate={{ gap: isHovered ? '12px' : '8px' }}
            transition={{ duration: 0.3 }}
          >
            {cta}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.div>
        </div>

        {/* Hover border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? `inset 0 0 0 1px ${accentColor}44, 0 0 60px ${accentColor}22`
              : 'inset 0 0 0 1px rgba(255,255,255,0.05)',
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
}
