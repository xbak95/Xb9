// Tipi e stato condiviso dal wizard di registrazione consulente.
// Nota: nessuna persistenza reale — tutto vive in useState nella pagina wizard.

export interface OnboardingPersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
}

export interface OnboardingExperience {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface OnboardingCertification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface OnboardingService {
  id: string;
  title: string;
  price: string;
  duration: string;
  description: string;
}

export interface OnboardingAvailabilityDay {
  morning: boolean;
  afternoon: boolean;
}

export interface OnboardingFiscalInfo {
  businessName: string;
  vatNumber: string;
  iban: string;
}

export const WEEK_DAYS = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"] as const;

export interface OnboardingData {
  personal: OnboardingPersonalInfo;
  professionalTitle: string;
  categorySlug: string;
  subcategories: string[];
  experiences: OnboardingExperience[];
  cvFileName: string;
  certifications: OnboardingCertification[];
  bio: string;
  services: OnboardingService[];
  availability: Record<(typeof WEEK_DAYS)[number], OnboardingAvailabilityDay>;
  fiscal: OnboardingFiscalInfo;
  identityFileName: string;
}

export function createEmptyOnboardingData(): OnboardingData {
  return {
    personal: { firstName: "", lastName: "", email: "", phone: "", city: "" },
    professionalTitle: "",
    categorySlug: "",
    subcategories: [],
    experiences: [],
    cvFileName: "",
    certifications: [],
    bio: "",
    services: [],
    availability: WEEK_DAYS.reduce((acc, day) => {
      acc[day] = { morning: false, afternoon: false };
      return acc;
    }, {} as OnboardingData["availability"]),
    fiscal: { businessName: "", vatNumber: "", iban: "" },
    identityFileName: "",
  };
}

export function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export interface StepProps {
  data: OnboardingData;
  update: (patch: Partial<OnboardingData>) => void;
}

export interface StepMeta {
  id: string;
  title: string;
  description: string;
}

export const STEP_META: StepMeta[] = [
  { id: "personal", title: "Dati personali", description: "Chi sei e come i clienti possono contattarti." },
  { id: "title", title: "Titolo professionale", description: "Il titolo che comparirà nel tuo profilo pubblico." },
  { id: "category", title: "Categoria e specializzazioni", description: "Scegli l'area in cui operi principalmente." },
  { id: "experience", title: "Esperienze professionali", description: "Il tuo percorso lavorativo più rilevante." },
  { id: "resume", title: "Curriculum", description: "Carica il tuo CV in formato PDF." },
  { id: "certifications", title: "Certificazioni", description: "Titoli e certificazioni che possiedi." },
  { id: "bio", title: "Descrizione personale", description: "Racconta ai clienti come puoi aiutarli." },
  { id: "services", title: "Servizi e prezzi", description: "I servizi che offrirai sul marketplace." },
  { id: "availability", title: "Disponibilità", description: "Giorni e fasce orarie in cui sei disponibile." },
  { id: "fiscal", title: "Dati fiscali e pagamento", description: "Le informazioni per la fatturazione." },
  { id: "identity", title: "Verifica identità", description: "Conferma la tua identità per ottenere il badge verificato." },
  { id: "preview", title: "Anteprima e pubblicazione", description: "Rivedi il tuo profilo prima di pubblicarlo." },
];
