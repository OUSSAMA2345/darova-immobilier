import { MetadataRoute } from "next";
import { mockProperties } from "@/lib/data/mock-properties";
import { mockBlogPosts } from "@/lib/data/mock-blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://darova-immobilier.ma";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/proprietes-a-vendre",
    "/proprietes-a-louer",
    "/a-propos",
    "/contact",
    "/estimation-gratuite",
    "/blog",
    "/faq",
    "/confidentialite",
    "/conditions-generales",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const propertyRoutes = mockProperties.map((p) => ({
    url: `${siteUrl}/propriete/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogRoutes = mockBlogPosts.map((b) => ({
    url: `${siteUrl}/blog/${b.slug}`,
    lastModified: new Date(b.published_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...propertyRoutes, ...blogRoutes];
}
