"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Label, Input, Textarea } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import { consultants } from "@/data/consultants";

const consultant = consultants[0];

function ChipEditor({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
}) {
  const [draft, setDraft] = useState("");

  function add() {
    const value = draft.trim();
    if (!value || items.includes(value)) return;
    onChange([...items, value]);
    setDraft("");
  }

  return (
    <div>
      <Label>{label}</Label>
      <div className="mb-2.5 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1.5 text-sm text-navy-700">
            {item}
            <button onClick={() => onChange(items.filter((i) => i !== item))} aria-label={`Rimuovi ${item}`} className="text-navy-400 hover:text-navy-700">
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
        {items.length === 0 && <p className="text-sm text-body">Nessun elemento aggiunto.</p>}
      </div>
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder={placeholder}
        />
        <Button type="button" variant="outline" onClick={add}>
          <Plus className="h-4 w-4" /> Aggiungi
        </Button>
      </div>
    </div>
  );
}

export default function ImpostazioniProfiloPage() {
  const { push } = useToast();
  const [bio, setBio] = useState(consultant.bio);
  const [title, setTitle] = useState(consultant.title);
  const [skills, setSkills] = useState(consultant.skills.map((s) => s.name));
  const [sectors, setSectors] = useState(consultant.sectors);
  const [languages, setLanguages] = useState(consultant.languages);

  function save(e: React.FormEvent) {
    e.preventDefault();
    push({ kind: "success", title: "Profilo aggiornato", description: "Le modifiche sono visibili sul tuo profilo pubblico." });
  }

  return (
    <div>
      <PageHeader title="Impostazioni profilo" description="Aggiorna le informazioni mostrate ai potenziali clienti." />

      <form onSubmit={save} className="space-y-6">
        <Card>
          <CardBody className="space-y-4">
            <h2 className="text-lg font-bold text-navy">Informazioni generali</h2>
            <div>
              <Label htmlFor="p-title">Titolo professionale</Label>
              <Input id="p-title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="p-bio">Biografia</Label>
              <Textarea id="p-bio" rows={5} value={bio} onChange={(e) => setBio(e.target.value)} />
              <p className="mt-1.5 text-xs text-body">{bio.length} caratteri</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-6">
            <h2 className="text-lg font-bold text-navy">Competenze e mercati</h2>
            <ChipEditor label="Competenze" items={skills} onChange={setSkills} placeholder="Es. Due diligence finanziaria" />
            <ChipEditor label="Settori serviti" items={sectors} onChange={setSectors} placeholder="Es. Manifatturiero" />
            <ChipEditor label="Lingue parlate" items={languages} onChange={setLanguages} placeholder="Es. Tedesco" />
          </CardBody>
        </Card>

        <Button type="submit">Salva modifiche</Button>
      </form>
    </div>
  );
}
