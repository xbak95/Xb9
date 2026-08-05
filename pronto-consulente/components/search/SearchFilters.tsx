"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { Label, Select, Checkbox } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { categories } from "@/data/categories";
import type { FilterState } from "./types";

const priceRanges = [
  { value: "all", label: "Qualsiasi prezzo" },
  { value: "0-100", label: "Fino a 100€" },
  { value: "100-300", label: "100€ - 300€" },
  { value: "300-800", label: "300€ - 800€" },
  { value: "800-99999", label: "Oltre 800€" },
];

const ratingOptions = [
  { value: "0", label: "Qualsiasi valutazione" },
  { value: "4.8", label: "4.8+ eccellente" },
  { value: "4.5", label: "4.5+" },
  { value: "4", label: "4.0+" },
];

const experienceOptions = [
  { value: "0", label: "Qualsiasi esperienza" },
  { value: "3", label: "Almeno 3 anni" },
  { value: "5", label: "Almeno 5 anni" },
  { value: "10", label: "Almeno 10 anni" },
];

const availabilityOptions = [
  { value: "all", label: "Qualsiasi data" },
  { value: "7", label: "Entro 7 giorni" },
  { value: "14", label: "Entro 14 giorni" },
];

export function SearchFilters({
  filters,
  onChange,
  languages,
  sectors,
  onReset,
  className,
  onClose,
}: {
  filters: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  languages: string[];
  sectors: string[];
  onReset: () => void;
  className?: string;
  onClose?: () => void;
}) {
  const category = categories.find((c) => c.slug === filters.categoria);

  return (
    <div className={className}>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-heading text-base font-bold text-navy">
          <SlidersHorizontal className="h-4 w-4" /> Filtri
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={onReset} className="text-xs font-medium text-institutional hover:text-navy">
            Azzera tutti
          </button>
          {onClose && (
            <button onClick={onClose} aria-label="Chiudi filtri" className="rounded p-1 text-body lg:hidden">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <Label htmlFor="f-categoria">Categoria</Label>
          <Select
            id="f-categoria"
            value={filters.categoria}
            onChange={(e) => onChange({ categoria: e.target.value, sottocategoria: "" })}
          >
            <option value="">Tutte le categorie</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>

        {category?.subcategories && (
          <div>
            <Label htmlFor="f-sottocategoria">Sottocategoria</Label>
            <Select id="f-sottocategoria" value={filters.sottocategoria} onChange={(e) => onChange({ sottocategoria: e.target.value })}>
              <option value="">Tutte</option>
              {category.subcategories.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </div>
        )}

        <div>
          <Label htmlFor="f-localita">Località</Label>
          <input
            id="f-localita"
            value={filters.localita}
            onChange={(e) => onChange({ localita: e.target.value })}
            placeholder="Es. Milano"
            className="h-11 w-full rounded-xl border border-navy-100 bg-white px-3.5 text-sm focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100"
          />
        </div>

        <div>
          <Label>Modalità</Label>
          <div className="flex gap-2">
            {(["indifferente", "online", "presenza"] as const).map((m) => (
              <button
                key={m}
                onClick={() => onChange({ modalita: m })}
                className={`flex-1 rounded-lg border px-2 py-2 text-xs font-medium capitalize transition-colors ${
                  filters.modalita === m ? "border-navy bg-navy text-white" : "border-navy-100 text-navy-700 hover:bg-navy-50"
                }`}
              >
                {m === "indifferente" ? "Tutte" : m}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="f-prezzo">Fascia di prezzo</Label>
          <Select id="f-prezzo" value={filters.prezzo} onChange={(e) => onChange({ prezzo: e.target.value })}>
            {priceRanges.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="f-rating">Valutazione minima</Label>
          <Select id="f-rating" value={filters.rating} onChange={(e) => onChange({ rating: e.target.value })}>
            {ratingOptions.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="f-esperienza">Anni di esperienza</Label>
          <Select id="f-esperienza" value={filters.esperienza} onChange={(e) => onChange({ esperienza: e.target.value })}>
            {experienceOptions.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="f-lingua">Lingua</Label>
          <Select id="f-lingua" value={filters.lingua} onChange={(e) => onChange({ lingua: e.target.value })}>
            <option value="">Qualsiasi lingua</option>
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="f-disponibilita">Disponibilità</Label>
          <Select id="f-disponibilita" value={filters.disponibilita} onChange={(e) => onChange({ disponibilita: e.target.value })}>
            {availabilityOptions.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="f-settore">Settore aziendale</Label>
          <Select id="f-settore" value={filters.settore} onChange={(e) => onChange({ settore: e.target.value })}>
            <option value="">Qualsiasi settore</option>
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-3 border-t border-navy-100 pt-4">
          <Checkbox
            label="Solo consulenti verificati"
            checked={filters.verificato}
            onChange={(e) => onChange({ verificato: e.target.checked })}
          />
          <Checkbox
            label="Risposta rapida"
            checked={filters.rispostaRapida}
            onChange={(e) => onChange({ rispostaRapida: e.target.checked })}
          />
          <Checkbox
            label="Servizi a prezzo fisso"
            checked={filters.prezzoFisso}
            onChange={(e) => onChange({ prezzoFisso: e.target.checked })}
          />
          <Checkbox
            label="Certificazioni verificate"
            checked={filters.certificazioni}
            onChange={(e) => onChange({ certificazioni: e.target.checked })}
          />
        </div>
      </div>

      {onClose && (
        <Button onClick={onClose} fullWidth className="mt-6 lg:hidden">
          Mostra risultati
        </Button>
      )}
    </div>
  );
}
