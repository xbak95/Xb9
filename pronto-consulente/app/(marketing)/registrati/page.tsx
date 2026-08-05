"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { CheckCircle2, MailCheck, UserPlus } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Label, Input, Checkbox, FieldError, FieldHint } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";

type AccountType = "privato" | "aziendale";

const baseSchema = z.object({
  firstName: z.string().trim().min(2, "Inserisci il tuo nome."),
  lastName: z.string().trim().min(2, "Inserisci il tuo cognome."),
  email: z.string().trim().email("Inserisci un indirizzo email valido."),
  password: z.string().min(8, "La password deve contenere almeno 8 caratteri."),
  phone: z.string().trim().optional(),
  accountType: z.enum(["privato", "aziendale"]),
  companyName: z.string().trim().optional(),
  vatNumber: z.string().trim().optional(),
  sector: z.string().trim().optional(),
  acceptPrivacy: z.literal(true, {
    errorMap: () => ({ message: "Devi accettare l'informativa privacy per continuare." }),
  }),
});

// Regole aggiuntive per l'account aziendale, applicate manualmente dopo la validazione base
// così i messaggi di errore restano puntuali per ciascun campo.
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  accountType: AccountType;
  companyName: string;
  vatNumber: string;
  sector: string;
  acceptPrivacy: boolean;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  accountType: "privato",
  companyName: "",
  vatNumber: "",
  sector: "",
  acceptPrivacy: false,
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

export default function RegistratiPage() {
  const { push } = useToast();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function validate(): FormErrors {
    const result = baseSchema.safeParse({
      ...values,
      acceptPrivacy: values.acceptPrivacy || undefined,
    });
    const nextErrors: FormErrors = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormValues;
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
    }
    if (values.accountType === "aziendale") {
      if (!values.companyName.trim()) nextErrors.companyName = "Inserisci la ragione sociale.";
      if (!values.vatNumber.trim()) {
        nextErrors.vatNumber = "Inserisci la partita IVA.";
      } else if (!/^\d{11}$/.test(values.vatNumber.trim())) {
        nextErrors.vatNumber = "La partita IVA deve contenere 11 cifre numeriche.";
      }
      if (!values.sector.trim()) nextErrors.sector = "Inserisci il settore di attività.";
    }
    return nextErrors;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      push({ kind: "error", title: "Controlla i campi evidenziati", description: "Alcuni dati non sono ancora corretti." });
      return;
    }
    setSubmitting(true);
    // Nessun backend collegato: simuliamo l'invio della registrazione.
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      push({
        kind: "success",
        title: "Registrazione completata",
        description: "Ti abbiamo inviato un'email di verifica: controlla la tua casella di posta.",
      });
    }, 800);
  }

  if (done) {
    return (
      <div className="section-y">
        <div className="container-px mx-auto max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-verified-50 text-verified">
            <MailCheck className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-navy sm:text-3xl">Controlla la tua email</h1>
          <p className="mt-3 text-base text-body">
            Abbiamo inviato un link di verifica a <span className="font-semibold text-ink">{values.email}</span>.
            Confermalo per attivare il tuo account e iniziare a cercare il consulente giusto per te.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <ButtonLink href="/login" variant="primary">
              Vai al login
            </ButtonLink>
            <ButtonLink href="/" variant="outline">
              Torna alla home
            </ButtonLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-y">
      <div className="container-px mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-navy sm:text-3xl">Crea il tuo account cliente</h1>
          <p className="mt-3 text-base text-body">
            Registrati per confrontare consulenti, salvare i preferiti e gestire le tue prenotazioni.
            Sei un professionista?{" "}
            <Link href="/registrati/consulente" className="font-semibold text-institutional hover:underline">
              Registrati come consulente
            </Link>
            .
          </p>
        </div>

        <Card>
          <CardBody className="p-6 sm:p-8">
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName" required>
                    Nome
                  </Label>
                  <Input
                    id="firstName"
                    autoComplete="given-name"
                    value={values.firstName}
                    invalid={Boolean(errors.firstName)}
                    onChange={(e) => set("firstName", e.target.value)}
                  />
                  {errors.firstName && <FieldError>{errors.firstName}</FieldError>}
                </div>
                <div>
                  <Label htmlFor="lastName" required>
                    Cognome
                  </Label>
                  <Input
                    id="lastName"
                    autoComplete="family-name"
                    value={values.lastName}
                    invalid={Boolean(errors.lastName)}
                    onChange={(e) => set("lastName", e.target.value)}
                  />
                  {errors.lastName && <FieldError>{errors.lastName}</FieldError>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email" required>
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="nome@esempio.it"
                    value={values.email}
                    invalid={Boolean(errors.email)}
                    onChange={(e) => set("email", e.target.value)}
                  />
                  {errors.email && <FieldError>{errors.email}</FieldError>}
                </div>
                <div>
                  <Label htmlFor="password" required>
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    value={values.password}
                    invalid={Boolean(errors.password)}
                    onChange={(e) => set("password", e.target.value)}
                  />
                  {errors.password ? (
                    <FieldError>{errors.password}</FieldError>
                  ) : (
                    <FieldHint>Almeno 8 caratteri.</FieldHint>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Telefono (facoltativo)</Label>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+39 3xx xxx xxxx"
                  value={values.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </div>

              <fieldset>
                <legend className="mb-2 text-sm font-medium text-navy-800">Tipo di account</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(["privato", "aziendale"] as AccountType[]).map((type) => (
                    <label
                      key={type}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                        values.accountType === type
                          ? "border-navy bg-navy-50 text-navy font-semibold"
                          : "border-navy-100 text-ink hover:bg-muted"
                      }`}
                    >
                      <input
                        type="radio"
                        name="accountType"
                        value={type}
                        checked={values.accountType === type}
                        onChange={() => set("accountType", type)}
                        className="h-4 w-4 text-navy focus:ring-navy-200"
                      />
                      {type === "privato" ? "Privato" : "Azienda / Partita IVA"}
                    </label>
                  ))}
                </div>
              </fieldset>

              {values.accountType === "aziendale" && (
                <div className="grid gap-5 rounded-xl border border-navy-100 bg-muted/50 p-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="companyName" required>
                      Ragione sociale
                    </Label>
                    <Input
                      id="companyName"
                      value={values.companyName}
                      invalid={Boolean(errors.companyName)}
                      onChange={(e) => set("companyName", e.target.value)}
                    />
                    {errors.companyName && <FieldError>{errors.companyName}</FieldError>}
                  </div>
                  <div>
                    <Label htmlFor="vatNumber" required>
                      Partita IVA
                    </Label>
                    <Input
                      id="vatNumber"
                      inputMode="numeric"
                      placeholder="11 cifre"
                      value={values.vatNumber}
                      invalid={Boolean(errors.vatNumber)}
                      onChange={(e) => set("vatNumber", e.target.value)}
                    />
                    {errors.vatNumber && <FieldError>{errors.vatNumber}</FieldError>}
                  </div>
                  <div>
                    <Label htmlFor="sector" required>
                      Settore
                    </Label>
                    <Input
                      id="sector"
                      placeholder="es. Edilizia, Retail, IT..."
                      value={values.sector}
                      invalid={Boolean(errors.sector)}
                      onChange={(e) => set("sector", e.target.value)}
                    />
                    {errors.sector && <FieldError>{errors.sector}</FieldError>}
                  </div>
                </div>
              )}

              <div>
                <Checkbox
                  label={
                    <span>
                      Ho letto e accetto l'{" "}
                      <Link href="/privacy" className="font-medium text-institutional underline">
                        informativa sulla privacy
                      </Link>{" "}
                      e i{" "}
                      <Link href="/termini" className="font-medium text-institutional underline">
                        termini di servizio
                      </Link>
                      .
                    </span>
                  }
                  checked={values.acceptPrivacy}
                  onChange={(e) => set("acceptPrivacy", e.target.checked)}
                />
                {errors.acceptPrivacy && <FieldError>{errors.acceptPrivacy}</FieldError>}
              </div>

              <div className="flex items-start gap-2.5 rounded-xl bg-navy-50 p-3.5 text-xs text-navy-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  Dopo la registrazione ti invieremo un'email di verifica: dovrai confermarla per poter
                  prenotare una consulenza.
                </p>
              </div>

              <Button type="submit" fullWidth loading={submitting} className="gap-2">
                <UserPlus className="h-4 w-4" />
                Crea account
              </Button>

              <p className="text-center text-sm text-body">
                Hai già un account?{" "}
                <Link href="/login" className="font-semibold text-institutional hover:underline">
                  Accedi
                </Link>
              </p>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
