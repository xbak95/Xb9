"use client";

import { useState } from "react";
import { Pencil, CheckCircle2, FileText } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Label, Textarea } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/app/admin/_components/KpiCard";
import { blogPosts } from "@/data/blog-posts";

const homepageSections = [
  { id: "hero", label: "Sezione Hero homepage", text: "Trova, confronta e prenota il consulente giusto. Prezzi chiari, recensioni verificate, prenotazione online in pochi minuti." },
  { id: "value-prop", label: "Proposta di valore", text: "Oltre 600 consulenti verificati in 22 categorie professionali, dalla finanza agevolata alla cybersecurity." },
  { id: "cta-consulenti", label: "CTA per consulenti", text: "Fatti trovare da migliaia di aziende e professionisti: crea il tuo profilo su Pronto Consulente in 10 minuti." },
];

export default function AdminContentPage() {
  const [editing, setEditing] = useState<{ id: string; label: string; text: string } | null>(null);
  const [draft, setDraft] = useState("");
  const [published, setPublished] = useState<Record<string, boolean>>(
    Object.fromEntries(blogPosts.map((p) => [p.id, true]))
  );
  const { push } = useToast();

  function openEdit(section: { id: string; label: string; text: string }) {
    setEditing(section);
    setDraft(section.text);
  }

  function saveEdit() {
    push({ kind: "success", title: "Contenuto aggiornato", description: `"${editing?.label}" è stato aggiornato (modifica dimostrativa, non persistente).` });
    setEditing(null);
  }

  function togglePublish(id: string, title: string) {
    setPublished((prev) => {
      const next = !prev[id];
      push({
        kind: next ? "success" : "info",
        title: next ? "Articolo pubblicato" : "Articolo messo in bozza",
        description: title,
      });
      return { ...prev, [id]: next };
    });
  }

  return (
    <div>
      <PageHeader
        title="Contenuti"
        description="Gestisci i testi statici della homepage e lo stato di pubblicazione degli articoli del blog."
      />

      <Card className="mb-6">
        <CardBody>
          <h3 className="mb-4 font-heading text-base font-semibold text-navy">Testi homepage</h3>
          <ul className="space-y-3">
            {homepageSections.map((s) => (
              <li key={s.id} className="flex items-start justify-between gap-4 rounded-xl border border-navy-100 p-4">
                <div>
                  <p className="text-sm font-semibold text-ink">{s.label}</p>
                  <p className="mt-1 text-sm text-body">{s.text}</p>
                </div>
                <Button variant="outline" size="sm" className="shrink-0" onClick={() => openEdit(s)}>
                  <Pencil className="h-3.5 w-3.5" /> Modifica
                </Button>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h3 className="mb-4 font-heading text-base font-semibold text-navy">Articoli del blog</h3>
          <ul className="divide-y divide-navy-50">
            {blogPosts.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-navy-600" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{p.title}</p>
                    <p className="text-xs text-body">
                      {p.category} · {formatDate(p.date)} · {p.author}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={published[p.id] ? "verified" : "neutral"}>{published[p.id] ? "Pubblicato" : "Bozza"}</Badge>
                  <Button variant="outline" size="sm" onClick={() => togglePublish(p.id, p.title)}>
                    <CheckCircle2 className="h-3.5 w-3.5" /> {published[p.id] ? "Metti in bozza" : "Pubblica"}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      <Modal
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title={`Modifica: ${editing?.label ?? ""}`}
        footer={
          <>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Annulla
            </Button>
            <Button onClick={saveEdit}>Salva modifiche</Button>
          </>
        }
      >
        <Label htmlFor="content-draft">Testo</Label>
        <Textarea id="content-draft" rows={5} value={draft} onChange={(e) => setDraft(e.target.value)} />
      </Modal>
    </div>
  );
}
