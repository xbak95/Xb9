import type { Review } from "@/lib/types";

export const reviews: Review[] = [
  {
    id: "r-01", consultantId: "c-01", clientName: "Marco Villa", clientCompany: "Villa Meccanica Srl",
    serviceTitle: "Pratica completa per bando regionale",
    ratings: { overall: 5, competence: 5, clarity: 5, punctuality: 5, valueForMoney: 4.5 },
    comment: "Alessandro ci ha seguiti passo passo nella domanda per il bando regionale industria 4.0. Contributo ottenuto: 45.000€. Professionalità e chiarezza totali.",
    date: "2026-06-12", verified: true, wouldRecommend: true,
    consultantReply: { text: "Grazie mille Marco, è stato un piacere lavorare con voi!", date: "2026-06-13" },
  },
  {
    id: "r-02", consultantId: "c-01", clientName: "Silvia Bruno", clientCompany: "Bruno Agroalimentare",
    serviceTitle: "Analisi preliminare bando",
    ratings: { overall: 4.5, competence: 5, clarity: 4.5, punctuality: 4, valueForMoney: 4.5 },
    comment: "Analisi molto approfondita, ci ha fatto risparmiare tempo evitando un bando non idoneo per noi.",
    date: "2026-05-28", verified: true, wouldRecommend: true,
  },
  {
    id: "r-03", consultantId: "c-02", clientName: "Giovanni Esposito", clientCompany: "Esposito Costruzioni",
    serviceTitle: "Redazione DVR completo",
    ratings: { overall: 5, competence: 5, clarity: 5, punctuality: 5, valueForMoney: 5 },
    comment: "Sopralluogo puntuale, documento completo e conforme. Ci ha aiutato anche a prepararci per un controllo ASL.",
    date: "2026-06-02", verified: true, wouldRecommend: true,
  },
  {
    id: "r-04", consultantId: "c-02", clientName: "Anna Ferri", clientCompany: "Ferri Logistica",
    serviceTitle: "Consulenza HSE di 60 minuti",
    ratings: { overall: 4.5, competence: 5, clarity: 4, punctuality: 4.5, valueForMoney: 4.5 },
    comment: "Molto competente, ci ha chiarito diversi dubbi sulla formazione obbligatoria per i nuovi assunti.",
    date: "2026-04-19", verified: true, wouldRecommend: true,
  },
  {
    id: "r-05", consultantId: "c-03", clientName: "Paolo Greco", clientCompany: "Greco Tech Srl",
    serviceTitle: "Costituzione società",
    ratings: { overall: 5, competence: 5, clarity: 5, punctuality: 4.5, valueForMoney: 4.5 },
    comment: "Avvocato Rinaldi ci ha seguiti nella costituzione della nostra startup con soci esteri: professionale e sempre disponibile.",
    date: "2026-06-20", verified: true, wouldRecommend: true,
    consultantReply: { text: "Grazie Paolo, in bocca al lupo per il lancio!", date: "2026-06-21" },
  },
  {
    id: "r-06", consultantId: "c-03", clientName: "Elisa Marino", clientCompany: "Marino Design Studio",
    serviceTitle: "Revisione contratto",
    ratings: { overall: 4.5, competence: 5, clarity: 4.5, punctuality: 4.5, valueForMoney: 4 },
    comment: "Revisione puntuale del contratto con un grande cliente, ci ha fatto notare clausole che avremmo firmato senza accorgercene.",
    date: "2026-05-15", verified: true, wouldRecommend: true,
  },
  {
    id: "r-07", consultantId: "c-04", clientName: "Tommaso Ricci", clientCompany: "NovaTech Solutions",
    serviceTitle: "Setup PMO",
    ratings: { overall: 4.5, competence: 4.5, clarity: 4.5, punctuality: 4.5, valueForMoney: 4.5 },
    comment: "Giulia ha strutturato un PMO leggero e su misura per la nostra scale-up, senza appesantire i processi.",
    date: "2026-05-30", verified: true, wouldRecommend: true,
  },
  {
    id: "r-08", consultantId: "c-05", clientName: "Federico Longo", clientCompany: "Longo Home & Living",
    serviceTitle: "Strategia marketing 90 giorni",
    ratings: { overall: 4.5, competence: 4.5, clarity: 5, punctuality: 4, valueForMoney: 4.5 },
    comment: "Piano concreto e realistico, in 3 mesi abbiamo triplicato il traffico organico verso l'e-commerce.",
    date: "2026-06-08", verified: true, wouldRecommend: true,
  },
  {
    id: "r-09", consultantId: "c-05", clientName: "Chiara Testa", clientCompany: "Testa Wellness",
    serviceTitle: "Audit profilo LinkedIn",
    ratings: { overall: 4.5, competence: 4.5, clarity: 4.5, punctuality: 4.5, valueForMoney: 4.5 },
    comment: "Consigli pratici e subito applicabili, in due settimane ho raddoppiato le visualizzazioni del profilo.",
    date: "2026-04-25", verified: true, wouldRecommend: true,
  },
  {
    id: "r-10", consultantId: "c-06", clientName: "Studio Legale Bianchi", clientCompany: "Bianchi & Partners",
    serviceTitle: "Penetration test infrastruttura",
    ratings: { overall: 5, competence: 5, clarity: 4.5, punctuality: 5, valueForMoney: 4.5 },
    comment: "Report tecnico dettagliato e comprensibile anche per chi non è del settore. Abbiamo chiuso 3 vulnerabilità critiche.",
    date: "2026-06-16", verified: true, wouldRecommend: true,
  },
  {
    id: "r-11", consultantId: "c-07", clientName: "Enrico Bassi", clientCompany: "Bassi Industrie",
    serviceTitle: "Piano di riorganizzazione",
    ratings: { overall: 4.5, competence: 5, clarity: 4.5, punctuality: 4, valueForMoney: 4 },
    comment: "Approccio pragmatico al passaggio generazionale, ci ha aiutato a definire ruoli chiari tra i soci.",
    date: "2026-05-11", verified: true, wouldRecommend: true,
  },
  {
    id: "r-12", consultantId: "c-08", clientName: "Sara Conte", clientCompany: "Conte Retail Group",
    serviceTitle: "Call conoscitiva di 30 minuti",
    ratings: { overall: 4.5, competence: 4.5, clarity: 4.5, punctuality: 5, valueForMoney: 5 },
    comment: "Molto disponibile e concreta fin dalla prima call, ci ha indirizzati verso il percorso giusto.",
    date: "2026-06-01", verified: true, wouldRecommend: true,
  },
  {
    id: "r-13", consultantId: "c-09", clientName: "Poliambulatorio San Rocco", clientCompany: "San Rocco Srl",
    serviceTitle: "Valutazione GDPR iniziale",
    ratings: { overall: 4.5, competence: 5, clarity: 4.5, punctuality: 4.5, valueForMoney: 4 },
    comment: "Analisi molto approfondita per una struttura sanitaria, ci sentiamo molto più tranquilli.",
    date: "2026-05-22", verified: true, wouldRecommend: true,
  },
  {
    id: "r-14", consultantId: "c-10", clientName: "Luca Fabbri", clientCompany: "Fabbri Fintech",
    serviceTitle: "Revisione business plan",
    ratings: { overall: 5, competence: 5, clarity: 5, punctuality: 4.5, valueForMoney: 5 },
    comment: "Martina ci ha aiutato a rendere il business plan davvero investor-ready: due settimane dopo abbiamo chiuso il round seed.",
    date: "2026-06-25", verified: true, wouldRecommend: true,
    consultantReply: { text: "Congratulazioni per il round, ottimo lavoro di squadra!", date: "2026-06-26" },
  },
  {
    id: "r-15", consultantId: "c-11", clientName: "Gruppo Serena Manifatture", clientCompany: "Serena Manifatture Spa",
    serviceTitle: "Assessment ESG iniziale",
    ratings: { overall: 4.5, competence: 4.5, clarity: 4, punctuality: 4.5, valueForMoney: 4.5 },
    comment: "Ci ha aiutato a capire da dove partire per il primo bilancio di sostenibilità, in modo molto concreto.",
    date: "2026-05-19", verified: true, wouldRecommend: true,
  },
  {
    id: "r-16", consultantId: "c-12", clientName: "Rita Fontana", clientCompany: "Privato",
    serviceTitle: "Sopralluogo tecnico pre-acquisto",
    ratings: { overall: 5, competence: 5, clarity: 5, punctuality: 5, valueForMoney: 4.5 },
    comment: "Ha individuato una difformità catastale che ci ha permesso di rinegoziare il prezzo. Fondamentale prima di un acquisto.",
    date: "2026-06-10", verified: true, wouldRecommend: true,
  },
];

export function getReviewsForConsultant(consultantId: string) {
  return reviews.filter((r) => r.consultantId === consultantId);
}

export function averageBreakdown(consultantId: string) {
  const rs = getReviewsForConsultant(consultantId);
  if (rs.length === 0) return null;
  const sum = rs.reduce(
    (acc, r) => ({
      overall: acc.overall + r.ratings.overall,
      competence: acc.competence + r.ratings.competence,
      clarity: acc.clarity + r.ratings.clarity,
      punctuality: acc.punctuality + r.ratings.punctuality,
      valueForMoney: acc.valueForMoney + r.ratings.valueForMoney,
    }),
    { overall: 0, competence: 0, clarity: 0, punctuality: 0, valueForMoney: 0 }
  );
  return {
    overall: sum.overall / rs.length,
    competence: sum.competence / rs.length,
    clarity: sum.clarity / rs.length,
    punctuality: sum.punctuality / rs.length,
    valueForMoney: sum.valueForMoney / rs.length,
  };
}

export function ratingDistribution(consultantId: string) {
  const rs = getReviewsForConsultant(consultantId);
  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: rs.filter((r) => Math.round(r.ratings.overall) === star).length,
  }));
  return dist;
}
