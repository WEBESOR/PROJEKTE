"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "blue" | "orange" | "amber" | "none";
}

export function GlassCard({ children, className, hover = true, glow = "none" }: GlassCardProps) {
  const glowColors = {
    blue: "rgba(59,130,246,0.1)",
    orange: "rgba(249,115,22,0.1)",
    amber: "rgba(245,158,11,0.1)",
    none: "transparent",
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl overflow-hidden",
        hover && "cursor-pointer",
        className
      )}
      whileHover={hover ? { y: -4, scale: 1.01, borderColor: "rgba(255,255,255,0.12)" } : undefined}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {glow !== "none" && (
        <div
          className="absolute -inset-40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColors[glow]}, transparent 40%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
