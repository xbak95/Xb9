import type { CaseStudy } from "@/lib/types";

export const caseStudies: CaseStudy[] = [
  {
    id: "cs-01", consultantId: "c-01", consultantName: "Alessandro Ferretti",
    title: "45.000€ di contributo a fondo perduto per l'industria 4.0",
    client: "Villa Meccanica Srl", sector: "Manifatturiero",
    summary: "Individuazione del bando regionale più adatto e gestione completa della pratica per l'acquisto di macchinari 4.0.",
    results: ["Contributo ottenuto: 45.000€", "Tempo di erogazione: 5 mesi", "Pratica approvata al primo invio"],
  },
  {
    id: "cs-02", consultantId: "c-02", consultantName: "Chiara Bellini",
    title: "Azzeramento non conformità in vista di un'ispezione ASL",
    client: "Esposito Costruzioni", sector: "Edilizia",
    summary: "Sopralluogo completo, aggiornamento del DVR e formazione lampo del personale prima di un controllo programmato.",
    results: ["100% non conformità risolte", "Ispezione superata senza rilievi", "12 lavoratori formati in 2 settimane"],
  },
  {
    id: "cs-03", consultantId: "c-03", consultantName: "Avv. Marco Rinaldi",
    title: "Costituzione di una startup con cap table internazionale",
    client: "Greco Tech Srl", sector: "Tecnologia",
    summary: "Struttura societaria e patti parasociali per una startup con 3 soci fondatori e un investitore estero.",
    results: ["Costituzione in 6 giorni lavorativi", "Cap table conforme a normativa italiana ed estera", "0 contestazioni sui patti parasociali"],
  },
  {
    id: "cs-04", consultantId: "c-05", consultantName: "Davide Conti",
    title: "Traffico organico triplicato in 90 giorni",
    client: "Longo Home & Living", sector: "E-commerce",
    summary: "Piano marketing integrato con focus su SEO, content e campagne performance a budget contenuto.",
    results: ["Traffico organico +212%", "ROAS medio 4.3x", "Tasso di conversione +38%"],
  },
  {
    id: "cs-05", consultantId: "c-06", consultantName: "Elena Russo",
    title: "3 vulnerabilità critiche individuate e risolte",
    client: "Bianchi & Partners", sector: "Servizi legali",
    summary: "Penetration test sull'infrastruttura cloud dello studio legale, con report tecnico ed executive summary.",
    results: ["3 vulnerabilità critiche risolte", "Retest superato al 100%", "Percorso ISO 27001 avviato"],
  },
  {
    id: "cs-06", consultantId: "c-10", consultantName: "Martina Colombo",
    title: "Round seed da 800.000€ chiuso in 6 settimane",
    client: "Fabbri Fintech", sector: "Fintech",
    summary: "Revisione del business plan e costruzione del pitch deck per il round seed, con affiancamento nelle call con gli investitori.",
    results: ["Round chiuso: 800.000€", "6 settimane dal deck alla chiusura", "5 investitori coinvolti"],
  },
];
