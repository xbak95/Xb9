"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Archive,
  ArchiveRestore,
  Check,
  CheckCheck,
  ExternalLink,
  Flag,
  MessageSquare,
  Paperclip,
  Send,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import type { Conversation, Message } from "@/lib/types";
import { conversations as demoConversations } from "@/data/conversations";

type ViewerRole = "cliente" | "consulente";
type ListTab = "attive" | "archiviate";

function otherPartyName(conv: Conversation, viewerRole: ViewerRole) {
  return viewerRole === "cliente" ? conv.consultantName : conv.clientName;
}

function otherPartyAvatar(conv: Conversation, viewerRole: ViewerRole) {
  return viewerRole === "cliente" ? conv.consultantAvatar : conv.clientAvatar;
}

function mySender(viewerRole: ViewerRole): Message["sender"] {
  return viewerRole === "cliente" ? "cliente" : "consulente";
}

function formatMessageTime(date: string) {
  return new Intl.DateTimeFormat("it-IT", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(
    new Date(date)
  );
}

export function ConversationView({
  viewerRole,
  conversations: initialConversations = demoConversations,
}: {
  viewerRole: ViewerRole;
  conversations?: Conversation[];
}) {
  const { push } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [tab, setTab] = useState<ListTab>("attive");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [reportOpen, setReportOpen] = useState(false);

  const mine = mySender(viewerRole);

  const visibleList = conversations
    .filter((c) => (tab === "archiviate" ? c.archived : !c.archived))
    .sort((a, b) => new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime());

  const selected = visibleList.find((c) => c.id === selectedId) ?? visibleList[0] ?? null;

  function selectConversation(id: string) {
    setSelectedId(id);
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, unread: 0, messages: c.messages.map((m) => (m.sender !== mine ? { ...m, read: true } : m)) }
          : c
      )
    );
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim() || !selected) return;
    const newMessage: Message = {
      id: `m-${Date.now()}`,
      conversationId: selected.id,
      sender: mine,
      text: draft.trim(),
      date: new Date().toISOString(),
      read: false,
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selected.id
          ? { ...c, messages: [...c.messages, newMessage], lastMessage: newMessage.text, lastMessageDate: newMessage.date, unread: 0 }
          : c
      )
    );
    setDraft("");
  }

  function toggleArchive(conv: Conversation) {
    setConversations((prev) => prev.map((c) => (c.id === conv.id ? { ...c, archived: !c.archived } : c)));
    push({
      kind: "info",
      title: conv.archived ? "Conversazione ripristinata" : "Conversazione archiviata",
      description: `La conversazione con ${otherPartyName(conv, viewerRole)} è stata ${conv.archived ? "spostata tra le attive" : "archiviata"}.`,
    });
    setSelectedId(null);
  }

  function handleAttachmentClick() {
    push({ kind: "info", title: "Allegati", description: "L'invio di allegati sarà disponibile a breve." });
  }

  function confirmReport() {
    setReportOpen(false);
    push({
      kind: "success",
      title: "Segnalazione inviata",
      description: "Il nostro team modererà la conversazione al più presto.",
    });
  }

  return (
    <div className="grid overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card lg:grid-cols-[320px_1fr]">
      {/* Colonna lista conversazioni */}
      <div className="flex flex-col border-b border-navy-100 lg:border-b-0 lg:border-r">
        <div className="border-b border-navy-100 p-4">
          <h2 className="text-sm font-bold text-navy">
            {viewerRole === "cliente" ? "Messaggi con i consulenti" : "Messaggi con i clienti"}
          </h2>
          <div className="mt-3 flex gap-1 rounded-lg bg-muted p-1 text-xs font-medium">
            {(["attive", "archiviate"] as ListTab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTab(t);
                  setSelectedId(null);
                }}
                className={cn(
                  "flex-1 rounded-md py-1.5 capitalize transition-colors",
                  tab === t ? "bg-white text-navy shadow-sm" : "text-body hover:text-navy"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="max-h-[420px] overflow-y-auto lg:max-h-[560px]">
          {visibleList.length === 0 ? (
            <div className="p-4">
              <EmptyState
                icon={MessageSquare}
                title={tab === "archiviate" ? "Nessuna conversazione archiviata" : "Nessuna conversazione"}
                description={
                  tab === "archiviate"
                    ? "Le conversazioni che archivi compariranno qui."
                    : "Quando riceverai un messaggio comparirà in questa lista."
                }
              />
            </div>
          ) : (
            <ul>
              {visibleList.map((conv) => {
                const active = selected?.id === conv.id;
                return (
                  <li key={conv.id}>
                    <button
                      type="button"
                      onClick={() => selectConversation(conv.id)}
                      className={cn(
                        "flex w-full items-start gap-3 border-b border-navy-50 px-4 py-3.5 text-left transition-colors",
                        active ? "bg-navy-50" : "hover:bg-muted"
                      )}
                    >
                      <Avatar src={otherPartyAvatar(conv, viewerRole)} name={otherPartyName(conv, viewerRole)} size={40} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className={cn("truncate text-sm", conv.unread > 0 ? "font-bold text-navy" : "font-medium text-ink")}>
                            {otherPartyName(conv, viewerRole)}
                          </p>
                          <span className="shrink-0 text-[11px] text-body">{formatMessageTime(conv.lastMessageDate)}</span>
                        </div>
                        <p className={cn("mt-0.5 truncate text-xs", conv.unread > 0 ? "font-semibold text-ink" : "text-body")}>
                          {conv.lastMessage}
                        </p>
                      </div>
                      {conv.unread > 0 && (
                        <span className="mt-1 flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-gold px-1.5 text-[11px] font-bold text-navy-900">
                          {conv.unread}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Colonna thread */}
      <div className="flex min-h-[420px] flex-col">
        {!selected ? (
          <div className="flex flex-1 items-center justify-center p-8">
            <EmptyState
              icon={MessageSquare}
              title="Seleziona una conversazione"
              description="Scegli una conversazione dalla lista per visualizzare i messaggi."
            />
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-100 px-4 py-3.5 sm:px-5">
              <div className="flex items-center gap-3">
                <Avatar src={otherPartyAvatar(selected, viewerRole)} name={otherPartyName(selected, viewerRole)} size={40} />
                <div>
                  <p className="text-sm font-semibold text-navy">{otherPartyName(selected, viewerRole)}</p>
                  {selected.bookingRef && (
                    <Link
                      href={`/dashboard/prenotazioni/${selected.bookingRef}`}
                      className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-institutional hover:underline"
                    >
                      Prenotazione collegata #{selected.bookingRef}
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setReportOpen(true)} className="gap-1.5">
                  <Flag className="h-3.5 w-3.5" />
                  Segnala
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => toggleArchive(selected)} className="gap-1.5">
                  {selected.archived ? <ArchiveRestore className="h-3.5 w-3.5" /> : <Archive className="h-3.5 w-3.5" />}
                  {selected.archived ? "Ripristina" : "Archivia"}
                </Button>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5">
              {selected.messages.map((message) => {
                const isMine = message.sender === mine;
                return (
                  <div key={message.id} className={cn("flex", isMine ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                        isMine ? "rounded-br-sm bg-navy text-white" : "rounded-bl-sm bg-muted text-ink"
                      )}
                    >
                      <p>{message.text}</p>
                      {message.attachment && (
                        <p
                          className={cn(
                            "mt-1.5 flex items-center gap-1.5 text-xs underline-offset-2",
                            isMine ? "text-white/80" : "text-body"
                          )}
                        >
                          <Paperclip className="h-3 w-3" />
                          {message.attachment}
                        </p>
                      )}
                      <div
                        className={cn(
                          "mt-1 flex items-center gap-1 text-[10px]",
                          isMine ? "justify-end text-white/70" : "text-body"
                        )}
                      >
                        {formatMessageTime(message.date)}
                        {isMine && (message.read ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-navy-100 px-4 py-3 sm:px-5">
              <button
                type="button"
                onClick={handleAttachmentClick}
                aria-label="Allega un file"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-body hover:bg-muted hover:text-navy"
              >
                <Paperclip className="h-4.5 w-4.5" />
              </button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Scrivi un messaggio..."
                aria-label="Scrivi un messaggio"
                className="h-11 flex-1 rounded-xl border border-navy-100 bg-white px-3.5 text-sm text-ink focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100"
              />
              <Button type="submit" size="md" disabled={!draft.trim()} aria-label="Invia messaggio" className="shrink-0 gap-1.5">
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Invia</span>
              </Button>
            </form>
          </>
        )}
      </div>

      <Modal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        title="Segnala utente"
        description={selected ? `Stai per segnalare la conversazione con ${otherPartyName(selected, viewerRole)}.` : undefined}
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setReportOpen(false)}>
              Annulla
            </Button>
            <Button variant="danger" onClick={confirmReport}>
              Conferma segnalazione
            </Button>
          </>
        }
      >
        <p className="text-sm text-body">
          Il nostro team modererà la conversazione entro 24 ore. Usa questa funzione solo in caso di comportamenti
          scorretti o contenuti inappropriati.
        </p>
      </Modal>
    </div>
  );
}

export type { ViewerRole };
