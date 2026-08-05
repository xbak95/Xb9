import Link from "next/link";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { categories, topCategorySlugs } from "@/data/categories";

export function CategoryGrid() {
  const shown = categories.filter((c) => topCategorySlugs.includes(c.slug));

  return (
    <section className="section-y bg-muted">
      <div className="container-px">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Categorie più richieste</h2>
            <p className="mt-2 max-w-xl text-body">Dalla finanza agevolata alla cybersecurity: trova la competenza giusta per ogni esigenza.</p>
          </div>
          <Link href="/categorie" className="shrink-0 text-sm font-semibold text-institutional hover:text-navy">
            Vedi tutte le 22 categorie →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((cat) => {
            const Icon = (Icons[cat.icon as keyof typeof Icons] as LucideIcon) ?? Icons.Briefcase;
            return (
              <Link key={cat.id} href={`/ricerca?categoria=${cat.slug}`}>
                <Card hover className="h-full p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3.5 font-heading text-[15px] font-semibold text-navy">{cat.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-body">{cat.description}</p>
                  <p className="mt-3 text-xs font-medium text-institutional">{cat.consultantCount} consulenti disponibili</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
