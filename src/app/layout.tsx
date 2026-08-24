import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

import { MotionProvider } from "@/components/motion-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.casainchiaro.it";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Casa in Chiaro | Assistenza tecnico-normativa alla compravendita immobiliare",
    template: "%s | Casa in Chiaro",
  },
  description:
    "Verifichiamo documenti, conformità edilizia, urbanistica e catastale, agibilità, APE e criticità tecniche prima della proposta, del preliminare, del rogito o dell'asta giudiziaria. Compra, vendi o partecipa a un'asta in sicurezza.",
  keywords: [
    "verifica tecnica immobile",
    "due diligence immobiliare",
    "conformità edilizia",
    "conformità catastale",
    "agibilità",
    "APE",
    "asta giudiziaria",
    "perizia immobiliare",
    "assistenza tecnico-normativa",
  ],
  authors: [{ name: "Casa in Chiaro" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteUrl,
    siteName: "Casa in Chiaro",
    title: "Casa in Chiaro | Compra, vendi o partecipa a un'asta in sicurezza",
    description:
      "Assistenza tecnico-normativa alla compravendita immobiliare: verifichiamo documenti e conformità prima che diventino un problema.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Casa in Chiaro" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa in Chiaro | Compra, vendi o partecipa a un'asta in sicurezza",
    description:
      "Verifiche tecniche indipendenti su documenti, edilizia, catasto, agibilità e impianti prima dell'acquisto o della vendita.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Casa in Chiaro",
  description:
    "Assistenza tecnico-normativa alla compravendita immobiliare: verifiche di conformità edilizia, urbanistica, catastale, agibilità, APE e impianti.",
  url: siteUrl,
  image: `${siteUrl}/og-image.jpg`,
  areaServed: "IT",
  priceRange: "€€",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${inter.variable} ${manrope.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white font-sans text-ink antialiased selection:bg-brand-yellow">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
