'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { testimonials } from '@/lib/data';

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  // Autoplay pausable (se reinicia al cambiar de slide manualmente).
  useEffect(() => {
    if (count === 0) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [count, index]);

  // Sin testimonios reales, la sección no se muestra en producción.
  if (count === 0) return null;

  const t = testimonials[index];

  return (
    <section id="testimonios" className="scroll-mt-20 py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimonios"
          title="Lo que dicen quienes trabajan con nosotros"
        />

        <div className="relative mx-auto mt-12 max-w-3xl">
          <Quote className="mx-auto h-10 w-10 text-brand-500/30" />

          <div className="relative mt-6 min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p className="text-balance text-xl font-medium leading-relaxed sm:text-2xl">
                  “{t.quote}”
                </p>
                <footer className="mt-8 flex items-center justify-center gap-3">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white"
                    aria-hidden="true"
                  >
                    {t.initials}
                  </span>
                  <span className="text-left">
                    <span className="block font-semibold">{t.role}</span>
                    <span className="text-muted block text-sm">{t.sector}</span>
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controles */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Testimonio anterior"
              className="grid h-10 w-10 place-items-center rounded-full surface-card text-muted transition-colors hover:text-brand-500"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2" role="tablist" aria-label="Seleccionar testimonio">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonio ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? 'w-6 bg-brand-500' : 'w-2 bg-[rgb(var(--border))]'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Testimonio siguiente"
              className="grid h-10 w-10 place-items-center rounded-full surface-card text-muted transition-colors hover:text-brand-500"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
