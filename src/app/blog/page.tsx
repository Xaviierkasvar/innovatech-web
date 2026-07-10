import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StaggerGroup, StaggerItem } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { siteConfig } from '@/lib/site';
import { posts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Artículos sobre desarrollo de software, arquitectura cloud-native, DevOps y seguridad informática por el equipo de INNOVATECH.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog · INNOVATECH',
    description:
      'Artículos sobre desarrollo de software, cloud-native, DevOps y seguridad por el equipo de INNOVATECH.',
    url: `${siteConfig.url}/blog`,
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogIndex() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', url: siteConfig.url },
          { name: 'Blog', url: `${siteConfig.url}/blog` },
        ])}
      />
      <Navbar />
      <main className="pt-32">
        <div className="container-page pb-24">
          <SectionHeading
            align="left"
            as="h1"
            eyebrow="Blog"
            title="Ideas de ingeniería"
            subtitle="Reflexiones prácticas sobre cómo construimos software: arquitectura, cloud, DevOps y seguridad."
          />

          <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <article className="surface-card group flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <span key={t} className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-xs font-medium text-brand-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-4 text-lg font-semibold leading-snug">
                    <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-brand-500">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-muted mt-2 flex-1 text-sm leading-relaxed">{post.excerpt}</p>
                  <div className="text-muted mt-5 flex items-center justify-between text-xs">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {post.readingMinutes} min
                    </span>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mt-16 surface-card rounded-3xl p-8 text-center">
            <h2 className="text-xl font-semibold">¿Tienes un proyecto en mente?</h2>
            <p className="text-muted mx-auto mt-2 max-w-md text-sm">
              Convertimos ideas en producto. Cuéntanos qué quieres construir.
            </p>
            <Link
              href="/#contacto"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-medium text-white transition-colors hover:bg-brand-500"
            >
              Hablemos de tu proyecto <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
