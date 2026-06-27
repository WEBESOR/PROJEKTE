"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useParams } from "next/navigation";
import { services } from "@/lib/utils";
import { CinematicButton } from "@/components/ui/CinematicButton";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

const features: Record<string, string[]> = {
  rueckbau: [
    "Teil- und Komplettentkernung von Gebäuden",
    "Schadstofffreier Rückbau nach aktuellen Standards",
    "Maschineller Abbruch mit modernster Technik",
    "Entsorgung und Verwertung aller Materialien",
    "Staubarme Verfahren für Innenstadtbereiche",
  ],
  asbest: [
    "Zertifizierte Asbestsanierung nach TRGS 519",
    "Kontrollierte Rückbauverfahren mit Unterdruck",
    "Luftmessungen und Freimessungen",
    "Fachgerechte Verpackung und Entsorgung",
    "Dokumentation und Nachweise für Behörden",
  ],
  entsorgung: [
    "Containerstellung auf der Baustelle",
    "Sortierung und Trennung aller Abfallarten",
    "Verwertung und Recycling (Quote > 90%)",
    "Entsorgungsnachweise und Wiegescheine",
    "Flexible Abholtermine nach Bedarf",
  ],
  glasfaser: [
    "Planung und Installation von Glasfasernetzen",
    "Elektroinstallation für Gewerbe und Industrie",
    "Smart Home und Gebäudeautomation",
    "Netzwerkinfrastruktur und Serverräume",
    "Sicherheitsbeleuchtung und Brandschutz",
  ],
};

export function ServiceDetailClient() {
  const params = useParams();
  const slug = params.slug as string;
  const service = services.find((s) => s.id === slug);
  const featList = features[slug] || [];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Leistung nicht gefunden</h1>
          <Link href="/home">
            <CinematicButton variant="secondary" size="sm">Zurück zur Übersicht</CinematicButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <ParticlesBackground />
      <nav className="fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/home" className="text-lg font-black tracking-tighter text-white">
            LORE:BAU
          </Link>
          <Link href="/home" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft className="w-3 h-3" />
            Zurück
          </Link>
        </div>
      </nav>

      <section className="relative min-h-[70vh] flex items-center pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-[#0a0a0a] to-blue-950" />
          <div className="absolute inset-0 opacity-20" style={{
            background: `radial-gradient(ellipse at 50% 30%, ${service.accent}22, transparent 60%)`,
          }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-5xl mx-auto"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-6 block">{service.subtitle}</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6">
            <span className="text-white">{service.title.split(" ")[0]}</span>
            {service.title.includes("&") && (
              <>
                <br />
                <span className="text-gradient" style={{
                  background: `linear-gradient(135deg, ${service.accent}, ${service.accent}88)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {service.title.split("&")[1]}
                </span>
              </>
            )}
          </h1>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-10">
            {service.description}
          </p>
          <Link href="/home#kontakt">
            <CinematicButton variant="primary" size="lg">
              {service.subtitle}
            </CinematicButton>
          </Link>
        </motion.div>
      </section>

      <section ref={ref} className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500/60 font-medium mb-4 block">Leistungsumfang</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-10">
              <span className="text-white">Was wir für Sie</span>
              <br />
              <span className="text-gradient-blue">übernehmen</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featList.map((feat, index) => (
              <motion.div
                key={feat}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-3 p-5 rounded-xl border border-white/5 bg-white/[0.02]"
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: service.accent }} />
                <span className="text-sm text-zinc-300">{feat}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-8 p-10 rounded-3xl border border-white/5 bg-white/[0.02]">
            {Object.entries(service.stats).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-black tracking-tighter mb-1" style={{ color: service.accent }}>
                  {value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-medium">
                  {key === "projects" ? "Projekte" : key === "years" ? "Jahre Erfahrung" : "Experten"}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
              <span className="text-white">Bereit für Ihr Projekt?</span>
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Kontaktieren Sie uns für ein unverbindliches Angebot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/home#kontakt">
                <CinematicButton variant="primary" size="lg">Angebot anfragen</CinematicButton>
              </Link>
              <Link href="/home">
                <CinematicButton variant="secondary" size="lg">Alle Leistungen</CinematicButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-lg font-black tracking-tighter">
            <span className="text-white">LORE</span>
            <span className="text-amber-500">:</span>
            <span className="text-white">BAU</span>
          </div>
          <p className="text-[10px] text-zinc-600">
            © {new Date().getFullYear()} LORE:BAU. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-4 text-[10px] text-zinc-600">
            <a href="#" className="hover:text-zinc-400 transition-colors">Impressum</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Datenschutz</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
