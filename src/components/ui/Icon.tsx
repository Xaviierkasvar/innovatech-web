import {
  Globe,
  Cloud,
  Webhook,
  Boxes,
  ShieldCheck,
  Rocket,
  Search,
  PenTool,
  Code2,
  LifeBuoy,
  type LucideProps,
} from 'lucide-react';

/** Mapa de nombres (strings en data.ts) a componentes de ícono. */
const icons = {
  Globe,
  Cloud,
  Webhook,
  Boxes,
  ShieldCheck,
  Rocket,
  Search,
  PenTool,
  Code2,
  LifeBuoy,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = icons[name as IconName] ?? Boxes;
  return <Cmp aria-hidden="true" {...props} />;
}
