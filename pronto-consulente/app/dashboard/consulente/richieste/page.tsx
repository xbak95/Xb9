"use client";

import { useState } from "react";
import { Inbox, Calendar, Wallet, Clock, Video, MapPin, Users2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { BookingStatusBadge } from "@/components/dashboard/StatusBadge";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { Card, CardBody } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { Label, Input, Textarea } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency, formatDate } from "@/lib/utils";
import { consultantBookings } from "@/data/bookings";
import type { Booking } from "@/lib/types";

const modalityIcon = { online: Video, presenza: MapPin, ibrida: Users2 } as const;

interface CustomRequest {
  id: string;
  clientName: string;
  clientAvatar: string;
  categoryName: string;
  description: string;
  budget: string;
  date: string;
  status: "in_attesa" | "inviato";
  sentAmount?: number;
}

export default function RichiesteConsultentePage() {
  const { push } = useToast();
  const [bookings, setBookings] = useState<Booking[]>(consultantBookings.filter((b) => b.status === "in_attesa"));
  const [customRequests, setCustomRequests] = useState<CustomRequest[]>([
    {
      id: "cr-01",
      clientName: "Chiara Testa",
      clientAvatar: "https://i.pravatar.cc/300?img=47",
      categoryName: "Finanza agevolata",
      description: "Vorremmo capire se la nostra azienda (18 dipendenti, settore agroalimentare) è idonea per il prossimo bando regionale su innovazione e digitalizzazione.",
      budget: "300€ - 600€",
      date: "2026-08-04",
      status: "in_attesa",
    },
  ]);

  const [acceptTarget, setAcceptTarget] = useState<Booking | null>(null);
  const [rejectTarget, setRejectTarget] = useState<Booking | null>(null);
  const [quoteTarget, setQuoteTarget] = useState<CustomRequest | null>(null);
  const [quoteAmount, setQuoteAmount] = useState("");
  const [quoteValidity, setQuoteValidity] = useState("7");
  const [quoteMessage, setQuoteMessage] = useState("");

  function confirmAccept() {
    if (!acceptTarget) return;
    setBookings((prev) => prev.filter((b) => b.id !== acceptTarget.id));
    push({ kind: "success", title: "Richiesta accettata", description: `${acceptTarget.clientName} riceverà la conferma dell'appuntamento.` });
    setAcceptTarget(null);
  }

  function confirmReject() {
    if (!rejectTarget) return;
    setBookings((prev) => prev.filter((b) => b.id !== rejectTarget.id));
    push({ kind: "info", title: "Richiesta rifiutata", description: `${rejectTarget.clientName} è stato avvisato.` });
    setRejectTarget(null);
  }

  function sendQuote() {
    if (!quoteTarget || !quoteAmount) return;
    setCustomRequests((prev) =>
      prev.map((r) => (r.id === quoteTarget.id ? { ...r, status: "inviato", sentAmount: Number(quoteAmount) } : r))
    );
    push({ kind: "success", title: "Preventivo inviato", description: `${formatCurrency(Number(quoteAmount))} inviati a ${quoteTarget.clientName}.` });
    setQuoteTarget(null);
    setQuoteAmount("");
    setQuoteMessage("");
  }

  const isEmpty = bookings.length === 0 && customRequests.length === 0;

  return (
    <div>
      <PageHeader title="Richieste ricevute" description="Prenotazioni e richieste di preventivo in attesa di risposta." />

      {isEmpty ? (
        <EmptyState icon={Inbox} title="Nessuna richiesta in attesa" description="Le nuove richieste dei clienti appariranno qui." />
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => {
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
                          <Calendar className="h-3.5 w-3.5" /> {formatDate(b.date)}
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
                    <div className="flex gap-2">
                      <Button variant="danger" size="sm" onClick={() => setRejectTarget(b)}>
                        Rifiuta
                      </Button>
                      <Button variant="primary" size="sm" onClick={() => setAcceptTarget(b)}>
                        Accetta
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}

          {customRequests.map((r) => (
            <Card key={r.id}>
              <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3.5">
                  <Avatar src={r.clientAvatar} name={r.clientName} size={48} />
                  <div>
                    <p className="font-semibold text-ink">{r.clientName}</p>
                    <p className="text-xs text-body">{r.categoryName} · Richiesta di preventivo</p>
                    <p className="mt-1.5 max-w-lg text-sm text-body">{r.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-body">
                      <span className="inline-flex items-center gap-1">
                        <Wallet className="h-3.5 w-3.5" /> Budget: {r.budget}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> {formatDate(r.date)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="shrink-0">
                  {r.status === "in_attesa" ? (
                    <Button variant="gold" size="sm" onClick={() => setQuoteTarget(r)}>
                      Invia preventivo
                    </Button>
                  ) : (
                    <div className="text-right">
                      <p className="text-xs text-body">Preventivo inviato</p>
                      <p className="text-lg font-bold text-navy">{formatCurrency(r.sentAmount ?? 0)}</p>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!acceptTarget}
        onClose={() => setAcceptTarget(null)}
        onConfirm={confirmAccept}
        title="Accettare la richiesta?"
        description={acceptTarget ? `Confermerai l'appuntamento con ${acceptTarget.clientName} per il ${formatDate(acceptTarget.date)}.` : undefined}
        confirmLabel="Accetta"
      />

      <ConfirmDialog
        open={!!rejectTarget}
        onClose={() => setRejectTarget(null)}
        onConfirm={confirmReject}
        title="Rifiutare la richiesta?"
        description={rejectTarget ? `${rejectTarget.clientName} verrà avvisato che non puoi accettare questo appuntamento.` : undefined}
        confirmLabel="Rifiuta"
        danger
      />

      <Modal
        open={!!quoteTarget}
        onClose={() => setQuoteTarget(null)}
        title="Invia un preventivo"
        description={quoteTarget ? `Richiesta di ${quoteTarget.clientName} — ${quoteTarget.categoryName}` : undefined}
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setQuoteTarget(null)}>
              Annulla
            </Button>
            <Button onClick={sendQuote} disabled={!quoteAmount}>
              Invia preventivo
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="quote-amount" required>
              Importo (€)
            </Label>
            <Input id="quote-amount" type="number" min={0} placeholder="750" value={quoteAmount} onChange={(e) => setQuoteAmount(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="quote-validity">Validità offerta (giorni)</Label>
            <Input id="quote-validity" type="number" min={1} value={quoteValidity} onChange={(e) => setQuoteValidity(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="quote-message">Messaggio per il cliente</Label>
            <Textarea
              id="quote-message"
              rows={3}
              placeholder="Descrivi cosa include il preventivo..."
              value={quoteMessage}
              onChange={(e) => setQuoteMessage(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
