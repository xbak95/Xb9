import Link from "next/link";
import { Linkedin, Instagram, Facebook, Twitter, Mail, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { categories } from "@/data/categories";

const footerCategories = categories.slice(0, 8);

const clientLinks = [
  { href: "/ricerca", label: "Trova un consulente" },
  { href: "/come-funziona", label: "Come funziona" },
  { href: "/matching", label: "Trova il mio consulente" },
  { href: "/prezzi", label: "Servizi a prezzo fisso" },
  { href: "/verifica-consulente", label: "Sistema di verifica" },
];

const consultantLinks = [
  { href: "/per-consulenti", label: "Diventa consulente" },
  { href: "/registrati/consulente", label: "Pubblica il tuo profilo" },
  { href: "/prezzi", label: "Piani e commissioni" },
  { href: "/dashboard/consulente", label: "Area consulente" },
];

const supportLinks = [
  { href: "/centro-assistenza", label: "Centro assistenza" },
  { href: "/faq", label: "Domande frequenti" },
  { href: "/contatti", label: "Contatti" },
  { href: "/segnalazioni", label: "Segnalazioni" },
];

const legalLinks = [
  { href: "/termini", label: "Termini e condizioni" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/cookie", label: "Cookie policy" },
  { href: "/politica-cancellazione", label: "Politica di cancellazione" },
];

export function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-navy-950 text-white">
      <div className="container-px py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Logo variant="light" size={38} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              Il marketplace che mette in contatto aziende e privati con consulenti qualificati e verificati,
              in oltre 20 settori. Prezzi chiari, recensioni reali, prenotazione sicura.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[Linkedin, Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Seguici sui social"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Categorie" links={footerCategories.map((c) => ({ href: `/ricerca?categoria=${c.slug}`, label: c.name }))} />
          <FooterColumn title="Per i clienti" links={clientLinks} />
          <FooterColumn title="Per i consulenti" links={consultantLinks} />
          <FooterColumn title="Assistenza" links={supportLinks} />
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-white">
              <Mail className="h-4 w-4 text-gold" /> Resta aggiornato
            </p>
            <p className="mt-1 text-sm text-white/60">Novità, guide e bandi selezionati per te, una volta al mese.</p>
          </div>
          <form className="mt-4 flex gap-2 sm:mt-0 sm:w-80" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" required placeholder="La tua email" className="border-white/15 bg-white/10 text-white placeholder:text-white/40 focus:ring-white/20" />
            <Button type="submit" variant="gold" size="md" aria-label="Iscriviti alla newsletter">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Pronto Consulente. Tutti i diritti riservati. Piattaforma dimostrativa (MVP).</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-white/65 hover:text-gold-200">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
