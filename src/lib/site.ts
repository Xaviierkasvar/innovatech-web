/**
 * Configuración central del sitio: identidad de la empresa, sedes y contacto.
 * Un solo lugar para editar datos corporativos (los consumen metadata, JSON-LD,
 * footer y sección de contacto).
 */

export const siteConfig = {
  name: 'INNOVATECH SOLUTIONS GLOBAL S.A.S',
  shortName: 'INNOVATECH',
  legalName: 'INNOVATECH SOLUTIONS GLOBAL S.A.S',
  tagline: 'Ingeniería de software que impulsa negocios',
  description:
    'INNOVATECH SOLUTIONS GLOBAL S.A.S es una empresa colombiana de desarrollo de software a medida, aplicaciones web y móviles, arquitectura cloud-native y DevOps. Sede en Bogotá y hub de desarrollo en Barranquilla.',
  // Cambia esto por tu dominio definitivo antes de desplegar.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.innovatechsolutions.lat',
  locale: 'es_CO',
  email: 'contacto@innovatechsolutions.lat',
  // TODO: reemplazar por el teléfono real de la empresa.
  phone: '+57 300 000 0000',
  foundingYear: 2018,
  social: {
    // TODO: reemplazar por las URLs reales de redes sociales.
    linkedin: 'https://www.linkedin.com/company/innovatech-solutions-global',
    github: 'https://github.com/innovatech-solutions',
    x: 'https://x.com/innovatech',
    instagram: 'https://www.instagram.com/innovatech.solutions',
  },
  locations: [
    {
      id: 'bogota',
      type: 'headquarters' as const,
      label: 'Sede principal',
      city: 'Bogotá',
      region: 'Cundinamarca',
      country: 'Colombia',
      countryCode: 'CO',
      // TODO: reemplazar por la dirección exacta de la oficina.
      street: 'Cra. 7 # 71-52, Torre B',
      postalCode: '110231',
      geo: { lat: 4.711, lng: -74.0721 },
    },
    {
      id: 'barranquilla',
      type: 'office' as const,
      label: 'Hub de desarrollo',
      city: 'Barranquilla',
      region: 'Atlántico',
      country: 'Colombia',
      countryCode: 'CO',
      // TODO: reemplazar por la dirección exacta de la oficina.
      street: 'Cl. 76 # 54-11, Piso 4',
      postalCode: '080020',
      geo: { lat: 10.9968, lng: -74.7911 },
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type Location = (typeof siteConfig.locations)[number];
