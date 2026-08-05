import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.prontoconsulente.it"),
  title: {
    default: "Pronto Consulente — La consulenza giusta. Subito.",
    template: "%s | Pronto Consulente",
  },
  description:
    "Trova, confronta e prenota consulenti qualificati in finanza agevolata, legale, HSE, marketing, cybersecurity e altri 18 settori. Prezzi chiari, recensioni verificate, prenotazione online.",
  keywords: [
    "consulenti",
    "consulenza aziendale",
    "marketplace consulenza",
    "finanza agevolata",
    "consulenza legale",
    "HSE sicurezza sul lavoro",
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Pronto Consulente",
    title: "Pronto Consulente — La consulenza giusta. Subito.",
    description:
      "Confronta professionisti qualificati, consulta prezzi e recensioni e prenota la tua consulenza online.",
    url: "https://www.prontoconsulente.it",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pronto Consulente — La consulenza giusta. Subito.",
    description:
      "Confronta professionisti qualificati, consulta prezzi e recensioni e prenota la tua consulenza online.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${heading.variable} ${body.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Vai al contenuto principale
        </a>
        {children}
      </body>
    </html>
  );
}
