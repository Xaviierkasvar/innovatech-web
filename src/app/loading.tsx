/** Skeleton de carga mostrado durante transiciones de ruta. */
export default function Loading() {
  return (
    <div className="container-page pt-32" aria-busy="true" aria-label="Cargando">
      <div className="mx-auto max-w-3xl animate-pulse space-y-6">
        <div className="h-4 w-32 rounded bg-[rgb(var(--border))]" />
        <div className="h-10 w-3/4 rounded bg-[rgb(var(--border))]" />
        <div className="h-10 w-1/2 rounded bg-[rgb(var(--border))]" />
        <div className="mt-8 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 w-full rounded bg-[rgb(var(--border))]" />
          ))}
        </div>
        <div className="grid gap-4 pt-6 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 rounded-2xl bg-[rgb(var(--border))]" />
          ))}
        </div>
      </div>
    </div>
  );
}
