import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { blogPostJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';
import { siteConfig } from '@/lib/site';
import { posts, getPost } from '@/lib/blog';

type Params = { slug: string };

// Prerenderiza todas las rutas de blog en build (SSG → mejor SEO y LCP).
export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: 'Artículo no encontrado' };

  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPostPage({ params }: { params: Params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={[
          blogPostJsonLd(post),
          breadcrumbJsonLd([
            { name: 'Inicio', url: siteConfig.url },
            { name: 'Blog', url: `${siteConfig.url}/blog` },
            { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
          ]),
        ]}
      />
      <Navbar />
      <main className="pt-32">
        <article className="container-page pb-24">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="text-muted inline-flex items-center gap-1.5 text-sm transition-colors hover:text-brand-500"
            >
              <ArrowLeft className="h-4 w-4" /> Volver al blog
            </Link>

            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-xs font-medium text-brand-400">
                  {t}
                </span>
              ))}
            </div>

            <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl md:leading-[1.1]">
              {post.title}
            </h1>

            <div className="text-muted mt-5 flex items-center gap-4 text-sm">
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {post.readingMinutes} min de lectura
              </span>
            </div>

            <div className="mt-10 space-y-6 text-lg leading-relaxed text-[rgb(var(--foreground))]/90">
              {post.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-14 surface-card rounded-2xl p-6 text-center">
              <p className="font-medium">¿Te resultó útil? Hablemos de tu proyecto.</p>
              <Link
                href="/#contacto"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-500"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
