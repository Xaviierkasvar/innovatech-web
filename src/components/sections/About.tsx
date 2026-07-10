import { MapPin, Gauge, Cloud, Target } from 'lucide-react';
import { Reveal, StaggerGroup, StaggerItem } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

const values = [
  {
    icon: Gauge,
    title: 'Ágil de verdad',
    text: 'Ciclos cortos, entregas frecuentes y feedback continuo. Nada de cajas negras: ves el avance real.',
  },
  {
    icon: Cloud,
    title: 'Cloud-native',
    text: 'Arquitecturas pensadas para escalar, automatizadas de extremo a extremo con DevOps.',
  },
  {
    icon: Target,
    title: 'Orientados a resultados',
    text: 'No entregamos features, entregamos impacto medible en tu negocio.',
  },
];

export function About() {
  return (
    <section id="nosotros" className="scroll-mt-20 py-24">
      <div className="container-page grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Sobre nosotros"
            title={<>Un equipo técnico que piensa como tu socio</>}
            subtitle="Somos una empresa colombiana de desarrollo de software. Nacimos para construir producto de calidad, con la disciplina de ingeniería que los proyectos serios exigen."
          />

          <Reveal delay={0.1}>
            <p className="text-muted mt-6 leading-relaxed">
              Operamos desde dos ciudades: nuestra{' '}
              <strong className="text-[rgb(var(--foreground))]">sede principal en Bogotá</strong> y
              nuestro{' '}
              <strong className="text-[rgb(var(--foreground))]">
                hub de desarrollo en Barranquilla
              </strong>
              . Esta presencia nos da acceso a talento diverso y cercanía con clientes en toda
              Colombia y la región.
            </p>
          </Reveal>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full surface-card px-4 py-2 text-sm">
              <MapPin className="h-4 w-4 text-brand-500" /> Bogotá — Sede principal
            </span>
            <span className="inline-flex items-center gap-2 rounded-full surface-card px-4 py-2 text-sm">
              <MapPin className="h-4 w-4 text-accent-500" /> Barranquilla — Hub de desarrollo
            </span>
          </div>
        </div>

        <StaggerGroup className="grid gap-4">
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="surface-card flex gap-4 rounded-2xl p-6 transition-colors hover:border-brand-400">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-500">
                  <v.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{v.title}</h3>
                  <p className="text-muted mt-1 text-sm leading-relaxed">{v.text}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
