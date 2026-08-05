"use client";

import { useState } from "react";
import { MapPin, Languages, Clock, CheckCircle2, Heart, MessageSquare, FileText } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { RatingStars } from "@/components/ui/RatingStars";
import { VerificationBadgePill } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BookingButton } from "@/components/booking/BookingFlow";
import { RequestQuoteModal, SendMessageModal } from "./RequestModal";
import { useToast } from "@/components/ui/Toast";
import type { Consultant } from "@/lib/types";

export function ProfileHeader({ consultant }: { consultant: Consultant }) {
  const { push } = useToast();
  const [saved, setSaved] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);

  return (
    <div className="border-b border-navy-100 bg-white">
      <div className="container-px py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Avatar src={consultant.avatarUrl} name={consultant.fullName} size={96} ring />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading text-2xl font-bold text-navy">{consultant.fullName}</h1>
                {consultant.badges.includes("identita_verificata") && <VerificationBadgePill type="identita_verificata" />}
              </div>
              <p className="mt-1 text-body">{consultant.title}</p>
              <div className="mt-2">
                <RatingStars rating={consultant.rating} showValue reviewCount={consultant.reviewCount} />
              </div>
              <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-body">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-navy-400" /> {consultant.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Languages className="h-4 w-4 text-navy-400" /> {consultant.languages.join(", ")}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-navy-400" /> Risponde in ~{consultant.avgResponseTimeHours}h
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-verified" /> {consultant.completedConsultations} consulenze completate
                </div>
              </dl>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:flex-col sm:items-stretch">
            <BookingButton consultant={consultant} />
            <Button variant="outline" onClick={() => setQuoteOpen(true)}>
              <FileText className="h-4 w-4" /> Richiedi preventivo
            </Button>
            <div className="flex gap-2.5">
              <Button variant="ghost" className="flex-1" onClick={() => setMessageOpen(true)}>
                <MessageSquare className="h-4 w-4" /> Messaggio
              </Button>
              <Button
                variant="ghost"
                aria-pressed={saved}
                onClick={() => {
                  setSaved((s) => !s);
                  push({ kind: "info", title: saved ? "Rimosso dai preferiti" : "Salvato nei preferiti" });
                }}
              >
                <Heart className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <RequestQuoteModal consultant={consultant} open={quoteOpen} onClose={() => setQuoteOpen(false)} />
      <SendMessageModal consultant={consultant} open={messageOpen} onClose={() => setMessageOpen(false)} />
    </div>
  );
}
