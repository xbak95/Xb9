import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, User, ArrowRight, BookOpen } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guide, approfondimenti e novità su finanza agevolata, sicurezza sul lavoro, privacy, startup e consulenza professionale a cura di Pronto Consulente.",
};

export default function BlogPage() {
  return (
    <div>
      <section className="section-y">
        <div className="container-px">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-gold-600">Blog</span>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Guide e approfondimenti per imprese e professionisti</h1>
            <p className="mt-5 text-lg text-body">
              Articoli pratici su finanza agevolata, sicurezza sul lavoro, privacy, startup e
              scelta del consulente giusto, scritti per chi deve prendere decisioni concrete.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.id} hover as="article" className="flex flex-col overflow-hidden">
                <div className="flex h-36 items-center justify-center bg-gradient-to-br from-navy-800 to-navy-950 text-navy-100">
                  <BookOpen className="h-8 w-8 opacity-70" />
                </div>
                <CardBody className="flex flex-1 flex-col">
                  <Badge tone="navy" className="self-start">{post.category}</Badge>
                  <h2 className="mt-3 text-lg font-semibold leading-snug text-navy">
                    <Link href={`/blog/${post.slug}`} className="hover:text-institutional">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-body">{post.excerpt}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-body">
                    <span className="inline-flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {post.author}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(post.date)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTimeMinutes} min
                    </span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-institutional hover:text-navy-800"
                  >
                    Leggi l'articolo
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
