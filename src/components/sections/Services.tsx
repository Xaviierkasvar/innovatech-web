import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { StaggerGroup, StaggerItem } from '../ui/Reveal';
import { Icon } from '../ui/Icon';
import { services } from '@/lib/data';
import { cn } from '@/lib/utils';

export function Services() {
  return (
    <section id="servicios" className="scroll-mt-20 py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Servicios"
          title="Todo lo que tu producto necesita, bajo un mismo techo"
          subtitle="Seis áreas de especialización que cubren el ciclo completo: del código a la nube, de la idea al soporte."
        />

        <StaggerGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <StaggerItem key={s.slug}>
              <article
                className={cn(
                  'surface-card group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400 hover:shadow-xl hover:shadow-brand-500/5',
                  // Primera tarjeta destacada al estilo bento.
                  i === 0 && 'sm:col-span-2 lg:col-span-1',
                )}
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-500/5 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500/15 to-accent-500/10 text-brand-500">
                  <Icon name={s.icon} className="h-6 w-6" />
                </div>
                <h3 className="flex items-center gap-1 text-lg font-semibold">
                  {s.title}
                  <ArrowUpRight className="h-4 w-4 text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                </h3>
                <p className="text-muted mt-2 flex-1 text-sm leading-relaxed">{s.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="rounded-full border border-[rgb(var(--border))] px-2.5 py-1 text-xs text-muted"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
