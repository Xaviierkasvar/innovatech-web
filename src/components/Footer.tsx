import Link from 'next/link';
import { Linkedin, Github, Twitter, Instagram, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { services } from '@/lib/data';

const socials = [
  { href: siteConfig.social.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: siteConfig.social.github, label: 'GitHub', Icon: Github },
  { href: siteConfig.social.x, label: 'X', Icon: Twitter },
  { href: siteConfig.social.instagram, label: 'Instagram', Icon: Instagram },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--card))]/40">
      <div className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-white">
                IS
              </span>
              <span>
                <span className="gradient-text">INNOVA</span>TECH
              </span>
            </Link>
            <p className="text-muted mt-4 max-w-xs text-sm leading-relaxed">
              {siteConfig.tagline}. Desarrollo de software a medida, cloud y DevOps desde Colombia.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-[rgb(var(--border))] text-muted transition-colors hover:border-brand-400 hover:text-brand-500"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <nav aria-label="Servicios">
            <h3 className="text-sm font-semibold">Servicios</h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href="/#servicios" className="text-muted text-sm transition-colors hover:text-brand-500">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Enlaces */}
          <nav aria-label="Navegación">
            <h3 className="text-sm font-semibold">Empresa</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: '/#nosotros', label: 'Sobre nosotros' },
                { href: '/#portafolio', label: 'Portafolio' },
                { href: '/#proceso', label: 'Proceso' },
                { href: '/blog', label: 'Blog' },
                { href: '/#contacto', label: 'Contacto' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted text-sm transition-colors hover:text-brand-500">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sedes */}
          <div>
            <h3 className="text-sm font-semibold">Ubicaciones</h3>
            <ul className="mt-4 space-y-4">
              {siteConfig.locations.map((loc) => (
                <li key={loc.id} className="text-sm">
                  <div className="font-medium">
                    {loc.city} <span className="text-muted font-normal">· {loc.label}</span>
                  </div>
                  <div className="text-muted">{loc.street}</div>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-muted inline-flex items-center gap-1.5 text-sm transition-colors hover:text-brand-500"
                >
                  <Mail className="h-3.5 w-3.5" /> {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[rgb(var(--border))] pt-8 text-sm text-muted sm:flex-row">
          <p>
            © {year} {siteConfig.legalName}. Todos los derechos reservados.
          </p>
          <p>Hecho con precisión de ingeniería en Colombia 🇨🇴</p>
        </div>
      </div>
    </footer>
  );
}
