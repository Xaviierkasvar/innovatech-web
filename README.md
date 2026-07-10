# INNOVATECH SOLUTIONS GLOBAL S.A.S — Sitio web corporativo

Sitio web corporativo construido con **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion** y **EmailJS**. Diseño mobile-first, modo claro/oscuro, SEO técnico (JSON-LD, sitemap, robots, OG dinámico) y formulario de contacto con doble notificación.

---

## 🧱 Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 14 (App Router) + React 18 |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS 3 |
| Animación | Framer Motion 11 |
| Iconos | lucide-react |
| Email | @emailjs/browser 4 |
| Deploy | Vercel (o Azure Static Web Apps) |

---

## 🚀 Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# → edita .env.local con tus claves de EmailJS (ver más abajo)

# 3. Entorno de desarrollo
npm run dev          # http://localhost:3000

# 4. Build de producción
npm run build
npm start

# Utilidades
npm run lint         # ESLint (next/core-web-vitals)
npm run typecheck    # tsc --noEmit
```

Requisitos: **Node.js 18.17+** (probado en Node 20).

---

## 🔐 Variables de entorno

Todas viven en `.env.local` (ignorado por git). Las `NEXT_PUBLIC_*` se exponen al navegador — es lo esperado para EmailJS, cuyas claves son **públicas por diseño**.

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (canonical, sitemap, robots, OG). Ej: `https://www.innovatechsolutions.lat` |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Service ID del servicio de correo en EmailJS |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_NOTIFICACION` | Template de notificación interna (al equipo) |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_AUTORESPUESTA` | Template de auto-respuesta (al visitante) |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Public Key de tu cuenta EmailJS |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | (Opcional) código de verificación de Google Search Console |

> Mientras falten las claves de EmailJS, el formulario valida y muestra un aviso claro de "no configurado" en lugar de fallar silenciosamente.

---

## ✉️ Configurar EmailJS

1. Crea una cuenta en **https://dashboard.emailjs.com** y conecta un **Email Service** (Gmail, Outlook, SMTP propio…). Copia su **Service ID**.
2. En **Account → General**, copia tu **Public Key**.
3. Crea **dos plantillas** (Email Templates). El formulario envía estas variables:

   `from_name`, `reply_to`, `company`, `phone`, `project_type`, `message`, `to_email`

   ### Template 1 — Notificación interna → `contacto@innovatechsolutions.lat`
   - **To Email:** `contacto@innovatechsolutions.lat` (o usa `{{to_email}}`)
   - **Reply To:** `{{reply_to}}`
   - **Subject:** `Nueva solicitud de contacto de {{from_name}}`
   - **Cuerpo sugerido:**
     ```
     Nombre:   {{from_name}}
     Correo:   {{reply_to}}
     Empresa:  {{company}}
     Teléfono: {{phone}}
     Tipo:     {{project_type}}

     Mensaje:
     {{message}}
     ```
   - Copia el **Template ID** → `NEXT_PUBLIC_EMAILJS_TEMPLATE_NOTIFICACION`.

   ### Template 2 — Auto-respuesta → al visitante
   - **To Email:** `{{reply_to}}`
   - **Subject:** `Recibimos tu solicitud — INNOVATECH SOLUTIONS`
   - **Cuerpo sugerido:**
     ```
     Hola {{from_name}},

     ¡Gracias por escribirnos! Recibimos tu solicitud sobre "{{project_type}}"
     y nuestro equipo te responderá en menos de 24 horas hábiles.

     Un saludo,
     Equipo INNOVATECH SOLUTIONS GLOBAL S.A.S
     ```
   - Copia el **Template ID** → `NEXT_PUBLIC_EMAILJS_TEMPLATE_AUTORESPUESTA`.

4. Pega los 4 valores en `.env.local` (y en el panel de tu proveedor de despliegue).

**Cómo funciona en el código** (`src/components/sections/Contact.tsx`):
validación en cliente → honeypot anti-spam → dos llamadas `emailjs.send()` (interna + auto-respuesta) → estados de UI `idle / enviando / éxito / error`, con el botón deshabilitado mientras se procesa para evitar envíos duplicados.

---

## 📈 SEO incluido

- **Metadata API** por página (`title`, `description`, `og:*`, `twitter:*`, canonical).
- **JSON-LD** (`src/lib/jsonld.ts`): `Organization` con las dos sedes, `ProfessionalService` (LocalBusiness) por ciudad, un `Service` por servicio, `WebSite`, `BreadcrumbList` y `BlogPosting`.
- `app/sitemap.ts` → `/sitemap.xml` y `app/robots.ts` → `/robots.txt` automáticos.
- Open Graph **generado dinámicamente** en `app/opengraph-image.tsx` (1200×630).
- HTML semántico, un solo `<h1>` por página, `next/font` (sin CLS), `next/image` para imágenes que agregues.
- `prefers-reduced-motion` respetado; foco visible por teclado; contraste AA.

> **Antes de producción**, cambia `NEXT_PUBLIC_SITE_URL` al dominio real para que canonical/sitemap/OG apunten bien.

---

## 🗂️ Estructura

```
src/
├─ app/
│  ├─ layout.tsx            # Metadata global, fuentes, tema, JSON-LD Organization/WebSite
│  ├─ page.tsx              # Home (todas las secciones)
│  ├─ globals.css           # Tokens de tema claro/oscuro + utilidades
│  ├─ sitemap.ts robots.ts manifest.ts
│  ├─ opengraph-image.tsx   # OG dinámico
│  ├─ icon.svg              # Favicon
│  ├─ not-found.tsx loading.tsx
│  └─ blog/
│     ├─ page.tsx           # Listado
│     └─ [slug]/page.tsx    # Detalle (SSG + metadata dinámica)
├─ components/
│  ├─ Navbar.tsx Footer.tsx ThemeProvider.tsx JsonLd.tsx
│  ├─ sections/             # Hero, About, Services, Technologies, Portfolio, Process, Testimonials, Contact
│  └─ ui/                   # Button, Reveal, AnimatedCounter, SectionHeading, Icon
└─ lib/
   ├─ site.ts               # Datos corporativos (sedes, contacto, redes)
   ├─ data.ts               # Servicios, tecnologías, proyectos, proceso, testimonios, stats
   ├─ blog.ts               # Posts iniciales
   ├─ jsonld.ts utils.ts
```

### ✍️ Dónde editar contenido
- **Datos de la empresa / sedes / redes:** `src/lib/site.ts`
- **Servicios, tecnologías, portafolio, proceso, testimonios, stats:** `src/lib/data.ts`
- **Artículos del blog:** `src/lib/blog.ts`

---

## 🧩 Placeholders a reemplazar antes de producción

Buscar `TODO` en el código. Pendientes clave:

- [ ] **`src/lib/site.ts`**: direcciones exactas de Bogotá y Barranquilla, URLs reales de redes sociales.
- [ ] **`src/lib/data.ts`**: la sección de testimonios está oculta mientras `testimonials` esté vacío; agrega testimonios reales para reactivarla. Ajustar cifras de `stats` si aplica.
- [ ] **`NEXT_PUBLIC_SITE_URL`** con el dominio definitivo.
- [ ] (Opcional) `public/logo.png`, `public/icon-192.png`, `public/icon-512.png` para logo/PWA en alta resolución.
- [ ] Imágenes reales de proyectos (hoy el portafolio es tipográfico; usar `next/image` al agregarlas).

---

## ☁️ Despliegue

### Opción A — Vercel (recomendado)

1. Sube el repositorio a GitHub/GitLab.
2. En **vercel.com → New Project**, importa el repo. Vercel detecta Next.js automáticamente.
3. En **Settings → Environment Variables**, agrega todas las variables de la tabla de arriba (para *Production* y *Preview*).
4. **Deploy**. Cada push a la rama principal despliega producción.

**Conectar tu dominio (DNS):** en **Settings → Domains** añade `innovatechsolutions.lat` y `www.innovatechsolutions.lat`, y crea en tu proveedor DNS:

| Tipo | Nombre | Valor |
|------|--------|-------|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

> Verifica los valores exactos que muestre el panel de Vercel (pueden cambiar). Tras propagar el DNS, Vercel emite el certificado SSL automáticamente.

### Opción B — Azure Static Web Apps

1. Crea un recurso **Static Web App** y conéctalo al repo.
2. Build preset: **Next.js**. Output: gestionado por el adaptador de Next.
3. Carga las variables de entorno en **Configuration**.
4. Añade tu dominio en **Custom domains** y crea los registros `CNAME`/`A` que indique Azure.

---

## 🔎 Google Search Console (post-despliegue)

1. Entra a **https://search.google.com/search-console** y añade la propiedad (dominio o prefijo de URL).
2. Verifica la propiedad. Si usas el método de **meta tag HTML**, pega el código en `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` y vuelve a desplegar (se inyecta automáticamente en `<head>`).
3. En **Sitemaps**, envía `https://TU-DOMINIO/sitemap.xml`.
4. Usa **Inspección de URLs** para solicitar indexación de la home y del blog.

---

## 📄 Licencia

Propiedad de INNOVATECH SOLUTIONS GLOBAL S.A.S. Todos los derechos reservados.
