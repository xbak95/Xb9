import { FileSignature, Calendar } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { QuoteStatusBadge } from "@/components/dashboard/StatusBadge";
import { Card, CardBody } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { QuoteRequest } from "@/lib/types";

interface SentQuote extends Pick<QuoteRequest, "status" | "date"> {
  id: string;
  clientName: string;
  clientAvatar?: string;
  description: string;
  amount: number;
}

const sentQuotes: SentQuote[] = [
  { id: "sq-01", clientName: "Marco Villa", clientAvatar: "https://i.pravatar.cc/300?img=60", description: "Analisi di ammissibilità per bando industria 4.0 su nuovi macchinari.", amount: 350, status: "accettato", date: "2026-08-03" },
  { id: "sq-02", clientName: "Rita Fontana", clientAvatar: "https://i.pravatar.cc/300?img=44", description: "Gestione completa pratica per contributo regionale turismo.", amount: 1450, status: "inviato", date: "2026-08-01" },
  { id: "sq-03", clientName: "Tommaso Ricci", clientAvatar: "https://i.pravatar.cc/300?img=13", description: "Consulenza su credito d'imposta ricerca e sviluppo.", amount: 600, status: "rifiutato", date: "2026-07-22" },
  { id: "sq-04", clientName: "Enrico Bassi", clientAvatar: "https://i.pravatar.cc/300?img=51", description: "Pratica completa per bando regionale — vedi appuntamento confermato.", amount: 1200, status: "accettato", date: "2026-07-30" },
];

export default function PreventiviConsulentePage() {
  return (
    <div>
      <PageHeader title="Preventivi inviati" description="Storico dei preventivi personalizzati che hai inviato ai clienti." />

      {sentQuotes.length === 0 ? (
        <EmptyState icon={FileSignature} title="Nessun preventivo inviato" description="I preventivi che invii dalla sezione Richieste appariranno qui." />
      ) : (
        <div className="space-y-4">
          {sentQuotes.map((q) => (
            <Card key={q.id}>
              <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3.5">
                  <Avatar src={q.clientAvatar} name={q.clientName} size={44} />
                  <div>
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-ink">{q.clientName}</p>
                      <QuoteStatusBadge status={q.status} />
                    </div>
                    <p className="max-w-lg text-sm text-body">{q.description}</p>
                    <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-body">
                      <Calendar className="h-3.5 w-3.5" /> Inviato il {formatDate(q.date)}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-xl font-bold text-navy">{formatCurrency(q.amount)}</span>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
