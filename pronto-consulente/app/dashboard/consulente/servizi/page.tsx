"use client";

import { useState } from "react";
import { Briefcase, Plus, Pencil, Clock, Video, MapPin, Users2, Star } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Label, Input, Textarea, Select } from "@/components/ui/Field";
import { RatingStars } from "@/components/ui/RatingStars";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency } from "@/lib/utils";
import { consultants } from "@/data/consultants";
import type { ServiceOffering, Modality } from "@/lib/types";

const modalityIcon = { online: Video, presenza: MapPin, ibrida: Users2 } as const;

type ServiceWithStatus = ServiceOffering & { attivo: boolean };

const initialServices: ServiceWithStatus[] = consultants[0].services.map((s) => ({ ...s, attivo: true }));

const emptyForm = {
  title: "",
  price: "",
  priceType: "fisso" as ServiceOffering["priceType"],
  durationMinutes: "60",
  deliveryTime: "",
  modality: "online" as Modality,
  description: "",
};

export default function ServiziPage() {
  const { push } = useToast();
  const [services, setServices] = useState<ServiceWithStatus[]>(initialServices);
  const [editTarget, setEditTarget] = useState<ServiceWithStatus | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState(emptyForm);

  function openNew() {
    setForm(emptyForm);
    setIsNew(true);
    setEditTarget({
      id: "new",
      consultantId: consultants[0].id,
      title: "",
      price: 0,
      priceType: "fisso",
      durationMinutes: 60,
      deliveryTime: "",
      modality: "online",
      description: "",
      includes: [],
      category: "Consulenza",
      rating: 0,
      reviewCount: 0,
      attivo: true,
    });
  }

  function openEdit(s: ServiceWithStatus) {
    setForm({
      title: s.title,
      price: String(s.price),
      priceType: s.priceType,
      durationMinutes: String(s.durationMinutes),
      deliveryTime: s.deliveryTime,
      modality: s.modality,
      description: s.description,
    });
    setIsNew(false);
    setEditTarget(s);
  }

  function toggleActive(id: string) {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, attivo: !s.attivo } : s)));
  }

  function save() {
    if (!form.title || !form.price) return;
    if (isNew) {
      const newService: ServiceWithStatus = {
        id: `s-new-${Date.now()}`,
        consultantId: consultants[0].id,
        title: form.title,
        price: Number(form.price),
        priceType: form.priceType,
        durationMinutes: Number(form.durationMinutes),
        deliveryTime: form.deliveryTime || "Da concordare",
        modality: form.modality,
        description: form.description,
        includes: [],
        category: "Consulenza",
        rating: 0,
        reviewCount: 0,
        attivo: true,
      };
      setServices((prev) => [...prev, newService]);
      push({ kind: "success", title: "Servizio aggiunto", description: `"${form.title}" è ora visibile sul tuo profilo.` });
    } else if (editTarget) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === editTarget.id
            ? {
                ...s,
                title: form.title,
                price: Number(form.price),
                priceType: form.priceType,
                durationMinutes: Number(form.durationMinutes),
                deliveryTime: form.deliveryTime,
                modality: form.modality,
                description: form.description,
              }
            : s
        )
      );
      push({ kind: "success", title: "Servizio aggiornato" });
    }
    setEditTarget(null);
  }

  return (
    <div>
      <PageHeader
        title="I tuoi servizi"
        description="Gestisci i servizi che offri sul tuo profilo pubblico."
        action={
          <Button onClick={openNew}>
            <Plus className="h-4 w-4" /> Aggiungi servizio
          </Button>
        }
      />

      {services.length === 0 ? (
        <EmptyState icon={Briefcase} title="Nessun servizio" description="Aggiungi il tuo primo servizio per iniziare a ricevere prenotazioni." action={<Button onClick={openNew}>Aggiungi servizio</Button>} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {services.map((s) => {
            const ModIcon = modalityIcon[s.modality];
            return (
              <Card key={s.id} className={!s.attivo ? "opacity-60" : undefined}>
                <CardBody>
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-ink">{s.title}</h3>
                    <Badge tone={s.attivo ? "verified" : "neutral"}>{s.attivo ? "Attivo" : "In pausa"}</Badge>
                  </div>
                  <p className="mb-3 text-sm text-body">{s.description}</p>
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-body">
                    {s.durationMinutes > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {s.durationMinutes} min
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <ModIcon className="h-3.5 w-3.5" /> {s.modality}
                    </span>
                    {s.reviewCount > 0 && <RatingStars rating={s.rating} size={12} reviewCount={s.reviewCount} />}
                  </div>
                  <div className="flex items-center justify-between border-t border-navy-50 pt-3">
                    <span className="text-lg font-bold text-navy">
                      {s.priceType === "da" && "da "}
                      {s.price === 0 ? "Gratuito" : formatCurrency(s.price)}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => toggleActive(s.id)}>
                        {s.attivo ? "Metti in pausa" : "Riattiva"}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openEdit(s)}>
                        <Pencil className="h-4 w-4" /> Modifica
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}

      <Modal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        title={isNew ? "Nuovo servizio" : "Modifica servizio"}
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setEditTarget(null)}>
              Annulla
            </Button>
            <Button onClick={save} disabled={!form.title || !form.price}>
              Salva
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="s-title" required>
              Titolo del servizio
            </Label>
            <Input id="s-title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Es. Consulenza di 60 minuti" />
          </div>
          <div>
            <Label htmlFor="s-price" required>
              Prezzo (€)
            </Label>
            <Input id="s-price" type="number" min={0} value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="s-price-type">Tipo di prezzo</Label>
            <Select id="s-price-type" value={form.priceType} onChange={(e) => setForm((f) => ({ ...f, priceType: e.target.value as ServiceOffering["priceType"] }))}>
              <option value="fisso">Prezzo fisso</option>
              <option value="da">A partire da</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="s-duration">Durata (minuti)</Label>
            <Input id="s-duration" type="number" min={0} value={form.durationMinutes} onChange={(e) => setForm((f) => ({ ...f, durationMinutes: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="s-modality">Modalità</Label>
            <Select id="s-modality" value={form.modality} onChange={(e) => setForm((f) => ({ ...f, modality: e.target.value as Modality }))}>
              <option value="online">Online</option>
              <option value="presenza">In presenza</option>
              <option value="ibrida">Ibrida</option>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="s-delivery">Tempi di consegna</Label>
            <Input id="s-delivery" value={form.deliveryTime} onChange={(e) => setForm((f) => ({ ...f, deliveryTime: e.target.value }))} placeholder="Es. 3 giorni lavorativi" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="s-desc">Descrizione</Label>
            <Textarea id="s-desc" rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
