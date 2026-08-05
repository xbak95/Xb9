import {
  Briefcase, Award, Layers, Building2, FileDown, ShieldCheck, FolderKanban,
  CalendarDays, HelpCircle, FileWarning, Download,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ReviewList } from "@/components/reviews/ReviewList";
import { formatCurrency } from "@/lib/utils";
import { caseStudies } from "@/data/case-studies";
import type { Consultant } from "@/lib/types";

const levelValue: Record<string, number> = { Base: 35, Intermedio: 60, Avanzato: 80, Esperto: 100 };

const navSections = [
  { id: "chi-sono", label: "Chi sono" },
  { id: "esperienza", label: "Esperienza" },
  { id: "competenze", label: "Competenze" },
  { id: "servizi", label: "Servizi e prezzi" },
  { id: "portfolio", label: "Portfolio" },
  { id: "calendario", label: "Calendario" },
  { id: "recensioni", label: "Recensioni" },
  { id: "faq", label: "FAQ" },
  { id: "politiche", label: "Politiche" },
];

export function ProfileNav() {
  return (
    <div className="sticky top-[4.5rem] z-20 border-b border-navy-100 bg-white/95 backdrop-blur">
      <nav className="container-px flex gap-5 overflow-x-auto py-3 text-sm" aria-label="Sezioni profilo">
        {navSections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="shrink-0 font-medium text-body hover:text-navy">
            {s.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

export function ProfileContent({ consultant }: { consultant: Consultant }) {
  const studies = caseStudies.filter((cs) => cs.consultantId === consultant.id);

  return (
    <div className="container-px grid grid-cols-1 gap-10 py-10 lg:grid-cols-[1fr_320px]">
      <div className="space-y-14">
        <section id="chi-sono" className="scroll-mt-32">
          <SectionTitle icon={Briefcase} title="Chi sono" />
          <p className="mt-4 leading-relaxed text-ink">{consultant.bio}</p>
        </section>

        <section id="esperienza" className="scroll-mt-32">
          <SectionTitle icon={Layers} title="Esperienza" />
          <ol className="mt-6 space-y-6 border-l-2 border-navy-100 pl-6">
            {consultant.experiences.map((exp) => (
              <li key={exp.id} className="relative">
                <span className="absolute -left-[1.65rem] top-1 h-3 w-3 rounded-full border-2 border-white bg-gold" />
                <p className="text-xs font-semibold uppercase tracking-wide text-institutional">{exp.period}</p>
                <h3 className="mt-1 font-heading text-base font-semibold text-navy">{exp.role}</h3>
                <p className="text-sm text-body">{exp.organization}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink">{exp.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="competenze" className="scroll-mt-32">
          <SectionTitle icon={Award} title="Competenze" />
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {consultant.skills.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-navy-800">{s.name}</span>
                  <span className="text-xs text-body">{s.level} · {s.years} anni</span>
                </div>
                <ProgressBar value={levelValue[s.level] ?? 50} className="mt-1.5" tone="gold" />
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="flex items-center gap-2 font-heading text-sm font-semibold text-navy">
              <Building2 className="h-4 w-4" /> Settori seguiti
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {consultant.sectors.map((s) => (
                <Badge key={s} tone="navy">
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 font-heading text-sm font-semibold text-navy">
                <FileDown className="h-4 w-4" /> Curriculum
              </h3>
              <a
                href={consultant.cvUrl}
                className="mt-3 flex items-center gap-2 rounded-xl border border-navy-100 px-4 py-3 text-sm font-medium text-navy-700 hover:bg-navy-50"
              >
                <Download className="h-4 w-4" /> Scarica CV (PDF)
              </a>
            </div>
            <div>
              <h3 className="flex items-center gap-2 font-heading text-sm font-semibold text-navy">
                <ShieldCheck className="h-4 w-4" /> Certificazioni
              </h3>
              <ul className="mt-3 space-y-2">
                {consultant.certifications.length === 0 && <p className="text-sm text-body">Nessuna certificazione pubblicata.</p>}
                {consultant.certifications.map((c) => (
                  <li key={c.id} className="flex items-center justify-between rounded-xl border border-navy-100 px-4 py-2.5 text-sm">
                    <span>
                      <span className="font-medium text-navy-800">{c.name}</span>
                      <span className="block text-xs text-body">
                        {c.issuer} · {c.year}
                      </span>
                    </span>
                    {c.verified && <Badge tone="verified">Verificata</Badge>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="servizi" className="scroll-mt-32">
          <SectionTitle icon={Briefcase} title="Servizi e prezzi" />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {consultant.services.map((s) => (
              <Card key={s.id} className="flex flex-col">
                <CardBody className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-heading text-[15px] font-semibold text-navy">{s.title}</h3>
                    <span className="shrink-0 font-heading text-lg font-bold text-navy">
                      {s.price === 0 ? "Gratuito" : `${s.priceType === "da" ? "Da " : ""}${formatCurrency(s.price)}`}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-body">{s.description}</p>
                  <ul className="mt-3 space-y-1.5">
                    {s.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2 text-xs text-ink">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-500" /> {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-body">
                    <span>Consegna: {s.deliveryTime}</span>
                    <span className="capitalize">Modalità: {s.modality}</span>
                  </div>
                  <div className="mt-auto pt-4">
                    <ButtonLink href="#" fullWidth size="sm">
                      Prenota questo servizio
                    </ButtonLink>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        <section id="portfolio" className="scroll-mt-32">
          <SectionTitle icon={FolderKanban} title="Portfolio e casi studio" />
          {studies.length === 0 ? (
            <EmptyState className="mt-6" icon={FolderKanban} title="Nessun caso studio pubblicato" description="Questo consulente non ha ancora aggiunto progetti al proprio portfolio." />
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {studies.map((cs) => (
                <Card key={cs.id}>
                  <CardBody>
                    <Badge tone="navy">{cs.sector}</Badge>
                    <h3 className="mt-2.5 font-heading text-[15px] font-semibold text-navy">{cs.title}</h3>
                    <p className="mt-1 text-xs text-body">Cliente: {cs.client}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink">{cs.summary}</p>
                    <ul className="mt-3 space-y-1.5">
                      {cs.results.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-xs font-medium text-verified-600">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-verified" /> {r}
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </section>

        <section id="calendario" className="scroll-mt-32">
          <SectionTitle icon={CalendarDays} title="Calendario" />
          <p className="mt-3 text-sm text-body">Prossime disponibilità — seleziona un servizio per prenotare l'orario esatto.</p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {consultant.availability.map((slot) => (
              <div key={slot.date} className="rounded-xl border border-navy-100 p-3 text-center">
                <p className="text-xs font-semibold uppercase text-body">
                  {new Date(slot.date).toLocaleDateString("it-IT", { weekday: "short", day: "2-digit", month: "short" })}
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-1">
                  {slot.times.length === 0 ? (
                    <span className="text-xs text-body">—</span>
                  ) : (
                    slot.times.map((t) => (
                      <span key={t} className="rounded-md bg-navy-50 px-1.5 py-0.5 text-[11px] font-medium text-navy-700">
                        {t}
                      </span>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="recensioni" className="scroll-mt-32">
          <SectionTitle icon={Award} title="Recensioni" />
          <div className="mt-6">
            <ReviewList consultantId={consultant.id} />
          </div>
        </section>

        <section id="faq" className="scroll-mt-32">
          <SectionTitle icon={HelpCircle} title="Domande frequenti" />
          {consultant.faqs.length === 0 ? (
            <p className="mt-4 text-sm text-body">Questo consulente non ha ancora pubblicato FAQ personalizzate.</p>
          ) : (
            <div className="mt-5 space-y-3">
              {consultant.faqs.map((f) => (
                <details key={f.question} className="group rounded-xl border border-navy-100 p-4">
                  <summary className="cursor-pointer font-medium text-navy-800 marker:content-none">{f.question}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-body">{f.answer}</p>
                </details>
              ))}
            </div>
          )}
        </section>

        <section id="politiche" className="scroll-mt-32">
          <SectionTitle icon={FileWarning} title="Politiche" />
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-navy-800">Cancellazione</dt>
              <dd className="mt-1 text-body">{consultant.policies.cancellation}</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy-800">Riprogrammazione</dt>
              <dd className="mt-1 text-body">{consultant.policies.reschedule}</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy-800">Rimborsi</dt>
              <dd className="mt-1 text-body">{consultant.policies.refund}</dd>
            </div>
          </dl>
        </section>
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-32 space-y-4">
          <Card>
            <CardBody>
              <p className="text-xs font-semibold uppercase tracking-wide text-body">Riepilogo</p>
              <dl className="mt-3 space-y-2.5 text-sm">
                <Row label="Anni di esperienza" value={`${consultant.yearsExperience}`} />
                <Row label="Consulenze completate" value={`${consultant.completedConsultations}`} />
                <Row label="Tempo medio di risposta" value={`${consultant.avgResponseTimeHours}h`} />
                <Row label="Visualizzazioni profilo" value={`${consultant.profileViews.toLocaleString("it-IT")}`} />
              </dl>
            </CardBody>
          </Card>
          <Button variant="outline" fullWidth>
            Segnala questo profilo
          </Button>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-body">{label}</dt>
      <dd className="font-semibold text-navy">{value}</dd>
    </div>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-navy">
      <Icon className="h-5 w-5 text-institutional" /> {title}
    </h2>
  );
}
