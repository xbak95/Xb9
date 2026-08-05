import { useRef } from "react";
import { Clock, IdCard, ShieldCheck, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Label, FieldHint } from "@/components/ui/Field";
import type { StepProps } from "./types";

export function Step11Identity({ data, update }: StepProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // Upload finto: nessun invio reale, salviamo solo il nome del file selezionato.
    if (file) update({ identityFileName: file.name });
  }

  function removeFile() {
    update({ identityFileName: "" });
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="ob-identity" required>
          Documento d'identità
        </Label>
        <FieldHint>Carica un documento in corso di validità (carta d'identità, patente o passaporto).</FieldHint>

        {!data.identityFileName ? (
          <label
            htmlFor="ob-identity"
            className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-navy-200 bg-muted/50 px-6 py-10 text-center transition-colors hover:bg-navy-50"
          >
            <UploadCloud className="h-8 w-8 text-navy-400" />
            <p className="text-sm font-medium text-navy">Clicca per caricare il documento</p>
            <p className="text-xs text-body">JPG, PNG o PDF</p>
            <input
              ref={inputRef}
              id="ob-identity"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="sr-only"
              onChange={handleFile}
            />
          </label>
        ) : (
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-navy-100 bg-white p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy">
              <IdCard className="h-5 w-5" />
            </span>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-ink">{data.identityFileName}</p>
              <p className="text-xs text-verified">File selezionato</p>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={removeFile} aria-label="Rimuovi documento">
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-start gap-2.5 rounded-xl bg-gold-50 p-3.5 text-xs text-navy-800">
        <Clock className="mt-0.5 h-4 w-4 shrink-0" />
        <p>La verifica viene effettuata dal nostro team entro 48 ore lavorative dalla pubblicazione del profilo.</p>
      </div>

      <div className="flex items-start gap-2.5 rounded-xl bg-navy-50 p-3.5 text-xs text-navy-700">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
        <p>Una volta verificata, la tua identità sarà mostrata come badge "Identità verificata" sul tuo profilo pubblico.</p>
      </div>
    </div>
  );
}
