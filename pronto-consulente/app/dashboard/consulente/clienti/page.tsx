import { Users, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatCurrency, formatDate } from "@/lib/utils";
import { consultantBookings } from "@/data/bookings";

function buildClients() {
  const map = new Map<
    string,
    { name: string; count: number; lastContact: string; totalSpent: number }
  >();

  consultantBookings.forEach((b) => {
    const existing = map.get(b.clientName);
    const spent = b.status === "annullata" ? 0 : b.price;
    if (!existing) {
      map.set(b.clientName, { name: b.clientName, count: 1, lastContact: b.date, totalSpent: spent });
    } else {
      existing.count += 1;
      existing.totalSpent += spent;
      if (new Date(b.date) > new Date(existing.lastContact)) existing.lastContact = b.date;
    }
  });

  return Array.from(map.values()).sort((a, b) => +new Date(b.lastContact) - +new Date(a.lastContact));
}

export default function ClientiPage() {
  const clients = buildClients();

  return (
    <div>
      <PageHeader title="I tuoi clienti" description="Le persone che ti hanno contattato o prenotato una consulenza." />

      {clients.length === 0 ? (
        <EmptyState icon={Users} title="Nessun cliente" description="I clienti appariranno qui dopo la prima prenotazione." />
      ) : (
        <Card>
          <div className="hidden grid-cols-[1.4fr_1fr_1fr_1fr_auto] gap-4 border-b border-navy-100 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-body sm:grid">
            <span>Cliente</span>
            <span>Consulenze</span>
            <span>Ultimo contatto</span>
            <span>Totale speso</span>
            <span className="text-right">Azioni</span>
          </div>
          <div className="divide-y divide-navy-50">
            {clients.map((c) => (
              <div key={c.name} className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-[1.4fr_1fr_1fr_1fr_auto] sm:items-center sm:gap-4">
                <div className="flex items-center gap-3">
                  <Avatar name={c.name} size={40} />
                  <span className="text-sm font-semibold text-ink">{c.name}</span>
                </div>
                <span className="text-sm text-body">{c.count}</span>
                <span className="text-sm text-body">{formatDate(c.lastContact)}</span>
                <span className="text-sm font-semibold text-navy">{formatCurrency(c.totalSpent)}</span>
                <div className="sm:text-right">
                  <ButtonLink href="/dashboard/consulente/messaggi" variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4" /> Messaggio
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
