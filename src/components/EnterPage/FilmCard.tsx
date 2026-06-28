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

function FilmGrain() {
  return (
    <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    }} />
  );
}

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
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4 + index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative group cursor-pointer flex-1 md:min-w-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(href)}
    >
      <div className="relative w-full h-[25vh] md:h-screen bg-[#0a0a0a] overflow-hidden">
        <FilmGrain />

        {/* Scanlines */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          backgroundSize: "100% 4px",
        }} />

        {/* Fallback gradient */}
        <div
          className="absolute inset-0"
          style={{ background: fallbackGradients[serviceId] || fallbackGradients.rueckbau }}
        />

        {/* Image layer */}
        {!imageError && (
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: isHovered ? 1.15 : 1,
              filter: isHovered
                ? "grayscale(0%) brightness(1.1) contrast(1.1)"
                : "grayscale(85%) brightness(0.6) contrast(0.9)",
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src={image}
              alt=""
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
              animate={{
                scale: isHovered ? [1, 1.06, 1] : 1,
              }}
              transition={{ duration: 5, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
            />
          </motion.div>
        )}

        {/* Vignette overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }} />

        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isHovered
              ? `linear-gradient(180deg, transparent 0%, ${accentColor}08 40%, rgba(10,10,10,0.7) 70%, rgba(10,10,10,0.95) 100%)`
              : `linear-gradient(180deg, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.2) 40%, rgba(10,10,10,0.6) 70%, rgba(10,10,10,0.95) 100%)`,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Accent glow on hover */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isHovered
              ? `radial-gradient(800px circle at ${mouse.x}px ${mouse.y}px, ${accentColor}22, transparent 60%)`
              : "transparent",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Film sprocket holes - left */}
        <div className="absolute top-0 bottom-0 left-0 w-[6px] md:w-[8px] flex flex-col justify-around py-6 md:py-10 opacity-[0.15]">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-[6px] h-[6px] md:w-[8px] md:h-[8px] rounded-full border border-white/80 mx-auto" />
          ))}
        </div>

        {/* Film sprocket holes - right */}
        <div className="absolute top-0 bottom-0 right-0 w-[6px] md:w-[8px] flex flex-col justify-around py-6 md:py-10 opacity-[0.15]">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-[6px] h-[6px] md:w-[8px] md:h-[8px] rounded-full border border-white/80 mx-auto" />
          ))}
        </div>

        {/* Scene number badge */}
        <motion.div
          className="absolute top-6 md:top-10 left-6 md:left-10 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 + index * 0.2 }}
        >
          <div
            className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-medium px-3 py-1.5 rounded border"
            style={{
              color: accentColor,
              borderColor: `${accentColor}33`,
              background: `${accentColor}11`,
            }}
          >
            Szene {String(index + 1).padStart(2, "0")}
          </div>
        </motion.div>

        {/* Icon badge */}
        <motion.div
          className="absolute top-6 md:top-10 right-6 md:right-10 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center border z-10"
          style={{
            background: `${accentColor}15`,
            borderColor: isHovered ? `${accentColor}66` : "rgba(255,255,255,0.1)",
          }}
          animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? [0, -5, 5, 0] : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="scale-90 md:scale-100" style={{ color: accentColor }}>{icon}</div>
        </motion.div>

        {/* Tags - show on hover */}
        <motion.div
          className="absolute top-24 md:top-36 left-6 md:left-10 flex flex-wrap gap-2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] md:text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border"
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
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-14 z-10">
          {/* Subtitle */}
          <motion.div
            className="overflow-hidden mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 + index * 0.2 }}
          >
            <motion.span
              className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-medium block mb-2"
              style={{ color: accentColor }}
              animate={{ opacity: isHovered ? 1 : 0.5 }}
            >
              Leistung
            </motion.span>
          </motion.div>

          {/* Title with cinematic letter-spacing */}
          <div className="overflow-hidden mb-2">
            <motion.h3
              className="text-xl md:text-3xl lg:text-4xl font-black tracking-tighter leading-tight"
              animate={{
                color: isHovered ? "#ffffff" : "rgba(255,255,255,0.7)",
              }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h3>
          </div>

          {/* Accent underline that animates on hover */}
          <motion.div
            className="h-[2px] md:h-[3px] mb-3"
            style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
            initial={{ width: "0%" }}
            animate={{ width: isHovered ? "60%" : "0%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* CTA hint */}
          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: isHovered ? 1 : 0.3, x: isHovered ? 0 : -5 }}
            transition={{ duration: 0.4 }}
          >
            <span
              className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-semibold"
              style={{ color: accentColor }}
            >
              {isHovered ? "Film abspielen" : "Zum Film"}
            </span>
            <motion.svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </motion.svg>
          </motion.div>
        </div>

        {/* Hover border glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? `inset 0 0 0 1px ${accentColor}33, 0 0 60px ${accentColor}11`
              : "inset 0 0 0 0px transparent",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Divider between cards */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent hidden md:block" />
      </div>
    </motion.div>
  );
}