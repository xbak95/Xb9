import { Label, Select, FieldHint } from "@/components/ui/Field";
import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";
import type { StepProps } from "./types";

export function Step3Category({ data, update }: StepProps) {
  const selectedCategory = categories.find((c) => c.slug === data.categorySlug);
  const availableSubcategories = selectedCategory?.subcategories ?? [];

  function toggleSubcategory(sub: string) {
    const has = data.subcategories.includes(sub);
    update({
      subcategories: has
        ? data.subcategories.filter((s) => s !== sub)
        : [...data.subcategories, sub],
    });
  }

  function handleCategoryChange(slug: string) {
    update({ categorySlug: slug, subcategories: [] });
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="ob-category" required>
          Categoria principale
        </Label>
        <Select id="ob-category" value={data.categorySlug} onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="">Seleziona una categoria...</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </Select>
        <FieldHint>Determina in quale area del marketplace comparirà il tuo profilo.</FieldHint>
      </div>

      {selectedCategory && (
        <div>
          <Label>Sottocategorie / specializzazioni</Label>
          <p className="mb-3 text-xs text-body">Seleziona una o più specializzazioni all'interno di {selectedCategory.name}.</p>
          <div className="flex flex-wrap gap-2">
            {availableSubcategories.map((sub) => {
              const active = data.subcategories.includes(sub);
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => toggleSubcategory(sub)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "border-navy bg-navy text-white"
                      : "border-navy-100 bg-white text-ink hover:bg-navy-50"
                  )}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
