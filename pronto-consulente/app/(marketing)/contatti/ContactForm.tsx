"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Label, Input, Textarea, Select } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";

export function ContactForm() {
  const { push } = useToast();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      push({
        kind: "success",
        title: "Messaggio inviato",
        description: "Ti risponderemo il prima possibile all'indirizzo indicato.",
      });
      e.currentTarget.reset();
    }, 700);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="nome" required>
            Nome e cognome
          </Label>
          <Input id="nome" name="nome" required placeholder="Mario Rossi" />
        </div>
        <div>
          <Label htmlFor="email" required>
            Email
          </Label>
          <Input id="email" name="email" type="email" required placeholder="mario.rossi@email.it" />
        </div>
      </div>
      <div>
        <Label htmlFor="oggetto" required>
          Oggetto
        </Label>
        <Select id="oggetto" name="oggetto" required defaultValue="">
          <option value="" disabled>
            Seleziona un argomento
          </option>
          <option value="cliente">Sono un cliente</option>
          <option value="consulente">Sono un consulente</option>
          <option value="pagamenti">Domanda su un pagamento</option>
          <option value="partnership">Proposta di collaborazione</option>
          <option value="altro">Altro</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="messaggio" required>
          Messaggio
        </Label>
        <Textarea
          id="messaggio"
          name="messaggio"
          required
          rows={5}
          placeholder="Scrivi qui la tua richiesta..."
        />
      </div>
      <Button type="submit" size="lg" loading={loading} className="gap-2">
        {!loading && <Send className="h-4 w-4" />}
        Invia messaggio
      </Button>
    </form>
  );
}
