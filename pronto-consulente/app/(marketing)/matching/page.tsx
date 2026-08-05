"use client";

import { useMemo, useState } from "react";
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Paperclip,
  X,
  MapPin,
  Clock,
  Wallet,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { RatingStars } from "@/components/ui/RatingStars";
import { ProgressBar, StepProgress } from "@/components/ui/ProgressBar";
import { Label, Input, Textarea, Select } from "@/components/ui/Field";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatCurrency, formatDate } from "@/lib/utils";
import { categories } from "@/data/categories";
import { consultants } from "@/data/consultants";
import {
  emptyMatchingAnswers,
  matchConsultants,
  availableLanguages,
  type MatchingAnswers,
  type BudgetBand,
  type UrgencyLevel,
  type ModalityPreference,
  type ExperienceLevel,
} from "@/lib/matching";

const TOTAL_STEPS = 11;

const budgetOptions: { value: BudgetBand; label: string }[] = [
  { value: "sotto-200", label: "Sotto 200€" },
  { value: "200-500", label: "200€ - 500€" },
  { value: "500-1500", label: "500€ - 1.500€" },
  { value: "oltre-1500", label: "Oltre 1.500€" },
];

const urgencyOptions: { value: UrgencyLevel; label: string }[] = [
  { value: "asap", label: "Il prima possibile" },
  { value: "settimana", label: "Entro 1 settimana" },
  { value: "mese", label: "Entro 1 mese" },
  { value: "nessuna-fretta", label: "Non ho fretta" },
];

const modalityOptions: { value: ModalityPreference; label: string }[] = [
  { value: "online", label: "Online" },
  { value: "presenza", label: "In presenza" },
  { value: "indifferente", label: "Indifferente" },
];

const experienceOptions: { value: ExperienceLevel; label: string }[] = [
  { value: "junior", label: "Junior" },
  { value: "esperto", label: "Esperto" },
  { value: "massima-seniority", label: "Massima seniority" },
];

const stepTitles = [
  "Qual è il problema da risolvere?",
  "In quale ambito ti serve aiuto?",
  "Qual è il tuo settore aziendale?",
  "Qual è il tuo budget indicativo?",
  "Quanto è urgente la tua richiesta?",
  "Che modalità preferisci?",
  "Dove ti trovi?",
  "In che lingua vorresti essere seguito?",
  "Che livello di esperienza cerchi?",
  "Qual è il risultato che vuoi ottenere?",
  "Vuoi allegare qualche documento?",
];

function MatchingWizard() {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"form" | "results">("form");
  const [answers, setAnswers] = useState<MatchingAnswers>(emptyMatchingAnswers);
  const { push } = useToast();

  const languages = useMemo(() => availableLanguages(consultants), []);
  const uniqueSectors = useMemo(
    () => Array.from(new Set(consultants.flatMap((c) => c.sectors))).sort((a, b) => a.localeCompare(b, "it")),
    []
  );

  function update<K extends keyof MatchingAnswers>(key: K, value: MatchingAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  const canProceed = useMemo(() => {
    switch (step) {
      case 0:
        return answers.problem.trim().length >= 10;
      case 1:
        return answers.categorySlug !== "";
      case 2:
        return answers.sector.trim().length > 0;
      case 3:
        return answers.budget !== "";
      case 4:
        return answers.urgency !== "";
      case 5:
        return answers.modality !== "";
      case 6:
        return answers.modality === "online" || answers.location.trim().length > 0;
      case 7:
        return answers.language !== "";
      case 8:
        return answers.experienceLevel !== "";
      case 9:
        return answers.desiredOutcome.trim().length >= 5;
      case 10:
        return true;
      default:
        return true;
    }
  }, [step, answers]);

  function goNext() {
    if (!canProceed) return;
    if (step === TOTAL_STEPS - 1) {
      setPhase("results");
      push({ kind: "success", title: "Analisi completata", description: "Abbiamo trovato i consulenti più adatti a te." });
      return;
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const names = Array.from(files).map((f) => f.name);
    update("attachmentNames", [...answers.attachmentNames, ...names]);
  }

  function removeAttachment(name: string) {
    update(
      "attachmentNames",
      answers.attachmentNames.filter((n) => n !== name)
    );
  }

  function restart() {
    setAnswers(emptyMatchingAnswers);
    setStep(0);
    setPhase("form");
  }

  if (phase === "results") {
    return <MatchingResults answers={answers} onRestart={restart} />;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <StepProgress step={step} total={TOTAL_STEPS} />
      <p className="mt-2.5 text-center text-xs font-medium uppercase tracking-[0.1em] text-body">
        Passaggio {step + 1} di {TOTAL_STEPS}
      </p>

      <Card className="mt-6">
        <CardBody>
          <div key={step} className="animate-fade-up">
            <h2 className="mb-5 font-heading text-lg font-bold text-navy sm:text-xl">{stepTitles[step]}</h2>

            {step === 0 && (
              <div>
                <Label htmlFor="problem" required>
                  Descrivi in poche righe cosa ti serve
                </Label>
                <Textarea
                  id="problem"
                  rows={5}
                  placeholder="Es. Devo mettere in regola la sicurezza sul lavoro nella mia officina meccanica…"
                  value={answers.problem}
                  onChange={(e) => update("problem", e.target.value)}
                />
              </div>
            )}

            {step === 1 && (
              <div>
                <Label htmlFor="category" required>
                  Categoria
                </Label>
                <Select id="category" value={answers.categorySlug} onChange={(e) => update("categorySlug", e.target.value)}>
                  <option value="">Seleziona una categoria…</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </div>
            )}

            {step === 2 && (
              <div>
                <Label htmlFor="sector" required>
                  Settore aziendale
                </Label>
                <Input
                  id="sector"
                  list="sectors-list"
                  placeholder="Es. Manifatturiero, E-commerce, Sanità…"
                  value={answers.sector}
                  onChange={(e) => update("sector", e.target.value)}
                />
                <datalist id="sectors-list">
                  {uniqueSectors.map((s) => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              </div>
            )}

            {step === 3 && (
              <div>
                <Label required>Budget indicativo</Label>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {budgetOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => update("budget", opt.value)}
                      className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                        answers.budget === opt.value
                          ? "border-navy bg-navy-50 text-navy"
                          : "border-navy-100 text-ink hover:border-navy-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <Label required>Urgenza</Label>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {urgencyOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => update("urgency", opt.value)}
                      className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                        answers.urgency === opt.value
                          ? "border-navy bg-navy-50 text-navy"
                          : "border-navy-100 text-ink hover:border-navy-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <Label required>Modalità preferita</Label>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {modalityOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => update("modality", opt.value)}
                      className={`rounded-xl border px-4 py-3 text-center text-sm font-medium transition-colors ${
                        answers.modality === opt.value
                          ? "border-navy bg-navy-50 text-navy"
                          : "border-navy-100 text-ink hover:border-navy-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 6 && (
              <div>
                <Label htmlFor="location" required={answers.modality !== "online"}>
                  Località {answers.modality === "online" && <span className="font-normal text-body">(facoltativa per servizi online)</span>}
                </Label>
                <Input
                  id="location"
                  placeholder="Es. Milano, Lombardia"
                  value={answers.location}
                  onChange={(e) => update("location", e.target.value)}
                />
              </div>
            )}

            {step === 7 && (
              <div>
                <Label htmlFor="language" required>
                  Lingua richiesta
                </Label>
                <Select id="language" value={answers.language} onChange={(e) => update("language", e.target.value)}>
                  <option value="">Seleziona una lingua…</option>
                  {languages.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </Select>
              </div>
            )}

            {step === 8 && (
              <div>
                <Label required>Livello di esperienza richiesto</Label>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {experienceOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => update("experienceLevel", opt.value)}
                      className={`rounded-xl border px-4 py-3 text-center text-sm font-medium transition-colors ${
                        answers.experienceLevel === opt.value
                          ? "border-navy bg-navy-50 text-navy"
                          : "border-navy-100 text-ink hover:border-navy-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 9 && (
              <div>
                <Label htmlFor="outcome" required>
                  Cosa vorresti aver ottenuto al termine della consulenza?
                </Label>
                <Textarea
                  id="outcome"
                  rows={3}
                  placeholder="Es. Avere il DVR pronto ed essere in regola per un eventuale controllo."
                  value={answers.desiredOutcome}
                  onChange={(e) => update("desiredOutcome", e.target.value)}
                />
              </div>
            )}

            {step === 10 && (
              <div>
                <Label htmlFor="attachments">Allegati (facoltativo)</Label>
                <label
                  htmlFor="attachments"
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-navy-200 bg-muted/50 px-6 py-8 text-center transition-colors hover:border-navy-300"
                >
                  <Paperclip className="h-5 w-5 text-navy-500" />
                  <span className="text-sm font-medium text-navy-700">Carica documenti utili (PDF, immagini…)</span>
                  <span className="text-xs text-body">Facoltativo — puoi procedere anche senza allegati</span>
                </label>
                <input id="attachments" type="file" multiple className="sr-only" onChange={(e) => handleFiles(e.target.files)} />
                {answers.attachmentNames.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {answers.attachmentNames.map((name) => (
                      <li key={name} className="flex items-center justify-between gap-2 rounded-lg bg-muted px-3 py-2 text-sm text-ink">
                        <span className="truncate">{name}</span>
                        <button type="button" onClick={() => removeAttachment(name)} aria-label={`Rimuovi ${name}`} className="text-body hover:text-red-600">
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="mt-7 flex items-center justify-between gap-3">
            <Button variant="outline" onClick={goBack} disabled={step === 0}>
              <ArrowLeft className="h-4 w-4" /> Indietro
            </Button>
            <Button onClick={goNext} disabled={!canProceed}>
              {step === TOTAL_STEPS - 1 ? (
                <>
                  <Sparkles className="h-4 w-4" /> Vedi i consulenti consigliati
                </>
              ) : (
                <>
                  Avanti <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function MatchingResults({ answers, onRestart }: { answers: MatchingAnswers; onRestart: () => void }) {
  const results = useMemo(() => matchConsultants(answers, consultants, 3), [answers]);

  if (results.length === 0) {
    return (
      <EmptyState
        icon={Sparkles}
        title="Nessun consulente trovato"
        description="Prova a modificare qualche risposta per ottenere suggerimenti più precisi."
        action={
          <Button onClick={onRestart}>
            <ArrowLeft className="h-4 w-4" /> Ricomincia il questionario
          </Button>
        }
      />
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center animate-fade-up">
        <Badge tone="gold" icon={<Sparkles className="h-3.5 w-3.5" />} className="mx-auto">
          Analisi completata
        </Badge>
        <h2 className="mt-4 font-heading text-2xl font-bold text-navy sm:text-3xl">
          I consulenti più adatti a te
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-body">
          Abbiamo confrontato la tua richiesta con i profili disponibili su Pronto Consulente e selezionato i tre professionisti più compatibili.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {results.map(({ consultant, score, reasons }, idx) => (
          <Card key={consultant.id} className="flex flex-col animate-fade-up" hover>
            <CardBody className="flex flex-1 flex-col">
              {idx === 0 && (
                <Badge tone="gold" className="mb-3 w-fit">
                  Miglior corrispondenza
                </Badge>
              )}
              <div className="flex items-start gap-3">
                <Avatar src={consultant.avatarUrl} name={consultant.fullName} size={52} />
                <div className="flex-1">
                  <h3 className="font-heading text-base font-bold text-navy">{consultant.fullName}</h3>
                  <p className="text-sm text-body">{consultant.title}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">Compatibilità</span>
                  <span className="font-bold text-navy">{score}%</span>
                </div>
                <ProgressBar value={score} tone={score >= 80 ? "gold" : "navy"} />
              </div>

              <p className="mt-4 text-sm text-body">{reasons.join(". ")}.</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {consultant.skills.slice(0, 4).map((s) => (
                  <Badge key={s.name} tone="navy">
                    {s.name}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 space-y-1.5 text-sm text-body">
                <div className="flex items-center gap-2">
                  <RatingStars rating={consultant.rating} size={13} />
                  <span>{consultant.rating.toFixed(1)} ({consultant.reviewCount} recensioni)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wallet className="h-3.5 w-3.5 shrink-0" />
                  <span>A partire da {formatCurrency(consultant.startingPrice)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span>Prima disponibilità: {formatDate(consultant.nextAvailability)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span>{consultant.location}</span>
                </div>
              </div>

              <div className="mt-5">
                <ButtonLink href={`/consulenti/${consultant.slug}`} fullWidth>
                  Visualizza profilo <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="outline" onClick={onRestart}>
          <ArrowLeft className="h-4 w-4" /> Rifai il questionario
        </Button>
      </div>
    </div>
  );
}

export default function MatchingPage() {
  return (
    <ToastProvider>
      <div className="section-y bg-muted/40">
        <div className="container-px">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Badge tone="navy" icon={<Sparkles className="h-3.5 w-3.5" />} className="mx-auto">
              Matching AI
            </Badge>
            <h1 className="mt-4 font-heading text-2xl font-bold text-navy sm:text-3xl">
              Non sai quale consulente scegliere?
            </h1>
            <p className="mt-3 text-sm text-body sm:text-base">
              Raccontaci il tuo problema. Pronto Consulente analizzerà la richiesta e ti suggerirà i professionisti più adatti.
            </p>
          </div>
          <MatchingWizard />
        </div>
      </div>
    </ToastProvider>
  );
}
