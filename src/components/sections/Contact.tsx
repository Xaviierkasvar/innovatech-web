'use client';

import { useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'enviando' | 'exito' | 'error';

const PROJECT_TYPES = ['Desarrollo Web', 'App Móvil', 'DevOps / Cloud', 'Software a Medida', 'Otro'];

const env = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateNotif: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_NOTIFICACION,
  templateAuto: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_AUTORESPUESTA,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(form: HTMLFormElement): Record<string, string> {
    const e: Record<string, string> = {};
    const name = (form.elements.namedItem('from_name') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('reply_to') as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim();

    if (!name) e.from_name = 'Ingresa tu nombre.';
    if (!email) e.reply_to = 'Ingresa tu correo.';
    else if (!EMAIL_RE.test(email)) e.reply_to = 'El correo no tiene un formato válido.';
    if (!message) e.message = 'Cuéntanos sobre tu proyecto.';
    return e;
  }

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;

    // Honeypot: si está lleno, es un bot → simulamos éxito y no enviamos.
    const honeypot = (form.elements.namedItem('company_website') as HTMLInputElement).value;
    if (honeypot) {
      setStatus('exito');
      return;
    }

    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    // Verificación de configuración de EmailJS.
    if (!env.serviceId || !env.templateNotif || !env.templateAuto || !env.publicKey) {
      setStatus('error');
      setErrorMsg(
        'El formulario aún no está configurado (faltan las claves de EmailJS en las variables de entorno).',
      );
      return;
    }

    setStatus('enviando');
    setErrorMsg('');

    const data = new FormData(form);
    const params = {
      from_name: String(data.get('from_name') ?? ''),
      reply_to: String(data.get('reply_to') ?? ''),
      company: String(data.get('company') ?? 'No especificada'),
      phone: String(data.get('phone') ?? 'No especificado'),
      project_type: String(data.get('project_type') ?? ''),
      message: String(data.get('message') ?? ''),
      to_email: siteConfig.email,
    };

    try {
      // 1) Notificación interna al equipo.
      await emailjs.send(env.serviceId, env.templateNotif, params, { publicKey: env.publicKey });
      // 2) Auto-respuesta al visitante.
      await emailjs.send(env.serviceId, env.templateAuto, params, { publicKey: env.publicKey });

      setStatus('exito');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? `No se pudo enviar: ${err.message}`
          : 'Ocurrió un error al enviar. Intenta de nuevo o escríbenos directamente.',
      );
    }
  }

  const disabled = status === 'enviando';

  return (
    <section id="contacto" className="scroll-mt-20 py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Contacto"
          title="Hablemos de tu proyecto"
          subtitle="Cuéntanos qué quieres construir. Te respondemos en menos de 24 horas hábiles."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          {/* Datos de las sedes */}
          <Reveal className="space-y-6">
            <a
              href={`mailto:${siteConfig.email}`}
              className="surface-card flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-brand-400"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-500">
                <Mail className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-muted">Correo</span>
                <span className="font-medium">{siteConfig.email}</span>
              </span>
            </a>

            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              className="surface-card flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-brand-400"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-500">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-muted">Teléfono</span>
                <span className="font-medium">{siteConfig.phone}</span>
              </span>
            </a>

            {siteConfig.locations.map((loc) => (
              <div key={loc.id} className="surface-card flex items-start gap-4 rounded-2xl p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-500">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-muted">{loc.label}</span>
                  <span className="font-medium">
                    {loc.city}, {loc.country}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">{loc.street}</span>
                </span>
              </div>
            ))}
          </Reveal>

          {/* Formulario */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} noValidate className="surface-card rounded-3xl p-6 sm:p-8">
              {/* Honeypot anti-spam (oculto para humanos) */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="company_website">No llenar este campo</label>
                <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Nombre completo *"
                  name="from_name"
                  placeholder="Tu nombre"
                  error={errors.from_name}
                  disabled={disabled}
                />
                <Field
                  label="Correo electrónico *"
                  name="reply_to"
                  type="email"
                  placeholder="tu@empresa.com"
                  error={errors.reply_to}
                  disabled={disabled}
                />
                <Field label="Empresa" name="company" placeholder="Nombre de tu empresa" disabled={disabled} />
                <Field label="Teléfono" name="phone" type="tel" placeholder="+57 300 000 0000" disabled={disabled} />
              </div>

              <div className="mt-5">
                <label htmlFor="project_type" className="mb-1.5 block text-sm font-medium">
                  Tipo de proyecto
                </label>
                <select
                  id="project_type"
                  name="project_type"
                  disabled={disabled}
                  defaultValue={PROJECT_TYPES[0]}
                  className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-4 py-3 text-sm outline-none transition-colors focus:border-brand-400"
                >
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  disabled={disabled}
                  placeholder="Cuéntanos sobre tu proyecto, objetivos y plazos…"
                  className={cn(
                    'w-full resize-y rounded-xl border bg-[rgb(var(--background))] px-4 py-3 text-sm outline-none transition-colors focus:border-brand-400',
                    errors.message ? 'border-red-500/60' : 'border-[rgb(var(--border))]',
                  )}
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>

              {/* Feedback de estado */}
              {status === 'exito' && (
                <div className="mt-5 flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-500">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  ¡Gracias! Recibimos tu solicitud y te responderemos en menos de 24 horas hábiles.
                </div>
              )}
              {status === 'error' && (
                <div className="mt-5 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={disabled}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 font-medium text-white transition-all hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'enviando' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Enviando…
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" /> Enviar solicitud
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-xs text-muted">
                Al enviar aceptas ser contactado por nuestro equipo. No compartimos tus datos.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  error,
  disabled,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={!!error}
        className={cn(
          'w-full rounded-xl border bg-[rgb(var(--background))] px-4 py-3 text-sm outline-none transition-colors focus:border-brand-400',
          error ? 'border-red-500/60' : 'border-[rgb(var(--border))]',
        )}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
