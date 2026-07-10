'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { projects, projectCategories, type Project } from '@/lib/data';
import { cn } from '@/lib/utils';

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>('Todos');
  const [active, setActive] = useState<Project | null>(null);

  const visible = filter === 'Todos' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="portafolio" className="scroll-mt-20 py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Portafolio"
          title="Casos de éxito"
          subtitle="Casos de estudio representativos de nuestro trabajo (problema → solución → stack → resultado). Los nombres de clientes se omiten por confidencialidad."
        />

        {/* Filtros */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                filter === cat
                  ? 'border-brand-500 bg-brand-600 text-white'
                  : 'border-[rgb(var(--border))] text-muted hover:border-brand-400 hover:text-[rgb(var(--foreground))]',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.article
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActive(p)}
                className="surface-card group flex cursor-pointer flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400 hover:shadow-xl hover:shadow-brand-500/5"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-400">
                    {p.category}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-snug">{p.title}</h3>
                <p className="text-muted mt-2 flex-1 text-sm leading-relaxed">{p.problem}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 4).map((t) => (
                    <li key={t} className="rounded border border-[rgb(var(--border))] px-2 py-0.5 text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal de detalle */}
      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="surface-card relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-[rgb(var(--border))] text-muted hover:text-[rgb(var(--foreground))]"
        >
          <X className="h-4 w-4" />
        </button>

        <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-400">
          {project.category}
        </span>
        <h3 className="mt-4 text-2xl font-bold">{project.title}</h3>

        <div className="mt-6 space-y-5">
          <Field label="El reto" value={project.problem} />
          <Field label="La solución" value={project.solution} />
          <Field label="El resultado" value={project.result} />
        </div>

        <div className="mt-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-400">Stack utilizado</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <li
                key={t}
                className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-1.5 text-sm"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-400">{label}</h4>
      <p className="text-muted mt-1.5 leading-relaxed">{value}</p>
    </div>
  );
}
