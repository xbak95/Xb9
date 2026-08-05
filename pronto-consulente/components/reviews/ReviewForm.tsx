"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Textarea, Checkbox, Label } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

function ClickableStars({
  value,
  onChange,
  size = 24,
  label,
}: {
  value: number;
  onChange: (value: number) => void;
  size?: number;
  label: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;

  return (
    <div role="radiogroup" aria-label={label} className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} su 5`}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          onClick={() => onChange(star)}
          className="p-0.5"
        >
          <Star
            width={size}
            height={size}
            className={cn(star <= display ? "text-gold-500" : "text-navy-100", "transition-colors")}
            fill="currentColor"
          />
        </button>
      ))}
    </div>
  );
}

interface ReviewFormValues {
  overall: number;
  competence: number;
  clarity: number;
  punctuality: number;
  valueForMoney: number;
  comment: string;
  wouldRecommend: boolean | null;
  anonymous: boolean;
}

const initialValues: ReviewFormValues = {
  overall: 0,
  competence: 0,
  clarity: 0,
  punctuality: 0,
  valueForMoney: 0,
  comment: "",
  wouldRecommend: null,
  anonymous: false,
};

export function ReviewForm({
  consultantName,
  serviceTitle,
  onSubmitted,
}: {
  /** Nome del consulente recensito, usato solo per i testi del form. */
  consultantName?: string;
  /** Servizio a cui si riferisce la recensione (facoltativo). */
  serviceTitle?: string;
  onSubmitted?: () => void;
}) {
  const { push } = useToast();
  const [values, setValues] = useState<ReviewFormValues>(initialValues);
  const [submitting, setSubmitting] = useState(false);

  function set<K extends keyof ReviewFormValues>(key: K, value: ReviewFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (values.overall === 0) {
      push({ kind: "error", title: "Assegna un voto generale", description: "Seleziona da 1 a 5 stelle prima di inviare." });
      return;
    }
    if (!values.comment.trim()) {
      push({ kind: "error", title: "Aggiungi un commento", description: "Racconta brevemente la tua esperienza." });
      return;
    }
    setSubmitting(true);
    // Nessun backend collegato: la recensione non viene realmente salvata.
    setTimeout(() => {
      setSubmitting(false);
      push({
        kind: "success",
        title: "Recensione inviata",
        description: "Grazie per il tuo feedback, sarà pubblicata a breve.",
      });
      setValues(initialValues);
      onSubmitted?.();
    }, 700);
  }

  const ratingRows: { key: keyof ReviewFormValues; label: string }[] = [
    { key: "competence", label: "Competenza" },
    { key: "clarity", label: "Chiarezza" },
    { key: "punctuality", label: "Puntualità" },
    { key: "valueForMoney", label: "Rapporto qualità-prezzo" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label>Voto generale</Label>
        <p className="mb-2 text-xs text-body">
          {consultantName ? `Come valuti la tua esperienza con ${consultantName}?` : "Come valuti la tua esperienza?"}
          {serviceTitle && ` · ${serviceTitle}`}
        </p>
        <ClickableStars value={values.overall} onChange={(v) => set("overall", v)} size={30} label="Voto generale" />
      </div>

      <div className="grid gap-4 rounded-xl border border-navy-100 p-4 sm:grid-cols-2">
        {ratingRows.map((row) => (
          <div key={row.key} className="flex items-center justify-between gap-3">
            <span className="text-sm text-ink">{row.label}</span>
            <ClickableStars
              value={values[row.key] as number}
              onChange={(v) => set(row.key, v as never)}
              size={18}
              label={row.label}
            />
          </div>
        ))}
      </div>

      <div>
        <Label htmlFor="review-comment" required>
          La tua recensione
        </Label>
        <Textarea
          id="review-comment"
          rows={5}
          value={values.comment}
          onChange={(e) => set("comment", e.target.value)}
          placeholder="Descrivi come si è svolta la consulenza, cosa ti è piaciuto e cosa potrebbe migliorare."
        />
      </div>

      <div>
        <Label>Consiglieresti questo consulente?</Label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => set("wouldRecommend", true)}
            className={cn(
              "flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors sm:flex-none sm:px-6",
              values.wouldRecommend === true ? "border-verified bg-verified-50 text-verified-600" : "border-navy-100 hover:bg-muted"
            )}
          >
            Sì, lo consiglio
          </button>
          <button
            type="button"
            onClick={() => set("wouldRecommend", false)}
            className={cn(
              "flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors sm:flex-none sm:px-6",
              values.wouldRecommend === false ? "border-red-400 bg-red-50 text-red-600" : "border-navy-100 hover:bg-muted"
            )}
          >
            No
          </button>
        </div>
      </div>

      <Checkbox
        label="Pubblica questa recensione in forma anonima"
        checked={values.anonymous}
        onChange={(e) => set("anonymous", e.target.checked)}
      />

      <Button type="submit" loading={submitting} className="gap-2">
        <Send className="h-4 w-4" />
        Invia recensione
      </Button>
    </form>
  );
}
