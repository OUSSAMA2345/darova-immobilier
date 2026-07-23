import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { mockBlogPosts } from "@/lib/data/mock-blog";

export const metadata: Metadata = {
  title: "Blog immobilier — Actualités et conseils Casablanca",
  description:
    "Analyses de marché, guides pratiques et conseils d'investissement pour acheter, vendre ou louer un bien immobilier à Casablanca.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog immobilier"
        title="Actualités et conseils du marché casablancais"
        description="Analyses de prix, guides pratiques et conseils d'experts pour réussir votre projet immobilier."
      />
      <section className="section-pad bg-white">
        <div className="container">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {mockBlogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group card-premium overflow-hidden">
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute left-4 top-4 rounded-sm bg-gold-gradient px-3 py-1 text-xs font-semibold text-navy-900">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="mb-2 font-display text-lg font-semibold text-navy-900 line-clamp-2 group-hover:text-gold-700">
                    {post.title}
                  </h2>
                  <p className="mb-4 text-sm text-navy-500 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-navy-400">
                    <span>{post.author_name}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.read_time} min de lecture
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
