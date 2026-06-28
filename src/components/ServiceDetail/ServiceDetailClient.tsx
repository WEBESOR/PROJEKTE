"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { services } from "@/lib/utils";
import { ArrowLeft, CheckCircle, Building2, Shield, Truck, Zap, ChevronDown } from "lucide-react";

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

const sceneDescriptions: Record<string, string[]> = {
  rueckbau: [
    "Präzision trifft auf Kraft. Unsere Rückbauprojekte verbinden maschinelle Effizienz mit handwerklicher Sorgfalt – für einen kontrollierten Abbruch in jeder Umgebung.",
    "Vom Industriekomplex bis zum Altbau: Wir schaffen Platz für Neues bei gleichzeitiger Schonung angrenzender Strukturen.",
  ],
  asbest: [
    "Sicherheit hat bei uns oberste Priorität. Unsere zertifizierten Fachkräfte führen Sanierungen unter strengsten Auflagen durch.",
    "In vollständig abgeschotteten Arbeitsbereichen mit Unterdruck-Technologie stellen wir sicher, dass keine Schadstoffe nach außen dringen.",
  ],
  entsorgung: [
    "Effiziente Kreislaufwirtschaft beginnt auf Ihrer Baustelle. Unsere Logistik sorgt für sortenreine Trennung und fachgerechte Verwertung.",
    "Mit einer Recyclingquote von über 90% tragen wir aktiv zur Schonung natürlicher Ressourcen bei – bei voller Transparenz durch Wiegescheine.",
  ],
  glasfaser: [
    "Zukunftssichere Infrastruktur für Ihr Unternehmen. Wir planen und realisieren Glasfasernetze, die höchsten Ansprüchen genügen.",
    "Von der Gebäudeverkabelung bis zum Smart-Home-System: Unsere Elektrotechnik-Experten vernetzen Ihre Immobilie intelligent.",
  ],
};

const perkLists: Record<string, string[]> = {
  rueckbau: ["Geprüfte Abbruchunternehmen", "Moderner Maschinenpark", "Schadstoffkataster", "Termintreue"],
  asbest: ["Zertifiziert nach TRGS 519", "BG-geprüfte Schutzausrüstung", "Dokumentierte Luftmessungen", "Behördengängige Nachweise"],
  entsorgung: ["Eigener Fuhrpark", "Sortieranlage vor Ort", "Wertstofftrennung", "Wochenend-Service"],
  glasfaser: ["FTTH-Spezialisten", "Planung aus einer Hand", "Zukunftssicher bis 10G", "24h Störungsdienst"],
};

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
};

function SceneSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FilmGrain() {
  return (
    <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    }} />
  );
}

export function ServiceDetailClient() {
  const params = useParams();
  const slug = params.slug as string;
  const service = services.find((s) => s.id === slug);
  const featList = features[slug] || [];
  const descs = sceneDescriptions[slug] || [];
  const perks = perkLists[slug] || [];
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Leistung nicht gefunden</h1>
          <button onClick={() => router.push("/home")} className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors">
            Zurück zur Übersicht
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#0a0a0a] overflow-hidden">
      {/* ===== SCENE 1: Hero / Title Card ===== */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: heroScale, opacity: heroOpacity }}>
          <img src={`/images/${slug}.jpg`} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-[#0a0a0a]/20 to-[#0a0a0a]" />
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at 50% 30%, ${service.accent}22, transparent 60%)`,
          }} />
        </motion.div>
        <FilmGrain />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          backgroundSize: '100% 4px',
        }} />

        {/* Nav */}
        <nav className="absolute top-0 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <button onClick={() => router.push("/home")} className="text-lg font-black tracking-tighter text-white">
              LORE:BAU
            </button>
            <button onClick={() => router.push("/home")} className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">
              <ArrowLeft className="w-3 h-3" />
              Zurück
            </button>
          </div>
        </nav>

        {/* Scene content */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[10px] uppercase tracking-[0.3em] font-medium mb-6 block"
              style={{ color: service.accent }}
            >
              {service.subtitle}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-6"
            >
              {service.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
            >
              {service.description}
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] uppercase tracking-[0.3em] text-zinc-600">Entdecken</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== SCENE 2: Stats / Impact ===== */}
      <section className="relative min-h-screen flex items-center py-32 px-6">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }} />
        </div>
        <FilmGrain />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <SceneSection className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.3em] font-medium block mb-4"
              style={{ color: service.accent }}
            >
              LORE:BAU in Zahlen
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-6xl font-black tracking-tighter"
            >
              <span className="text-white">Unsere</span>
              <br />
              <span className="text-gradient-blue">Bilanz</span>
            </motion.h2>
          </SceneSection>

          <div className="grid grid-cols-3 gap-6 md:gap-12">
            {Object.entries(service.stats).map(([key, value], index) => (
              <SceneSection key={key}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                  className="text-center p-8 rounded-2xl border border-white/5 bg-white/[0.02]"
                >
                  <div className="text-4xl md:text-6xl font-black tracking-tighter mb-2" style={{ color: service.accent }}>
                    {value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-medium">
                    {key === "projects" ? "Projekte" : key === "years" ? "Jahre Erfahrung" : "Experten"}
                  </div>
                </motion.div>
              </SceneSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SCENE 3: Description / Story ===== */}
      <section className="relative min-h-screen flex items-center py-32 px-6">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at 70% 50%, ${service.accent}11, transparent 60%)`,
          }} />
        </div>
        <FilmGrain />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {descs.map((desc, i) => (
            <SceneSection key={i} className="mb-16 last:mb-0">
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className={`hidden md:block w-1 h-24 flex-shrink-0 mt-2`} style={{
                  background: `linear-gradient(180deg, ${service.accent}, transparent)`,
                }} />
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium mb-3 block" style={{ color: service.accent }}>
                    Szene {i + 1}
                  </span>
                  <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl">
                    {desc}
                  </p>
                </div>
              </motion.div>
            </SceneSection>
          ))}
        </div>
      </section>

      {/* ===== SCENE 4: Features ===== */}
      <section className="relative min-h-screen flex items-center py-32 px-6">
        <div className="absolute inset-0">
          <img src={`/images/${slug}.jpg`} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[#0a0a0a]/90" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
        </div>
        <FilmGrain />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <SceneSection className="mb-16 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.3em] font-medium block mb-4"
              style={{ color: service.accent }}
            >
              Leistungsumfang
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-6xl font-black tracking-tighter"
            >
              <span className="text-white">Was wir für Sie</span>
              <br />
              <span className="text-gradient-blue">übernehmen</span>
            </motion.h2>
          </SceneSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featList.map((feat, index) => (
              <SceneSection key={feat}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-3 p-5 rounded-xl border border-white/5 bg-white/[0.02] group hover:bg-white/[0.04] transition-colors"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: service.accent }} />
                  <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{feat}</span>
                </motion.div>
              </SceneSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SCENE 5: Perks / Why Us ===== */}
      <section className="relative min-h-screen flex items-center py-32 px-6">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at 30% 50%, ${service.accent}11, transparent 60%)`,
          }} />
        </div>
        <FilmGrain />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <SceneSection className="mb-16 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.3em] font-medium block mb-4"
              style={{ color: service.accent }}
            >
              Warum LORE:BAU
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-6xl font-black tracking-tighter"
            >
              <span className="text-white">Ihre Vorteile</span>
              <br />
              <span className="text-gradient-orange">auf einen Blick</span>
            </motion.h2>
          </SceneSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {perks.map((perk, index) => (
              <SceneSection key={perk}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] h-full flex flex-col items-center justify-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
                    background: `${service.accent}15`,
                    color: service.accent,
                  }}>
                    {iconMap[service.icon]}
                  </div>
                  <span className="text-xs md:text-sm font-medium text-zinc-300 leading-tight">{perk}</span>
                </motion.div>
              </SceneSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SCENE 6: CTA / Finale ===== */}
      <section className="relative min-h-screen flex items-center justify-center py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src={`/images/${slug}.jpg`} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]" />
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                `radial-gradient(600px circle at 30% 50%, ${service.accent}22, transparent 60%)`,
                `radial-gradient(600px circle at 70% 50%, ${service.accent}22, transparent 60%)`,
                `radial-gradient(600px circle at 30% 50%, ${service.accent}22, transparent 60%)`,
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <FilmGrain />
        <div className="relative z-10 text-center max-w-3xl">
          <SceneSection>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.3em] font-medium block mb-6"
              style={{ color: service.accent }}
            >
              Bereit für Ihr Projekt?
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl font-black tracking-tighter leading-none mb-6"
            >
              <span className="text-white">Jetzt</span>
              <br />
              <span className="text-gradient">durchstarten</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base text-zinc-400 mb-10 max-w-lg mx-auto"
            >
              Kontaktieren Sie uns für ein unverbindliches Angebot. Wir sind innerhalb von 24 Stunden für Sie da.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => router.push("/home#kontakt")}
                className="px-8 py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-semibold text-white transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${service.accent}, ${service.accent}88)`,
                  boxShadow: `0 0 40px ${service.accent}33`,
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 60px ${service.accent}66`}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 40px ${service.accent}33`}
              >
                Angebot anfragen
              </button>
              <button
                onClick={() => router.push("/home")}
                className="px-8 py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-semibold text-zinc-400 border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
              >
                Alle Leistungen
              </button>
            </motion.div>
          </SceneSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <button onClick={() => router.push("/home")} className="text-lg font-black tracking-tighter">
            <span className="text-white">LORE</span>
            <span className="text-amber-500">:</span>
            <span className="text-white">BAU</span>
          </button>
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
