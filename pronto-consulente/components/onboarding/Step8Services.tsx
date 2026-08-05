import { Plus, Tag, Trash2 } from "lucide-react";
import { Label, Input, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { makeId, type OnboardingService, type StepProps } from "./types";

export function Step8Services({ data, update }: StepProps) {
  function addService() {
    const item: OnboardingService = { id: makeId("srv"), title: "", price: "", duration: "", description: "" };
    update({ services: [...data.services, item] });
  }

  function updateService(id: string, patch: Partial<OnboardingService>) {
    update({ services: data.services.map((s) => (s.id === id ? { ...s, ...patch } : s)) });
  }

  function removeService(id: string) {
    update({ services: data.services.filter((s) => s.id !== id) });
  }

  return (
    <div className="space-y-5">
      {data.services.length === 0 && (
        <EmptyState
          icon={Tag}
          title="Nessun servizio aggiunto"
          description="Aggiungi almeno un servizio per permettere ai clienti di prenotarti."
        />
      )}

      {data.services.map((service, index) => (
        <div key={service.id} className="rounded-xl border border-navy-100 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-navy">Servizio {index + 1}</p>
            <button
              type="button"
              onClick={() => removeService(service.id)}
              aria-label={`Rimuovi servizio ${index + 1}`}
              className="rounded-lg p-1.5 text-body hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-3">
              <Label htmlFor={`srv-title-${service.id}`}>Titolo del servizio</Label>
              <Input
                id={`srv-title-${service.id}`}
                value={service.title}
                onChange={(e) => updateService(service.id, { title: e.target.value })}
                placeholder="es. Analisi preliminare bando"
              />
            </div>
            <div>
              <Label htmlFor={`srv-price-${service.id}`}>Prezzo (€)</Label>
              <Input
                id={`srv-price-${service.id}`}
                inputMode="decimal"
                value={service.price}
                onChange={(e) => updateService(service.id, { price: e.target.value })}
                placeholder="90"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor={`srv-duration-${service.id}`}>Durata (minuti)</Label>
              <Input
                id={`srv-duration-${service.id}`}
                inputMode="numeric"
                value={service.duration}
                onChange={(e) => updateService(service.id, { duration: e.target.value })}
                placeholder="60"
              />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor={`srv-desc-${service.id}`}>Descrizione</Label>
              <Textarea
                id={`srv-desc-${service.id}`}
                rows={3}
                value={service.description}
                onChange={(e) => updateService(service.id, { description: e.target.value })}
                placeholder="Cosa include questo servizio, a chi è rivolto, cosa riceverà il cliente."
              />
            </div>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={addService} className="gap-1.5">
        <Plus className="h-4 w-4" />
        Aggiungi servizio
      </Button>
    </div>
  );
}
