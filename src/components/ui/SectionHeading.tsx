import { Reveal } from './Reveal';
import { cn } from '@/lib/utils';

/** Encabezado de sección reutilizable con eyebrow, título y subtítulo. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  as = 'h2',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'center' | 'left';
  as?: 'h1' | 'h2';
}) {
  const Tag = as;
  return (
    <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-400">
          {eyebrow}
        </span>
      )}
      <Tag className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </Tag>
      {subtitle && <p className="text-muted mt-4 text-lg leading-relaxed">{subtitle}</p>}
    </Reveal>
  );
}
