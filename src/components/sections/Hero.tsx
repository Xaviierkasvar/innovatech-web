'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { stats } from '@/lib/data';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Fondo decorativo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-pattern absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px] animate-float" />
        <div className="absolute top-20 right-0 h-[300px] w-[300px] rounded-full bg-accent-500/10 blur-[100px]" />
      </div>

      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-400">
            <Sparkles className="h-4 w-4" />
            Bogotá · Barranquilla · Colombia
          </span>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl md:leading-[1.05]">
            Ingeniería de software que{' '}
            <span className="gradient-text">impulsa tu negocio</span>
          </h1>

          <p className="text-muted mx-auto mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">
            Desarrollamos software a medida, aplicaciones web y móviles, y arquitecturas
            cloud-native. Un socio técnico que traduce tus objetivos en producto.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/#contacto" size="lg">
              Hablemos de tu proyecto
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="/#portafolio" variant="secondary" size="lg">
              Ver casos de éxito
            </Button>
          </div>
        </motion.div>

        {/* Estadísticas */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--border))] md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-[rgb(var(--background))] p-6 text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <div className="text-3xl font-bold text-brand-500 sm:text-4xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-muted mt-1 text-sm">{s.label}</div>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
