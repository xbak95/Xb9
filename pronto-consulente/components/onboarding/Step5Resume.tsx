import { useRef } from "react";
import { FileText, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FieldHint, Label } from "@/components/ui/Field";
import type { StepProps } from "./types";

export function Step5Resume({ data, update }: StepProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // Upload finto: non avviene alcun invio reale del file, salviamo solo il nome.
    if (file) update({ cvFileName: file.name });
  }

  function removeFile() {
    update({ cvFileName: "" });
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <Label htmlFor="ob-cv" required>
        Curriculum vitae
      </Label>
      <FieldHint>Carica il tuo CV in formato PDF (max 5 MB). Sarà visibile solo al nostro team di verifica.</FieldHint>

      {!data.cvFileName ? (
        <label
          htmlFor="ob-cv"
          className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-navy-200 bg-muted/50 px-6 py-10 text-center transition-colors hover:bg-navy-50"
        >
          <UploadCloud className="h-8 w-8 text-navy-400" />
          <p className="text-sm font-medium text-navy">Clicca per caricare il tuo CV</p>
          <p className="text-xs text-body">PDF, DOC o DOCX</p>
          <input
            ref={inputRef}
            id="ob-cv"
            type="file"
            accept=".pdf,.doc,.docx"
            className="sr-only"
            onChange={handleFile}
          />
        </label>
      ) : (
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-navy-100 bg-white p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy">
            <FileText className="h-5 w-5" />
          </span>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-ink">{data.cvFileName}</p>
            <p className="text-xs text-verified">File selezionato</p>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={removeFile} aria-label="Rimuovi curriculum">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
