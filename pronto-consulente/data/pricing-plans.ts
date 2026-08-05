import type { PricingPlan } from "@/lib/types";

export const pricingPlans: PricingPlan[] = [
  {
    id: "plan-base",
    name: "Base",
    tagline: "Per iniziare a farti trovare",
    price: "Gratuito",
    commission: "Commissione standard sulle prenotazioni (da definire)",
    featured: false,
    features: [
      "Profilo pubblico su Pronto Consulente",
      "Fino a 3 servizi pubblicabili",
      "Statistiche di base (visualizzazioni profilo)",
      "Messaggistica con i clienti",
      "Recensioni verificate",
    ],
  },
  {
    id: "plan-professional",
    name: "Professional",
    tagline: "Per consulenti che vogliono crescere",
    price: "Da definire",
    commission: "Commissione ridotta rispetto al piano Base (da definire)",
    featured: true,
    features: [
      "Tutto il piano Base",
      "Profilo avanzato con portfolio e case study",
      "Servizi illimitati",
      "Maggiore visibilità nei risultati di ricerca",
      "Statistiche complete e tasso di conversione",
      "Badge Professional",
      "Calendario avanzato con sincronizzazione",
    ],
  },
  {
    id: "plan-premium",
    name: "Premium",
    tagline: "Per consulenti e studi strutturati",
    price: "Da definire",
    commission: "Commissione minima (da definire)",
    featured: false,
    features: [
      "Tutto il piano Professional",
      "Posizionamento prioritario nelle ricerche",
      "Lead qualificati assegnati",
      "Strumenti AI per matching e proposte",
      "CRM clienti integrato",
      "Analytics avanzati",
      "Supporto prioritario dedicato",
    ],
  },
];
