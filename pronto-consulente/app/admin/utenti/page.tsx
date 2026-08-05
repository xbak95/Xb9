"use client";

import { useMemo, useState } from "react";
import { Search, Ban, RotateCcw, UserX2, Users } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";
import { PageHeader, statusTone } from "@/app/admin/_components/KpiCard";
import { adminUsers as seedUsers, type AdminUser } from "@/data/admin-demo";
import type { UserRole } from "@/lib/types";

const roleLabels: Record<UserRole, string> = {
  cliente: "Cliente",
  consulente: "Consulente",
  admin: "Amministratore",
  moderatore: "Moderatore",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(seedUsers);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "tutti">("tutti");
  const [target, setTarget] = useState<AdminUser | null>(null);
  const { push } = useToast();

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesQuery =
        !query ||
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase());
      const matchesRole = roleFilter === "tutti" || u.role === roleFilter;
      return matchesQuery && matchesRole;
    });
  }, [users, query, roleFilter]);

  function confirmToggle() {
    if (!target) return;
    const nextStatus = target.status === "attivo" ? "sospeso" : "attivo";
    setUsers((prev) => prev.map((u) => (u.id === target.id ? { ...u, status: nextStatus } : u)));
    push({
      kind: nextStatus === "sospeso" ? "error" : "success",
      title: nextStatus === "sospeso" ? "Utente sospeso" : "Utente riattivato",
      description: `${target.name} è stato ${nextStatus === "sospeso" ? "sospeso" : "riattivato"} con successo.`,
    });
    setTarget(null);
  }

  return (
    <div>
      <PageHeader
        title="Utenti"
        description={`${users.length} account registrati su Pronto Consulente: clienti, consulenti e staff interno.`}
      />

      <Card className="mb-5">
        <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />
            <Input
              placeholder="Cerca per nome o email…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as UserRole | "tutti")}
            className="sm:w-56"
          >
            <option value="tutti">Tutti i ruoli</option>
            <option value="cliente">Cliente</option>
            <option value="consulente">Consulente</option>
            <option value="admin">Amministratore</option>
            <option value="moderatore">Moderatore</option>
          </Select>
        </CardBody>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState icon={Users} title="Nessun utente trovato" description="Prova a modificare la ricerca o il filtro applicato." />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-body">
                  <th className="px-5 py-3">Utente</th>
                  <th className="px-5 py-3">Ruolo</th>
                  <th className="px-5 py-3">Stato</th>
                  <th className="px-5 py-3">Iscritto il</th>
                  <th className="px-5 py-3 text-right">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {filtered.map((u) => (
                  <tr key={u.id}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar src={`https://i.pravatar.cc/100?img=${u.avatarSeed}`} name={u.name} size={36} />
                        <div>
                          <p className="font-semibold text-ink">{u.name}</p>
                          <p className="text-xs text-body">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-body">{roleLabels[u.role]}</td>
                    <td className="px-5 py-3.5">
                      <Badge tone={statusTone(u.status)}>{u.status === "attivo" ? "Attivo" : "Sospeso"}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-body">{formatDate(u.joinedDate)}</td>
                    <td className="px-5 py-3.5 text-right">
                      <Button
                        variant={u.status === "attivo" ? "danger" : "outline"}
                        size="sm"
                        onClick={() => setTarget(u)}
                      >
                        {u.status === "attivo" ? (
                          <>
                            <Ban className="h-3.5 w-3.5" /> Sospendi
                          </>
                        ) : (
                          <>
                            <RotateCcw className="h-3.5 w-3.5" /> Riattiva
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal
        open={Boolean(target)}
        onClose={() => setTarget(null)}
        title={target?.status === "attivo" ? "Sospendere questo utente?" : "Riattivare questo utente?"}
        description={target ? `${target.name} — ${target.email}` : undefined}
        footer={
          <>
            <Button variant="outline" onClick={() => setTarget(null)}>
              Annulla
            </Button>
            <Button variant={target?.status === "attivo" ? "danger" : "primary"} onClick={confirmToggle}>
              Conferma
            </Button>
          </>
        }
      >
        <div className="flex items-start gap-3 rounded-xl bg-muted px-4 py-3 text-sm text-body">
          <UserX2 className="mt-0.5 h-4 w-4 shrink-0 text-navy-700" />
          {target?.status === "attivo"
            ? "L'utente non potrà più accedere alla piattaforma né effettuare nuove prenotazioni fino alla riattivazione."
            : "L'utente tornerà ad avere accesso completo alla piattaforma."}
        </div>
      </Modal>
    </div>
  );
}
