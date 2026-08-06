"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, MapPin, ShieldCheck, Tag, Star, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Field";

const placeholders = ["Business plan", "Sicurezza sul lavoro", "Finanza agevolata", "Privacy", "Project management"];

const trustPoints = [
  { icon: ShieldCheck, label: "Professionisti verificati" },
  { icon: Tag, label: "Prezzi trasparenti" },
  { icon: Star, label: "Recensioni reali" },
  { icon: Lock, label: "Prenotazione sicura" },
];

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [modality, setModality] = useState("indifferente");
  // Parte da un indice fisso così server e client rendono lo stesso markup,
  // poi ruota dopo l'idratazione: niente mismatch, placeholder comunque vivo.
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPlaceholderIndex((i) => (i + 1) % placeholders.length), 2800);
    return () => clearInterval(id);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("localita", location);
    if (modality !== "indifferente") params.set("modalita", modality);
    router.push(`/ricerca?${params.toString()}`);
  }

  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(200,155,74,0.18), transparent 40%), radial-gradient(circle at 85% 0%, rgba(18,74,138,0.5), transparent 45%)",
        }}
      />
      <div className="container-px relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-gold-200">
            Oltre 2.400 consulenti selezionati in 22 settori
          </span>
          <h1 className="mt-5 animate-fade-up font-heading text-3xl font-bold leading-tight text-white sm:text-5xl">
            Il consulente giusto, quando ti serve.
          </h1>
          <p className="mx-auto mt-4 max-w-xl animate-fade-up text-base text-white/70 sm:text-lg" style={{ animationDelay: "80ms" }}>
            Confronta professionisti qualificati, consulta prezzi e recensioni e prenota la tua consulenza online.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="mx-auto mt-9 flex max-w-3xl animate-fade-up flex-col gap-2.5 rounded-2xl bg-white p-2.5 shadow-premium sm:flex-row sm:items-center"
          style={{ animationDelay: "140ms" }}
          role="search"
          aria-label="Cerca un consulente"
        >
          <div className="flex flex-1 items-center gap-2.5 rounded-xl px-3 py-2.5 sm:border-r sm:border-navy-100">
            <Search className="h-[18px] w-[18px] shrink-0 text-navy-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder={`Di quale consulenza hai bisogno? Es. ${placeholders[placeholderIndex]}`}
              className="w-full border-0 bg-transparent text-sm text-ink placeholder:text-body/70 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 sm:w-48 sm:border-r sm:border-navy-100">
            <MapPin className="h-[18px] w-[18px] shrink-0 text-navy-400" />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              placeholder="Località"
              className="w-full border-0 bg-transparent text-sm text-ink placeholder:text-body/70 focus:outline-none"
            />
          </div>
          <div className="px-1 sm:w-40">
            <Select value={modality} onChange={(e) => setModality(e.target.value)} aria-label="Modalità" className="h-11 border-0 bg-muted">
              <option value="indifferente">Online o presenza</option>
              <option value="online">Online</option>
              <option value="presenza">In presenza</option>
            </Select>
          </div>
          <Button type="submit" size="lg" className="sm:px-6">
            <Search className="h-4 w-4" /> Cerca consulente
          </Button>
        </form>

        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {trustPoints.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-white/70">
              <Icon className="h-4 w-4 text-gold-300" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
