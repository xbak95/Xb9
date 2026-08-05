import { Award, Plus, Trash2 } from "lucide-react";
import { Label, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { makeId, type OnboardingCertification, type StepProps } from "./types";

export function Step6Certifications({ data, update }: StepProps) {
  function addCertification() {
    const item: OnboardingCertification = { id: makeId("cert"), name: "", issuer: "", year: "" };
    update({ certifications: [...data.certifications, item] });
  }

  function updateCertification(id: string, patch: Partial<OnboardingCertification>) {
    update({
      certifications: data.certifications.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    });
  }

  function removeCertification(id: string) {
    update({ certifications: data.certifications.filter((c) => c.id !== id) });
  }

  return (
    <div className="space-y-5">
      {data.certifications.length === 0 && (
        <EmptyState
          icon={Award}
          title="Nessuna certificazione aggiunta"
          description="Le certificazioni verificate aumentano la fiducia dei clienti nel tuo profilo."
        />
      )}

      {data.certifications.map((cert, index) => (
        <div key={cert.id} className="grid gap-4 rounded-xl border border-navy-100 p-4 sm:grid-cols-[1fr_1fr_120px_auto] sm:items-end sm:p-5">
          <div>
            <Label htmlFor={`cert-name-${cert.id}`}>Certificazione</Label>
            <Input
              id={`cert-name-${cert.id}`}
              value={cert.name}
              onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
              placeholder="es. Esperto in finanza agevolata"
            />
          </div>
          <div>
            <Label htmlFor={`cert-issuer-${cert.id}`}>Ente</Label>
            <Input
              id={`cert-issuer-${cert.id}`}
              value={cert.issuer}
              onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
              placeholder="es. Confindustria"
            />
          </div>
          <div>
            <Label htmlFor={`cert-year-${cert.id}`}>Anno</Label>
            <Input
              id={`cert-year-${cert.id}`}
              inputMode="numeric"
              value={cert.year}
              onChange={(e) => updateCertification(cert.id, { year: e.target.value })}
              placeholder="2022"
            />
          </div>
          <button
            type="button"
            onClick={() => removeCertification(cert.id)}
            aria-label={`Rimuovi certificazione ${index + 1}`}
            className="flex h-11 items-center justify-center rounded-lg text-body hover:bg-red-50 hover:text-red-600 sm:w-11"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={addCertification} className="gap-1.5">
        <Plus className="h-4 w-4" />
        Aggiungi certificazione
      </Button>
    </div>
  );
}
