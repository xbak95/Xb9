"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LogIn, ShieldCheck, Star, Users } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Label, Input, Checkbox, FieldError } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import { Logo } from "@/components/ui/Logo";

interface FormState {
  email: string;
  password: string;
  remember: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const initialState: FormState = { email: "", password: "", remember: false };

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.email.trim()) {
    errors.email = "Inserisci il tuo indirizzo email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Inserisci un indirizzo email valido.";
  }
  if (!values.password) {
    errors.password = "Inserisci la tua password.";
  } else if (values.password.length < 6) {
    errors.password = "La password deve contenere almeno 6 caratteri.";
  }
  return errors;
}

export default function LoginPage() {
  const { push } = useToast();
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    // Nessuna autenticazione reale: simuliamo una chiamata di accesso.
    setTimeout(() => {
      setSubmitting(false);
      push({
        kind: "success",
        title: "Accesso effettuato",
        description: "Bentornato su Pronto Consulente. Questa è una demo, non è stata effettuata alcuna autenticazione reale.",
      });
    }, 700);
  }

  return (
    <div className="section-y">
      <div className="container-px grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Colonna sinistra: contesto istituzionale, visibile solo da lg in su */}
        <div className="order-2 hidden lg:order-1 lg:block">
          <Logo className="mb-8" />
          <h1 className="max-w-md text-3xl font-bold text-navy sm:text-4xl">
            Bentornato. La tua consulenza di fiducia ti aspetta.
          </h1>
          <p className="mt-4 max-w-md text-base text-body">
            Accedi per gestire le tue prenotazioni, conversare con i tuoi consulenti e tenere sotto
            controllo ogni pratica in corso.
          </p>
          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy">
                <ShieldCheck className="h-[18px] w-[18px]" />
              </span>
              <p className="text-sm text-body">Consulenti verificati e recensioni autentiche.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy">
                <Users className="h-[18px] w-[18px]" />
              </span>
              <p className="text-sm text-body">Oltre 2.500 professionisti in 21 aree di competenza.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy">
                <Star className="h-[18px] w-[18px]" />
              </span>
              <p className="text-sm text-body">Valutazione media 4,8/5 su oltre 3.000 recensioni.</p>
            </li>
          </ul>
        </div>

        {/* Colonna destra: form */}
        <div className="order-1 mx-auto w-full max-w-md lg:order-2">
          <div className="mb-8 text-center lg:hidden">
            <Logo className="mx-auto mb-6 justify-center" />
          </div>
          <Card>
            <CardBody className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-navy">Accedi al tuo account</h2>
              <p className="mt-1.5 text-sm text-body">
                Non hai ancora un account?{" "}
                <Link href="/registrati" className="font-semibold text-institutional hover:underline">
                  Registrati come cliente
                </Link>{" "}
                oppure{" "}
                <Link href="/registrati/consulente" className="font-semibold text-institutional hover:underline">
                  come consulente
                </Link>
                .
              </p>

              <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
                <div>
                  <Label htmlFor="login-email" required>
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="nome@esempio.it"
                    value={values.email}
                    invalid={Boolean(errors.email)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "login-email-error" : undefined}
                    onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  />
                  {errors.email && <FieldError>{errors.email}</FieldError>}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password" required>
                      Password
                    </Label>
                    <Link href="/password-dimenticata" className="text-xs font-medium text-institutional hover:underline">
                      Password dimenticata?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="La tua password"
                      value={values.password}
                      invalid={Boolean(errors.password)}
                      aria-invalid={Boolean(errors.password)}
                      aria-describedby={errors.password ? "login-password-error" : undefined}
                      onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
                      className="pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Nascondi password" : "Mostra password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-body hover:text-navy"
                    >
                      {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                    </button>
                  </div>
                  {errors.password && <FieldError>{errors.password}</FieldError>}
                </div>

                <Checkbox
                  label="Ricordami su questo dispositivo"
                  checked={values.remember}
                  onChange={(e) => setValues((v) => ({ ...v, remember: e.target.checked }))}
                />

                <Button type="submit" fullWidth loading={submitting} className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Accedi
                </Button>
              </form>

              <p className="mt-6 text-center text-xs text-body">
                Accedendo accetti i{" "}
                <Link href="/termini" className="underline hover:text-navy">
                  Termini di servizio
                </Link>{" "}
                e l'{" "}
                <Link href="/privacy" className="underline hover:text-navy">
                  Informativa privacy
                </Link>{" "}
                di Pronto Consulente.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
