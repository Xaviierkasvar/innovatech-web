import { SectionHeading } from '../ui/SectionHeading';
import { Reveal, StaggerGroup, StaggerItem } from '../ui/Reveal';
import { technologies } from '@/lib/data';

export function Technologies() {
  return (
    <section id="tecnologias" className="scroll-mt-20 border-y border-[rgb(var(--border))] bg-[rgb(var(--card))]/40 py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Tecnologías"
          title="El stack que dominamos"
          subtitle="Elegimos la herramienta correcta para cada problema, no la de moda. Estas son las tecnologías con las que trabajamos a diario."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {technologies.map((cat, catIndex) => (
            <Reveal key={cat.name} delay={catIndex * 0.08}>
              <div className="surface-card h-full rounded-2xl p-6">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  {cat.name}
                </h3>
                <StaggerGroup className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <StaggerItem key={item}>
                      <span className="inline-flex rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-1.5 text-sm font-medium transition-colors hover:border-brand-400 hover:text-brand-500">
                        {item}
                      </span>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
