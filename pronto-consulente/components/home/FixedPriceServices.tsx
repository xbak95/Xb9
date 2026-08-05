import Link from "next/link";
import { Clock } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { RatingStars } from "@/components/ui/RatingStars";
import { ButtonLink } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { featuredServices } from "@/data/services";

export function FixedPriceServices() {
  return (
    <section className="section-y bg-muted">
      <div className="container-px">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Servizi a prezzo fisso</h2>
            <p className="mt-2 max-w-xl text-body">Acquista direttamente un servizio definito, senza dover prima richiedere un preventivo.</p>
          </div>
          <Link href="/ricerca?tipo=prezzo-fisso" className="shrink-0 text-sm font-semibold text-institutional hover:text-navy">
            Vedi tutti i servizi →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((s) => (
            <Card key={s.id} hover className="flex h-full flex-col">
              <CardBody className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading text-[15px] font-semibold text-navy">{s.title}</h3>
                  <span className="shrink-0 font-heading text-lg font-bold text-navy">
                    {s.price === 0 ? "Gratuito" : formatCurrency(s.price)}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{s.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <Avatar src={s.consultantAvatar} name={s.consultantName} size={28} />
                  <span className="text-sm font-medium text-navy-700">{s.consultantName}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-body">
                  <RatingStars rating={s.rating} showValue reviewCount={s.reviewCount} size={12} />
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {s.deliveryTime}
                  </span>
                </div>
                <ButtonLink href={`/consulenti/${s.consultantSlug}`} fullWidth className="mt-4">
                  Acquista servizio
                </ButtonLink>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
