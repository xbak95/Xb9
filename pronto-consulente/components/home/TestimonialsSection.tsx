import { Quote } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { RatingStars } from "@/components/ui/RatingStars";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="section-y bg-muted">
      <div className="container-px">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Recensioni</h2>
          <p className="mt-2 text-body">Cosa dicono le aziende e i professionisti che hanno già trovato il loro consulente.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.id} className="flex h-full flex-col">
              <CardBody className="flex flex-1 flex-col">
                <Quote className="h-6 w-6 text-gold-400" />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink">“{t.comment}”</p>
                <RatingStars rating={t.rating} className="mt-4" size={13} />
                <div className="mt-3 border-t border-navy-100 pt-3">
                  <p className="text-sm font-semibold text-navy">{t.name}</p>
                  <p className="text-xs text-body">{t.company}</p>
                  <p className="mt-1 text-xs text-institutional">
                    {t.service} · con {t.consultantName}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
