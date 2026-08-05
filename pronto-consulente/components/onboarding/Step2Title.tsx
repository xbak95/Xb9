import { Label, Input, FieldHint } from "@/components/ui/Field";
import type { StepProps } from "./types";

export function Step2Title({ data, update }: StepProps) {
  return (
    <div>
      <Label htmlFor="ob-title" required>
        Titolo professionale
      </Label>
      <Input
        id="ob-title"
        value={data.professionalTitle}
        onChange={(e) => update({ professionalTitle: e.target.value })}
        placeholder='es. "Consulente Finanza Agevolata"'
      />
      <FieldHint>
        È la prima cosa che i clienti vedono nel tuo profilo: sii chiaro e specifico su ciò che fai.
      </FieldHint>

      <div className="mt-6 rounded-xl border border-navy-100 bg-muted/50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-body">Esempi efficaci</p>
        <ul className="mt-2 space-y-1.5 text-sm text-ink">
          <li>"Consulente del Lavoro — Paghe e Contributi"</li>
          <li>"Avvocato Societario — Contrattualistica e M&A"</li>
          <li>"RSPP Esterno — Sicurezza sul Lavoro"</li>
        </ul>
      </div>
    </div>
  );
}
