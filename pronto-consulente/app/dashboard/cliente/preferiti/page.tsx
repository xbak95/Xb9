"use client";

import { useState } from "react";
import { Heart, HeartOff, MapPin } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button, ButtonLink } from "@/components/ui/Button";
import { RatingStars } from "@/components/ui/RatingStars";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency } from "@/lib/utils";
import { consultants } from "@/data/consultants";

const initialFavoriteSlugs = [
  consultants[0].slug, // Alessandro Ferretti
  consultants[2].slug, // Avv. Marco Rinaldi
  consultants[3].slug, // Giulia Moretti
  consultants[9].slug, // Martina Colombo
];

export default function PreferitiPage() {
  const { push } = useToast();
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>(initialFavoriteSlugs);
  const favorites = consultants.filter((c) => favoriteSlugs.includes(c.slug));

  function remove(slug: string, name: string) {
    setFavoriteSlugs((prev) => prev.filter((s) => s !== slug));
    push({ kind: "info", title: "Rimosso dai preferiti", description: `${name} non è più tra i tuoi consulenti preferiti.` });
  }

  return (
    <div>
      <PageHeader title="Consulenti preferiti" description="I professionisti che hai salvato per contattarli più facilmente." />

      {favorites.length === 0 ? (
        <EmptyState
          icon={HeartOff}
          title="Nessun preferito"
          description="Non hai ancora salvato consulenti. Esplora il catalogo per aggiungerne."
          action={<ButtonLink href="/">Esplora consulenti</ButtonLink>}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((c) => (
            <Card key={c.id} hover>
              <CardBody>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar src={c.avatarUrl} name={c.fullName} size={52} />
                    <div>
                      <p className="font-semibold text-ink">{c.fullName}</p>
                      <p className="text-xs text-body">{c.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(c.slug, c.fullName)}
                    aria-label={`Rimuovi ${c.fullName} dai preferiti`}
                    className="text-gold-600 hover:text-gold-700"
                  >
                    <Heart className="h-5 w-5" fill="currentColor" />
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-3 text-xs text-body">
                  <RatingStars rating={c.rating} size={13} />
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {c.location}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-body">
                    Da <span className="font-semibold text-navy">{formatCurrency(c.startingPrice)}</span>
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => remove(c.slug, c.fullName)}>
                      Rimuovi
                    </Button>
                    <ButtonLink href={`/consulenti/${c.slug}`} variant="primary" size="sm">
                      Profilo
                    </ButtonLink>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
