"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const footerLinks = {
  Leistungen: ["Rückbau & Entkernung", "Asbest & Schadstoffsanierung", "Entsorgung & Logistik", "Glasfaser & Elektrotechnik"],
  Unternehmen: ["Über uns", "Referenzen", "Karriere", "Aktuelles"],
  Rechtliches: ["Impressum", "Datenschutz", "AGB", "Cookie-Einstellungen"],
};

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer ref={ref} className="relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0 }}
            className="col-span-2 md:col-span-1"
          >
            <div className="text-2xl font-black tracking-tighter mb-4">
              <span className="text-white">LORE</span>
              <span className="text-amber-500">:</span>
              <span className="text-white">BAU</span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs">
              Rückbau, Sanierung und technische Infrastruktur aus einer Hand.
            </p>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
            >
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-amber-500/60 font-semibold mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-[10px] text-zinc-600">
            © {new Date().getFullYear()} LORE:BAU. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            {["Instagram", "LinkedIn", "YouTube", "Xing"].map((social) => (
              <a key={social} href="#" className="text-[10px] uppercase tracking-[0.15em] text-zinc-600 hover:text-zinc-400 transition-colors">
                {social}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
