import type { Conversation } from "@/lib/types";
import { consultants } from "./consultants";

const c = (i: number) => consultants[i];

export const conversations: Conversation[] = [
  {
    id: "conv-01",
    clientName: "Marco Villa",
    clientAvatar: "https://i.pravatar.cc/300?img=60",
    consultantName: c(0).fullName,
    consultantAvatar: c(0).avatarUrl,
    lastMessage: "Perfetto, ci vediamo online venerdì alle 10:30!",
    lastMessageDate: "2026-08-04T17:20:00Z",
    unread: 0,
    bookingRef: "bk-01",
    archived: false,
    messages: [
      { id: "m1", conversationId: "conv-01", sender: "cliente", text: "Buongiorno, avrei bisogno di supporto per un bando industria 4.0.", date: "2026-08-03T09:00:00Z", read: true },
      { id: "m2", conversationId: "conv-01", sender: "consulente", text: "Buongiorno Marco, volentieri. Può indicarmi il tipo di investimento previsto?", date: "2026-08-03T09:40:00Z", read: true },
      { id: "m3", conversationId: "conv-01", sender: "cliente", text: "Acquisto di due macchinari a controllo numerico, circa 120.000€.", date: "2026-08-03T09:55:00Z", read: true, attachment: "preventivo-macchinari.pdf" },
      { id: "m4", conversationId: "conv-01", sender: "consulente", text: "Perfetto, ci vediamo online venerdì alle 10:30!", date: "2026-08-04T17:20:00Z", read: true },
    ],
  },
  {
    id: "conv-02",
    clientName: "Silvia Bruno",
    clientAvatar: "https://i.pravatar.cc/300?img=32",
    consultantName: c(0).fullName,
    consultantAvatar: c(0).avatarUrl,
    lastMessage: "Le invio a breve la documentazione richiesta.",
    lastMessageDate: "2026-08-05T08:10:00Z",
    unread: 2,
    archived: false,
    messages: [
      { id: "m5", conversationId: "conv-02", sender: "cliente", text: "Salve, ho letto la sua analisi preliminare, è molto chiara, grazie.", date: "2026-08-05T07:50:00Z", read: false },
      { id: "m6", conversationId: "conv-02", sender: "cliente", text: "Le invio a breve la documentazione richiesta.", date: "2026-08-05T08:10:00Z", read: false },
    ],
  },
  {
    id: "conv-03",
    clientName: "Rita Fontana",
    clientAvatar: "https://i.pravatar.cc/300?img=44",
    consultantName: c(11).fullName,
    consultantAvatar: c(11).avatarUrl,
    lastMessage: "Grazie mille per il sopralluogo, davvero utile!",
    lastMessageDate: "2026-07-21T12:00:00Z",
    unread: 0,
    archived: true,
    messages: [
      { id: "m7", conversationId: "conv-03", sender: "cliente", text: "Grazie mille per il sopralluogo, davvero utile!", date: "2026-07-21T12:00:00Z", read: true },
    ],
  },
];
