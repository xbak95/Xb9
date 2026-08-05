import { Star, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { ButtonLink } from "@/components/ui/Button";
import { RatingStars } from "@/components/ui/RatingStars";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";
import { consultants } from "@/data/consultants";

const myReviews = [
  {
    id: "my-r-01",
    consultant: consultants[2], // Avv. Marco Rinaldi
    serviceTitle: "Revisione contratto",
    rating: 4.5,
    comment: "Revisione puntuale e chiara, mi ha segnalato clausole a cui non avevo fatto caso. Consigliato.",
    date: "2026-07-16",
  },
  {
    id: "my-r-02",
    consultant: consultants[1], // Chiara Bellini
    serviceTitle: "Consulenza HSE di 60 minuti",
    rating: 5,
    comment: "Molto professionale, mi ha chiarito tutti i dubbi sulla formazione obbligatoria in azienda.",
    date: "2026-07-02",
  },
];

export default function RecensioniClientePage() {
  return (
    <div>
      <PageHeader title="Le tue recensioni" description="Le valutazioni che hai lasciato ai consulenti dopo le consulenze." />

      {myReviews.length === 0 ? (
        <EmptyState icon={Star} title="Nessuna recensione" description="Dopo una consulenza completata potrai lasciare una recensione." />
      ) : (
        <div className="space-y-4">
          {myReviews.map((r) => (
            <Card key={r.id}>
              <CardBody>
                <div className="flex items-start gap-3.5">
                  <Avatar src={r.consultant.avatarUrl} name={r.consultant.fullName} size={44} />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-ink">{r.consultant.fullName}</p>
                      <span className="text-xs text-body">{formatDate(r.date)}</span>
                    </div>
                    <p className="text-xs text-body">{r.serviceTitle}</p>
                    <RatingStars rating={r.rating} size={14} showValue className="mt-2" />
                    <p className="mt-2 text-sm text-ink">{r.comment}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <Card className="mt-6 border-dashed border-gold-200 bg-gold-50/40">
        <CardBody className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold text-navy">Hai una consulenza completata senza recensione?</p>
            <p className="text-sm text-body">Il tuo feedback aiuta altri utenti a scegliere il consulente giusto.</p>
          </div>
          <ButtonLink href="/dashboard/cliente/prenotazioni" variant="gold" size="sm">
            Vai alle prenotazioni <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </CardBody>
      </Card>
    </div>
  );
}
