"use client";

import { useMemo, useState } from "react";
import { Search, Trash2, Briefcase } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency } from "@/lib/utils";
import { PageHeader } from "@/app/admin/_components/KpiCard";
import { allServices, type ServiceWithConsultant } from "@/data/services";
import { categories } from "@/data/categories";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceWithConsultant[]>(allServices);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("tutte");
  const [removing, setRemoving] = useState<ServiceWithConsultant | null>(null);
  const { push } = useToast();

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchesQuery =
        !query ||
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.consultantName.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = categoryFilter === "tutte" || s.category === categoryFilter;
      return matchesQuery && matchesCategory;
    });
  }, [services, query, categoryFilter]);

  const uniqueCategories = useMemo(() => Array.from(new Set(services.map((s) => s.category))).sort(), [services]);

  function confirmRemove() {
    if (!removing) return;
    setServices((prev) => prev.filter((s) => s.id !== removing.id));
    push({ kind: "error", title: "Servizio rimosso", description: `"${removing.title}" non è più visibile nel marketplace.` });
    setRemoving(null);
  }

  return (
    <div>
      <PageHeader
        title="Servizi"
        description={`${services.length} servizi pubblicati da ${categories.length} categorie sul marketplace.`}
      />

      <Card className="mb-5">
        <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />
            <Input placeholder="Cerca per servizio o consulente…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" />
          </div>
          <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="sm:w-56">
            <option value="tutte">Tutte le tipologie</option>
            {uniqueCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </CardBody>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState icon={Briefcase} title="Nessun servizio trovato" description="Modifica i filtri per vedere altri risultati." />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-body">
                  <th className="px-5 py-3">Servizio</th>
                  <th className="px-5 py-3">Consulente</th>
                  <th className="px-5 py-3">Tipologia</th>
                  <th className="px-5 py-3">Prezzo</th>
                  <th className="px-5 py-3">Valutazione</th>
                  <th className="px-5 py-3 text-right">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {filtered.map((s) => (
                  <tr key={s.id}>
                    <td className="px-5 py-3.5 font-medium text-ink">{s.title}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar src={s.consultantAvatar} name={s.consultantName} size={28} />
                        <span className="text-body">{s.consultantName}</span>
                        {s.consultantVerified && <Badge tone="verified">Verificato</Badge>}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-body">{s.category}</td>
                    <td className="px-5 py-3.5 text-body">
                      {s.price === 0 ? "Gratuito" : `${s.priceType === "da" ? "Da " : ""}${formatCurrency(s.price)}`}
                    </td>
                    <td className="px-5 py-3.5 text-body">
                      {s.rating.toFixed(1)} ({s.reviewCount})
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Button variant="danger" size="sm" onClick={() => setRemoving(s)}>
                        <Trash2 className="h-3.5 w-3.5" /> Rimuovi
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal
        open={Boolean(removing)}
        onClose={() => setRemoving(null)}
        title="Rimuovere questo servizio dal marketplace?"
        description={removing ? `"${removing.title}" di ${removing.consultantName}` : undefined}
        footer={
          <>
            <Button variant="outline" onClick={() => setRemoving(null)}>
              Annulla
            </Button>
            <Button variant="danger" onClick={confirmRemove}>
              Rimuovi definitivamente
            </Button>
          </>
        }
      >
        <p className="text-sm text-body">Il servizio non sarà più prenotabile dai clienti. Il consulente riceverà una notifica.</p>
      </Modal>
    </div>
  );
}
