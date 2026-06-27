import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const services = [
  {
    id: "rueckbau",
    title: "Rückbau & Entkernung",
    subtitle: "Wir schaffen Raum für Neues",
    description: "Professioneller Rückbau und Entkernung von Gebäuden aller Art – von der Teilentkernung bis zum kompletten Rückbau mit modernster Technik und präziser Planung.",
    gradient: "from-amber-400 to-orange-500",
    accent: "#f59e0b",
    icon: "Building2",
    color: "amber",
    stats: { projects: "850+", years: "25+", experts: "40+" },
    image: "/images/rueckbau.jpg",
  },
  {
    id: "asbest",
    title: "Asbest & Schadstoffsanierung",
    subtitle: "Sicherheit beginnt dort, wo andere stoppen",
    description: "Zertifizierte Asbestsanierung und Schadstoffentsorgung nach höchsten Sicherheitsstandards. Wir sorgen für saubere Luft und sichere Arbeitsumgebungen.",
    gradient: "from-blue-400 to-blue-600",
    accent: "#3b82f6",
    icon: "Shield",
    color: "blue",
    stats: { projects: "1.200+", years: "20+", experts: "35+" },
    image: "/images/asbest.jpg",
  },
  {
    id: "entsorgung",
    title: "Entsorgung & Logistik",
    subtitle: "Effizienz auf jeder Baustelle",
    description: "Rundum-Sorglos-Logistik für Baustellen: Containerstellung, Abholung, Sortierung und fachgerechte Entsorgung aller Abfallarten – termingenau und zuverlässig.",
    gradient: "from-orange-400 to-red-500",
    accent: "#f97316",
    icon: "Truck",
    color: "orange",
    stats: { projects: "3.500+", years: "15+", experts: "60+" },
    image: "/images/entsorgung.jpg",
  },
  {
    id: "glasfaser",
    title: "Glasfaser & Elektrotechnik",
    subtitle: "Die Infrastruktur der Zukunft",
    description: "Planung und Installation moderner Glasfasernetze, Elektroinstallationen und Gebäudeinfrastruktur für private und gewerbliche Projekte.",
    gradient: "from-cyan-400 to-blue-500",
    accent: "#06b6d4",
    icon: "Zap",
    color: "cyan",
    stats: { projects: "2.100+", years: "18+", experts: "45+" },
    image: "/images/glasfaser.jpg",
  },
];

export const stats = [
  { value: "7.650+", label: "Projekte abgeschlossen" },
  { value: "25+", label: "Jahre Erfahrung" },
  { value: "6", label: "Fachbereiche" },
  { value: "< 24h", label: "Reaktionszeit" },
];

export const timeline = [
  { step: "01", title: "Anfrage", desc: "Sie kontaktieren uns – telefonisch, per E-Mail oder über unser Formular." },
  { step: "02", title: "Besichtigung", desc: "Wir besichtigen Ihr Objekt und erstellen ein maßgeschneidertes Angebot." },
  { step: "03", title: "Planung", desc: "Gemeinsam planen wir den Ablauf, die Technik und den Zeitplan." },
  { step: "04", title: "Umsetzung", desc: "Unser Team führt die Arbeiten fachgerecht, termingenau und sauber aus." },
  { step: "05", title: "Übergabe", desc: "Wir dokumentieren alles, übergeben die Fläche und stehen für Fragen bereit." },
];

export const trustItems = [
  { title: "Alles aus einer Hand", desc: "Rückbau, Sanierung, Entsorgung, Technik – wir koordinieren alles für Sie." },
  { title: "Präzise Planung", desc: "Jedes Projekt beginnt mit einer detaillierten Analyse und transparenten Kalkulation." },
  { title: "Moderne Technik", desc: "Modernste Maschinen, Staubsaugertechnik und digitale Projektsteuerung." },
  { title: "Fachgerechte Umsetzung", desc: "Zertifizierte Fachkräfte, geprüfte Verfahren, höchste Sicherheitsstandards." },
  { title: "Für Privat & Industrie", desc: "Vom Einfamilienhaus bis zur Industrieanlage – wir haben die richtige Lösung." },
];
