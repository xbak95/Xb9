"use client";

import { useMemo, useState } from "react";
import { Archive, Inbox, Paperclip, Send, Search } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn, formatDateShort } from "@/lib/utils";
import { conversations as demoConversations } from "@/data/conversations";
import type { Conversation, Message } from "@/lib/types";

/**
 * Pannello messaggistica minimale, condiviso tra dashboard cliente e consulente.
 * Da sostituire con components/messaging/ConversationView.tsx quando disponibile.
 */
export function MessagesPanel({ viewerRole }: { viewerRole: "cliente" | "consulente" }) {
  const [conversations, setConversations] = useState<Conversation[]>(demoConversations);
  const [selectedId, setSelectedId] = useState<string | null>(
    demoConversations.find((c) => !c.archived)?.id ?? null
  );
  const [showArchived, setShowArchived] = useState(false);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");

  const counterpartName = (c: Conversation) => (viewerRole === "cliente" ? c.consultantName : c.clientName);
  const counterpartAvatar = (c: Conversation) => (viewerRole === "cliente" ? c.consultantAvatar : c.clientAvatar);

  const filtered = useMemo(
    () =>
      conversations
        .filter((c) => c.archived === showArchived)
        .filter((c) => counterpartName(c).toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => +new Date(b.lastMessageDate) - +new Date(a.lastMessageDate)),
    [conversations, showArchived, query, viewerRole]
  );

  const selected = conversations.find((c) => c.id === selectedId) ?? null;

  function selectConversation(id: string) {
    setSelectedId(id);
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  }

  function sendMessage() {
    if (!draft.trim() || !selected) return;
    const newMessage: Message = {
      id: `local-${Date.now()}`,
      conversationId: selected.id,
      sender: viewerRole,
      text: draft.trim(),
      date: new Date().toISOString(),
      read: true,
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selected.id
          ? { ...c, messages: [...c.messages, newMessage], lastMessage: newMessage.text, lastMessageDate: newMessage.date }
          : c
      )
    );
    setDraft("");
  }

  return (
    <div className="grid overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card lg:grid-cols-[300px_1fr]" style={{ minHeight: 560 }}>
      {/* Lista conversazioni */}
      <div className="flex flex-col border-b border-navy-100 lg:border-b-0 lg:border-r">
        <div className="space-y-3 border-b border-navy-100 p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cerca conversazione..."
              className="h-10 w-full rounded-lg border border-navy-100 bg-muted/60 pl-9 pr-3 text-sm focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100"
            />
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => setShowArchived(false)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors",
                !showArchived ? "bg-navy text-white" : "bg-muted text-body hover:text-navy"
              )}
            >
              <Inbox className="h-3.5 w-3.5" /> Attive
            </button>
            <button
              onClick={() => setShowArchived(true)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors",
                showArchived ? "bg-navy text-white" : "bg-muted text-body hover:text-navy"
              )}
            >
              <Archive className="h-3.5 w-3.5" /> Archiviate
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 && (
            <p className="p-4 text-center text-sm text-body">Nessuna conversazione qui.</p>
          )}
          {filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => selectConversation(c.id)}
              className={cn(
                "flex w-full items-start gap-3 border-b border-navy-50 px-4 py-3.5 text-left transition-colors hover:bg-muted/60",
                selected?.id === c.id && "bg-navy-50/70"
              )}
            >
              <Avatar src={counterpartAvatar(c)} name={counterpartName(c)} size={40} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={cn("truncate text-sm", c.unread > 0 ? "font-bold text-ink" : "font-medium text-ink")}>
                    {counterpartName(c)}
                  </p>
                  <span className="shrink-0 text-[11px] text-body">{formatDateShort(c.lastMessageDate)}</span>
                </div>
                <p className={cn("mt-0.5 truncate text-xs", c.unread > 0 ? "font-semibold text-navy-700" : "text-body")}>
                  {c.lastMessage}
                </p>
              </div>
              {c.unread > 0 && (
                <span className="mt-1 flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-navy-900">
                  {c.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Thread */}
      <div className="flex flex-col">
        {!selected ? (
          <div className="flex flex-1 items-center justify-center p-8">
            <EmptyState icon={Inbox} title="Seleziona una conversazione" description="Scegli una conversazione dall'elenco per visualizzare i messaggi." />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 border-b border-navy-100 px-5 py-4">
              <Avatar src={counterpartAvatar(selected)} name={counterpartName(selected)} size={40} />
              <div>
                <p className="text-sm font-semibold text-ink">{counterpartName(selected)}</p>
                {selected.bookingRef && <p className="text-xs text-body">Rif. prenotazione {selected.bookingRef}</p>}
              </div>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
              {selected.messages.map((m) => {
                const mine = m.sender === viewerRole;
                return (
                  <div key={m.id} className={cn("flex", mine ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                        mine ? "rounded-br-sm bg-navy text-white" : "rounded-bl-sm bg-muted text-ink"
                      )}
                    >
                      <p>{m.text}</p>
                      {m.attachment && (
                        <div
                          className={cn(
                            "mt-2 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs",
                            mine ? "bg-white/15" : "bg-white"
                          )}
                        >
                          <Paperclip className="h-3.5 w-3.5" />
                          {m.attachment}
                        </div>
                      )}
                      <p className={cn("mt-1 text-[10px]", mine ? "text-white/70" : "text-body")}>
                        {new Intl.DateTimeFormat("it-IT", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" }).format(
                          new Date(m.date)
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-2 border-t border-navy-100 p-4">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Scrivi un messaggio..."
                className="h-11 flex-1 rounded-xl border border-navy-100 bg-white px-3.5 text-sm focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100"
              />
              <button
                onClick={sendMessage}
                disabled={!draft.trim()}
                aria-label="Invia messaggio"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-white transition-colors hover:bg-navy-800 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
