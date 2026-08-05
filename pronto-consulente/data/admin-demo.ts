// Dati demo esclusivi per l'area amministratore (`app/admin/**`).
// Isolati qui per non "sporcare" i dati demo pubblici in /data usati anche
// dal marketplace e dalle dashboard cliente/consulente.

import type { UserRole } from "@/lib/types";

/* ---------------------------------------------------------------------- */
/* Utenti piattaforma                                                      */
/* ---------------------------------------------------------------------- */

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "attivo" | "sospeso";
  joinedDate: string; // ISO
  avatarSeed: number;
}

export const adminUsers: AdminUser[] = [
  { id: "u-01", name: "Alessandro Ferretti", email: "alessandro.ferretti@ferrettifinance.it", role: "consulente", status: "attivo", joinedDate: "2024-03-10", avatarSeed: 12 },
  { id: "u-02", name: "Chiara Bellini", email: "chiara.bellini@bellinisafety.it", role: "consulente", status: "attivo", joinedDate: "2024-05-22", avatarSeed: 45 },
  { id: "u-03", name: "Avv. Marco Rinaldi", email: "marco.rinaldi@studiorinaldi.it", role: "consulente", status: "attivo", joinedDate: "2023-11-02", avatarSeed: 33 },
  { id: "u-04", name: "Giulia Moretti", email: "giulia.moretti@morresulting.it", role: "consulente", status: "sospeso", joinedDate: "2024-02-18", avatarSeed: 47 },
  { id: "u-05", name: "Davide Conti", email: "davide.conti@contidigital.it", role: "consulente", status: "attivo", joinedDate: "2024-07-01", avatarSeed: 52 },
  { id: "u-06", name: "Marco Villa", email: "marco.villa@villameccanica.it", role: "cliente", status: "attivo", joinedDate: "2026-01-14", avatarSeed: 3 },
  { id: "u-07", name: "Silvia Bruno", email: "silvia.bruno@brunoagro.it", role: "cliente", status: "attivo", joinedDate: "2026-02-03", avatarSeed: 21 },
  { id: "u-08", name: "Giovanni Esposito", email: "g.esposito@espositocostruzioni.it", role: "cliente", status: "attivo", joinedDate: "2025-12-20", avatarSeed: 56 },
  { id: "u-09", name: "Anna Ferri", email: "anna.ferri@ferrilogistica.it", role: "cliente", status: "sospeso", joinedDate: "2025-09-11", avatarSeed: 61 },
  { id: "u-10", name: "Paolo Greco", email: "paolo.greco@grecotech.it", role: "cliente", status: "attivo", joinedDate: "2026-03-05", avatarSeed: 27 },
  { id: "u-11", name: "Elisa Marino", email: "elisa.marino@marinodesign.it", role: "cliente", status: "attivo", joinedDate: "2026-04-19", avatarSeed: 9 },
  { id: "u-12", name: "Federico Longo", email: "federico.longo@longohome.it", role: "cliente", status: "attivo", joinedDate: "2026-05-02", avatarSeed: 65 },
  { id: "u-13", name: "Cristina Palumbo", email: "cristina.palumbo@prontoconsulente.it", role: "admin", status: "attivo", joinedDate: "2023-01-05", avatarSeed: 5 },
  { id: "u-14", name: "Matteo Sartori", email: "matteo.sartori@prontoconsulente.it", role: "admin", status: "attivo", joinedDate: "2023-06-15", avatarSeed: 14 },
  { id: "u-15", name: "Laura Bianchi", email: "laura.bianchi@prontoconsulente.it", role: "moderatore", status: "attivo", joinedDate: "2024-09-30", avatarSeed: 25 },
  { id: "u-16", name: "Nicola De Rosa", email: "nicola.derosa@prontoconsulente.it", role: "moderatore", status: "sospeso", joinedDate: "2025-05-14", avatarSeed: 40 },
];

/* ---------------------------------------------------------------------- */
/* Verifica consulenti                                                     */
/* ---------------------------------------------------------------------- */

export interface VerificationDocument {
  name: string;
  type: "Identità" | "Curriculum" | "Certificazione" | "Partita IVA";
}

export interface VerificationRequest {
  id: string;
  consultantName: string;
  title: string;
  location: string;
  avatarSeed: number;
  categoryName: string;
  submittedDate: string;
  documents: VerificationDocument[];
  status: "in_attesa" | "approvato" | "rifiutato";
}

export const verificationQueue: VerificationRequest[] = [
  {
    id: "vq-01",
    consultantName: "Giorgio Valli",
    title: "Dottore Commercialista — Consulenza Fiscale e Tributaria",
    location: "Milano, Lombardia",
    avatarSeed: 71,
    categoryName: "Fiscale e tributaria",
    submittedDate: "2026-07-28",
    documents: [
      { name: "Carta d'identità.pdf", type: "Identità" },
      { name: "Curriculum vitae.pdf", type: "Curriculum" },
      { name: "Iscrizione Albo Dottori Commercialisti.pdf", type: "Certificazione" },
      { name: "Visura P.IVA.pdf", type: "Partita IVA" },
    ],
    status: "in_attesa",
  },
  {
    id: "vq-02",
    consultantName: "Sara Moretti",
    title: "Consulente Marketing Digitale e Growth",
    location: "Torino, Piemonte",
    avatarSeed: 63,
    categoryName: "Marketing e comunicazione",
    submittedDate: "2026-07-30",
    documents: [
      { name: "Carta d'identità.pdf", type: "Identità" },
      { name: "Curriculum vitae.pdf", type: "Curriculum" },
      { name: "Certificazione Google Ads.pdf", type: "Certificazione" },
    ],
    status: "in_attesa",
  },
  {
    id: "vq-03",
    consultantName: "Francesco Longo",
    title: "Ingegnere Energetico — Efficientamento e Rinnovabili",
    location: "Bari, Puglia",
    avatarSeed: 18,
    categoryName: "Energia",
    submittedDate: "2026-08-01",
    documents: [
      { name: "Carta d'identità.pdf", type: "Identità" },
      { name: "Curriculum vitae.pdf", type: "Curriculum" },
      { name: "Iscrizione Ordine Ingegneri.pdf", type: "Certificazione" },
      { name: "Visura P.IVA.pdf", type: "Partita IVA" },
    ],
    status: "in_attesa",
  },
  {
    id: "vq-04",
    consultantName: "Elena Fabbri",
    title: "HR Consultant — Employer Branding",
    location: "Bologna, Emilia-Romagna",
    avatarSeed: 36,
    categoryName: "Risorse umane",
    submittedDate: "2026-08-03",
    documents: [
      { name: "Carta d'identità.pdf", type: "Identità" },
      { name: "Curriculum vitae.pdf", type: "Curriculum" },
    ],
    status: "in_attesa",
  },
];

/* ---------------------------------------------------------------------- */
/* Segnalazioni                                                            */
/* ---------------------------------------------------------------------- */

export interface Report {
  id: string;
  reason: string;
  reporterName: string;
  reportedName: string;
  reportedType: "consulente" | "cliente" | "recensione" | "servizio";
  status: "aperta" | "chiusa";
  date: string;
  details: string;
}

export const reports: Report[] = [
  {
    id: "seg-01",
    reason: "Informazioni profilo non veritiere",
    reporterName: "Anna Ferri",
    reportedName: "Profilo consulente #c-05",
    reportedType: "consulente",
    status: "aperta",
    date: "2026-08-01",
    details: "Il cliente segnala che le certificazioni indicate nel profilo non risultano verificabili sui portali ufficiali degli enti citati.",
  },
  {
    id: "seg-02",
    reason: "Recensione potenzialmente falsa",
    reporterName: "Elena Russo",
    reportedName: "Recensione r-08",
    reportedType: "recensione",
    status: "chiusa",
    date: "2026-07-20",
    details: "Un consulente terzo segnala una recensione a suo dire scritta da un account mai stato cliente. Verificato: recensione collegata a una prenotazione reale, segnalazione archiviata.",
  },
  {
    id: "seg-03",
    reason: "Mancata presentazione all'appuntamento",
    reporterName: "Paolo Greco",
    reportedName: "Consulente non specificato",
    reportedType: "consulente",
    status: "aperta",
    date: "2026-07-30",
    details: "Il cliente riferisce di non aver ricevuto il link per la call online nonostante il pagamento confermato. In attesa di riscontro dal consulente.",
  },
  {
    id: "seg-04",
    reason: "Contenuto del servizio fuorviante",
    reporterName: "Silvia Bruno",
    reportedName: "Servizio 'Pratica completa per bando regionale'",
    reportedType: "servizio",
    status: "chiusa",
    date: "2026-07-05",
    details: "Il cliente lamentava tempi di consegna diversi da quanto descritto. Il consulente ha aggiornato la scheda servizio con tempistiche più realistiche.",
  },
  {
    id: "seg-05",
    reason: "Comportamento scorretto in chat",
    reporterName: "Federico Longo",
    reportedName: "Cliente non specificato",
    reportedType: "cliente",
    status: "aperta",
    date: "2026-08-04",
    details: "Un consulente segnala toni inappropriati ricevuti in chat da parte di un potenziale cliente durante la fase di richiesta preventivo.",
  },
  {
    id: "seg-06",
    reason: "Sospetto tentativo di pagamento fuori piattaforma",
    reporterName: "Moderazione automatica",
    reportedName: "Conversazione #conv-114",
    reportedType: "consulente",
    status: "chiusa",
    date: "2026-06-27",
    details: "Il sistema di rilevamento ha segnalato un possibile riferimento a pagamento diretto. Verifica manuale: falso positivo, nessuna violazione riscontrata.",
  },
];

/* ---------------------------------------------------------------------- */
/* Ticket assistenza                                                       */
/* ---------------------------------------------------------------------- */

export interface TicketMessage {
  sender: "cliente" | "assistenza";
  text: string;
  date: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  clientName: string;
  priority: "bassa" | "media" | "alta";
  status: "aperto" | "in_lavorazione" | "chiuso";
  date: string;
  messages: TicketMessage[];
}

export const supportTickets: SupportTicket[] = [
  {
    id: "tk-01",
    subject: "Pagamento addebitato due volte",
    clientName: "Marco Villa",
    priority: "alta",
    status: "in_lavorazione",
    date: "2026-08-04",
    messages: [
      { sender: "cliente", text: "Ho prenotato una consulenza e vedo due addebiti identici sulla carta.", date: "2026-08-04" },
      { sender: "assistenza", text: "Grazie della segnalazione, stiamo verificando con il gestore dei pagamenti. Le confermiamo entro 24 ore.", date: "2026-08-04" },
    ],
  },
  {
    id: "tk-02",
    subject: "Impossibile caricare il curriculum",
    clientName: "Sara Moretti",
    priority: "media",
    status: "aperto",
    date: "2026-08-03",
    messages: [
      { sender: "cliente", text: "Il file PDF del CV non viene caricato durante la registrazione come consulente.", date: "2026-08-03" },
    ],
  },
  {
    id: "tk-03",
    subject: "Richiesta fattura mancante",
    clientName: "Giovanni Esposito",
    priority: "media",
    status: "chiuso",
    date: "2026-07-22",
    messages: [
      { sender: "cliente", text: "Non ho ricevuto la fattura per la consulenza HSE del 2 luglio.", date: "2026-07-22" },
      { sender: "assistenza", text: "Le abbiamo reinviato la fattura via email, ci confermi la ricezione.", date: "2026-07-23" },
      { sender: "cliente", text: "Ricevuta, grazie mille.", date: "2026-07-23" },
    ],
  },
  {
    id: "tk-04",
    subject: "Come modificare l'orario di una prenotazione",
    clientName: "Elisa Marino",
    priority: "bassa",
    status: "chiuso",
    date: "2026-07-15",
    messages: [
      { sender: "cliente", text: "Vorrei spostare l'appuntamento di due giorni, come faccio?", date: "2026-07-15" },
      { sender: "assistenza", text: "Può farlo direttamente dalla sezione Prenotazioni della sua area cliente, tasto 'Riprogramma'.", date: "2026-07-15" },
    ],
  },
  {
    id: "tk-05",
    subject: "Profilo consulente non visibile in ricerca",
    clientName: "Davide Conti",
    priority: "alta",
    status: "aperto",
    date: "2026-08-05",
    messages: [
      { sender: "cliente", text: "Da ieri il mio profilo non compare più nei risultati di ricerca della categoria Marketing.", date: "2026-08-05" },
    ],
  },
  {
    id: "tk-06",
    subject: "Dubbio su commissioni piano Professional",
    clientName: "Federica Galli",
    priority: "bassa",
    status: "in_lavorazione",
    date: "2026-08-02",
    messages: [
      { sender: "cliente", text: "Potete indicarmi con esattezza la commissione trattenuta sul piano Professional?", date: "2026-08-02" },
      { sender: "assistenza", text: "La percentuale è ancora in fase di definizione: le confermiamo appena disponibile un valore ufficiale.", date: "2026-08-02" },
    ],
  },
];

/* ---------------------------------------------------------------------- */
/* Coupon                                                                   */
/* ---------------------------------------------------------------------- */

export interface Coupon {
  id: string;
  code: string;
  discountType: "percentuale" | "importo";
  value: number;
  status: "attivo" | "scaduto";
  usageCount: number;
  usageLimit: number;
  expiryDate: string;
}

export const coupons: Coupon[] = [
  { id: "cp-01", code: "BENVENUTO10", discountType: "percentuale", value: 10, status: "attivo", usageCount: 342, usageLimit: 1000, expiryDate: "2026-12-31" },
  { id: "cp-02", code: "PRIMA5", discountType: "importo", value: 5, status: "attivo", usageCount: 891, usageLimit: 2000, expiryDate: "2026-10-31" },
  { id: "cp-03", code: "ESTATE2026", discountType: "percentuale", value: 15, status: "attivo", usageCount: 156, usageLimit: 500, expiryDate: "2026-09-15" },
  { id: "cp-04", code: "FIDELITY20", discountType: "percentuale", value: 20, status: "scaduto", usageCount: 204, usageLimit: 200, expiryDate: "2026-05-31" },
  { id: "cp-05", code: "LANCIO50", discountType: "importo", value: 50, status: "scaduto", usageCount: 78, usageLimit: 80, expiryDate: "2026-02-28" },
];

/* ---------------------------------------------------------------------- */
/* Newsletter                                                              */
/* ---------------------------------------------------------------------- */

export interface NewsletterSubscriber {
  id: string;
  name: string;
  email: string;
  subscribedDate: string;
  status: "attivo" | "disiscritto";
}

export const newsletterSubscribers: NewsletterSubscriber[] = [
  { id: "ns-01", name: "Marco Villa", email: "marco.villa@villameccanica.it", subscribedDate: "2026-01-15", status: "attivo" },
  { id: "ns-02", name: "Silvia Bruno", email: "silvia.bruno@brunoagro.it", subscribedDate: "2026-02-04", status: "attivo" },
  { id: "ns-03", name: "Giovanni Esposito", email: "g.esposito@espositocostruzioni.it", subscribedDate: "2025-12-21", status: "attivo" },
  { id: "ns-04", name: "Anna Ferri", email: "anna.ferri@ferrilogistica.it", subscribedDate: "2025-09-12", status: "disiscritto" },
  { id: "ns-05", name: "Paolo Greco", email: "paolo.greco@grecotech.it", subscribedDate: "2026-03-06", status: "attivo" },
  { id: "ns-06", name: "Elisa Marino", email: "elisa.marino@marinodesign.it", subscribedDate: "2026-04-20", status: "attivo" },
  { id: "ns-07", name: "Federico Longo", email: "federico.longo@longohome.it", subscribedDate: "2026-05-03", status: "attivo" },
  { id: "ns-08", name: "Tommaso Ricci", email: "t.ricci@novatechsolutions.it", subscribedDate: "2026-05-31", status: "attivo" },
  { id: "ns-09", name: "Chiara Testa", email: "chiara.testa@testawellness.it", subscribedDate: "2026-06-10", status: "disiscritto" },
  { id: "ns-10", name: "Enrico Bassi", email: "enrico.bassi@bassiindustrie.it", subscribedDate: "2026-06-22", status: "attivo" },
  { id: "ns-11", name: "Rita Fontana", email: "rita.fontana@privato.it", subscribedDate: "2026-07-01", status: "attivo" },
  { id: "ns-12", name: "Luca Fabbri", email: "luca.fabbri@fabbrifintech.it", subscribedDate: "2026-07-18", status: "attivo" },
];

export const newsletterStats = {
  totalSubscribers: newsletterSubscribers.length,
  activeSubscribers: newsletterSubscribers.filter((s) => s.status === "attivo").length,
  lastCampaignOpenRate: 41.8,
  lastCampaignClickRate: 11.4,
  averageOpenRate: 38.2,
  averageClickRate: 9.6,
};

/* ---------------------------------------------------------------------- */
/* Log attività amministrative                                             */
/* ---------------------------------------------------------------------- */

export type ActivityLogType =
  | "utente"
  | "consulente"
  | "contenuto"
  | "coupon"
  | "recensione"
  | "pagamento"
  | "categoria"
  | "servizio";

export interface ActivityLogEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  date: string;
  type: ActivityLogType;
}

export const activityLog: ActivityLogEntry[] = [
  { id: "log-01", actor: "Cristina Palumbo", action: "Ha sospeso l'utente", target: "Anna Ferri", date: "2026-08-05 09:12", type: "utente" },
  { id: "log-02", actor: "Matteo Sartori", action: "Ha approvato la verifica consulente", target: "Elena Russo", date: "2026-08-04 17:40", type: "consulente" },
  { id: "log-03", actor: "Laura Bianchi", action: "Ha nascosto la recensione", target: "r-11", date: "2026-08-04 11:05", type: "recensione" },
  { id: "log-04", actor: "Cristina Palumbo", action: "Ha creato il coupon", target: "ESTATE2026", date: "2026-08-03 15:22", type: "coupon" },
  { id: "log-05", actor: "Matteo Sartori", action: "Ha pubblicato l'articolo blog", target: "Business plan investor-ready", date: "2026-08-02 10:00", type: "contenuto" },
  { id: "log-06", actor: "Laura Bianchi", action: "Ha chiuso la segnalazione", target: "seg-04", date: "2026-08-01 14:37", type: "utente" },
  { id: "log-07", actor: "Cristina Palumbo", action: "Ha aggiornato la categoria", target: "Digitalizzazione", date: "2026-07-30 09:50", type: "categoria" },
  { id: "log-08", actor: "Matteo Sartori", action: "Ha rimosso dal marketplace il servizio", target: "Consulenza affrettata (test)", date: "2026-07-29 16:15", type: "servizio" },
  { id: "log-09", actor: "Sistema", action: "Ha elaborato il pagamento mensile commissioni", target: "Luglio 2026", date: "2026-07-31 23:59", type: "pagamento" },
  { id: "log-10", actor: "Cristina Palumbo", action: "Ha riattivato l'utente", target: "Nicola De Rosa", date: "2026-07-28 08:44", type: "utente" },
  { id: "log-11", actor: "Laura Bianchi", action: "Ha rifiutato la verifica consulente", target: "Candidatura #vq-old-12", date: "2026-07-25 13:10", type: "consulente" },
  { id: "log-12", actor: "Matteo Sartori", action: "Ha inviato la newsletter", target: "Aggiornamenti di luglio", date: "2026-07-20 08:00", type: "contenuto" },
];

/* ---------------------------------------------------------------------- */
/* Pagamenti e transazioni                                                 */
/* ---------------------------------------------------------------------- */

export interface Transaction {
  id: string;
  date: string;
  consultantName: string;
  clientName: string;
  serviceTitle: string;
  amount: number;
  commissionRate: number; // %
  status: "completato" | "in_attesa" | "rimborsato";
}

export const transactions: Transaction[] = [
  { id: "tx-01", date: "2026-08-04", consultantName: "Alessandro Ferretti", clientName: "Marco Villa", serviceTitle: "Pratica completa per bando regionale", amount: 1200, commissionRate: 12, status: "completato" },
  { id: "tx-02", date: "2026-08-03", consultantName: "Davide Conti", clientName: "Chiara Testa", serviceTitle: "Audit profilo LinkedIn", amount: 75, commissionRate: 15, status: "completato" },
  { id: "tx-03", date: "2026-08-02", consultantName: "Avv. Marco Rinaldi", clientName: "Paolo Greco", serviceTitle: "Costituzione società", amount: 890, commissionRate: 12, status: "in_attesa" },
  { id: "tx-04", date: "2026-08-01", consultantName: "Elena Russo", clientName: "Studio Legale Bianchi", serviceTitle: "Penetration test infrastruttura", amount: 1500, commissionRate: 10, status: "completato" },
  { id: "tx-05", date: "2026-07-30", consultantName: "Chiara Bellini", clientName: "Giovanni Esposito", serviceTitle: "Redazione DVR completo", amount: 650, commissionRate: 15, status: "completato" },
  { id: "tx-06", date: "2026-07-28", consultantName: "Martina Colombo", clientName: "Luca Fabbri", serviceTitle: "Revisione business plan", amount: 250, commissionRate: 15, status: "rimborsato" },
  { id: "tx-07", date: "2026-07-25", consultantName: "Simone Ferraro", clientName: "Poliambulatorio San Rocco", serviceTitle: "Valutazione GDPR iniziale", amount: 180, commissionRate: 15, status: "completato" },
  { id: "tx-08", date: "2026-07-22", consultantName: "Giulia Moretti", clientName: "Tommaso Ricci", serviceTitle: "Setup PMO", amount: 2200, commissionRate: 10, status: "completato" },
  { id: "tx-09", date: "2026-07-20", consultantName: "Roberto Santini", clientName: "Enrico Bassi", serviceTitle: "Piano di riorganizzazione", amount: 1800, commissionRate: 10, status: "completato" },
  { id: "tx-10", date: "2026-07-18", consultantName: "Valentina De Luca", clientName: "Rita Fontana", serviceTitle: "Sopralluogo tecnico pre-acquisto", amount: 180, commissionRate: 15, status: "completato" },
];

export const monthlyRevenue = [
  { label: "Mar", value: 38400 },
  { label: "Apr", value: 41200 },
  { label: "Mag", value: 45600 },
  { label: "Giu", value: 52300 },
  { label: "Lug", value: 58900 },
  { label: "Ago", value: 21100 },
];

export const monthlyNewUsers = [
  { label: "Mar", value: 128 },
  { label: "Apr", value: 145 },
  { label: "Mag", value: 162 },
  { label: "Giu", value: 189 },
  { label: "Lug", value: 210 },
  { label: "Ago", value: 74 },
];

/* ---------------------------------------------------------------------- */
/* Abbonamenti consulenti (distribuzione demo per piano)                   */
/* ---------------------------------------------------------------------- */

export const planDistribution: Record<string, number> = {
  "plan-base": 7,
  "plan-professional": 4,
  "plan-premium": 1,
};

/* ---------------------------------------------------------------------- */
/* KPI di sintesi per la Panoramica                                        */
/* ---------------------------------------------------------------------- */

export const platformKpis = {
  totalUsers: 4218,
  activeConsultants: 612,
  bookingsThisMonth: 347,
  gmvThisMonth: 58900,
  growthRatePct: 12.4,
};

export const categoryDemandDonut = [
  { label: "Finanza agevolata", value: 168, color: "#124A8A" },
  { label: "Legale", value: 189, color: "#C89B4A" },
  { label: "Marketing", value: 243, color: "#2E9D67" },
  { label: "HSE", value: 156, color: "#7F9BC8" },
  { label: "Altre categorie", value: 3462, color: "#D6DFEE" },
];
