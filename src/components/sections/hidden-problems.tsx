import { Search, TriangleAlert } from "lucide-react";

import { hiddenProblems } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function HiddenProblems() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal direction="left">
          <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
            <div className="absolute inset-8 rounded-[3rem] bg-white shadow-[0_30px_60px_-30px_rgba(23,19,16,0.25)]" />
            <div className="relative flex size-40 items-center justify-center rounded-full bg-white shadow-[0_20px_45px_-15px_rgba(23,19,16,0.3)]">
              <Search className="size-16 text-brand-red" strokeWidth={1.5} />
            </div>
            <div className="absolute right-10 top-10 flex size-14 items-center justify-center rounded-2xl bg-brand-yellow text-ink shadow-lg animate-float">
              <TriangleAlert className="size-7" />
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.1}>
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-red">
            Prima di firmare
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            I problemi nascosti sono nei documenti.
          </h2>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink/65">
            Una casa può sembrare perfetta, ma i problemi spesso si nascondono nei
            documenti:
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {hiddenProblems.map((problem) => (
              <li key={problem} className="flex items-start gap-2.5 text-[15px] text-ink/70">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-red" />
                {problem}
              </li>
            ))}
          </ul>
          <p className="mt-8 font-display text-xl font-bold text-ink">
            Meglio scoprirli <span className="text-brand-red">prima che dopo.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
