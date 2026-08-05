import type { Booking, QuoteRequest } from "@/lib/types";
import { consultants } from "./consultants";

const c = (i: number) => consultants[i];

export const clientBookings: Booking[] = [
  { id: "bk-01", consultantId: c(0).id, consultantName: c(0).fullName, consultantAvatar: c(0).avatarUrl, clientName: "Tu", serviceTitle: "Analisi preliminare bando", price: 150, date: "2026-08-09", time: "10:30", modality: "online", status: "confermata" },
  { id: "bk-02", consultantId: c(4).id, consultantName: c(4).fullName, consultantAvatar: c(4).avatarUrl, clientName: "Tu", serviceTitle: "Audit profilo LinkedIn", price: 75, date: "2026-08-06", time: "16:30", modality: "online", status: "in_attesa" },
  { id: "bk-03", consultantId: c(2).id, consultantName: c(2).fullName, consultantAvatar: c(2).avatarUrl, clientName: "Tu", serviceTitle: "Revisione contratto", price: 120, date: "2026-07-14", time: "09:00", modality: "online", status: "completata" },
  { id: "bk-04", consultantId: c(1).id, consultantName: c(1).fullName, consultantAvatar: c(1).avatarUrl, clientName: "Tu", serviceTitle: "Consulenza HSE di 60 minuti", price: 90, date: "2026-06-30", time: "14:00", modality: "online", status: "completata" },
  { id: "bk-05", consultantId: c(9).id, consultantName: c(9).fullName, consultantAvatar: c(9).avatarUrl, clientName: "Tu", serviceTitle: "Revisione business plan", price: 250, date: "2026-06-18", time: "11:00", modality: "online", status: "annullata" },
];

export const consultantBookings: Booking[] = [
  { id: "cb-01", consultantId: c(0).id, consultantName: c(0).fullName, consultantAvatar: c(0).avatarUrl, clientName: "Marco Villa", serviceTitle: "Analisi preliminare bando", price: 150, date: "2026-08-09", time: "10:30", modality: "online", status: "confermata" },
  { id: "cb-02", consultantId: c(0).id, consultantName: c(0).fullName, consultantAvatar: c(0).avatarUrl, clientName: "Silvia Bruno", serviceTitle: "Call conoscitiva di 30 minuti", price: 0, date: "2026-08-07", time: "09:00", modality: "online", status: "confermata" },
  { id: "cb-03", consultantId: c(0).id, consultantName: c(0).fullName, consultantAvatar: c(0).avatarUrl, clientName: "Enrico Bassi", serviceTitle: "Pratica completa per bando regionale", price: 1200, date: "2026-08-14", time: "14:00", modality: "ibrida", status: "in_attesa" },
  { id: "cb-04", consultantId: c(0).id, consultantName: c(0).fullName, consultantAvatar: c(0).avatarUrl, clientName: "Rita Fontana", serviceTitle: "Analisi preliminare bando", price: 150, date: "2026-07-20", time: "10:00", modality: "online", status: "completata" },
  { id: "cb-05", consultantId: c(0).id, consultantName: c(0).fullName, consultantAvatar: c(0).avatarUrl, clientName: "Tommaso Ricci", serviceTitle: "Pratica completa per bando regionale", price: 1200, date: "2026-07-02", time: "15:30", modality: "ibrida", status: "completata" },
  { id: "cb-06", consultantId: c(0).id, consultantName: c(0).fullName, consultantAvatar: c(0).avatarUrl, clientName: "Chiara Testa", serviceTitle: "Analisi preliminare bando", price: 150, date: "2026-06-25", time: "09:30", modality: "online", status: "annullata" },
];

export const quoteRequests: QuoteRequest[] = [
  { id: "q-01", clientName: "Tu", consultantName: "Roberto Santini", categoryName: "Consulenza aziendale", description: "Vorrei una consulenza per riorganizzare l'area commerciale della mia azienda (12 dipendenti).", budget: "1.500€ - 3.000€", status: "in_attesa", date: "2026-08-02" },
  { id: "q-02", clientName: "Tu", consultantName: "Luca Pellegrini", categoryName: "Sostenibilità ed ESG", description: "Necessitiamo di una prima valutazione ESG per rispondere a una richiesta di un cliente estero.", budget: "500€ - 1.000€", status: "inviato", date: "2026-07-28", amount: 750 },
  { id: "q-03", clientName: "Tu", consultantName: "Valentina De Luca", categoryName: "Immobiliare", description: "Due diligence tecnica su un immobile commerciale a Napoli prima dell'acquisto.", budget: "200€ - 400€", status: "accettato", date: "2026-07-10", amount: 280 },
];
