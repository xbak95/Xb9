"use client";

import { useSearchParams } from "next/navigation";
import { Check, Minus, Scale } from "lucide-react";
import { consultants } from "@/data/consultants";
import { Avatar } from "@/components/ui/Avatar";
import { RatingStars } from "@/components/ui/RatingStars";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatCurrency, formatDate } from "@/lib/utils";

export function ConfrontaView() {
  const searchParams = useSearchParams();
  const ids = (searchParams.get("ids") ?? "").split(",").filter(Boolean);
  const selected = consultants.filter((c) => ids.includes(c.id));

  if (selected.length < 2) {
    return (
      <div className="container-px py-16">
        <EmptyState
          icon={Scale}
          title="Seleziona almeno due consulenti da confrontare"
          description="Torna alla ricerca, usa l'icona a bilancia sulle card per aggiungere fino a 3 consulenti al confronto."
          action={<ButtonLink href="/ricerca">Vai alla ricerca</ButtonLink>}
        />
      </div>
    );
  }

  const rows: { label: string; render: (c: (typeof selected)[number]) => React.ReactNode }[] = [
    { label: "Valutazione", render: (c) => <RatingStars rating={c.rating} showValue reviewCount={c.reviewCount} /> },
    { label: "Prezzo a partire da", render: (c) => <span className="font-semibold text-navy">{formatCurrency(c.startingPrice)}</span> },
    { label: "Anni di esperienza", render: (c) => `${c.yearsExperience} anni` },
    { label: "Consulenze completate", render: (c) => c.completedConsultations },
    { label: "Tempo medio di risposta", render: (c) => `${c.avgResponseTimeHours} ore` },
    { label: "Modalità", render: (c) => <span className="capitalize">{c.modality}</span> },
    { label: "Località", render: (c) => c.location },
    { label: "Lingue", render: (c) => c.languages.join(", ") },
    { label: "Prima disponibilità", render: (c) => formatDate(c.nextAvailability) },
    { label: "Identità verificata", render: (c) => (c.badges.includes("identita_verificata") ? <Check className="h-4 w-4 text-verified" /> : <Minus className="h-4 w-4 text-body" />) },
    { label: "Competenze principali", render: (c) => c.skills.slice(0, 4).map((s) => s.name).join(", ") },
  ];

  return (
    <div className="container-px py-10">
      <h1 className="font-heading text-2xl font-bold text-navy">Confronta consulenti</h1>
      <p className="mt-1 text-sm text-body">Un confronto diretto per aiutarti a scegliere il professionista più adatto.</p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-navy-100 shadow-card">
        <table className="w-full min-w-[640px] border-collapse bg-white text-sm">
          <thead>
            <tr className="border-b border-navy-100">
              <th className="w-48 p-4 text-left text-xs font-semibold uppercase tracking-wide text-body">Criterio</th>
              {selected.map((c) => (
                <th key={c.id} className="p-4 text-left">
                  <div className="flex items-center gap-2.5">
                    <Avatar src={c.avatarUrl} name={c.fullName} size={40} />
                    <div>
                      <p className="font-heading font-semibold text-navy">{c.fullName}</p>
                      <p className="text-xs text-body">{c.title}</p>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-muted/60"}>
                <td className="p-4 font-medium text-navy-800">{row.label}</td>
                {selected.map((c) => (
                  <td key={c.id} className="p-4 text-ink">
                    {row.render(c)}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="p-4" />
              {selected.map((c) => (
                <td key={c.id} className="p-4">
                  <ButtonLink href={`/consulenti/${c.slug}`} size="sm">
                    Visualizza profilo
                  </ButtonLink>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
