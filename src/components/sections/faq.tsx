import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Faq() {
  return (
    <section id="faq" className="bg-cream py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-red">
            Domande frequenti
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            Tutto quello che vuoi sapere
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-2xl rounded-3xl bg-white px-6 sm:px-10">
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
