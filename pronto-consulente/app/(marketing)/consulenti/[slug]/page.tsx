import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { consultants, getConsultantBySlug } from "@/data/consultants";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileNav, ProfileContent } from "@/components/profile/ProfileContent";

export function generateStaticParams() {
  return consultants.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const consultant = getConsultantBySlug(params.slug);
  if (!consultant) return { title: "Consulente non trovato" };
  return {
    title: `${consultant.fullName} — ${consultant.title}`,
    description: `${consultant.bio.slice(0, 155)}…`,
    openGraph: {
      title: `${consultant.fullName} — ${consultant.title} | Pronto Consulente`,
      description: consultant.bio,
      images: [consultant.avatarUrl],
    },
  };
}

export default function ConsultantProfilePage({ params }: { params: { slug: string } }) {
  const consultant = getConsultantBySlug(params.slug);
  if (!consultant) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: consultant.fullName,
    description: consultant.bio,
    image: consultant.avatarUrl,
    areaServed: consultant.location,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: consultant.rating,
      reviewCount: consultant.reviewCount,
    },
    priceRange: `Da ${consultant.startingPrice}€`,
  };

  return (
    <div>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProfileHeader consultant={consultant} />
      <ProfileNav />
      <ProfileContent consultant={consultant} />
    </div>
  );
}
