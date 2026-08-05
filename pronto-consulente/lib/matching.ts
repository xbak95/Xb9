// Motore di compatibilità per il wizard "Matching AI" (/matching).
// Il punteggio è calcolato confrontando le risposte dell'utente con i dati
// reali dei consulenti demo — non è casuale: ogni criterio soddisfatto
// contribuisce con un peso fisso al punteggio finale, normalizzato 0-100.

import type { Consultant, Modality } from "@/lib/types";
import { consultants as defaultConsultants } from "@/data/consultants";
import { getCategoryBySlug } from "@/data/categories";

export type BudgetBand = "sotto-200" | "200-500" | "500-1500" | "oltre-1500";
export type UrgencyLevel = "asap" | "settimana" | "mese" | "nessuna-fretta";
export type ModalityPreference = "online" | "presenza" | "indifferente";
export type ExperienceLevel = "junior" | "esperto" | "massima-seniority";

export interface MatchingAnswers {
  problem: string;
  categorySlug: string;
  sector: string;
  budget: BudgetBand | "";
  urgency: UrgencyLevel | "";
  modality: ModalityPreference | "";
  location: string;
  language: string;
  experienceLevel: ExperienceLevel | "";
  desiredOutcome: string;
  attachmentNames: string[];
}

export const emptyMatchingAnswers: MatchingAnswers = {
  problem: "",
  categorySlug: "",
  sector: "",
  budget: "",
  urgency: "",
  modality: "",
  location: "",
  language: "",
  experienceLevel: "",
  desiredOutcome: "",
  attachmentNames: [],
};

export interface MatchResult {
  consultant: Consultant;
  score: number; // percentuale 0-100
  reasons: string[];
}

const BUDGET_RANGES: Record<BudgetBand, [number, number]> = {
  "sotto-200": [0, 200],
  "200-500": [200, 500],
  "500-1500": [500, 1500],
  "oltre-1500": [1500, Infinity],
};

const WEIGHTS = {
  category: 35,
  modality: 15,
  language: 15,
  rating: 15,
  seniority: 12,
  budget: 8,
  sector: 10,
};

const MAX_SCORE = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);

function scoreModality(consultantModality: Modality, preference: ModalityPreference | ""): { points: number; matched: boolean } {
  if (!preference || preference === "indifferente") {
    return { points: WEIGHTS.modality * 0.6, matched: false };
  }
  if (consultantModality === preference || consultantModality === "ibrida") {
    return { points: WEIGHTS.modality, matched: true };
  }
  return { points: 0, matched: false };
}

function scoreLanguage(languages: string[], requested: string): { points: number; matched: boolean } {
  if (!requested) return { points: 0, matched: false };
  const matched = languages.some((l) => l.toLowerCase() === requested.toLowerCase());
  return { points: matched ? WEIGHTS.language : 0, matched };
}

function scoreRating(rating: number): number {
  return (rating / 5) * WEIGHTS.rating;
}

function scoreSeniority(yearsExperience: number, level: ExperienceLevel | ""): { points: number; matched: boolean } {
  if (!level) return { points: WEIGHTS.seniority * 0.4, matched: false };
  if (level === "junior") {
    if (yearsExperience <= 6) return { points: WEIGHTS.seniority, matched: true };
    if (yearsExperience <= 10) return { points: WEIGHTS.seniority * 0.5, matched: false };
    return { points: WEIGHTS.seniority * 0.15, matched: false };
  }
  if (level === "esperto") {
    if (yearsExperience >= 6 && yearsExperience <= 15) return { points: WEIGHTS.seniority, matched: true };
    return { points: WEIGHTS.seniority * 0.5, matched: false };
  }
  // massima-seniority
  if (yearsExperience >= 12) return { points: WEIGHTS.seniority, matched: true };
  if (yearsExperience >= 8) return { points: WEIGHTS.seniority * 0.5, matched: false };
  return { points: WEIGHTS.seniority * 0.15, matched: false };
}

function scoreBudget(startingPrice: number, band: BudgetBand | ""): { points: number; matched: boolean } {
  if (!band) return { points: 0, matched: false };
  const [min, max] = BUDGET_RANGES[band];
  if (startingPrice >= min && startingPrice <= max) return { points: WEIGHTS.budget, matched: true };
  // credito parziale se il prezzo di partenza è comunque vicino alla fascia
  const distance = startingPrice < min ? min - startingPrice : startingPrice - max;
  if (distance <= 100) return { points: WEIGHTS.budget * 0.4, matched: false };
  return { points: 0, matched: false };
}

function scoreSector(sectors: string[], requestedSector: string): { points: number; matched: boolean } {
  const requested = requestedSector.trim().toLowerCase();
  if (!requested) return { points: 0, matched: false };
  const matched = sectors.some(
    (s) => s.toLowerCase().includes(requested) || requested.includes(s.toLowerCase())
  );
  return { points: matched ? WEIGHTS.sector : 0, matched };
}

const experienceLevelLabel: Record<ExperienceLevel, string> = {
  junior: "junior",
  esperto: "esperto",
  "massima-seniority": "massima seniority",
};

const modalityLabel: Record<Modality, string> = {
  online: "online",
  presenza: "in presenza",
  ibrida: "sia online che in presenza",
};

function buildReasons(consultant: Consultant, answers: MatchingAnswers, flags: {
  categoryMatched: boolean;
  modalityMatched: boolean;
  languageMatched: boolean;
  seniorityMatched: boolean;
  budgetMatched: boolean;
  sectorMatched: boolean;
}): string[] {
  const reasons: string[] = [];

  if (flags.categoryMatched) {
    reasons.push(`Specializzato in ${consultant.categoryName}`);
  }
  if (flags.modalityMatched) {
    reasons.push(`Disponibile ${modalityLabel[consultant.modality]}`);
  }
  if (flags.languageMatched) {
    reasons.push(`Parla ${answers.language}`);
  }
  reasons.push(`Valutazione ${consultant.rating.toFixed(1)}/5 su ${consultant.reviewCount} recensioni`);
  if (flags.seniorityMatched) {
    reasons.push(`${consultant.yearsExperience} anni di esperienza, in linea con il livello ${experienceLevelLabel[answers.experienceLevel as ExperienceLevel]} richiesto`);
  }
  if (flags.sectorMatched) {
    reasons.push(`Esperienza diretta nel settore ${answers.sector}`);
  }
  if (flags.budgetMatched) {
    reasons.push("Prezzo di partenza in linea con il budget indicato");
  }

  return reasons.slice(0, 3);
}

export function matchConsultants(
  answers: MatchingAnswers,
  pool: Consultant[] = defaultConsultants,
  topN = 3
): MatchResult[] {
  const category = answers.categorySlug ? getCategoryBySlug(answers.categorySlug) : undefined;

  const results: MatchResult[] = pool.map((consultant) => {
    const categoryMatched = Boolean(category && consultant.categoryId === category.id);
    const categoryPoints = categoryMatched ? WEIGHTS.category : 0;

    const modalityResult = scoreModality(consultant.modality, answers.modality);
    const languageResult = scoreLanguage(consultant.languages, answers.language);
    const ratingPoints = scoreRating(consultant.rating);
    const seniorityResult = scoreSeniority(consultant.yearsExperience, answers.experienceLevel);
    const budgetResult = scoreBudget(consultant.startingPrice, answers.budget);
    const sectorResult = scoreSector(consultant.sectors, answers.sector);

    const rawScore =
      categoryPoints +
      modalityResult.points +
      languageResult.points +
      ratingPoints +
      seniorityResult.points +
      budgetResult.points +
      sectorResult.points;

    const score = Math.round((rawScore / MAX_SCORE) * 100);

    const reasons = buildReasons(consultant, answers, {
      categoryMatched,
      modalityMatched: modalityResult.matched,
      languageMatched: languageResult.matched,
      seniorityMatched: seniorityResult.matched,
      budgetMatched: budgetResult.matched,
      sectorMatched: sectorResult.matched,
    });

    return { consultant, score: Math.min(100, Math.max(0, score)), reasons };
  });

  return results.sort((a, b) => b.score - a.score).slice(0, topN);
}

export function availableLanguages(pool: Consultant[] = defaultConsultants): string[] {
  return Array.from(new Set(pool.flatMap((c) => c.languages))).sort((a, b) => a.localeCompare(b, "it"));
}
