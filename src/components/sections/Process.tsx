import { SectionHeading } from '../ui/SectionHeading';
import { StaggerGroup, StaggerItem } from '../ui/Reveal';
import { Icon } from '../ui/Icon';
import { process } from '@/lib/data';

export function Process() {
  return (
    <section id="proceso" className="scroll-mt-20 border-y border-[rgb(var(--border))] bg-[rgb(var(--card))]/40 py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Proceso de trabajo"
          title="De la idea al producto en cinco fases"
          subtitle="Un método probado que reduce riesgo y mantiene la transparencia en cada etapa."
        />

        <StaggerGroup className="relative mt-16">
          {/* Línea de la timeline (desktop) */}
          <div className="absolute left-0 right-0 top-[46px] hidden h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent lg:block" />

          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((p) => (
              <StaggerItem key={p.step}>
                <li className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="relative z-10 grid h-[92px] w-[92px] place-items-center rounded-2xl surface-card">
                    <Icon name={p.icon} className="h-7 w-7 text-brand-500" />
                    <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white">
                      {p.step}
                    </span>
                  </div>
                  <h3 className="mt-5 font-semibold">{p.title}</h3>
                  <p className="text-muted mt-2 text-sm leading-relaxed">{p.description}</p>
                </li>
              </StaggerItem>
            ))}
          </ol>
        </StaggerGroup>
      </div>
    </section>
  );
}
