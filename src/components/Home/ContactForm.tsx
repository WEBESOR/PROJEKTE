"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CinematicButton } from "@/components/ui/CinematicButton";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";

export function ContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="kontakt" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500/60 font-medium mb-4 block">
            Kontakt
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
            <span className="text-white">Lassen Sie uns</span>
            <br />
            <span className="text-gradient-blue">sprechen</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-[0.15em] text-zinc-500 mb-2">Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-zinc-600" placeholder="Ihr Name" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-zinc-500 mb-2">E-Mail</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-zinc-600" placeholder="ihre@email.de" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-zinc-500 mb-2">Telefon</label>
                  <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-zinc-600" placeholder="+49 123 456789" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-zinc-500 mb-2">Projektart</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors">
                    <option value="" className="bg-zinc-900">Bitte wählen</option>
                    <option value="rueckbau" className="bg-zinc-900">Rückbau & Entkernung</option>
                    <option value="asbest" className="bg-zinc-900">Asbest & Schadstoffsanierung</option>
                    <option value="entsorgung" className="bg-zinc-900">Entsorgung & Logistik</option>
                    <option value="glasfaser" className="bg-zinc-900">Glasfaser & Elektrotechnik</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-zinc-500 mb-2">Standort</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-zinc-600" placeholder="PLZ / Ort" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-[0.15em] text-zinc-500 mb-2">Nachricht</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-zinc-600 resize-none" placeholder="Beschreiben Sie Ihr Projekt..." />
                </div>
              </div>

              <div className="mt-6">
                <CinematicButton variant="primary" size="md">
                  Nachricht senden
                </CinematicButton>
              </div>
            </div>
          </motion.div>

          {/* Contact info + quick actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <a href="https://wa.me/49123456789" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-colors duration-300 group">
              <div className="w-11 h-11 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">WhatsApp</div>
                <div className="text-xs text-zinc-500">Schnelle Anfrage via Chat</div>
              </div>
            </a>

            <a href="mailto:info@lorebau.de"
              className="flex items-center gap-4 p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-colors duration-300 group">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">E-Mail</div>
                <div className="text-xs text-zinc-500">info@lorebau.de</div>
              </div>
            </a>

            <a href="tel:+49123456789"
              className="flex items-center gap-4 p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 transition-colors duration-300 group">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Anrufen</div>
                <div className="text-xs text-zinc-500">+49 123 456789</div>
              </div>
            </a>

            <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
              <MapPin className="w-5 h-5 text-zinc-500 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-white mb-1">Standort</div>
                <div className="text-xs text-zinc-400 leading-relaxed">
                  Musterstraße 123<br />
                  12345 Musterstadt
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
