"use client";

import { useState } from "react";
import { Search, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Label, Input, FieldHint } from "@/components/ui/Field";
import { Badge } from "@/components/ui/Badge";
import { consultants } from "@/data/consultants";

type Result = { found: true; name: string; badges: string[] } | { found: false; query: string } | null;

export function VerifyForm() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const normalized = query.trim().toLowerCase();
    setTimeout(() => {
      const match = consultants.find(
        (c) =>
          c.slug.toLowerCase().includes(normalized) ||
          c.fullName.toLowerCase().includes(normalized)
      );
      if (match) {
        setResult({ found: true, name: match.fullName, badges: match.badges });
      } else {
        setResult({ found: false, query });
      }
      setLoading(false);
    }, 500);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Label htmlFor="verify-query">Nome o slug del consulente</Label>
          <Input
            id="verify-query"
            name="query"
            required
            placeholder="Es. Alessandro Ferretti oppure alessandro-ferretti-finanza-agevolata"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <FieldHint>Puoi trovare lo slug nell'indirizzo del profilo del consulente.</FieldHint>
        </div>
        <Button type="submit" loading={loading} size="lg" className="gap-2 sm:mb-[26px]">
          {!loading && <Search className="h-4 w-4" />}
          Verifica
        </Button>
      </form>

      {result && (
        <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          {result.found ? (
            <div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-verified" />
                <p className="text-sm font-semibold text-navy">
                  {result.name} è un consulente verificato su Pronto Consulente.
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {result.badges.map((b) => (
                  <Badge key={b} tone="verified">
                    {b.replace(/_/g, " ")}
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <XCircle className="h-5 w-5 text-red-500" />
              <p className="text-sm text-body">
                Nessun consulente verificato trovato per &ldquo;{result.query}&rdquo;. Controlla
                il nome o lo slug e riprova.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
