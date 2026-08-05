import { CheckCircle2, Clock3, MapPin, Rocket } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { categories } from "@/data/categories";
import { formatCurrency } from "@/lib/utils";
import type { OnboardingData } from "./types";

function SummaryRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-navy-50 py-2.5 last:border-0 sm:flex-row sm:items-baseline sm:justify-between">
      <span className="text-xs font-medium uppercase tracking-wide text-body">{label}</span>
      <span className="text-sm text-ink">{value || <span className="text-body/70">Non specificato</span>}</span>
    </div>
  );
}

export function Step12Preview({
  data,
  published,
  onPublish,
}: {
  data: OnboardingData;
  published: boolean;
  onPublish: () => void;
}) {
  const category = categories.find((c) => c.slug === data.categorySlug);
  const availableDays = Object.entries(data.availability).filter(([, v]) => v.morning || v.afternoon);

  if (published) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-verified-50 bg-verified-50/50 px-6 py-12 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-verified text-white">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold text-navy">Profilo inviato con successo</h3>
        <p className="mt-2 max-w-md text-sm text-body">
          Il tuo profilo è in revisione. Il nostro team verificherà i tuoi dati e le tue certificazioni
          entro 48 ore lavorative: riceverai un'email non appena sarà pubblicato.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-body">
        Ultimo passo: controlla che tutto sia corretto. Potrai modificare qualsiasi informazione anche dopo
        la pubblicazione, dalla tua area consulente.
      </p>

      <section className="rounded-xl border border-navy-100 p-4 sm:p-5">
        <h3 className="mb-2 text-sm font-semibold text-navy">Dati personali</h3>
        <SummaryRow label="Nome completo" value={`${data.personal.firstName} ${data.personal.lastName}`.trim()} />
        <SummaryRow label="Email" value={data.personal.email} />
        <SummaryRow label="Telefono" value={data.personal.phone} />
        <SummaryRow
          label="Città"
          value={
            data.personal.city ? (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-body" />
                {data.personal.city}
              </span>
            ) : (
              ""
            )
          }
        />
      </section>

      <section className="rounded-xl border border-navy-100 p-4 sm:p-5">
        <h3 className="mb-2 text-sm font-semibold text-navy">Profilo professionale</h3>
        <SummaryRow label="Titolo" value={data.professionalTitle} />
        <SummaryRow label="Categoria" value={category?.name} />
        <SummaryRow
          label="Specializzazioni"
          value={
            data.subcategories.length > 0 ? (
              <span className="flex flex-wrap justify-end gap-1.5">
                {data.subcategories.map((s) => (
                  <Badge key={s} tone="navy">
                    {s}
                  </Badge>
                ))}
              </span>
            ) : (
              ""
            )
          }
        />
        <SummaryRow label="Curriculum" value={data.cvFileName} />
        <SummaryRow label="Documento d'identità" value={data.identityFileName} />
      </section>

      <section className="rounded-xl border border-navy-100 p-4 sm:p-5">
        <h3 className="mb-2 text-sm font-semibold text-navy">Descrizione</h3>
        <p className="text-sm text-ink">{data.bio || <span className="text-body/70">Nessuna descrizione inserita.</span>}</p>
      </section>

      <section className="rounded-xl border border-navy-100 p-4 sm:p-5">
        <h3 className="mb-2 text-sm font-semibold text-navy">Esperienze ({data.experiences.length})</h3>
        {data.experiences.length === 0 && <p className="text-sm text-body/70">Nessuna esperienza inserita.</p>}
        <ul className="space-y-1.5">
          {data.experiences.map((exp) => (
            <li key={exp.id} className="text-sm text-ink">
              <span className="font-medium">{exp.role || "Ruolo non specificato"}</span>
              {exp.organization && ` · ${exp.organization}`}
              {exp.period && ` · ${exp.period}`}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-navy-100 p-4 sm:p-5">
        <h3 className="mb-2 text-sm font-semibold text-navy">Certificazioni ({data.certifications.length})</h3>
        {data.certifications.length === 0 && <p className="text-sm text-body/70">Nessuna certificazione inserita.</p>}
        <ul className="space-y-1.5">
          {data.certifications.map((c) => (
            <li key={c.id} className="text-sm text-ink">
              {c.name || "Certificazione"} {c.issuer && `· ${c.issuer}`} {c.year && `· ${c.year}`}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-navy-100 p-4 sm:p-5">
        <h3 className="mb-2 text-sm font-semibold text-navy">Servizi ({data.services.length})</h3>
        {data.services.length === 0 && <p className="text-sm text-body/70">Nessun servizio inserito.</p>}
        <ul className="space-y-2">
          {data.services.map((s) => (
            <li key={s.id} className="flex items-center justify-between text-sm text-ink">
              <span>
                {s.title || "Servizio"} {s.duration && `· ${s.duration} min`}
              </span>
              <span className="font-semibold text-navy">
                {s.price ? formatCurrency(Number(s.price) || 0) : "—"}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-navy-100 p-4 sm:p-5">
        <h3 className="mb-2 text-sm font-semibold text-navy">Disponibilità</h3>
        {availableDays.length === 0 && <p className="text-sm text-body/70">Nessuna disponibilità impostata.</p>}
        <div className="flex flex-wrap gap-1.5">
          {availableDays.map(([day, slots]) => (
            <Badge key={day} tone="navy" icon={<Clock3 className="h-3.5 w-3.5" />}>
              {day} {slots.morning && slots.afternoon ? "(intera giornata)" : slots.morning ? "(mattina)" : "(pomeriggio)"}
            </Badge>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-navy-100 p-4 sm:p-5">
        <h3 className="mb-2 text-sm font-semibold text-navy">Dati fiscali</h3>
        <SummaryRow label="Ragione sociale" value={data.fiscal.businessName} />
        <SummaryRow label="Partita IVA" value={data.fiscal.vatNumber} />
        <SummaryRow label="IBAN" value={data.fiscal.iban} />
      </section>

      <Button type="button" variant="gold" fullWidth size="lg" onClick={onPublish} className="gap-2">
        <Rocket className="h-[18px] w-[18px]" />
        Pubblica il mio profilo
      </Button>
    </div>
  );
}
