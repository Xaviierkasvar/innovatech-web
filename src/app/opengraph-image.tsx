import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site';

// Imagen Open Graph generada dinámicamente (1200×630) — usada por og:image y twitter:image.
export const runtime = 'edge';
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #050816 0%, #142257 60%, #0891b2 100%)',
          padding: 80,
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #337dff, #06b6d4)',
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            IS
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>INNOVATECH SOLUTIONS</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
            Ingeniería de software que impulsa tu negocio
          </div>
          <div style={{ fontSize: 30, marginTop: 24, color: '#8ec4ff' }}>
            Software a medida · Web & Móvil · Cloud & DevOps
          </div>
        </div>

        <div style={{ fontSize: 26, color: '#bcdbff' }}>Bogotá · Barranquilla · Colombia</div>
      </div>
    ),
    { ...size },
  );
}
