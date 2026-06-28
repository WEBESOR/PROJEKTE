import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMousePosition } from "@/hooks/useMousePosition";

interface FilmCardProps {
  title: string;
  icon: React.ReactNode;
  index: number;
  href: string;
  accentColor: string;
  image: string;
}

const serviceTags: Record<string, string[]> = {
  rueckbau: ["Abbruch", "Entkernung", "Maschinen"],
  asbest: ["TRGS 519", "Unterdruck", "Freimessung"],
  entsorgung: ["Container", "Recycling", "Logistik"],
  glasfaser: ["Glasfaser", "Elektro", "Smart Home"],
};

const fallbackGradients: Record<string, string> = {
  rueckbau: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  asbest: "linear-gradient(135deg, #1a1a2e 0%, #2d1b69 50%, #1a0a2e 100%)",
  entsorgung: "linear-gradient(135deg, #1a1a2e 0%, #3d1c02 50%, #1a0a00 100%)",
  glasfaser: "linear-gradient(135deg, #0a1628 0%, #042f3c 50%, #0a1628 100%)",
};

export function FilmCard({
  title, icon, index, href, accentColor, image,
}: FilmCardProps) {
  const router = useRouter();
  const mouse = useMousePosition();
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const serviceId = href.split("/").pop() || "";
  const tags = serviceTags[serviceId] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative group cursor-pointer flex-1 md:min-w-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(href)}
    >
      <div className="relative w-full h-[25vh] md:h-screen bg-[#0a0a0a] overflow-hidden">
        {/* Fallback gradient (always visible behind image) */}
        <div
          className="absolute inset-0"
          style={{ background: fallbackGradients[serviceId] || fallbackGradients.rueckbau }}
        />

        {/* Image with grayscale → color transition */}
        {!imageError && (
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: isHovered ? 1.12 : 1,
              filter: isHovered ? "grayscale(0%) brightness(1.1)" : "grayscale(90%) brightness(0.75)",
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.img
              src={image}
              alt=""
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
              animate={{
                scale: isHovered ? [1, 1.05, 1] : 1,
              }}
              transition={{ duration: 4, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
            />
          </motion.div>
        )}

        {/* Image overlay gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isHovered
              ? `linear-gradient(180deg, transparent 0%, ${accentColor}11 50%, rgba(10,10,10,0.9) 100%)`
              : `linear-gradient(180deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.95) 100%)`,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Accent glow on hover */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isHovered
              ? `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, ${accentColor}33, transparent 60%)`
              : "transparent",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Film grain */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />

        {/* Scanlines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          backgroundSize: "100% 4px",
        }} />

        {/* Film sprocket holes */}
        <div className="absolute top-0 bottom-0 left-[3px] md:left-[6px] w-[4px] md:w-[6px] flex flex-col justify-around py-6 md:py-8 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-[4px] h-[4px] md:w-[6px] md:h-[6px] rounded-full border border-white/60" />
          ))}
        </div>
        <div className="absolute top-0 bottom-0 right-[3px] md:right-[6px] w-[4px] md:w-[6px] flex flex-col justify-around py-6 md:py-8 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-[4px] h-[4px] md:w-[6px] md:h-[6px] rounded-full border border-white/60" />
          ))}
        </div>

        {/* Icon badge */}
        <motion.div
          className="absolute top-6 md:top-8 left-5 md:left-8 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center border z-10"
          style={{
            background: `${accentColor}15`,
            borderColor: isHovered ? `${accentColor}66` : "rgba(255,255,255,0.1)",
          }}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="scale-90 md:scale-100" style={{ color: accentColor }}>{icon}</div>
        </motion.div>

        {/* Number */}
        <span
          className="absolute top-6 md:top-8 right-5 md:right-8 text-6xl md:text-8xl font-black opacity-[0.04] select-none z-10"
          style={{ color: accentColor }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Tags */}
        <motion.div
          className="absolute top-20 md:top-28 left-5 md:left-8 flex flex-wrap gap-2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] md:text-xs uppercase tracking-wider px-2.5 py-1 rounded-full border"
              style={{
                borderColor: `${accentColor}44`,
                color: accentColor,
                background: `${accentColor}11`,
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Content at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 z-10">
          <div className="overflow-hidden mb-2">
            <motion.h3
              className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-tight"
              animate={{
                color: isHovered ? "#ffffff" : "rgba(255,255,255,0.6)",
              }}
              transition={{ duration: 0.4 }}
            >
              {title}
            </motion.h3>
          </div>

          {/* Animated subtitle line */}
          <motion.div
            className="h-0.5 mb-3"
            style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
            initial={{ width: "0%" }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />

          {/* Hover indicator */}
          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: isHovered ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className="text-xs md:text-sm uppercase tracking-[0.15em] font-semibold"
              style={{ color: accentColor }}
            >
              {isHovered ? "Jetzt entdecken" : "Leistung"}
            </span>
            <motion.svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </motion.svg>
          </motion.div>
        </div>

        {/* Divider between cards */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
      </div>
    </motion.div>
  );
}
