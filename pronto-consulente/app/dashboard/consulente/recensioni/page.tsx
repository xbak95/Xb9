"use client";

import { useState } from "react";
import { Star, MessageCircleReply } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card, CardBody } from "@/components/ui/Card";
import { RatingStars } from "@/components/ui/RatingStars";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Field";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";
import { getReviewsForConsultant, averageBreakdown } from "@/data/reviews";
import { consultants } from "@/data/consultants";

const CONSULTANT_ID = "c-01";

export default function RecensioniConsultentePage() {
  const { push } = useToast();
  const reviews = getReviewsForConsultant(CONSULTANT_ID);
  const breakdown = averageBreakdown(CONSULTANT_ID);
  const consultant = consultants[0];

  const [replies, setReplies] = useState<Record<string, string>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  function submitReply(id: string) {
    const text = drafts[id]?.trim();
    if (!text) return;
    setReplies((prev) => ({ ...prev, [id]: text }));
    push({ kind: "success", title: "Risposta pubblicata", description: "Il cliente riceverà una notifica della tua risposta." });
  }

  return (
    <div>
      <PageHeader title="Recensioni" description="Il feedback dei clienti dopo le consulenze svolte." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard icon={Star} label="Valutazione media" value={consultant.rating.toFixed(1)} sublabel={`${consultant.reviewCount} recensioni totali`} tone="gold" />
        <KpiCard icon={Star} label="Competenza" value={breakdown ? breakdown.competence.toFixed(1) : "—"} tone="navy" />
        <KpiCard icon={Star} label="Rapporto qualità/prezzo" value={breakdown ? breakdown.valueForMoney.toFixed(1) : "—"} tone="verified" />
      </div>

      <div className="mt-6 space-y-4">
        {reviews.length === 0 ? (
          <EmptyState icon={Star} title="Nessuna recensione" description="Le recensioni dei clienti appariranno qui dopo le prime consulenze." />
        ) : (
          reviews.map((r) => {
            const hasReply = !!r.consultantReply || !!replies[r.id];
            const replyText = r.consultantReply?.text ?? replies[r.id];
            return (
              <Card key={r.id}>
                <CardBody>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-ink">{r.clientName}</p>
                      {r.clientCompany && <p className="text-xs text-body">{r.clientCompany}</p>}
                    </div>
                    <span className="text-xs text-body">{formatDate(r.date)}</span>
                  </div>
                  <RatingStars rating={r.ratings.overall} size={14} showValue className="mt-2" />
                  <p className="mt-1 text-xs text-body">{r.serviceTitle}</p>
                  <p className="mt-2 text-sm text-ink">{r.comment}</p>

                  {hasReply ? (
                    <div className="mt-4 rounded-xl bg-navy-50/60 p-3.5">
                      <p className="mb-1 inline-flex items-center gap-1.5 text-xs font-semibold text-navy">
                        <MessageCircleReply className="h-3.5 w-3.5" /> La tua risposta
                      </p>
                      <p className="text-sm text-navy-800">{replyText}</p>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-2">
                      <Textarea
                        rows={2}
                        placeholder="Scrivi una risposta pubblica a questa recensione..."
                        value={drafts[r.id] ?? ""}
                        onChange={(e) => setDrafts((prev) => ({ ...prev, [r.id]: e.target.value }))}
                      />
                      <Button variant="outline" size="sm" onClick={() => submitReply(r.id)} disabled={!drafts[r.id]?.trim()}>
                        Rispondi
                      </Button>
                    </div>
                  )}
                </CardBody>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
