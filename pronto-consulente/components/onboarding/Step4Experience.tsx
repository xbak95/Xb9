import { Plus, Trash2 } from "lucide-react";
import { Label, Input, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Briefcase } from "lucide-react";
import { makeId, type OnboardingExperience, type StepProps } from "./types";

export function Step4Experience({ data, update }: StepProps) {
  function addExperience() {
    const item: OnboardingExperience = {
      id: makeId("exp"),
      role: "",
      organization: "",
      period: "",
      description: "",
    };
    update({ experiences: [...data.experiences, item] });
  }

  function updateExperience(id: string, patch: Partial<OnboardingExperience>) {
    update({
      experiences: data.experiences.map((exp) => (exp.id === id ? { ...exp, ...patch } : exp)),
    });
  }

  function removeExperience(id: string) {
    update({ experiences: data.experiences.filter((exp) => exp.id !== id) });
  }

  return (
    <div className="space-y-5">
      {data.experiences.length === 0 && (
        <EmptyState
          icon={Briefcase}
          title="Nessuna esperienza aggiunta"
          description="Aggiungi almeno un'esperienza professionale per rafforzare la credibilità del tuo profilo."
        />
      )}

      {data.experiences.map((exp, index) => (
        <div key={exp.id} className="rounded-xl border border-navy-100 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-navy">Esperienza {index + 1}</p>
            <button
              type="button"
              onClick={() => removeExperience(exp.id)}
              aria-label={`Rimuovi esperienza ${index + 1}`}
              className="rounded-lg p-1.5 text-body hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor={`exp-role-${exp.id}`}>Ruolo</Label>
              <Input
                id={`exp-role-${exp.id}`}
                value={exp.role}
                onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                placeholder="es. Responsabile finanza agevolata"
              />
            </div>
            <div>
              <Label htmlFor={`exp-org-${exp.id}`}>Organizzazione</Label>
              <Input
                id={`exp-org-${exp.id}`}
                value={exp.organization}
                onChange={(e) => updateExperience(exp.id, { organization: e.target.value })}
                placeholder="es. Studio Ferretti & Associati"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor={`exp-period-${exp.id}`}>Periodo</Label>
              <Input
                id={`exp-period-${exp.id}`}
                value={exp.period}
                onChange={(e) => updateExperience(exp.id, { period: e.target.value })}
                placeholder="es. 2018 — oggi"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor={`exp-desc-${exp.id}`}>Descrizione</Label>
              <Textarea
                id={`exp-desc-${exp.id}`}
                rows={3}
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                placeholder="Descrivi brevemente responsabilità e risultati raggiunti."
              />
            </div>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={addExperience} className="gap-1.5">
        <Plus className="h-4 w-4" />
        Aggiungi esperienza
      </Button>
    </div>
  );
}
