import { CheckCircle2, Clock, XCircle, CalendarClock, Send, ThumbsDown, ThumbsUp, PackageCheck, Truck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { BookingStatus, QuoteRequest } from "@/lib/types";

const bookingMeta: Record<BookingStatus, { label: string; tone: "navy" | "gold" | "verified" | "neutral" | "danger"; icon: React.ReactNode }> = {
  in_attesa: { label: "In attesa", tone: "gold", icon: <Clock className="h-3.5 w-3.5" /> },
  confermata: { label: "Confermata", tone: "verified", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  completata: { label: "Completata", tone: "navy", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  annullata: { label: "Annullata", tone: "danger", icon: <XCircle className="h-3.5 w-3.5" /> },
  riprogrammata: { label: "Riprogrammata", tone: "neutral", icon: <CalendarClock className="h-3.5 w-3.5" /> },
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const meta = bookingMeta[status];
  return (
    <Badge tone={meta.tone} icon={meta.icon}>
      {meta.label}
    </Badge>
  );
}

const quoteMeta: Record<QuoteRequest["status"], { label: string; tone: "navy" | "gold" | "verified" | "neutral" | "danger"; icon: React.ReactNode }> = {
  in_attesa: { label: "In attesa", tone: "gold", icon: <Clock className="h-3.5 w-3.5" /> },
  inviato: { label: "Preventivo inviato", tone: "navy", icon: <Send className="h-3.5 w-3.5" /> },
  accettato: { label: "Accettato", tone: "verified", icon: <ThumbsUp className="h-3.5 w-3.5" /> },
  rifiutato: { label: "Rifiutato", tone: "danger", icon: <ThumbsDown className="h-3.5 w-3.5" /> },
};

export function QuoteStatusBadge({ status }: { status: QuoteRequest["status"] }) {
  const meta = quoteMeta[status];
  return (
    <Badge tone={meta.tone} icon={meta.icon}>
      {meta.label}
    </Badge>
  );
}

export type OrderFulfillment = "da_avviare" | "in_corso" | "consegnato";

const orderMeta: Record<OrderFulfillment, { label: string; tone: "navy" | "gold" | "verified" | "neutral" | "danger"; icon: React.ReactNode }> = {
  da_avviare: { label: "Da avviare", tone: "gold", icon: <Clock className="h-3.5 w-3.5" /> },
  in_corso: { label: "In corso", tone: "navy", icon: <Truck className="h-3.5 w-3.5" /> },
  consegnato: { label: "Evaso", tone: "verified", icon: <PackageCheck className="h-3.5 w-3.5" /> },
};

export function OrderStatusBadge({ status }: { status: OrderFulfillment }) {
  const meta = orderMeta[status];
  return (
    <Badge tone={meta.tone} icon={meta.icon}>
      {meta.label}
    </Badge>
  );
}
