import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6">
      <div className="text-center">
        <p className="gradient-text text-7xl font-bold sm:text-9xl">404</p>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">Página no encontrada</h1>
        <p className="text-muted mx-auto mt-3 max-w-md">
          La página que buscas no existe o fue movida. Volvamos a un lugar conocido.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-medium text-white transition-colors hover:bg-brand-500"
          >
            <Home className="h-4 w-4" /> Ir al inicio
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full surface-card px-6 py-3 font-medium transition-colors hover:border-brand-400"
          >
            <ArrowLeft className="h-4 w-4" /> Ver el blog
          </Link>
        </div>
      </div>
    </main>
  );
}
