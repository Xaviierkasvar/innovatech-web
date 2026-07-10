/**
 * Generadores de datos estructurados JSON-LD (schema.org).
 * Se inyectan como <script type="application/ld+json"> desde el layout/páginas.
 */
import { siteConfig } from './site';
import { services } from './data';

// Teléfono en formato E.164 (sin espacios) — el que prefiere schema.org/Google.
const phoneE164 = siteConfig.phone.replace(/\s/g, '');
// Imagen para los nodos LocalBusiness/Organization (OG image 1200×630, PNG real).
const orgImage = `${siteConfig.url}/opengraph-image`;

function postalAddress(loc: (typeof siteConfig.locations)[number]) {
  return {
    '@type': 'PostalAddress',
    streetAddress: loc.street,
    addressLocality: loc.city,
    addressRegion: loc.region,
    postalCode: loc.postalCode,
    addressCountry: loc.countryCode,
  };
}

/** Organization con las dos sedes (Bogotá principal, Barranquilla adicional). */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    image: orgImage,
    description: siteConfig.description,
    foundingDate: String(siteConfig.foundingYear),
    email: siteConfig.email,
    telephone: phoneE164,
    address: siteConfig.locations.map(postalAddress),
    location: siteConfig.locations.map((loc) => ({
      '@type': 'Place',
      name: `${siteConfig.shortName} — ${loc.city}`,
      address: postalAddress(loc),
      geo: {
        '@type': 'GeoCoordinates',
        latitude: loc.geo.lat,
        longitude: loc.geo.lng,
      },
    })),
    // sameAs se omite hasta contar con perfiles de redes sociales reales.
    // Al agregarlos en siteConfig.social, reintroducir aquí como array de URLs.
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: siteConfig.email,
      telephone: phoneE164,
      areaServed: 'CO',
      availableLanguage: ['es', 'en'],
    },
  };
}

/** LocalBusiness por cada sede (mejora SEO local para Bogotá y Barranquilla). */
export function localBusinessJsonLd() {
  return siteConfig.locations.map((loc) => ({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.url}/#${loc.id}`,
    name: `${siteConfig.shortName} — ${loc.city}`,
    parentOrganization: { '@id': `${siteConfig.url}/#organization` },
    url: siteConfig.url,
    image: orgImage,
    email: siteConfig.email,
    telephone: phoneE164,
    address: postalAddress(loc),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.geo.lat,
      longitude: loc.geo.lng,
    },
    areaServed: { '@type': 'Country', name: 'Colombia' },
  }));
}

/** Un nodo Service por cada servicio ofrecido. */
export function servicesJsonLd() {
  return services.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteConfig.url}/#service-${s.slug}`,
    serviceType: s.title,
    name: s.title,
    description: s.description,
    provider: { '@id': `${siteConfig.url}/#organization` },
    areaServed: { '@type': 'Country', name: 'Colombia' },
  }));
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    inLanguage: 'es-CO',
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function blogPostJsonLd(post: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${siteConfig.url}/blog/${post.slug}/#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@id': `${siteConfig.url}/#organization` },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    inLanguage: 'es-CO',
  };
}
