import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.24C15.9 4.15 14.9 4 13.75 4 11.4 4 9.8 5.43 9.8 8.1v2.3H7.2v3h2.6V21h3.7Z" />
    </svg>
  );
}
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.2a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20h-3.37v-5.9c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1V20H9.5V8.5h3.23v1.57h.05c.45-.85 1.55-1.75 3.2-1.75 3.42 0 4.46 2.25 4.46 5.18V20Z" />
    </svg>
  );
}
const socialIcons = [FacebookIcon, InstagramIcon, LinkedinIcon];

const columns = [
  {
    title: "Servizi",
    links: [
      { label: "Conformità edilizia", href: "#verifichiamo" },
      { label: "Catasto e agibilità", href: "#verifichiamo" },
      { label: "APE e impianti", href: "#verifichiamo" },
      { label: "Supporto aste immobiliari", href: "#verifichiamo" },
    ],
  },
  {
    title: "Azienda",
    links: [
      { label: "Chi siamo", href: "#per-chi" },
      { label: "Come lavoriamo", href: "#come-lavoriamo" },
      { label: "FAQ", href: "#faq" },
      { label: "Contatti", href: "#contatti" },
    ],
  },
  {
    title: "Legale",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookie" },
      { label: "Termini di servizio", href: "/termini" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="contatti" className="border-t border-ink/8 bg-white pt-16">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-12 pb-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/logo-compact.png"
              alt="Casa in Chiaro"
              width={200}
              height={52}
              className="h-11 w-auto"
            />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ink/60">
              Assistenza tecnico-normativa alla compravendita immobiliare.
              Verifichiamo. Chiarezza prima di decidere.
            </p>
            <div className="mt-6 flex gap-3">
              {socialIcons.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="flex size-11 items-center justify-center rounded-full bg-cream text-ink/60 transition-colors hover:bg-brand-red hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:ring-offset-2"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-ink/60 transition-colors hover:text-brand-red"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
              Contatti
            </h4>
            <ul className="mt-5 space-y-3 text-[15px] text-ink/60">
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-brand-red" />
                <a href="mailto:info@casainchiaro.it" className="hover:text-brand-red">
                  info@casainchiaro.it
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-brand-red" />
                <a href="tel:+390000000000" className="hover:text-brand-red">
                  +39 000 000 0000
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-red" />
                <span>Operativi in tutta Italia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-ink/8 py-7 text-sm text-ink/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Casa in Chiaro. Tutti i diritti riservati.</p>
          <p>Ingegnere libero professionista</p>
        </div>
      </div>
    </footer>
  );
}
