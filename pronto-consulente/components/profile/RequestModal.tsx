"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Label, Textarea, Input } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import type { Consultant } from "@/lib/types";

export function RequestQuoteModal({ consultant, open, onClose }: { consultant: Consultant; open: boolean; onClose: () => void }) {
  const { push } = useToast();
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onClose();
    setDescription("");
    setBudget("");
    push({ kind: "success", title: "Richiesta inviata", description: `${consultant.fullName} ti risponderà entro ${consultant.avgResponseTimeHours} ore circa.` });
  }

  return (
    <Modal open={open} onClose={onClose} title="Richiedi un preventivo personalizzato" description={`A ${consultant.fullName}`}>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <Label htmlFor="rq-desc" required>
            Descrivi la tua esigenza
          </Label>
          <Textarea id="rq-desc" required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Racconta in breve il progetto o il problema da risolvere…" />
        </div>
        <div>
          <Label htmlFor="rq-budget">Budget indicativo (facoltativo)</Label>
          <Input id="rq-budget" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Es. 500€ - 1.000€" />
        </div>
        <Button type="submit" fullWidth>
          Invia richiesta
        </Button>
      </form>
    </Modal>
  );
}

export function SendMessageModal({ consultant, open, onClose }: { consultant: Consultant; open: boolean; onClose: () => void }) {
  const { push } = useToast();
  const [text, setText] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onClose();
    setText("");
    push({ kind: "success", title: "Messaggio inviato", description: "Troverai la conversazione nella sezione Messaggi della tua area personale." });
  }

  return (
    <Modal open={open} onClose={onClose} title={`Scrivi a ${consultant.fullName}`}>
      <form onSubmit={submit} className="space-y-4">
        <Textarea required rows={4} value={text} onChange={(e) => setText(e.target.value)} placeholder="Scrivi il tuo messaggio…" aria-label="Messaggio" />
        <Button type="submit" fullWidth>
          Invia messaggio
        </Button>
      </form>
    </Modal>
  );
}
