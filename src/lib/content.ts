import {
  Building2,
  FileCheck2,
  Landmark,
  ShieldCheck,
  Gauge,
  Zap,
  Hammer,
  ClipboardCheck,
  Gavel,
  LineChart,
  ScrollText,
  SearchCheck,
  ShieldAlert,
  Clock3,
  Users,
  Lock,
  Target,
  BadgeCheck,
  MessageSquareText,
  UploadCloud,
  Microscope,
  FileOutput,
} from "lucide-react";

export const advantages = [
  {
    icon: ShieldCheck,
    title: "Più sicurezza",
    description: "Decisioni consapevoli, rischi ridotti.",
  },
  {
    icon: SearchCheck,
    title: "Tutto chiaro",
    description: "Verifichiamo prima, sorprese mai.",
  },
  {
    icon: Clock3,
    title: "Tempo e denaro",
    description: "Eviti costi imprevisti e pratiche bloccate.",
  },
  {
    icon: Users,
    title: "Professionisti in rete",
    description: "Collaborazioni qualificate al tuo servizio.",
  },
];

export const hiddenProblems = [
  "Titoli edilizi mancanti",
  "Difformità edilizie",
  "Planimetrie catastali non aggiornate",
  "Intestazioni catastali non coerenti",
  "Agibilità assente o incompleta",
  "APE non coerente",
  "Certificazioni impiantistiche mancanti",
  "Pratiche incomplete o costi di regolarizzazione non previsti",
];

export const services = [
  {
    icon: Building2,
    title: "Conformità edilizia",
    description: "Verifica dei titoli edilizi e della corrispondenza tra stato di fatto e stato autorizzato.",
  },
  {
    icon: Landmark,
    title: "Urbanistica",
    description: "Controllo della destinazione d'uso e della conformità agli strumenti urbanistici vigenti.",
  },
  {
    icon: ScrollText,
    title: "Catasto oggettivo",
    description: "Verifica di visure e planimetrie catastali per la conformità oggettiva dell'immobile.",
  },
  {
    icon: FileCheck2,
    title: "Catasto soggettivo",
    description: "Controllo delle intestazioni catastali e della coerenza con la titolarità dell'immobile.",
  },
  {
    icon: ShieldCheck,
    title: "Agibilità",
    description: "Verifica della presenza del certificato di agibilità e delle eventuali criticità.",
  },
  {
    icon: Gauge,
    title: "APE",
    description: "Verifica dell'Attestato di Prestazione Energetica e della sua coerenza documentale.",
  },
  {
    icon: Zap,
    title: "Certificazioni impiantistiche",
    description: "Verifica dei certificati di conformità e rispondenza di tutti gli impianti presenti.",
  },
  {
    icon: Hammer,
    title: "Possibilità di ristrutturazione",
    description: "Valutazione dei vincoli e delle possibilità di intervento in base alla normativa vigente.",
  },
  {
    icon: ClipboardCheck,
    title: "Verifica preliminare",
    description: "Supporto nella redazione e nella verifica del contratto preliminare, in collaborazione con studio legale.",
  },
  {
    icon: Gavel,
    title: "Supporto aste immobiliari",
    description: "Verifiche tecniche e documentali specifiche per partecipare a un'asta giudiziaria con consapevolezza.",
  },
  {
    icon: LineChart,
    title: "Valutazione tecnica dell'immobile",
    description: "Supporto alla valutazione preliminare del valore basata su documentazione e dati oggettivi.",
  },
  {
    icon: Microscope,
    title: "Due diligence immobiliare",
    description: "Analisi tecnica e documentale completa dell'immobile prima dell'acquisto o dell'investimento.",
  },
];

export const steps = [
  {
    icon: MessageSquareText,
    title: "Contattaci",
    description: "Raccontaci l'immobile e l'operazione che stai valutando: acquisto, vendita o asta.",
  },
  {
    icon: UploadCloud,
    title: "Carica i documenti",
    description: "Ci invii la documentazione disponibile in modo semplice e riservato.",
  },
  {
    icon: Microscope,
    title: "Analisi tecnica",
    description: "Verifichiamo edilizia, urbanistica, catasto, impianti e certificazioni.",
  },
  {
    icon: FileOutput,
    title: "Ricevi il report",
    description: "Un report chiaro con esiti, criticità e soluzioni suggerite.",
  },
];

export const reasons = [
  {
    icon: ShieldAlert,
    title: "Tecnici indipendenti",
    description: "Non siamo un'agenzia: nessun interesse nella compravendita.",
  },
  {
    icon: Lock,
    title: "Nessun conflitto d'interesse",
    description: "Lavoriamo solo per la tua tutela, in totale imparzialità.",
  },
  {
    icon: FileCheck2,
    title: "Report chiari",
    description: "Documenti comprensibili, senza tecnicismi inutili.",
  },
  {
    icon: Clock3,
    title: "Tempi rapidi",
    description: "Analisi puntuali per non bloccare la tua trattativa.",
  },
  {
    icon: Target,
    title: "Prezzi trasparenti",
    description: "Preventivo chiaro prima di iniziare, senza sorprese.",
  },
  {
    icon: BadgeCheck,
    title: "Assistenza fino al rogito",
    description: "Ti accompagniamo in ogni fase, dalla proposta al notaio.",
  },
];

export const testimonials = [
  {
    name: "Marco Ferretti",
    role: "Acquirente privato",
    quote:
      "Grazie a Casa in Chiaro ho scoperto una difformità edilizia prima di firmare il preliminare. Mi hanno evitato un problema enorme.",
    rating: 5,
  },
  {
    name: "Giulia Romano",
    role: "Partecipante ad asta giudiziaria",
    quote:
      "Servizio impeccabile: report chiaro e completo prima dell'asta. Ho partecipato con consapevolezza, senza rischi nascosti.",
    rating: 5,
  },
  {
    name: "Studio Legale Bianchi",
    role: "Collaborazione professionale",
    quote:
      "Collaboriamo da tempo con Casa in Chiaro per le verifiche tecniche dei nostri clienti. Precisione e affidabilità costanti.",
    rating: 5,
  },
  {
    name: "Alessandro Conti",
    role: "Venditore",
    quote:
      "Prima di mettere in vendita casa ho voluto una verifica completa. Documentazione a posto e trattativa più veloce del previsto.",
    rating: 5,
  },
];

export const faqs = [
  {
    question: "Quanto costa il servizio?",
    answer:
      "Il costo varia in base alla tipologia di immobile e alle verifiche richieste. Dopo un primo contatto ti inviamo un preventivo chiaro e senza impegno, prima di iniziare qualsiasi attività.",
  },
  {
    question: "Quanto tempo serve per completare la verifica?",
    answer:
      "In media i tempi vanno dai 3 ai 7 giorni lavorativi, in base alla complessità dell'immobile e alla disponibilità della documentazione. Per le aste giudiziarie lavoriamo con tempistiche più rapide.",
  },
  {
    question: "Che documenti devo inviare?",
    answer:
      "Generalmente bastano visura catastale, planimetria, titoli edilizi disponibili e APE. Se non hai tutti i documenti, ti aiutiamo noi a reperirli presso gli uffici competenti.",
  },
  {
    question: "Operate in tutta Italia?",
    answer:
      "Sì, operiamo su tutto il territorio nazionale grazie a una rete di professionisti qualificati (ingegneri, impiantisti e avvocati) presente in tutte le regioni.",
  },
  {
    question: "Posso usare il servizio prima di fare una proposta d'acquisto?",
    answer:
      "Assolutamente sì, anzi è il momento migliore. Verificare prima della proposta ti permette di negoziare consapevolmente o di evitare un acquisto rischioso.",
  },
];
