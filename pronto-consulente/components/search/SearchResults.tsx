"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, Scale, X, SearchX } from "lucide-react";
import { consultants } from "@/data/consultants";
import { ConsultantCard } from "@/components/consultant/ConsultantCard";
import { ConsultantCardSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Select } from "@/components/ui/Field";
import { Button, ButtonLink } from "@/components/ui/Button";
import { SearchFilters } from "./SearchFilters";
import { defaultFilters, sortLabels, type FilterState, type SortOption } from "./types";

const TODAY = new Date("2026-08-05T00:00:00Z");

export function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<FilterState>(() => ({
    ...defaultFilters,
    q: searchParams.get("q") ?? "",
    categoria: searchParams.get("categoria") ?? "",
    localita: searchParams.get("localita") ?? "",
    modalita: (searchParams.get("modalita") as FilterState["modalita"]) ?? "indifferente",
  }));
  const [sort, setSort] = useState<SortOption>("consigliati");
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compared, setCompared] = useState<string[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const languages = useMemo(() => Array.from(new Set(consultants.flatMap((c) => c.languages))).sort(), []);
  const sectors = useMemo(() => Array.from(new Set(consultants.flatMap((c) => c.sectors))).sort(), []);

  const results = useMemo(() => {
    let list = consultants.filter((c) => {
      if (filters.q) {
        const q = filters.q.toLowerCase();
        const haystack = `${c.fullName} ${c.title} ${c.skills.map((s) => s.name).join(" ")} ${c.categoryName}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.categoria) {
        const cat = c.categoryId.replace("cat-", "");
        if (cat !== filters.categoria) return false;
      }
      if (filters.sottocategoria && !c.subcategories.includes(filters.sottocategoria)) return false;
      if (filters.localita && !c.location.toLowerCase().includes(filters.localita.toLowerCase())) return false;
      if (filters.modalita !== "indifferente" && c.modality !== filters.modalita && c.modality !== "ibrida") return false;
      if (filters.prezzo !== "all") {
        const [min, max] = filters.prezzo.split("-").map(Number);
        if (c.startingPrice < min || c.startingPrice > max) return false;
      }
      if (Number(filters.rating) > 0 && c.rating < Number(filters.rating)) return false;
      if (Number(filters.esperienza) > 0 && c.yearsExperience < Number(filters.esperienza)) return false;
      if (filters.lingua && !c.languages.includes(filters.lingua)) return false;
      if (filters.settore && !c.sectors.includes(filters.settore)) return false;
      if (filters.disponibilita !== "all") {
        const days = Number(filters.disponibilita);
        const diff = (new Date(c.nextAvailability).getTime() - TODAY.getTime()) / 86400000;
        if (diff > days) return false;
      }
      if (filters.verificato && !c.badges.includes("identita_verificata")) return false;
      if (filters.rispostaRapida && !c.badges.includes("risposta_rapida") && c.avgResponseTimeHours > 3) return false;
      if (filters.prezzoFisso && !c.services.some((s) => s.priceType === "fisso" && s.price > 0)) return false;
      if (filters.certificazioni && !c.certifications.some((cert) => cert.verified)) return false;
      return true;
    });

    const sorted = [...list].sort((a, b) => {
      switch (sort) {
        case "piu-recensiti":
          return b.reviewCount - a.reviewCount;
        case "prezzo-crescente":
          return a.startingPrice - b.startingPrice;
        case "prezzo-decrescente":
          return b.startingPrice - a.startingPrice;
        case "disponibilita":
          return new Date(a.nextAvailability).getTime() - new Date(b.nextAvailability).getTime();
        case "esperienza":
          return b.yearsExperience - a.yearsExperience;
        case "valutazioni":
          return b.rating - a.rating;
        default:
          return b.rating * Math.log(b.reviewCount + 2) - a.rating * Math.log(a.reviewCount + 2);
      }
    });

    return sorted;
  }, [filters, sort]);

  function patchFilters(patch: Partial<FilterState>) {
    setFilters((f) => ({ ...f, ...patch }));
  }

  function resetFilters() {
    setFilters(defaultFilters);
  }

  function toggleFavorite(id: string) {
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  }

  function toggleCompare(id: string) {
    setCompared((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length >= 3 ? c : [...c, id]));
  }

  return (
    <div className="container-px py-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Trova un consulente</h1>
          <p className="mt-1 text-sm text-body">
            {loading ? "Ricerca in corso…" : `${results.length} consulenti trovati`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setMobileFiltersOpen(true)}>
            <SlidersHorizontal className="h-4 w-4" /> Filtri
          </Button>
          <Select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="w-52" aria-label="Ordina per">
            {Object.entries(sortLabels).map(([value, label]) => (
              <option key={value} value={value}>
                Ordina: {label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
            <SearchFilters filters={filters} onChange={patchFilters} onReset={resetFilters} languages={languages} sectors={sectors} />
          </div>
        </aside>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-[160] lg:hidden">
            <div className="absolute inset-0 bg-navy-950/50" onClick={() => setMobileFiltersOpen(false)} />
            <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-white p-5">
              <SearchFilters
                filters={filters}
                onChange={patchFilters}
                onReset={resetFilters}
                languages={languages}
                sectors={sectors}
                onClose={() => setMobileFiltersOpen(false)}
              />
            </div>
          </div>
        )}

        <div>
          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ConsultantCardSkeleton key={i} />
              ))}
            </div>
          ) : results.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="Nessun consulente trovato"
              description="Prova ad ampliare i filtri di ricerca o a modificare la parola chiave utilizzata."
              action={
                <Button variant="outline" onClick={resetFilters}>
                  Azzera filtri
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((c) => (
                <ConsultantCard
                  key={c.id}
                  consultant={c}
                  showActions
                  favorited={favorites.includes(c.id)}
                  onToggleFavorite={toggleFavorite}
                  compared={compared.includes(c.id)}
                  onToggleCompare={toggleCompare}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {compared.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-navy-100 bg-white/95 backdrop-blur">
          <div className="container-px flex items-center justify-between gap-4 py-3.5">
            <p className="flex items-center gap-2 text-sm font-medium text-navy">
              <Scale className="h-4 w-4" /> {compared.length} consulent{compared.length > 1 ? "i" : "e"} selezionat{compared.length > 1 ? "i" : "o"} per il confronto
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCompared([])} aria-label="Svuota confronto" className="text-body hover:text-ink">
                <X className="h-4 w-4" />
              </button>
              <ButtonLink href={`/confronta?ids=${compared.join(",")}`} size="sm">
                Confronta
              </ButtonLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
