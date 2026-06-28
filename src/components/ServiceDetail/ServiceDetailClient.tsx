"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { services } from "@/lib/utils";
import { ArrowLeft, CheckCircle, Building2, Shield, Truck, Zap, ChevronDown, Play } from "lucide-react";

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

const sceneNumbers = ["I", "II", "III", "IV", "V", "VI"];

function SceneSection({ children, className = "", sceneNum, accentColor }: {
  children: React.ReactNode;
  className?: string;
  sceneNum?: number;
  accentColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {sceneNum && accentColor && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] font-medium px-3 py-1.5 rounded border"
            style={{ color: accentColor, borderColor: `${accentColor}33`, background: `${accentColor}11` }}>
            Szene {sceneNumbers[sceneNum] || sceneNum}
          </span>
          <div className="h-px flex-1" style={{
            background: `linear-gradient(90deg, ${accentColor}44, transparent)`,
          }} />
        </motion.div>
      )}
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

function FilmCorners() {
  return (
    <>
      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/10 z-10" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/10 z-10" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/10 z-10" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/10 z-10" />
    </>
  );
}

function SceneTransition({ accentColor }: { accentColor: string }) {
  return (
    <div className="relative h-24 md:h-32 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-[0.03]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-white" />
        ))}
      </div>
      <div className="h-px w-32" style={{
        background: `linear-gradient(90deg, transparent, ${accentColor}44, transparent)`,
      }} />
    </div>
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
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
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
      <FilmGrain />

      {/* ===== SCENE I: Hero / Title Card ===== */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: heroScale, opacity: heroOpacity }}>
          <img src={`/images/${slug}.jpg`} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/20 to-[#0a0a0a]" />
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at 50% 30%, ${service.accent}22, transparent 60%)`,
          }} />
        </motion.div>

        {/* Scanlines */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          backgroundSize: '100% 4px',
        }} />

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }} />

        <FilmCorners />

        {/* Nav */}
        <nav className="absolute top-0 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <button onClick={() => router.push("/home")} className="text-lg font-black tracking-tighter text-white">
              LORE:BAU
            </button>
            <button onClick={() => router.push("/")} className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">
              <ArrowLeft className="w-3 h-3" />
              Programm
            </button>
          </div>
        </nav>

        {/* Scene I badge */}
        <div className="absolute top-24 left-6 md:left-10 z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[8px] uppercase tracking-[0.4em] font-medium px-3 py-1.5 rounded border"
            style={{ color: service.accent, borderColor: `${service.accent}33`, background: `${service.accent}11` }}
          >
            Szene I
          </motion.div>
        </div>

        {/* Scene content */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-5xl"
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
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-6"
            >
              {service.title}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="h-[2px] w-24 mx-auto mb-6"
              style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)` }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
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
          transition={{ delay: 2.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] uppercase tracking-[0.3em] text-zinc-600">Entdecken</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          </motion.div>
        </motion.div>
      </section>

      <SceneTransition accentColor={service.accent} />

      {/* ===== SCENE II: Stats / Impact ===== */}
      <section className="relative min-h-screen flex items-center py-32 px-6">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }} />
        </div>
        <FilmCorners />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <SceneSection sceneNum={1} accentColor={service.accent} className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl font-black tracking-tighter"
            >
              <span className="text-white">Unsere</span>
              <br />
              <span style={{ color: service.accent }}>Bilanz</span>
            </motion.h2>
          </SceneSection>

          <div className="grid grid-cols-3 gap-6 md:gap-12">
            {Object.entries(service.stats).map(([key, value], index) => (
              <SceneSection key={key}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center p-8 md:p-12 rounded-2xl border relative overflow-hidden group"
                  style={{ borderColor: `${service.accent}11`, background: `${service.accent}02` }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(600px circle at 50% 50%, ${service.accent}08, transparent 60%)`,
                    }}
                  />
                  <div className="text-5xl md:text-7xl font-black tracking-tighter mb-3 relative" style={{ color: service.accent }}>
                    {value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-medium relative">
                    {key === "projects" ? "Projekte" : key === "years" ? "Jahre Erfahrung" : "Experten"}
                  </div>
                </motion.div>
              </SceneSection>
            ))}
          </div>
        </div>
      </section>

      <SceneTransition accentColor={service.accent} />

      {/* ===== SCENE III: Description / Story ===== */}
      <section className="relative min-h-screen flex items-center py-32 px-6">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at 70% 50%, ${service.accent}11, transparent 60%)`,
          }} />
        </div>
        <FilmCorners />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <SceneSection sceneNum={2} accentColor={service.accent} className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl font-black tracking-tighter mb-16"
            >
              <span className="text-white">Unsere</span>
              <br />
              <span style={{ color: service.accent }}>Geschichte</span>
            </motion.h2>
          </SceneSection>

          {descs.map((desc, i) => (
            <SceneSection key={i} className="mb-16 last:mb-0">
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-6"
              >
                <div className="hidden md:flex flex-col items-center gap-3 flex-shrink-0">
                  <div className="w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-bold"
                    style={{ borderColor: `${service.accent}33`, color: service.accent }}>
                    {i + 1}
                  </div>
                  <div className="w-px flex-1" style={{
                    background: `linear-gradient(180deg, ${service.accent}44, transparent)`,
                  }} />
                </div>
                <div className="flex-1">
                  <p className="text-base md:text-xl text-zinc-300 leading-relaxed max-w-3xl">
                    {desc}
                  </p>
                </div>
              </motion.div>
            </SceneSection>
          ))}
        </div>
      </section>

      <SceneTransition accentColor={service.accent} />

      {/* ===== SCENE IV: Features ===== */}
      <section className="relative min-h-screen flex items-center py-32 px-6">
        <div className="absolute inset-0">
          <img src={`/images/${slug}.jpg`} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[#0a0a0a]/90" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
        </div>
        <FilmCorners />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <SceneSection sceneNum={3} accentColor={service.accent} className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl font-black tracking-tighter"
            >
              <span className="text-white">Was wir für Sie</span>
              <br />
              <span style={{ color: service.accent }}>übernehmen</span>
            </motion.h2>
          </SceneSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featList.map((feat, index) => (
              <SceneSection key={feat}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4 p-6 rounded-xl border group hover:bg-white/[0.03] transition-all duration-500"
                  style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                >
                  <motion.div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${service.accent}15`, color: service.accent }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle className="w-4 h-4" />
                  </motion.div>
                  <span className="text-sm md:text-base text-zinc-300 group-hover:text-white transition-colors">{feat}</span>
                </motion.div>
              </SceneSection>
            ))}
          </div>
        </div>
      </section>

      <SceneTransition accentColor={service.accent} />

      {/* ===== SCENE V: Perks / Why Us ===== */}
      <section className="relative min-h-screen flex items-center py-32 px-6">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at 30% 50%, ${service.accent}11, transparent 60%)`,
          }} />
        </div>
        <FilmCorners />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <SceneSection sceneNum={4} accentColor={service.accent} className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl font-black tracking-tighter"
            >
              <span className="text-white">Ihre Vorteile</span>
              <br />
              <span style={{ color: service.accent }}>auf einen Blick</span>
            </motion.h2>
          </SceneSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {perks.map((perk, index) => (
              <SceneSection key={perk}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center p-6 md:p-8 rounded-2xl border h-full flex flex-col items-center justify-center gap-4 group hover:bg-white/[0.03] transition-all duration-500"
                  style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${service.accent}15`, color: service.accent }}
                    whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {iconMap[service.icon]}
                  </motion.div>
                  <span className="text-xs md:text-sm font-medium text-zinc-300 leading-tight group-hover:text-white transition-colors">{perk}</span>
                </motion.div>
              </SceneSection>
            ))}
          </div>
        </div>
      </section>

      <SceneTransition accentColor={service.accent} />

      {/* ===== SCENE VI: CTA / Finale ===== */}
      <section className="relative min-h-screen flex items-center justify-center py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src={`/images/${slug}.jpg`} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]" />
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                `radial-gradient(800px circle at 30% 50%, ${service.accent}22, transparent 60%)`,
                `radial-gradient(800px circle at 70% 50%, ${service.accent}22, transparent 60%)`,
                `radial-gradient(800px circle at 30% 50%, ${service.accent}22, transparent 60%)`,
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
        }} />

        <FilmCorners />

        <div className="relative z-10 text-center max-w-3xl">
          <SceneSection sceneNum={5} accentColor={service.accent}>
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
              className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6"
            >
              <span className="text-white">Jetzt</span>
              <br />
              <span style={{ color: service.accent }}>durchstarten</span>
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/home#kontakt")}
                className="px-10 py-5 rounded-xl text-xs uppercase tracking-[0.2em] font-semibold text-white transition-all duration-500 flex items-center gap-3 mx-auto sm:mx-0"
                style={{
                  background: `linear-gradient(135deg, ${service.accent}, ${service.accent}88)`,
                  boxShadow: `0 0 40px ${service.accent}33`,
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 60px ${service.accent}66`}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 40px ${service.accent}33`}
              >
                <Play className="w-3.5 h-3.5" />
                Angebot anfragen
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/")}
                className="px-10 py-5 rounded-xl text-xs uppercase tracking-[0.2em] font-semibold text-zinc-400 border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
              >
                Zum Programm
              </motion.button>
            </motion.div>
          </SceneSection>
        </div>
      </section>

      {/* Footer with film strip */}
      <footer className="relative border-t border-white/5 py-10 px-6">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="flex gap-4 justify-center py-2">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="w-[3px] h-[3px] rounded-full bg-white" />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <button onClick={() => router.push("/")} className="text-lg font-black tracking-tighter">
            <span className="text-white">LORE</span>
            <span className="text-amber-500">:</span>
            <span className="text-white">BAU</span>
          </button>
          <p className="text-[10px] text-zinc-600">
            © {new Date().getFullYear()} LORE:BAU Filmwerke. Alle Rechte vorbehalten.
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