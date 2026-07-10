/**
 * Contenido inicial del blog. Posts embebidos como datos para tener contenido
 * indexable desde el día uno. Para escalar, migra a MDX o a un CMS headless.
 */

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  author: string;
  readingMinutes: number;
  tags: string[];
  /** Contenido en párrafos simples (cada string es un <p>). */
  body: string[];
};

export const posts: BlogPost[] = [
  {
    slug: 'arquitectura-cloud-native-pymes',
    title: 'Arquitectura cloud-native para PyMEs: por dónde empezar',
    excerpt:
      'Adoptar la nube no es migrar servidores: es repensar cómo se construye, despliega y escala el software. Una guía práctica para equipos pequeños.',
    date: '2026-06-15',
    author: 'Equipo INNOVATECH',
    readingMinutes: 6,
    tags: ['Cloud', 'DevOps', 'Arquitectura'],
    body: [
      'Muchas empresas creen que “ir a la nube” significa mover sus máquinas virtuales de un datacenter a AWS o Azure. Eso es rehosting, y aunque puede reducir costos operativos, deja sobre la mesa la mayor parte del valor de la nube.',
      'Una arquitectura cloud-native aprovecha servicios gestionados, contenedores, escalado automático y entrega continua. El objetivo no es tener servidores en la nube, sino dejar de preocuparse por los servidores en absoluto.',
      'Para una PyME, recomendamos empezar por lo pequeño: contenederizar una aplicación, automatizar su despliegue con un pipeline de CI/CD y añadir observabilidad básica. Cada paso reduce riesgo y genera aprendizaje.',
      'La clave está en la progresividad. No hace falta reescribir todo de una vez; el patrón strangler permite modernizar por partes mientras el sistema sigue en producción.',
    ],
  },
  {
    slug: 'ci-cd-que-realmente-funciona',
    title: 'CI/CD que realmente funciona: más allá del “build verde”',
    excerpt:
      'Un pipeline que solo compila da una falsa sensación de seguridad. Qué debe validar un pipeline serio antes de llegar a producción.',
    date: '2026-05-28',
    author: 'Equipo INNOVATECH',
    readingMinutes: 5,
    tags: ['DevOps', 'CI/CD', 'Calidad'],
    body: [
      'Un “build verde” no significa que el software funcione. Hemos visto pipelines que solo verifican que el código compila y dan luz verde a cambios que rompen la aplicación en runtime.',
      'Un pipeline serio valida en capas: análisis estático y linting, pruebas unitarias, pruebas de integración, escaneo de dependencias y, cuando es viable, pruebas end-to-end sobre un entorno efímero.',
      'Igual de importante es que las validaciones bloqueen de verdad. Un lint configurado con “|| true” o pruebas que no corren son deuda oculta disfrazada de calidad.',
      'El resultado de un CI/CD bien hecho no es velocidad a cualquier costo, sino confianza: cada despliegue es predecible, reversible y aburrido. Y en producción, aburrido es exactamente lo que queremos.',
    ],
  },
  {
    slug: 'seguridad-desde-el-diseno',
    title: 'Seguridad desde el diseño, no como parche final',
    excerpt:
      'La seguridad añadida al final es cara y frágil. Cómo integrar prácticas de seguridad a lo largo de todo el ciclo de vida del software.',
    date: '2026-05-10',
    author: 'Equipo INNOVATECH',
    readingMinutes: 7,
    tags: ['Seguridad', 'OWASP', 'Buenas prácticas'],
    body: [
      'La seguridad tratada como una fase final —una auditoría apurada antes de salir a producción— casi siempre encuentra problemas que habría sido barato evitar y caro corregir a esas alturas.',
      'El enfoque “security by design” integra controles desde el primer día: modelado de amenazas, gestión de secretos, principio de mínimo privilegio y validación de entradas como parte natural del desarrollo.',
      'Apoyarse en estándares como OWASP Top 10 da un marco concreto para priorizar. No se trata de perseguir la seguridad perfecta, sino de elevar el costo del ataque por encima de lo que vale comprometer el sistema.',
      'Finalmente, la seguridad es un proceso, no un estado. Pentesting periódico, actualización de dependencias y monitoreo continuo mantienen la postura de seguridad a lo largo del tiempo.',
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
