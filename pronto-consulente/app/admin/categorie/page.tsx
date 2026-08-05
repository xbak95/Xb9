"use client";

import { useState } from "react";
import * as Icons from "lucide-react";
import { Plus, Pencil, Trash2, LayoutGrid } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Label, Input, Textarea } from "@/components/ui/Field";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { PageHeader } from "@/app/admin/_components/KpiCard";
import { categories as seedCategories } from "@/data/categories";
import type { Category } from "@/lib/types";
import { slugify } from "@/lib/utils";

function CategoryIcon({ name }: { name: string }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.LayoutGrid;
  return <Icon className="h-5 w-5" />;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(seedCategories);
  const [addOpen, setAddOpen] = useState(false);
  const [deleting, setDeleting] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { push } = useToast();

  function handleAdd() {
    if (!name.trim()) return;
    const newCategory: Category = {
      id: `cat-${slugify(name)}`,
      slug: slugify(name),
      name: name.trim(),
      description: description.trim() || "Descrizione da definire.",
      icon: "LayoutGrid",
      consultantCount: 0,
    };
    setCategories((prev) => [newCategory, ...prev]);
    push({ kind: "success", title: "Categoria aggiunta", description: `"${newCategory.name}" è stata aggiunta (solo in questa sessione demo).` });
    setName("");
    setDescription("");
    setAddOpen(false);
  }

  function confirmDelete() {
    if (!deleting) return;
    setCategories((prev) => prev.filter((c) => c.id !== deleting.id));
    push({ kind: "error", title: "Categoria rimossa", description: `"${deleting.name}" non è più visibile nella navigazione (demo).` });
    setDeleting(null);
  }

  return (
    <div>
      <PageHeader
        title="Categorie"
        description={`${categories.length} categorie attive sul marketplace. La rimozione o modifica in questa vista è solo dimostrativa e non persiste.`}
        action={
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4" /> Aggiungi categoria
          </Button>
        }
      />

      {categories.length === 0 ? (
        <EmptyState icon={LayoutGrid} title="Nessuna categoria" description="Aggiungi la prima categoria del marketplace." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Card key={c.id}>
              <CardBody>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                    <CategoryIcon name={c.icon} />
                  </div>
                  <Badge tone="neutral">{c.consultantCount} consulenti</Badge>
                </div>
                <h3 className="mt-3 font-heading text-base font-semibold text-navy">{c.name}</h3>
                <p className="mt-1 text-sm text-body">{c.description}</p>
                {c.subcategories && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.subcategories.slice(0, 3).map((s) => (
                      <Badge key={s} tone="navy">
                        {s}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" fullWidth onClick={() => push({ kind: "info", title: "Modifica categoria", description: "Funzione dimostrativa: nessuna modifica persistente." })}>
                    <Pencil className="h-3.5 w-3.5" /> Modifica
                  </Button>
                  <Button variant="danger" size="sm" fullWidth onClick={() => setDeleting(c)}>
                    <Trash2 className="h-3.5 w-3.5" /> Elimina
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Aggiungi nuova categoria"
        description="La categoria verrà aggiunta solo nello stato locale di questa sessione."
        footer={
          <>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleAdd} disabled={!name.trim()}>
              Crea categoria
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="cat-name" required>
              Nome categoria
            </Label>
            <Input id="cat-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Es. Consulenza doganale" />
          </div>
          <div>
            <Label htmlFor="cat-desc">Descrizione</Label>
            <Textarea id="cat-desc" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Breve descrizione della categoria…" />
          </div>
        </div>
      </Modal>

      <Modal
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title="Eliminare questa categoria?"
        description={deleting ? `"${deleting.name}" verrà rimossa dalla navigazione del marketplace.` : undefined}
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleting(null)}>
              Annulla
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Elimina definitivamente
            </Button>
          </>
        }
      >
        <p className="text-sm text-body">
          I consulenti già assegnati a questa categoria non verranno eliminati, ma dovranno essere ricategorizzati manualmente.
        </p>
      </Modal>
    </div>
  );
}
