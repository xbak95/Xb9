"use client";

import { useState } from "react";
import { Flag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Label, Input, Textarea, Select, FieldHint } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";

export function ReportForm() {
  const { push } = useToast();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      push({
        kind: "success",
        title: "Segnalazione inviata",
        description: "Il nostro team modererà la segnalazione entro 48 ore.",
      });
      e.currentTarget.reset();
    }, 700);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label htmlFor="tipo" required>
          Tipo di segnalazione
        </Label>
        <Select id="tipo" name="tipo" required defaultValue="">
          <option value="" disabled>
            Seleziona un tipo
          </option>
          <option value="profilo-consulente">Profilo di un consulente</option>
          <option value="contenuto-recensione">Contenuto o recensione inappropriata</option>
          <option value="comportamento-utente">Comportamento scorretto di un utente</option>
          <option value="pagamento">Problema relativo a un pagamento</option>
          <option value="sicurezza">Problema di sicurezza o violazione della privacy</option>
          <option value="altro">Altro</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="riferimento">Riferimento (facoltativo)</Label>
        <Input id="riferimento" name="riferimento" placeholder="Nome consulente, URL del profilo o ID prenotazione" />
        <FieldHint>Se la segnalazione riguarda un profilo o una prenotazione specifica, indicalo qui.</FieldHint>
      </div>
      <div>
        <Label htmlFor="descrizione" required>
          Descrizione
        </Label>
        <Textarea
          id="descrizione"
          name="descrizione"
          required
          rows={5}
          placeholder="Descrivi cosa è successo con la maggior precisione possibile..."
        />
      </div>
      <div>
        <Label htmlFor="email-segnalante" required>
          La tua email
        </Label>
        <Input id="email-segnalante" name="email" type="email" required placeholder="nome@email.it" />
        <FieldHint>Ti contatteremo solo se avremo bisogno di ulteriori dettagli.</FieldHint>
      </div>
      <Button type="submit" size="lg" loading={loading} variant="danger" className="gap-2">
        {!loading && <Flag className="h-4 w-4" />}
        Invia segnalazione
      </Button>
    </form>
  );
}
