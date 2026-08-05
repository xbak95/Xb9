"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StepProgress } from "@/components/ui/ProgressBar";
import { useToast } from "@/components/ui/Toast";
import { createEmptyOnboardingData, STEP_META, type OnboardingData, type StepProps } from "@/components/onboarding/types";
import { Step1PersonalInfo } from "@/components/onboarding/Step1PersonalInfo";
import { Step2Title } from "@/components/onboarding/Step2Title";
import { Step3Category } from "@/components/onboarding/Step3Category";
import { Step4Experience } from "@/components/onboarding/Step4Experience";
import { Step5Resume } from "@/components/onboarding/Step5Resume";
import { Step6Certifications } from "@/components/onboarding/Step6Certifications";
import { Step7Bio } from "@/components/onboarding/Step7Bio";
import { Step8Services } from "@/components/onboarding/Step8Services";
import { Step9Availability } from "@/components/onboarding/Step9Availability";
import { Step10Fiscal } from "@/components/onboarding/Step10Fiscal";
import { Step11Identity } from "@/components/onboarding/Step11Identity";
import { Step12Preview } from "@/components/onboarding/Step12Preview";

const STEP_COMPONENTS: React.ComponentType<StepProps>[] = [
  Step1PersonalInfo,
  Step2Title,
  Step3Category,
  Step4Experience,
  Step5Resume,
  Step6Certifications,
  Step7Bio,
  Step8Services,
  Step9Availability,
  Step10Fiscal,
  Step11Identity,
];

const TOTAL_STEPS = STEP_META.length; // 12

function canAdvance(stepIndex: number, data: OnboardingData): boolean {
  switch (stepIndex) {
    case 0:
      return Boolean(data.personal.firstName.trim() && data.personal.lastName.trim() && data.personal.email.trim());
    case 1:
      return Boolean(data.professionalTitle.trim());
    case 2:
      return Boolean(data.categorySlug);
    default:
      return true;
  }
}

export default function RegistratiConsulentePage() {
  const { push } = useToast();
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<OnboardingData>(createEmptyOnboardingData);
  const [published, setPublished] = useState(false);
  const [attemptedNext, setAttemptedNext] = useState(false);

  function update(patch: Partial<OnboardingData>) {
    setData((prev) => ({ ...prev, ...patch }));
  }

  function goNext() {
    if (!canAdvance(stepIndex, data)) {
      setAttemptedNext(true);
      push({ kind: "error", title: "Completa i campi obbligatori", description: "Alcuni campi di questo passo sono ancora vuoti." });
      return;
    }
    setAttemptedNext(false);
    setStepIndex((i) => Math.min(i + 1, TOTAL_STEPS - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePublish() {
    setPublished(true);
    push({
      kind: "success",
      title: "Profilo pubblicato",
      description: "Il tuo profilo consulente è stato inviato in revisione.",
    });
  }

  const meta = STEP_META[stepIndex];
  const isLastStep = stepIndex === TOTAL_STEPS - 1;
  const CurrentStepComponent = STEP_COMPONENTS[stepIndex];

  return (
    <div className="section-y">
      <div className="container-px mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-navy sm:text-3xl">Diventa consulente su Pronto Consulente</h1>
          <p className="mt-2 text-sm text-body">
            Sei un cliente?{" "}
            <Link href="/registrati" className="font-semibold text-institutional hover:underline">
              Registrati come cliente
            </Link>
          </p>
        </div>

        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-body">
            <span>
              Passo {stepIndex + 1} di {TOTAL_STEPS}
            </span>
            <span>{Math.round(((stepIndex + 1) / TOTAL_STEPS) * 100)}% completato</span>
          </div>
          <StepProgress step={stepIndex} total={TOTAL_STEPS} />
        </div>

        <Card>
          <CardBody className="p-6 sm:p-8">
            <h2 className="text-lg font-bold text-navy">{meta.title}</h2>
            <p className="mt-1 text-sm text-body">{meta.description}</p>

            <div className="mt-6" aria-live="polite">
              {isLastStep ? (
                <Step12Preview data={data} published={published} onPublish={handlePublish} />
              ) : (
                <CurrentStepComponent data={data} update={update} />
              )}
              {attemptedNext && !isLastStep && !canAdvance(stepIndex, data) && (
                <p className="mt-4 text-sm text-red-600">Compila i campi obbligatori prima di continuare.</p>
              )}
            </div>

            {!isLastStep && (
              <div className="mt-8 flex items-center justify-between gap-3 border-t border-navy-100 pt-6">
                <Button type="button" variant="outline" onClick={goBack} disabled={stepIndex === 0} className="gap-1.5">
                  <ArrowLeft className="h-4 w-4" />
                  Indietro
                </Button>
                <Button type="button" onClick={goNext} className="gap-1.5">
                  Avanti
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {isLastStep && !published && (
              <div className="mt-6 flex justify-start border-t border-navy-100 pt-6">
                <Button type="button" variant="outline" onClick={goBack} className="gap-1.5">
                  <ArrowLeft className="h-4 w-4" />
                  Indietro
                </Button>
              </div>
            )}

            {published && (
              <div className="mt-6 flex justify-center border-t border-navy-100 pt-6">
                <Button type="button" variant="primary" onClick={() => window.location.assign("/login")}>
                  Vai al login
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
