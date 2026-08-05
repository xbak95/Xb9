import type { MetadataRoute } from "next";

const baseUrl = "https://www.prontoconsulente.it";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/admin"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
