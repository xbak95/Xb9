import type { BlogPost } from "@/lib/types";

export const blogPosts: BlogPost[] = [
  {
    id: "b-01", slug: "come-scegliere-il-consulente-giusto",
    title: "Come scegliere il consulente giusto per la tua azienda",
    excerpt: "Cinque criteri concreti per valutare competenza, referenze e affinità prima di affidare un progetto a un consulente esterno.",
    category: "Guide", date: "2026-06-01", readTimeMinutes: 6,
    coverUrl: "", author: "Redazione Pronto Consulente",
  },
  {
    id: "b-02", slug: "bandi-pnrr-2026-guida-pmi",
    title: "Bandi PNRR 2026: la guida essenziale per le PMI",
    excerpt: "Una panoramica delle principali misure ancora attive e di come muoversi tra scadenze e requisiti di ammissibilità.",
    category: "Finanza agevolata", date: "2026-05-18", readTimeMinutes: 8,
    coverUrl: "", author: "Alessandro Ferretti",
  },
  {
    id: "b-03", slug: "obblighi-sicurezza-sul-lavoro-pmi",
    title: "Obblighi di sicurezza sul lavoro: cosa deve sapere una PMI",
    excerpt: "DVR, RSPP, formazione obbligatoria: una checklist pratica per non farsi trovare impreparati.",
    category: "HSE", date: "2026-05-05", readTimeMinutes: 7,
    coverUrl: "", author: "Chiara Bellini",
  },
  {
    id: "b-04", slug: "gdpr-checklist-pmi",
    title: "GDPR: la checklist di conformità in 10 punti per le PMI",
    excerpt: "Dal registro dei trattamenti alla nomina del DPO: gli adempimenti che non puoi permetterti di saltare.",
    category: "Privacy", date: "2026-04-22", readTimeMinutes: 5,
    coverUrl: "", author: "Simone Ferraro",
  },
  {
    id: "b-05", slug: "business-plan-investor-ready",
    title: "Business plan investor-ready: gli errori più comuni dei founder",
    excerpt: "Cosa cercano davvero gli investitori in un business plan e perché le proiezioni troppo ottimistiche fanno più danni che bene.",
    category: "Startup", date: "2026-04-10", readTimeMinutes: 9,
    coverUrl: "", author: "Martina Colombo",
  },
];
