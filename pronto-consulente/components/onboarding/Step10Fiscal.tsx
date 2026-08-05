import { Info } from "lucide-react";
import { Label, Input } from "@/components/ui/Field";
import type { StepProps } from "./types";

export function Step10Fiscal({ data, update }: StepProps) {
  const { fiscal } = data;

  function set(patch: Partial<typeof fiscal>) {
    update({ fiscal: { ...fiscal, ...patch } });
  }

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="ob-businessName" required>
          Ragione sociale / nome attività
        </Label>
        <Input
          id="ob-businessName"
          value={fiscal.businessName}
          onChange={(e) => set({ businessName: e.target.value })}
          placeholder="es. Ferretti Consulting Srl"
        />
      </div>
      <div>
        <Label htmlFor="ob-vat" required>
          Partita IVA
        </Label>
        <Input
          id="ob-vat"
          inputMode="numeric"
          value={fiscal.vatNumber}
          onChange={(e) => set({ vatNumber: e.target.value })}
          placeholder="11 cifre"
        />
      </div>
      <div>
        <Label htmlFor="ob-iban" required>
          IBAN
        </Label>
        <Input
          id="ob-iban"
          value={fiscal.iban}
          onChange={(e) => set({ iban: e.target.value.toUpperCase() })}
          placeholder="IT60 X054 2811 1010 0000 0123 456"
        />
      </div>

      <div className="flex items-start gap-2.5 rounded-xl bg-navy-50 p-3.5 text-xs text-navy-700">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          I pagamenti reali dei clienti saranno gestiti tramite Stripe (integrazione futura): l'IBAN
          servirà per gli accrediti automatici dei tuoi compensi.
        </p>
      </div>
    </div>
  );
}
