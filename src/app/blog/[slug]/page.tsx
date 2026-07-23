import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ChevronRight } from "lucide-react";
import { mockBlogPosts } from "@/lib/data/mock-blog";
import JsonLd from "@/components/seo/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://darova-immobilier.ma";

export function generateStaticParams() {
  return mockBlogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = mockBlogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.cover_image, width: 1200, height: 630 }],
      type: "article",
    },
    alternates: { canonical: `${siteUrl}/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = mockBlogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = mockBlogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image,
    datePublished: post.published_at,
    author: { "@type": "Person", name: post.author_name },
    publisher: { "@type": "Organization", name: "Darova Immobilier" },
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="bg-cream pb-24 pt-32">
        <div className="container max-w-3xl">
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-navy-500">
            <Link href="/" className="hover:text-gold-600">Accueil</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/blog" className="hover:text-gold-600">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-navy-900 line-clamp-1">{post.title}</span>
          </nav>

          <span className="mb-3 inline-block rounded-sm bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-800">
            {post.category}
          </span>
          <h1 className="mb-4 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            {post.title}
          </h1>
          <div className="mb-8 flex items-center gap-4 text-sm text-navy-500">
            <div className="flex items-center gap-2">
              <Image
                src={post.author_avatar}
                alt={post.author_name}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
              {post.author_name}
            </div>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.read_time} min de lecture
            </span>
          </div>

          <div className="relative mb-10 h-72 w-full overflow-hidden rounded-md sm:h-96">
            <Image src={post.cover_image} alt={post.title} fill className="object-cover" priority />
          </div>

          <div className="prose-p:leading-relaxed space-y-5 text-[17px] leading-relaxed text-navy-700">
            <p>{post.content}</p>
          </div>
        </div>

        {related.length > 0 && (
          <div className="container mt-20 max-w-5xl border-t border-navy-900/8 pt-14">
            <h2 className="mb-8 font-display text-2xl font-semibold text-navy-900">
              À lire aussi
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="group card-premium overflow-hidden">
                  <div className="relative h-36 w-full overflow-hidden">
                    <Image src={r.cover_image} alt={r.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <p className="font-display text-sm font-semibold text-navy-900 line-clamp-2 group-hover:text-gold-700">
                      {r.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
