// Modello dati condiviso da tutta l'app. Rispecchia le tabelle Supabase
// definite in /supabase/migrations — quando il progetto è collegato a un
// database reale, questi tipi restano validi per le query.

export type UserRole = "cliente" | "consulente" | "admin" | "moderatore";
export type Modality = "online" | "presenza" | "ibrida";
export type AccountType = "privato" | "aziendale";

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string; // nome icona lucide-react
  consultantCount: number;
  subcategories?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: number;
  verified: boolean;
}

export interface WorkExperience {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  summary: string;
  result: string;
  tags: string[];
}

export interface ServiceOffering {
  id: string;
  consultantId: string;
  title: string;
  price: number;
  priceType: "fisso" | "da";
  durationMinutes: number;
  deliveryTime: string;
  modality: Modality;
  description: string;
  includes: string[];
  category: string;
  rating: number;
  reviewCount: number;
}

export interface ReviewRatingBreakdown {
  overall: number;
  competence: number;
  clarity: number;
  punctuality: number;
  valueForMoney: number;
}

export interface Review {
  id: string;
  consultantId: string;
  clientName: string;
  clientCompany?: string;
  serviceTitle: string;
  ratings: ReviewRatingBreakdown;
  comment: string;
  date: string;
  verified: boolean;
  wouldRecommend: boolean;
  consultantReply?: {
    text: string;
    date: string;
  };
}

export interface AvailabilitySlot {
  date: string; // ISO yyyy-mm-dd
  times: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type VerificationBadge =
  | "identita_verificata"
  | "curriculum_verificato"
  | "certificazioni_verificate"
  | "partita_iva_verificata"
  | "top_consultant"
  | "risposta_rapida"
  | "consulente_premium";

export interface Consultant {
  id: string;
  slug: string;
  fullName: string;
  title: string;
  avatarUrl: string;
  coverUrl: string;
  categoryId: string;
  categoryName: string;
  subcategories: string[];
  skills: { name: string; level: "Base" | "Intermedio" | "Avanzato" | "Esperto"; years: number }[];
  sectors: string[];
  bio: string;
  yearsExperience: number;
  location: string;
  languages: string[];
  modality: Modality;
  rating: number;
  reviewCount: number;
  completedConsultations: number;
  avgResponseTimeHours: number;
  startingPrice: number;
  nextAvailability: string;
  badges: VerificationBadge[];
  certifications: Certification[];
  experiences: WorkExperience[];
  portfolio: PortfolioItem[];
  services: ServiceOffering[];
  availability: AvailabilitySlot[];
  faqs: FAQItem[];
  policies: {
    cancellation: string;
    reschedule: string;
    refund: string;
  };
  cvUrl: string;
  profileViews: number;
  conversionRate: number;
}

export interface CaseStudy {
  id: string;
  consultantId: string;
  consultantName: string;
  title: string;
  client: string;
  sector: string;
  summary: string;
  results: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTimeMinutes: number;
  coverUrl: string;
  author: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  commission: string;
  featured: boolean;
  features: string[];
}

export type BookingStatus =
  | "in_attesa"
  | "confermata"
  | "completata"
  | "annullata"
  | "riprogrammata";

export interface Booking {
  id: string;
  consultantId: string;
  consultantName: string;
  consultantAvatar: string;
  clientName: string;
  serviceTitle: string;
  price: number;
  date: string;
  time: string;
  modality: Modality;
  status: BookingStatus;
  notes?: string;
}

export interface QuoteRequest {
  id: string;
  clientName: string;
  consultantName: string;
  categoryName: string;
  description: string;
  budget: string;
  status: "in_attesa" | "inviato" | "accettato" | "rifiutato";
  date: string;
  amount?: number;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: "cliente" | "consulente";
  text: string;
  date: string;
  read: boolean;
  attachment?: string;
}

export interface Conversation {
  id: string;
  clientName: string;
  clientAvatar: string;
  consultantName: string;
  consultantAvatar: string;
  lastMessage: string;
  lastMessageDate: string;
  unread: number;
  bookingRef?: string;
  archived: boolean;
  messages: Message[];
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  consultantName: string;
  rating: number;
  comment: string;
  service: string;
}
