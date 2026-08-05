"use client";

import { useMemo, useState } from "react";
import { CalendarCheck, Clock, Video, MapPin, Users2, Star, Info } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { BookingStatusBadge } from "@/components/dashboard/StatusBadge";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { Card, CardBody } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { Label, Select } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { clientBookings } from "@/data/bookings";
import type { Booking, BookingStatus } from "@/lib/types";

const modalityIcon = { online: Video, presenza: MapPin, ibrida: Users2 } as const;

const filters: { id: BookingStatus | "tutte"; label: string }[] = [
  { id: "tutte", label: "Tutte" },
  { id: "in_attesa", label: "In attesa" },
  { id: "confermata", label: "Confermate" },
  { id: "completata", label: "Completate" },
  { id: "riprogrammata", label: "Riprogrammate" },
  { id: "annullata", label: "Annullate" },
];

export default function PrenotazioniPage() {
  const { push } = useToast();
  const [bookings, setBookings] = useState<Booking[]>(clientBookings);
  const [filter, setFilter] = useState<BookingStatus | "tutte">("tutte");
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [rescheduleTarget, setRescheduleTarget] = useState<Booking | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("10:00");

  const filtered = useMemo(
    () =>
      [...bookings]
        .filter((b) => filter === "tutte" || b.status === filter)
        .sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    [bookings, filter]
  );

  function confirmCancel() {
    if (!cancelTarget) return;
    setBookings((prev) => prev.map((b) => (b.id === cancelTarget.id ? { ...b, status: "annullata" } : b)));
    push({ kind: "success", title: "Prenotazione annullata", description: `${cancelTarget.consultantName} è stato avvisato dell'annullamento.` });
    setCancelTarget(null);
  }

  function confirmReschedule() {
    if (!rescheduleTarget || !newDate) return;
    setBookings((prev) =>
      prev.map((b) => (b.id === rescheduleTarget.id ? { ...b, status: "riprogrammata", date: newDate, time: newTime } : b))
    );
    push({ kind: "success", title: "Richiesta di riprogrammazione inviata", description: `In attesa di conferma da parte di ${rescheduleTarget.consultantName}.` });
    setRescheduleTarget(null);
    setNewDate("");
  }

  return (
    <div>
      <PageHeader title="Le tue prenotazioni" description="Gestisci gli appuntamenti prenotati con i consulenti." />

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
        <EmptyState icon={CalendarCheck} title="Nessuna prenotazione" description="Non ci sono prenotazioni con questo stato." />
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => {
            const ModIcon = modalityIcon[b.modality];
            return (
              <Card key={b.id}>
                <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar src={b.consultantAvatar} name={b.consultantName} size={52} />
                    <div>
                      <p className="font-semibold text-ink">{b.consultantName}</p>
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
                      <span className="text-sm font-semibold text-navy">{b.price === 0 ? "Gratuita" : formatCurrency(b.price)}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(b.status === "in_attesa" || b.status === "confermata") && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => { setRescheduleTarget(b); setNewTime(b.time); }}>
                            Riprogramma
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => setCancelTarget(b)}>
                            Annulla
                          </Button>
                        </>
                      )}
                      {b.status === "completata" && (
                        <Button
                          variant="gold"
                          size="sm"
                          disabled
                          title="Presto disponibile"
                          className="inline-flex items-center gap-1.5"
                        >
                          <Star className="h-4 w-4" /> Lascia una recensione
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
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={confirmCancel}
        title="Annullare la prenotazione?"
        description={cancelTarget ? `Stai per annullare la consulenza "${cancelTarget.serviceTitle}" con ${cancelTarget.consultantName}.` : undefined}
        confirmLabel="Sì, annulla"
        danger
      />

      <Modal
        open={!!rescheduleTarget}
        onClose={() => setRescheduleTarget(null)}
        title="Riprogramma appuntamento"
        description={rescheduleTarget ? `${rescheduleTarget.serviceTitle} con ${rescheduleTarget.consultantName}` : undefined}
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setRescheduleTarget(null)}>
              Annulla
            </Button>
            <Button onClick={confirmReschedule} disabled={!newDate}>
              Invia richiesta
            </Button>
          </>
        }
      >
        <div className="flex items-start gap-2.5 rounded-xl bg-navy-50 p-3 text-sm text-navy-700">
          <Info className="h-4 w-4 shrink-0 translate-y-0.5" />
          <span>La nuova data sarà proposta al consulente e diventerà definitiva dopo la sua conferma.</span>
        </div>
        <div className="mt-4">
          <Label htmlFor="new-date">Nuova data</Label>
          <input
            id="new-date"
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="h-11 w-full rounded-xl border border-navy-100 bg-white px-3.5 text-sm focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100"
          />
        </div>
        <div className="mt-4">
          <Label htmlFor="new-time">Nuovo orario</Label>
          <Select id="new-time" value={newTime} onChange={(e) => setNewTime(e.target.value)}>
            {["09:00", "10:30", "14:00", "16:30"].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
}
