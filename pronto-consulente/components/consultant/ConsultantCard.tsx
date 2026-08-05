"use client";

import Link from "next/link";
import { MapPin, Video, Users2, Clock, Heart, Scale } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { RatingStars } from "@/components/ui/RatingStars";
import { Badge, VerificationBadgePill } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import type { Consultant } from "@/lib/types";

export function ConsultantCard({
  consultant,
  showActions = false,
  favorited,
  onToggleFavorite,
  onToggleCompare,
  compared,
  className,
}: {
  consultant: Consultant;
  showActions?: boolean;
  favorited?: boolean;
  onToggleFavorite?: (id: string) => void;
  onToggleCompare?: (id: string) => void;
  compared?: boolean;
  className?: string;
}) {
  const topBadge = consultant.badges.includes("identita_verificata") ? "identita_verificata" : consultant.badges[0];

  return (
    <Card hover className={cn("relative flex flex-col p-5", className)}>
      {showActions && (
        <div className="absolute right-4 top-4 z-10 flex gap-1.5">
          <button
            onClick={() => onToggleCompare?.(consultant.id)}
            aria-label="Aggiungi al confronto"
            aria-pressed={compared}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border bg-white shadow-sm transition-colors",
              compared ? "border-institutional text-institutional" : "border-navy-100 text-body hover:text-navy"
            )}
          >
            <Scale className="h-4 w-4" />
          </button>
          <button
            onClick={() => onToggleFavorite?.(consultant.id)}
            aria-label="Salva nei preferiti"
            aria-pressed={favorited}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border bg-white shadow-sm transition-colors",
              favorited ? "border-gold-400 text-gold-600" : "border-navy-100 text-body hover:text-gold-600"
            )}
          >
            <Heart className="h-4 w-4" fill={favorited ? "currentColor" : "none"} />
          </button>
        </div>
      )}

      <div className="flex items-start gap-3.5">
        <Avatar src={consultant.avatarUrl} name={consultant.fullName} size={56} ring />
        <div className="min-w-0 flex-1">
          <Link href={`/consulenti/${consultant.slug}`} className="block truncate font-heading text-base font-bold text-navy hover:text-institutional">
            {consultant.fullName}
          </Link>
          <p className="truncate text-sm text-body">{consultant.title}</p>
          <div className="mt-1.5">
            <RatingStars rating={consultant.rating} showValue reviewCount={consultant.reviewCount} size={13} />
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {topBadge && <VerificationBadgePill type={topBadge} />}
        {consultant.badges.includes("risposta_rapida") && <VerificationBadgePill type="risposta_rapida" />}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-body">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-navy-400" />
          <span className="truncate">{consultant.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {consultant.modality === "online" ? <Video className="h-3.5 w-3.5 shrink-0 text-navy-400" /> : <Users2 className="h-3.5 w-3.5 shrink-0 text-navy-400" />}
          <span className="capitalize">{consultant.modality}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 shrink-0 text-navy-400" />
          <span>{consultant.yearsExperience} anni esperienza</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-verified" />
          <span>Dal {formatDate(consultant.nextAvailability)}</span>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {consultant.skills.slice(0, 3).map((s) => (
          <Badge key={s.name} tone="neutral">
            {s.name}
          </Badge>
        ))}
      </div>

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-navy-100 pt-4">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-body">A partire da</p>
          <p className="font-heading text-lg font-bold text-navy">{formatCurrency(consultant.startingPrice)}</p>
        </div>
        <ButtonLink href={`/consulenti/${consultant.slug}`} size="sm">
          Visualizza profilo
        </ButtonLink>
      </div>
    </Card>
  );
}
