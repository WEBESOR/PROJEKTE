"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CinematicButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
}

export function CinematicButton({
  children, variant = "primary", size = "md",
  href, onClick, className, showArrow = true,
}: CinematicButtonProps) {
  const base = "relative inline-flex items-center gap-2 font-semibold tracking-wider uppercase transition-all duration-500 overflow-hidden group";
  const sizes = { sm: "px-5 py-2 text-xs", md: "px-8 py-3 text-sm", lg: "px-12 py-4 text-base" };
  const variants = {
    primary: "bg-amber-500 text-black hover:bg-amber-400",
    secondary: "border border-zinc-700 text-zinc-100 hover:border-amber-500 hover:text-amber-400",
    ghost: "text-zinc-400 hover:text-amber-400",
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {showArrow && <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
      <span className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={cn(base, sizes[size], variants[variant], className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={cn(base, sizes[size], variants[variant], className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
