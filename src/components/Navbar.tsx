'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/site';

const navLinks = [
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#tecnologias', label: 'Tecnologías' },
  { href: '/#portafolio', label: 'Portafolio' },
  { href: '/#proceso', label: 'Proceso' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contacto', label: 'Contacto' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloquea el scroll de fondo cuando el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-[rgb(var(--border))] bg-[rgb(var(--background))]/80 backdrop-blur-lg'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Principal">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-white">
            IS
          </span>
          <span className="hidden sm:inline">
            <span className="gradient-text">INNOVA</span>TECH
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:bg-[rgb(var(--card))] hover:text-[rgb(var(--foreground))]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            className="grid h-9 w-9 place-items-center rounded-full border border-[rgb(var(--border))] text-muted transition-colors hover:text-[rgb(var(--foreground))]"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            href="/#contacto"
            className="hidden rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-500 md:inline-flex"
          >
            Hablemos
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full border border-[rgb(var(--border))] lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {open && (
        <div className="border-t border-[rgb(var(--border))] bg-[rgb(var(--background))] lg:hidden">
          <ul className="container-page flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base text-muted transition-colors hover:bg-[rgb(var(--card))] hover:text-[rgb(var(--foreground))]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="px-4 pt-2">
              <Link
                href="/#contacto"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-brand-600 px-4 py-3 text-center text-base font-medium text-white"
              >
                Hablemos de tu proyecto
              </Link>
            </li>
            <li className="px-4 pt-3 text-center text-xs text-muted">{siteConfig.email}</li>
          </ul>
        </div>
      )}
    </header>
  );
}
