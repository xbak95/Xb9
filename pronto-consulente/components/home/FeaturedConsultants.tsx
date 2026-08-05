import Link from "next/link";
import { consultants, featuredConsultantSlugs } from "@/data/consultants";
import { ConsultantCard } from "@/components/consultant/ConsultantCard";

export function FeaturedConsultants() {
  const featured = consultants.filter((c) => featuredConsultantSlugs.includes(c.slug));

  return (
    <section className="section-y">
      <div className="container-px">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Consulenti in evidenza</h2>
            <p className="mt-2 max-w-xl text-body">Professionisti verificati, con curriculum, competenze e recensioni controllate.</p>
          </div>
          <Link href="/ricerca" className="shrink-0 text-sm font-semibold text-institutional hover:text-navy">
            Vedi tutti i consulenti →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <ConsultantCard key={c.id} consultant={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
