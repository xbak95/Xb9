export interface FilterState {
  q: string;
  categoria: string;
  sottocategoria: string;
  localita: string;
  modalita: "indifferente" | "online" | "presenza";
  prezzo: string;
  rating: string;
  esperienza: string;
  lingua: string;
  disponibilita: string;
  settore: string;
  verificato: boolean;
  rispostaRapida: boolean;
  prezzoFisso: boolean;
  certificazioni: boolean;
}

export const defaultFilters: FilterState = {
  q: "",
  categoria: "",
  sottocategoria: "",
  localita: "",
  modalita: "indifferente",
  prezzo: "all",
  rating: "0",
  esperienza: "0",
  lingua: "",
  disponibilita: "all",
  settore: "",
  verificato: false,
  rispostaRapida: false,
  prezzoFisso: false,
  certificazioni: false,
};

export type SortOption =
  | "consigliati"
  | "piu-recensiti"
  | "prezzo-crescente"
  | "prezzo-decrescente"
  | "disponibilita"
  | "esperienza"
  | "valutazioni";

export const sortLabels: Record<SortOption, string> = {
  consigliati: "Consigliati",
  "piu-recensiti": "Più recensiti",
  "prezzo-crescente": "Prezzo crescente",
  "prezzo-decrescente": "Prezzo decrescente",
  disponibilita: "Disponibilità più vicina",
  esperienza: "Esperienza",
  valutazioni: "Migliori valutazioni",
};
