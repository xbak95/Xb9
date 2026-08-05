import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "@/components/search/SearchResults";

export const metadata: Metadata = {
  title: "Trova un consulente",
  description: "Filtra oltre 2.400 consulenti per competenza, prezzo, località, modalità e recensioni verificate.",
};

export default function RicercaPage() {
  return (
    <Suspense fallback={<div className="container-px py-16 text-center text-body">Caricamento…</div>}>
      <SearchResults />
    </Suspense>
  );
}
