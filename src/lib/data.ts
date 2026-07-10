/**
 * Contenido de negocio: servicios, tecnologías, portafolio, proceso,
 * testimonios y estadísticas. Editar aquí para actualizar el sitio.
 *
 * NOTA: Los proyectos son casos de estudio genéricos (problema → solución →
 * stack → resultado). No se usan nombres de clientes reales.
 */

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string; // nombre de ícono lucide-react
  features: string[];
};

export const services: Service[] = [
  {
    slug: 'desarrollo-web',
    title: 'Desarrollo Web',
    short: 'Aplicaciones modernas full-stack.',
    description:
      'Construimos aplicaciones web rápidas, escalables y mantenibles con arquitecturas full-stack modernas. Desde SPAs y PWAs hasta plataformas SSR de alto tráfico.',
    icon: 'Globe',
    features: ['Next.js / React / Vue', 'SSR y SSG', 'PWA', 'Diseño responsivo'],
  },
  {
    slug: 'devops-cloud',
    title: 'DevOps & Cloud Architecture',
    short: 'AWS, Azure, CI/CD, contenedores y monitoreo.',
    description:
      'Diseñamos infraestructura cloud-native y pipelines de entrega continua. Automatizamos despliegues, contenedores y observabilidad para que tu equipo entregue más rápido y con menos incidencias.',
    icon: 'Cloud',
    features: ['AWS / Azure', 'CI/CD & IaC', 'Docker & Kubernetes', 'Monitoreo & alertas'],
  },
  {
    slug: 'integracion-apis',
    title: 'Integración de APIs',
    short: 'RESTful y GraphQL, interoperabilidad entre sistemas.',
    description:
      'Conectamos sistemas heterogéneos con APIs robustas y bien documentadas. Diseñamos contratos claros, versionado y seguridad para integraciones confiables entre plataformas.',
    icon: 'Webhook',
    features: ['REST & GraphQL', 'Documentación Swagger', 'Webhooks & eventos', 'Autenticación OAuth2'],
  },
  {
    slug: 'software-a-medida',
    title: 'Software a Medida',
    short: 'Sistemas de gestión y plataformas especializadas.',
    description:
      'Desarrollamos software hecho a la medida de tus procesos: ERPs, CRMs, portales internos y plataformas verticales que se adaptan a tu operación en lugar de forzarte a ti.',
    icon: 'Boxes',
    features: ['ERP / CRM', 'Portales internos', 'Automatización de procesos', 'Reportería avanzada'],
  },
  {
    slug: 'seguridad-informatica',
    title: 'Seguridad Informática',
    short: 'Auditorías, pentesting, cifrado y protección.',
    description:
      'Protegemos tus aplicaciones y datos con auditorías de seguridad, pruebas de penetración, cifrado y buenas prácticas de hardening a lo largo de todo el ciclo de vida del software.',
    icon: 'ShieldCheck',
    features: ['Pentesting', 'Auditorías OWASP', 'Cifrado de datos', 'Hardening & compliance'],
  },
  {
    slug: 'migracion-modernizacion',
    title: 'Migración y Modernización',
    short: 'De sistemas legado a cloud y stacks actuales.',
    description:
      'Modernizamos sistemas legado sin detener tu operación: migración a la nube, refactorización progresiva y actualización de stacks obsoletos hacia arquitecturas mantenibles.',
    icon: 'Rocket',
    features: ['Migración a cloud', 'Refactor progresivo', 'Strangler pattern', 'Cero downtime'],
  },
];

export type TechCategory = {
  name: string;
  items: string[];
};

export const technologies: TechCategory[] = [
  {
    name: 'Frontend',
    items: ['React', 'Next.js', 'Vue 3', 'Angular', 'React Native', 'TypeScript', 'HTML5 / CSS3', 'Bootstrap', 'Ionic'],
  },
  {
    name: 'Backend',
    items: ['Python (Django)', 'FastAPI', 'PHP (Laravel)', 'Java (Spring Boot)', 'Node.js (Express)'],
  },
  {
    name: 'Bases de datos',
    items: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'Redis'],
  },
  {
    name: 'DevOps / Cloud',
    items: ['AWS', 'Azure', 'Azure DevOps', 'Docker', 'Git', 'NGINX', 'Swagger', 'Postman'],
  },
];

export type Project = {
  slug: string;
  title: string;
  category: 'SaaS' | 'Educación' | 'Movilidad' | 'Operaciones' | 'Backoffice';
  tags: string[];
  problem: string;
  solution: string;
  stack: string[];
  result: string;
};

export const projects: Project[] = [
  {
    slug: 'saas-ia-estrategia',
    title: 'Plataforma SaaS potenciada por IA',
    category: 'SaaS',
    tags: ['IA', 'SaaS', 'Next.js', 'Python'],
    problem:
      'Una organización necesitaba evaluar el estado de negocios y generar estrategias personalizadas a escala, un proceso manual, lento y difícil de estandarizar.',
    solution:
      'Diseñamos una plataforma SaaS multi-tenant con un asistente conversacional que guía la evaluación del negocio y genera planes de acción, apoyado en modelos de lenguaje y una capa de conocimiento propia.',
    stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Redis', 'AWS'],
    result:
      'Evaluaciones estandarizadas y generación de estrategias en minutos en lugar de días, con una experiencia conversacional que reduce la fricción del usuario.',
  },
  {
    slug: 'gestion-educativa',
    title: 'Plataforma de gestión educativa integral',
    category: 'Educación',
    tags: ['Microservicios', 'Fintech', 'Tiempo real'],
    problem:
      'Una institución requería unificar matrículas, pagos y comunicación entre estudiantes, docentes y acudientes en un solo ecosistema.',
    solution:
      'Implementamos una arquitectura de microservicios con billetera digital para pagos internos y un módulo de comunicación en tiempo real, todo bajo un panel de administración unificado.',
    stack: ['Angular', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'Docker'],
    result:
      'Gestión centralizada del ciclo académico y financiero, con comunicación instantánea y trazabilidad completa de pagos.',
  },
  {
    slug: 'movilidad-flotas',
    title: 'Sistema de movilidad compartida y flotas',
    category: 'Movilidad',
    tags: ['WebSockets', 'Tiempo real', 'Colas'],
    problem:
      'Un operador de movilidad necesitaba coordinar vehículos, conductores y solicitudes en tiempo real bajo picos de demanda impredecibles.',
    solution:
      'Construimos un backend orientado a eventos con WebSockets para posición en vivo y colas asíncronas para procesar solicitudes sin bloquear la experiencia del usuario.',
    stack: ['React Native', 'Node.js', 'Redis', 'PostgreSQL', 'AWS'],
    result:
      'Asignación de viajes en tiempo real, resiliente a picos de carga y con seguimiento en vivo de la flota.',
  },
  {
    slug: 'operaciones-campo',
    title: 'Gestión de operaciones de campo',
    category: 'Operaciones',
    tags: ['Dashboard', 'Analítica', 'Multicanal'],
    problem:
      'Una empresa con equipos en terreno carecía de visibilidad sobre el avance de las operaciones y dependía de reportes manuales dispersos.',
    solution:
      'Desarrollamos un dashboard analítico con notificaciones multicanal (correo, push y mensajería) que consolida el estado de las operaciones en tiempo casi real.',
    stack: ['Vue 3', 'Django', 'PostgreSQL', 'Docker', 'Azure'],
    result:
      'Visibilidad operativa centralizada y alertas proactivas que redujeron la dependencia de reportes manuales.',
  },
  {
    slug: 'backoffice-empresarial',
    title: 'Backoffice empresarial a medida',
    category: 'Backoffice',
    tags: ['Gestión interna', 'Reportería'],
    problem:
      'Un negocio manejaba su operación interna en hojas de cálculo, con procesos duplicados y sin control de acceso por rol.',
    solution:
      'Creamos un backoffice a medida con gestión de usuarios por rol, flujos internos y generación automática de informes exportables.',
    stack: ['Next.js', 'Laravel', 'MySQL', 'NGINX'],
    result:
      'Procesos internos unificados, control de acceso granular e informes generados en un clic.',
  },
  {
    slug: 'educacion-asistencia',
    title: 'Plataforma educativa y de asistencia',
    category: 'Educación',
    tags: ['Control de acceso', 'Agendamiento'],
    problem:
      'Una organización educativa necesitaba controlar el acceso, registrar asistencia estudiantil y gestionar agendamientos de forma confiable.',
    solution:
      'Implementamos un sistema con control de acceso, registro de asistencia y un módulo de agendamiento integrado, accesible desde web y móvil.',
    stack: ['Ionic', 'FastAPI', 'PostgreSQL', 'Redis'],
    result:
      'Registro de asistencia confiable y agendamiento sin fricción, con datos disponibles para análisis posterior.',
  },
];

export const projectCategories = ['Todos', 'SaaS', 'Educación', 'Movilidad', 'Operaciones', 'Backoffice'] as const;

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  icon: string;
};

export const process: ProcessStep[] = [
  {
    step: '01',
    title: 'Descubrimiento',
    description:
      'Entendemos tu negocio, objetivos y restricciones. Definimos alcance, riesgos y métricas de éxito antes de escribir una línea de código.',
    icon: 'Search',
  },
  {
    step: '02',
    title: 'Diseño',
    description:
      'Modelamos la arquitectura y la experiencia de usuario. Prototipamos flujos clave y validamos decisiones técnicas temprano.',
    icon: 'PenTool',
  },
  {
    step: '03',
    title: 'Desarrollo',
    description:
      'Iteramos en ciclos ágiles con entregas frecuentes, revisiones de código y pruebas automatizadas. Transparencia total del avance.',
    icon: 'Code2',
  },
  {
    step: '04',
    title: 'Despliegue',
    description:
      'Automatizamos la entrega con CI/CD e infraestructura como código. Despliegues seguros, repetibles y con rollback.',
    icon: 'Rocket',
  },
  {
    step: '05',
    title: 'Soporte',
    description:
      'Monitoreamos, mantenemos y evolucionamos el producto. Observabilidad, mejoras continuas y acompañamiento cercano.',
    icon: 'LifeBuoy',
  },
];

export type Testimonial = {
  quote: string;
  /** Cargo de quien da el testimonio. */
  role: string;
  /** Sector de la empresa (anonimizado por confidencialidad). */
  sector: string;
  /** Iniciales para el avatar. */
  initials: string;
};

// La sección de testimonios se oculta automáticamente mientras este arreglo
// esté vacío. Para reactivarla, agrega testimonios reales (con autorización del
// cliente) siguiendo la forma del tipo Testimonial:
//   { quote: '...', role: 'Cargo', sector: 'Sector', initials: 'XX' }
export const testimonials: Testimonial[] = [];

export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 25, suffix: '+', label: 'Proyectos entregados' },
  { value: 6, suffix: '+', label: 'Años de experiencia' },
  { value: 5, suffix: '', label: 'Áreas de especialización' },
  { value: 2, suffix: '', label: 'Sedes en Colombia' },
];
