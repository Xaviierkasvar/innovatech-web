'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Cursor personalizado: un punto que sigue exacto al mouse y un anillo que lo
 * persigue con suavidad y se agranda al pasar sobre elementos interactivos.
 * Solo se activa con puntero fino (mouse) y si el usuario no pidió reducir
 * movimiento; en móvil/táctil no se renderiza. Nunca bloquea clics.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Posición exacta (punto) y posición suavizada (anillo).
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const interactiveSel = 'a, button, [role="button"], input, textarea, select, label, .cursor-interactive';

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const target = e.target as Element | null;
      setHovering(!!target?.closest?.(interactiveSel));
    };
    const onLeave = () => setHidden(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      {/* Anillo que persigue con suavidad */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: hovering ? 1.6 : 1,
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border-2 border-brand-500 mix-blend-difference"
      />
      {/* Punto central exacto */}
      <motion.div
        style={{ x, y }}
        animate={{ opacity: hidden ? 0 : 1, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-brand-500"
      />
    </div>
  );
}
