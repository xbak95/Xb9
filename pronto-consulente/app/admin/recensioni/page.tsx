"use client";

import { useMemo, useState } from "react";
import { EyeOff, Star } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";
import { Button } from "@/components/ui/Button";
import { Select, Label, Textarea } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/app/admin/_components/KpiCard";
import { reviews as seedReviews } from "@/data/reviews";
import { consultants } from "@/data/consultants";
import type { Review } from "@/lib/types";

function consultantName(consultantId: string) {
  return consultants.find((c) => c.id === consultantId)?.fullName ?? "Consulente";
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const [hidden, setHidden] = useState<Record<string, string>>({});
  const [ratingFilter, setRatingFilter] = useState("tutte");
  const [hiding, setHiding] = useState<Review | null>(null);
  const [reason, setReason] = useState("");
  const { push } = useToast();

  const filtered = useMemo(() => {
    if (ratingFilter === "tutte") return reviews;
    const min = Number(ratingFilter);
    return reviews.filter((r) => Math.round(r.ratings.overall) === min);
  }, [reviews, ratingFilter]);

  function confirmHide() {
    if (!hiding) return;
    setHidden((prev) => ({ ...prev, [hiding.id]: reason }));
    push({ kind: "error", title: "Recensione nascosta", description: "La recensione è stata segnalata come sospetta e nascosta dal profilo pubblico." });
    setHiding(null);
    setReason("");
  }

  return (
    <div>
      <PageHeader
        title="Recensioni"
        description={`${reviews.length} recensioni verificate raccolte sulla piattaforma. Nascondi quelle sospette prima che influenzino i clienti.`}
      />

      <Card className="mb-5">
        <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-body">Filtra per valutazione complessiva</p>
          <Select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)} className="sm:w-56">
            <option value="tutte">Tutte le valutazioni</option>
            <option value="5">5 stelle</option>
            <option value="4">4 stelle</option>
            <option value="3">3 stelle</option>
            <option value="2">2 stelle</option>
            <option value="1">1 stella</option>
          </Select>
        </CardBody>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState icon={Star} title="Nessuna recensione trovata" description="Modifica il filtro per vedere altri risultati." />
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => {
            const isHidden = Boolean(hidden[r.id]);
            return (
              <Card key={r.id} className={isHidden ? "opacity-60" : undefined}>
                <CardBody>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-ink">{r.clientName}</p>
                        {r.clientCompany && <span className="text-xs text-body">· {r.clientCompany}</span>}
                        {isHidden && <Badge tone="danger">Nascosta</Badge>}
                      </div>
                      <p className="mt-0.5 text-xs text-body">
                        Su {consultantName(r.consultantId)} · {r.serviceTitle} · {formatDate(r.date)}
                      </p>
                    </div>
                    <RatingStars rating={r.ratings.overall} showValue />
                  </div>
                  <p className="mt-3 text-sm text-body">{r.comment}</p>
                  {isHidden && (
                    <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
                      Motivazione moderazione: {hidden[r.id]}
                    </p>
                  )}
                  {!isHidden && (
                    <div className="mt-3">
                      <Button variant="outline" size="sm" onClick={() => setHiding(r)}>
                        <EyeOff className="h-3.5 w-3.5" /> Nascondi come sospetta
                      </Button>
                    </div>
                  )}
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}

      <Modal
        open={Boolean(hiding)}
        onClose={() => {
          setHiding(null);
          setReason("");
        }}
        title="Nascondi recensione sospetta"
        description={hiding ? `Recensione di ${hiding.clientName}` : undefined}
        footer={
          <>
            <Button variant="outline" onClick={() => setHiding(null)}>
              Annulla
            </Button>
            <Button variant="danger" onClick={confirmHide} disabled={!reason.trim()}>
              Nascondi recensione
            </Button>
          </>
        }
      >
        <Label htmlFor="hide-reason" required>
          Motivo del sospetto
        </Label>
        <Textarea
          id="hide-reason"
          rows={4}
          placeholder="Es. linguaggio incoerente con il servizio, nessuna prenotazione collegata, contenuto promozionale…"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Modal>
    </div>
  );
}
