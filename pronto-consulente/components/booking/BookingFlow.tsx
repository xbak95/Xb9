"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  Monitor,
  Paperclip,
  Ticket,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Textarea, Input } from "@/components/ui/Field";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import type { AvailabilitySlot, Consultant, Modality, ServiceOffering } from "@/lib/types";

type BookingStepId =
  | "service"
  | "datetime"
  | "details"
  | "attachments"
  | "modality"
  | "coupon"
  | "summary"
  | "payment"
  | "confirmation";

const ALL_STEPS: BookingStepId[] = [
  "service",
  "datetime",
  "details",
  "attachments",
  "modality",
  "coupon",
  "summary",
  "payment",
  "confirmation",
];

const STEP_LABELS: Record<BookingStepId, string> = {
  service: "Servizio",
  datetime: "Data e ora",
  details: "Richiesta",
  attachments: "Allegati",
  modality: "Modalità",
  coupon: "Coupon",
  summary: "Riepilogo",
  payment: "Pagamento",
  confirmation: "Conferma",
};

const VALID_COUPON = "BENVENUTO10";
const COUPON_DISCOUNT_PERCENT = 10;

interface BookingFlowProps {
  /** Servizi offerti dal consulente selezionabili durante la prenotazione. */
  services: ServiceOffering[];
  /** Disponibilità (giorni/orari) del consulente. */
  availability: AvailabilitySlot[];
  consultantName: string;
  /** Chiamato quando l'utente vuole chiudere il flusso (es. dopo la conferma). */
  onClose?: () => void;
}

export function BookingFlow({ services, availability, consultantName, onClose }: BookingFlowProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(services[0]?.id ?? null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [details, setDetails] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [modalityChoice, setModalityChoice] = useState<Extract<Modality, "online" | "presenza"> | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [paying, setPaying] = useState(false);
  const [bookingNumber, setBookingNumber] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  const selectedService = services.find((s) => s.id === selectedServiceId) ?? null;

  // La scelta online/in presenza compare solo per i servizi a modalità ibrida.
  const steps = ALL_STEPS.filter((id) => id !== "modality" || selectedService?.modality === "ibrida");
  const currentStepId = steps[Math.min(stepIndex, steps.length - 1)];
  const currentIndexInSteps = steps.indexOf(currentStepId);

  const subtotal = selectedService?.price ?? 0;
  const discount = couponApplied ? Math.round(subtotal * (COUPON_DISCOUNT_PERCENT / 100)) : 0;
  const total = subtotal - discount;

  function goNext() {
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }
  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function canContinue(): boolean {
    switch (currentStepId) {
      case "service":
        return Boolean(selectedServiceId);
      case "datetime":
        return Boolean(selectedDate && selectedTime);
      case "details":
        return details.trim().length > 0;
      case "modality":
        return Boolean(modalityChoice);
      default:
        return true;
    }
  }

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponError("Inserisci un codice coupon.");
      setCouponApplied(false);
      return;
    }
    if (code === VALID_COUPON) {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponApplied(false);
      setCouponError("Codice non valido.");
    }
  }

  function handlePay() {
    setPaying(true);
    // Punto di integrazione futura: sostituire con Stripe (Payment Intents / Checkout) per l'addebito reale.
    setTimeout(() => {
      const number = `PC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingNumber(number);
      setPaying(false);
      goNext();
    }, 1200);
  }

  function addFakeAttachment() {
    // Upload finto: nessun invio reale, aggiungiamo solo un nome file simulato.
    setAttachments((prev) => [...prev, `documento-${prev.length + 1}.pdf`]);
  }

  function removeAttachment(name: string) {
    setAttachments((prev) => prev.filter((a) => a !== name));
  }

  return (
    <div>
      {currentStepId !== "confirmation" && (
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-body">
            <span>
              Passo {currentIndexInSteps + 1} di {steps.length}: {STEP_LABELS[currentStepId]}
            </span>
          </div>
          <div className="flex gap-1.5">
            {steps.map((s, i) => (
              <div key={s} className={cn("h-1.5 flex-1 rounded-full", i <= currentIndexInSteps ? "bg-navy" : "bg-navy-100")} />
            ))}
          </div>
        </div>
      )}

      {currentStepId === "service" && (
        <div className="space-y-3">
          {services.map((service) => (
            <label
              key={service.id}
              className={cn(
                "flex cursor-pointer items-start justify-between gap-4 rounded-xl border p-4 transition-colors",
                selectedServiceId === service.id ? "border-navy bg-navy-50" : "border-navy-100 hover:bg-muted"
              )}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="booking-service"
                  className="mt-1 h-4 w-4 text-navy focus:ring-navy-200"
                  checked={selectedServiceId === service.id}
                  onChange={() => setSelectedServiceId(service.id)}
                />
                <div>
                  <p className="text-sm font-semibold text-ink">{service.title}</p>
                  <p className="mt-0.5 text-xs text-body">
                    {service.durationMinutes} min · {service.deliveryTime}
                  </p>
                </div>
              </div>
              <p className="shrink-0 text-sm font-bold text-navy">
                {service.priceType === "da" && "da "}
                {formatCurrency(service.price)}
              </p>
            </label>
          ))}
        </div>
      )}

      {currentStepId === "datetime" && (
        <div className="space-y-4">
          <p className="text-sm text-body">Scegli un giorno e un orario tra quelli disponibili.</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {availability.map((slot) => (
              <button
                key={slot.date}
                type="button"
                onClick={() => {
                  setSelectedDate(slot.date);
                  setSelectedTime(null);
                }}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-left text-sm transition-colors",
                  selectedDate === slot.date ? "border-navy bg-navy-50 font-semibold text-navy" : "border-navy-100 hover:bg-muted"
                )}
              >
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(slot.date)}
                </span>
              </button>
            ))}
          </div>

          {selectedDate && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-body">Orari disponibili</p>
              <div className="flex flex-wrap gap-2">
                {availability
                  .find((a) => a.date === selectedDate)
                  ?.times.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "rounded-lg border px-3.5 py-2 text-sm transition-colors",
                        selectedTime === time ? "border-navy bg-navy text-white" : "border-navy-100 hover:bg-muted"
                      )}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {time}
                      </span>
                    </button>
                  ))}
                {availability.find((a) => a.date === selectedDate)?.times.length === 0 && (
                  <p className="text-sm text-body">Nessun orario disponibile per questo giorno.</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {currentStepId === "details" && (
        <div>
          <label htmlFor="booking-details" className="mb-1.5 block text-sm font-medium text-navy-800">
            Descrivi la tua richiesta
          </label>
          <Textarea
            id="booking-details"
            rows={6}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder={`Racconta a ${consultantName} di cosa hai bisogno, così potrà prepararsi al meglio per la consulenza.`}
          />
        </div>
      )}

      {currentStepId === "attachments" && (
        <div className="space-y-3">
          <p className="text-sm text-body">Allega eventuali documenti utili per la consulenza (facoltativo).</p>
          <Button type="button" variant="outline" onClick={addFakeAttachment} className="gap-1.5">
            <Paperclip className="h-4 w-4" />
            Aggiungi allegato
          </Button>
          {attachments.length > 0 && (
            <ul className="space-y-2">
              {attachments.map((name) => (
                <li key={name} className="flex items-center justify-between rounded-lg border border-navy-100 px-3.5 py-2.5 text-sm">
                  <span className="inline-flex items-center gap-2 text-ink">
                    <Paperclip className="h-4 w-4 text-body" />
                    {name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(name)}
                    aria-label={`Rimuovi allegato ${name}`}
                    className="text-body hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {currentStepId === "modality" && (
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setModalityChoice("online")}
            className={cn(
              "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors",
              modalityChoice === "online" ? "border-navy bg-navy-50" : "border-navy-100 hover:bg-muted"
            )}
          >
            <Monitor className="h-5 w-5 text-navy" />
            <span className="text-sm font-semibold text-ink">Online</span>
            <span className="text-xs text-body">Videochiamata via Google Meet / Zoom.</span>
          </button>
          <button
            type="button"
            onClick={() => setModalityChoice("presenza")}
            className={cn(
              "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors",
              modalityChoice === "presenza" ? "border-navy bg-navy-50" : "border-navy-100 hover:bg-muted"
            )}
          >
            <MapPin className="h-5 w-5 text-navy" />
            <span className="text-sm font-semibold text-ink">In presenza</span>
            <span className="text-xs text-body">Incontro presso lo studio del consulente.</span>
          </button>
        </div>
      )}

      {currentStepId === "coupon" && (
        <div>
          <label htmlFor="booking-coupon" className="mb-1.5 block text-sm font-medium text-navy-800">
            Codice sconto (facoltativo)
          </label>
          <div className="flex gap-2">
            <Input
              id="booking-coupon"
              value={couponInput}
              onChange={(e) => {
                setCouponInput(e.target.value);
                setCouponError("");
              }}
              placeholder="es. BENVENUTO10"
              className="flex-1"
            />
            <Button type="button" variant="secondary" onClick={applyCoupon} className="shrink-0 gap-1.5">
              <Ticket className="h-4 w-4" />
              Applica
            </Button>
          </div>
          {couponError && <p className="mt-1.5 text-xs text-red-600">{couponError}</p>}
          {couponApplied && (
            <p className="mt-1.5 text-xs text-verified">Coupon applicato: -{COUPON_DISCOUNT_PERCENT}% sul totale.</p>
          )}
        </div>
      )}

      {currentStepId === "summary" && selectedService && (
        <div className="space-y-4">
          <div className="rounded-xl border border-navy-100 p-4 text-sm">
            <div className="flex justify-between border-b border-navy-50 py-2">
              <span className="text-body">Servizio</span>
              <span className="font-medium text-ink">{selectedService.title}</span>
            </div>
            <div className="flex justify-between border-b border-navy-50 py-2">
              <span className="text-body">Data e ora</span>
              <span className="font-medium text-ink">
                {selectedDate && formatDate(selectedDate)} · {selectedTime}
              </span>
            </div>
            {modalityChoice && (
              <div className="flex justify-between border-b border-navy-50 py-2">
                <span className="text-body">Modalità</span>
                <span className="font-medium text-ink">{modalityChoice === "online" ? "Online" : "In presenza"}</span>
              </div>
            )}
            <div className="flex justify-between py-2">
              <span className="text-body">Consulente</span>
              <span className="font-medium text-ink">{consultantName}</span>
            </div>
          </div>

          <div className="rounded-xl bg-muted p-4 text-sm">
            <div className="flex justify-between py-1">
              <span className="text-body">Subtotale</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {couponApplied && (
              <div className="flex justify-between py-1 text-verified">
                <span>Sconto ({VALID_COUPON})</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="mt-1 flex justify-between border-t border-navy-100 pt-2 text-base font-bold text-navy">
              <span>Totale</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          {selectedService.priceType === "da" && (
            <p className="text-xs text-body">
              Prezzo indicativo "a partire da": l'importo definitivo sarà confermato dal consulente in base alla
              complessità della richiesta.
            </p>
          )}
        </div>
      )}

      {currentStepId === "payment" && (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-50 text-navy">
            <CreditCard className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Pagamento sicuro simulato</p>
            <p className="mt-1 max-w-sm text-xs text-body">
              Questa è una demo: nessun dato di pagamento reale viene richiesto o trasmesso. In produzione il
              pagamento sarà gestito tramite Stripe.
            </p>
          </div>
          <p className="text-2xl font-bold text-navy">{formatCurrency(total)}</p>
          <Button type="button" onClick={handlePay} loading={paying} fullWidth className="max-w-xs gap-2">
            <CreditCard className="h-4 w-4" />
            Conferma e paga
          </Button>
        </div>
      )}

      {currentStepId === "confirmation" && (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-verified-50 text-verified">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-navy">Prenotazione confermata</h3>
          <p className="max-w-sm text-sm text-body">
            Numero prenotazione <span className="font-semibold text-ink">{bookingNumber}</span>. Riceverai
            un'email di conferma con tutti i dettagli e il promemoria dell'appuntamento.
          </p>
          {/* Punto di integrazione futura: alla conferma, sincronizzare l'evento con Google Calendar / Outlook
              e generare automaticamente il link Zoom / Google Meet se la modalità è online. */}
          <div className="mt-2 flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard/cliente/prenotazioni"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-navy px-5 text-sm font-medium text-white hover:bg-navy-800"
            >
              <CalendarCheck className="h-4 w-4" />
              Vai alle mie prenotazioni
            </Link>
            {onClose && (
              <Button type="button" variant="outline" onClick={onClose}>
                Chiudi
              </Button>
            )}
          </div>
        </div>
      )}

      {currentStepId !== "confirmation" && currentStepId !== "payment" && (
        <div className="mt-7 flex items-center justify-between gap-3 border-t border-navy-100 pt-5">
          <Button type="button" variant="outline" onClick={goBack} disabled={currentIndexInSteps === 0} className="gap-1.5">
            <ArrowLeft className="h-4 w-4" />
            Indietro
          </Button>
          <Button type="button" onClick={goNext} disabled={!canContinue()} className="gap-1.5">
            Continua
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
      {currentStepId === "payment" && (
        <div className="mt-5 flex justify-start">
          <Button type="button" variant="ghost" onClick={goBack} className="gap-1.5">
            <ArrowLeft className="h-4 w-4" />
            Indietro
          </Button>
        </div>
      )}
    </div>
  );
}

export function BookingButton({
  consultant,
  label = "Prenota consulenza",
  variant = "primary",
  size = "md",
  className,
}: {
  consultant: Consultant;
  label?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" variant={variant} size={size} className={className} onClick={() => setOpen(true)}>
        {label}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`Prenota con ${consultant.fullName}`}
        description={consultant.title}
        size="lg"
      >
        <BookingFlow
          services={consultant.services}
          availability={consultant.availability}
          consultantName={consultant.fullName}
          onClose={() => setOpen(false)}
        />
      </Modal>
    </>
  );
}
