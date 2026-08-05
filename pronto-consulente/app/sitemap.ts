import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { consultants } from "@/data/consultants";
import { blogPosts } from "@/data/blog-posts";

const baseUrl = "https://www.prontoconsulente.it";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "daily" as const },
  { path: "/chi-siamo", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/come-funziona", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/per-consulenti", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/prezzi", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/centro-assistenza", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/contatti", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/termini", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/cookie", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/politica-cancellazione", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/segnalazioni", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/verifica-consulente", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/categorie", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/ricerca", priority: 0.9, changeFrequency: "daily" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/ricerca?categoria=${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const consultantEntries: MetadataRoute.Sitemap = consultants.map((c) => ({
    url: `${baseUrl}/consulenti/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...categoryEntries, ...blogEntries, ...consultantEntries];
}
