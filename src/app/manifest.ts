import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#050816',
    theme_color: '#1c5cf5',
    icons: [
      // SVG escalable (funciona como icono de app). Para máxima compatibilidad
      // añade además icon-192.png e icon-512.png en /public y regístralos aquí.
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
