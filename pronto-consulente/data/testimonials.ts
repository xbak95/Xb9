import type { Testimonial } from "@/lib/types";

export const testimonials: Testimonial[] = [
  { id: "t-01", name: "Marco Villa", company: "Villa Meccanica Srl", consultantName: "Alessandro Ferretti", rating: 5, comment: "Contributo ottenuto: 45.000€. Professionalità e chiarezza totali dal primo contatto alla rendicontazione.", service: "Pratica completa per bando regionale" },
  { id: "t-02", name: "Paolo Greco", company: "Greco Tech Srl", consultantName: "Avv. Marco Rinaldi", rating: 5, comment: "Ci ha seguiti nella costituzione della startup con soci esteri: professionale e sempre disponibile.", service: "Costituzione società" },
  { id: "t-03", name: "Luca Fabbri", company: "Fabbri Fintech", consultantName: "Martina Colombo", rating: 5, comment: "Due settimane dopo la revisione del business plan abbiamo chiuso il round seed da 800.000€.", service: "Revisione business plan" },
  { id: "t-04", name: "Giovanni Esposito", company: "Esposito Costruzioni", consultantName: "Chiara Bellini", rating: 5, comment: "Documento completo e conforme, ci ha aiutato a superare un'ispezione senza rilievi.", service: "Redazione DVR completo" },
  { id: "t-05", name: "Federico Longo", company: "Longo Home & Living", consultantName: "Davide Conti", rating: 4.5, comment: "In 3 mesi abbiamo triplicato il traffico organico verso l'e-commerce. Piano concreto e misurabile.", service: "Strategia marketing 90 giorni" },
  { id: "t-06", name: "Studio Legale Bianchi", company: "Bianchi & Partners", consultantName: "Elena Russo", rating: 5, comment: "Report tecnico chiaro anche per chi non è del settore. Abbiamo chiuso 3 vulnerabilità critiche.", service: "Penetration test infrastruttura" },
];
