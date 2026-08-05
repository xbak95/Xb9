"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, MessageCircle, Star, ThumbsUp } from "lucide-react";
import { RatingStars } from "@/components/ui/RatingStars";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn, formatDate } from "@/lib/utils";
import { getReviewsForConsultant, averageBreakdown, ratingDistribution } from "@/data/reviews";
import type { Review } from "@/lib/types";

type FilterId = "tutte" | "recenti" | "con-risposta";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "tutte", label: "Tutte" },
  { id: "recenti", label: "Più recenti" },
  { id: "con-risposta", label: "Con risposta" },
];

const BREAKDOWN_LABELS: { key: keyof Review["ratings"]; label: string }[] = [
  { key: "competence", label: "Competenza" },
  { key: "clarity", label: "Chiarezza" },
  { key: "punctuality", label: "Puntualità" },
  { key: "valueForMoney", label: "Qualità/prezzo" },
];

export function ReviewList({ consultantId }: { consultantId: string }) {
  const [filter, setFilter] = useState<FilterId>("tutte");

  const reviews = getReviewsForConsultant(consultantId);
  const average = averageBreakdown(consultantId);
  const distribution = ratingDistribution(consultantId);
  const total = reviews.length;

  const filteredReviews = useMemo(() => {
    let list = [...reviews];
    if (filter === "con-risposta") list = list.filter((r) => Boolean(r.consultantReply));
    list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return list;
  }, [reviews, filter]);

  if (total === 0 || !average) {
    return (
      <EmptyState
        icon={Star}
        title="Nessuna recensione ancora"
        description="Questo consulente non ha ancora ricevuto recensioni: sarai tu il primo a lasciarne una dopo una consulenza."
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header: voto medio + distribuzione */}
      <div className="grid gap-6 rounded-2xl border border-navy-100 bg-white p-5 sm:p-6 md:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center justify-center gap-1.5 md:border-r md:border-navy-100 md:pr-6">
          <p className="text-5xl font-extrabold text-navy">{average.overall.toFixed(1)}</p>
          <RatingStars rating={average.overall} size={18} />
          <p className="text-xs text-body">{total} recensioni</p>
        </div>
        <div className="space-y-1.5">
          {distribution.map(({ star, count }) => {
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div key={star} className="flex items-center gap-2.5 text-xs text-body">
                <span className="w-10 shrink-0 text-right">{star} stelle</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-navy-50">
                  <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8 shrink-0 text-left">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filtri */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              filter === f.id ? "border-navy bg-navy text-white" : "border-navy-100 bg-white text-ink hover:bg-navy-50"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Lista recensioni */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <EmptyState
            icon={MessageCircle}
            title="Nessuna recensione con questo filtro"
            description="Prova a selezionare un altro filtro per vedere tutte le recensioni."
          />
        ) : (
          filteredReviews.map((review) => (
            <article key={review.id} className="rounded-2xl border border-navy-100 bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{review.clientName}</p>
                  {review.clientCompany && <p className="text-xs text-body">{review.clientCompany}</p>}
                  <p className="mt-1 text-xs font-medium text-institutional">{review.serviceTitle}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <RatingStars rating={review.ratings.overall} size={14} showValue />
                  <span className="text-[11px] text-body">{formatDate(review.date)}</span>
                </div>
              </div>

              {review.verified && (
                <Badge tone="verified" icon={<BadgeCheck className="h-3.5 w-3.5" />} className="mt-3">
                  Verificata
                </Badge>
              )}

              <p className="mt-3 text-sm leading-relaxed text-ink">{review.comment}</p>

              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-navy-50 pt-3 sm:grid-cols-4">
                {BREAKDOWN_LABELS.map(({ key, label }) => (
                  <div key={key} className="text-xs text-body">
                    <span className="mr-1">{label}:</span>
                    <span className="font-semibold text-ink">{review.ratings[key].toFixed(1)}</span>
                  </div>
                ))}
              </div>

              {review.wouldRecommend && (
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-verified-600">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  Consiglia questo consulente
                </p>
              )}

              {review.consultantReply && (
                <div className="mt-4 rounded-xl bg-muted p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-navy">Risposta del consulente</p>
                  <p className="text-sm text-ink">{review.consultantReply.text}</p>
                  <p className="mt-1.5 text-[11px] text-body">{formatDate(review.consultantReply.date)}</p>
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  );
}
