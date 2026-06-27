import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LORE:BAU – Rückbau, Sanierung, Infrastruktur",
  description: "Rückbau, Entkernung, Asbestsanierung, Entsorgung, Glasfaser & Elektrotechnik aus einer Hand.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="bg-[#0a0a0a]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-amber-500/30">
        {children}
      </body>
    </html>
  );
}
