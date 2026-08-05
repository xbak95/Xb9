"use client";

import { useMemo, useState } from "react";
import { CalendarCheck, Clock, Video, MapPin, Users2, MessageSquare, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { BookingStatusBadge } from "@/components/dashboard/StatusBadge";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { Card, CardBody } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { consultantBookings } from "@/data/bookings";
import type { Booking, BookingStatus } from "@/lib/types";

const modalityIcon = { online: Video, presenza: MapPin, ibrida: Users2 } as const;

const filters: { id: BookingStatus | "tutte"; label: string }[] = [
  { id: "tutte", label: "Tutte" },
  { id: "in_attesa", label: "In attesa" },
  { id: "confermata", label: "Confermate" },
  { id: "completata", label: "Completate" },
  { id: "annullata", label: "Annullate" },
];

export default function AppuntamentiPage() {
  const { push } = useToast();
  const [bookings, setBookings] = useState<Booking[]>(consultantBookings);
  const [filter, setFilter] = useState<BookingStatus | "tutte">("tutte");
  const [completeTarget, setCompleteTarget] = useState<Booking | null>(null);

  const filtered = useMemo(
    () => [...bookings].filter((b) => filter === "tutte" || b.status === filter).sort((a, b) => +new Date(a.date) - +new Date(b.date)),
    [bookings, filter]
  );

  function confirmComplete() {
    if (!completeTarget) return;
    setBookings((prev) => prev.map((b) => (b.id === completeTarget.id ? { ...b, status: "completata" } : b)));
    push({ kind: "success", title: "Consulenza segnata come completata", description: `${completeTarget.clientName} riceverà l'invito a lasciare una recensione.` });
    setCompleteTarget(null);
  }

  return (
    <div>
      <PageHeader title="Appuntamenti" description="Le consulenze in programma e già svolte con i tuoi clienti." />

      <div className="mb-5 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              filter === f.id ? "border-navy bg-navy text-white" : "border-navy-100 bg-white text-body hover:text-navy"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={CalendarCheck} title="Nessun appuntamento" description="Non ci sono appuntamenti con questo stato." />
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => {
            const ModIcon = modalityIcon[b.modality];
            return (
              <Card key={b.id}>
                <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3.5">
                    <Avatar name={b.clientName} size={48} />
                    <div>
                      <p className="font-semibold text-ink">{b.clientName}</p>
                      <p className="text-sm text-body">{b.serviceTitle}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-body">
                        <span className="inline-flex items-center gap-1">
                          <CalendarCheck className="h-3.5 w-3.5" /> {formatDate(b.date)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {b.time}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <ModIcon className="h-3.5 w-3.5" /> {b.modality}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    <div className="flex items-center gap-2">
                      <BookingStatusBadge status={b.status} />
                      <span className="text-sm font-semibold text-navy">{formatCurrency(b.price)}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <ButtonLink href="/dashboard/consulente/messaggi" variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" /> Messaggio
                      </ButtonLink>
                      {(b.status === "confermata" || b.status === "riprogrammata") && (
                        <Button variant="primary" size="sm" onClick={() => setCompleteTarget(b)}>
                          <CheckCircle2 className="h-4 w-4" /> Segna completata
                        </Button>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        open={!!completeTarget}
        onClose={() => setCompleteTarget(null)}
        onConfirm={confirmComplete}
        title="Segnare la consulenza come completata?"
        description={completeTarget ? `${completeTarget.serviceTitle} con ${completeTarget.clientName}.` : undefined}
        confirmLabel="Conferma"
      />
    </div>
  );
}
