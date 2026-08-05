import type { Metadata } from "next";
import Link from "next/link";
import * as Icons from "lucide-react";
import { Users, ArrowRight, LucideIcon } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { categories } from "@/data/categories";

export const metadata: Metadata = {
  title: "Tutte le categorie",
  description:
    "Sfoglia tutte le 22 categorie di consulenza professionale disponibili su Pronto Consulente: dalla finanza agevolata al legale, dal marketing alla cybersecurity.",
};

export default function CategoriePage() {
  return (
    <div className="section-y">
      <div className="container-px">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-gold-600">
            Categorie
          </span>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Tutte le aree di consulenza</h1>
          <p className="mt-5 text-lg text-body">
            22 settori di competenza, ciascuno con consulenti verificati pronti a rispondere alle
            tue esigenze specifiche. Scegli quello più vicino al tuo obiettivo per iniziare la
            ricerca.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const Icon = (Icons[cat.icon as keyof typeof Icons] as LucideIcon) ?? Users;
            return (
              <Card key={cat.id} hover as="article">
                <CardBody className="flex flex-col">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 text-base font-semibold text-navy">{cat.name}</h2>
                  <p className="mt-2 flex-1 text-sm text-body">{cat.description}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-body">
                    <Users className="h-3.5 w-3.5" />
                    {cat.consultantCount} consulenti attivi
                  </div>
                  <Link
                    href={`/ricerca?categoria=${cat.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-institutional hover:text-navy-800"
                  >
                    Vedi i consulenti
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
