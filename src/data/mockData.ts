export interface MockJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  contractType: string;
  description: string;
  requirements: string[];
  benefits: string[];
  match: string;
  postedDate: string;
  applications: number;
}

export interface MockSavedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  contractType: string;
  match: string;
  savedDate: string;
  status: 'saved' | 'applied' | 'interviewed';
}

export interface MockVacancy {
  id: string;
  position: string;
  company: string;
  candidates: number;
  status: string;
  date: string;
  color: string;
  targetDisability: string;
  salary: string;
  location: string;
  description?: string;
  requirements?: string[];
  benefits?: string[];
}

export interface MockApplication {
  id: string;
  name: string;
  position: string;
  match: string;
  status: string;
  time: string;
  color: string;
  disability: string;
  experience: string;
}

export interface MetricData {
  label: string;
  value: string;
  color: string;
}

export interface MetricSection {
  title: string;
  data: MetricData[];
}

export interface AdminMetrics {
  accessibility: MetricSection;
  users: MetricSection;
}

export const mockJobs: MockJob[] = [
  {
    id: '1',
    title: 'Acomodador de Cajas - Personas con Discapacidad Cognitiva',
    company: 'Supermercado Inclusivo S.L.',
    location: 'Madrid, España',
    salary: '€18,000 - €22,000',
    contractType: 'Tiempo completo',
    description:
      'Buscamos personas con discapacidad cognitiva para trabajar como acomodadores de cajas en nuestro supermercado. Tareas de organización, clasificación y mantenimiento del orden en las estanterías. Entorno de trabajo estructurado y apoyo continuo.',
    requirements: [
      'Motivación y ganas de trabajar',
      'Capacidad de seguir instrucciones simples',
      'Aptitud para tareas repetitivas',
      'Trabajo en equipo',
      'No requiere experiencia previa',
    ],
    benefits: [
      'Apoyo personalizado continuo',
      'Horario estructurado (mañana)',
      'Formación adaptada',
      'Entorno de trabajo tranquilo',
      'Seguimiento profesional',
    ],
    match: '98%',
    postedDate: 'Hace 2 días',
    applications: 8,
  },
  {
    id: '2',
    title: 'Operador de Telefonía - Personas Sordas',
    company: 'Centro de Atención Telefónica Inclusivo',
    location: 'Barcelona, España',
    salary: '€20,000 - €25,000',
    contractType: 'Tiempo completo',
    description:
      'Buscamos personas sordas para trabajar como operadores de telefonía usando tecnologías de comunicación adaptadas. Atención al cliente a través de chat, email y videollamadas con intérprete.',
    requirements: [
      'Persona sorda con certificado de discapacidad',
      'Buen nivel de escritura en español',
      'Habilidades de comunicación escrita',
      'Capacidad de trabajo en equipo',
      'Formación básica en informática',
    ],
    benefits: [
      'Tecnologías de comunicación adaptadas',
      'Intérprete de lengua de señas disponible',
      'Horario flexible',
      'Seguro médico',
      'Entorno de trabajo inclusivo',
    ],
    match: '92%',
    postedDate: 'Hace 1 semana',
    applications: 5,
  },
  {
    id: '3',
    title: 'Tester de Accesibilidad - Personas Ciegas',
    company: 'Empresa de Desarrollo de Software',
    location: 'Valencia, España',
    salary: '€25,000 - €32,000',
    contractType: 'Tiempo completo',
    description:
      'Buscamos personas ciegas para trabajar como testers de accesibilidad. Evaluación de aplicaciones y sitios web usando lectores de pantalla y otras tecnologías asistivas.',
    requirements: [
      'Persona ciega con experiencia en lectores de pantalla',
      'Conocimientos básicos de informática',
      'Capacidad de reportar problemas de accesibilidad',
      'Paciencia y atención al detalle',
      'No requiere formación técnica previa',
    ],
    benefits: [
      'Equipamiento adaptado completo',
      'Formación en testing de accesibilidad',
      'Trabajo remoto disponible',
      'Horario flexible',
      'Impacto directo en la accesibilidad digital',
    ],
    match: '95%',
    postedDate: 'Hace 2 semanas',
    applications: 12,
  },
  {
    id: '4',
    title: 'Ayudante de Cocina - Personas con Discapacidad Cognitiva',
    company: 'Restaurante Inclusivo',
    location: 'Sevilla, España',
    salary: '€16,000 - €20,000',
    contractType: 'Tiempo completo',
    description:
      'Buscamos personas con discapacidad cognitiva para trabajar como ayudantes de cocina. Tareas de limpieza, preparación básica de ingredientes y apoyo en la cocina.',
    requirements: [
      'Motivación y ganas de aprender',
      'Capacidad de seguir instrucciones',
      'Trabajo en equipo',
      'Responsabilidad',
      'No requiere experiencia previa',
    ],
    benefits: [
      'Apoyo personalizado continuo',
      'Horario de mañana',
      'Formación en cocina básica',
      'Comida incluida',
      'Entorno de trabajo acogedor',
    ],
    match: '90%',
    postedDate: 'Hace 3 semanas',
    applications: 15,
  },
  {
    id: '5',
    title: 'Mensajero - Personas Sordas',
    company: 'Empresa de Mensajería Inclusiva',
    location: 'Bilbao, España',
    salary: '€19,000 - €24,000',
    contractType: 'Tiempo completo',
    description:
      'Buscamos personas sordas para trabajar como mensajeros. Entrega de paquetes y documentos usando aplicaciones móviles adaptadas y comunicación por texto.',
    requirements: [
      'Persona sorda con certificado de discapacidad',
      'Carnet de conducir',
      'Uso de aplicaciones móviles',
      'Responsabilidad y puntualidad',
      'Buen estado físico',
    ],
    benefits: [
      'Vehículo de empresa',
      'Aplicaciones adaptadas',
      'Horario flexible',
      'Seguro médico',
      'Independencia en el trabajo',
    ],
    match: '85%',
    postedDate: 'Hace 1 semana',
    applications: 7,
  },
  {
    id: '6',
    title: 'Organizador de Archivos - Personas con Discapacidad Cognitiva',
    company: 'Oficina Administrativa Inclusiva',
    location: 'Málaga, España',
    salary: '€17,000 - €21,000',
    contractType: 'Tiempo completo',
    description:
      'Buscamos personas con discapacidad cognitiva para trabajar en organización de archivos y documentos. Tareas de clasificación, ordenación y mantenimiento de archivos.',
    requirements: [
      'Capacidad de organización',
      'Aptitud para tareas repetitivas',
      'Trabajo en equipo',
      'Motivación',
      'No requiere experiencia previa',
    ],
    benefits: [
      'Apoyo personalizado continuo',
      'Horario estructurado',
      'Entorno de trabajo tranquilo',
      'Formación adaptada',
      'Seguimiento profesional',
    ],
    match: '88%',
    postedDate: 'Hace 4 días',
    applications: 10,
  },
];

export const recommendedJobs: MockJob[] = [
  {
    ...mockJobs[0],
    id: 'rec1',
    postedDate: 'Hace 1 día',
  },
  {
    ...mockJobs[1],
    id: 'rec2',
    postedDate: 'Hace 2 días',
  },
  {
    ...mockJobs[2],
    id: 'rec3',
    postedDate: 'Hace 3 días',
  },
];

export const savedJobs: MockSavedJob[] = [
  {
    id: '1',
    title: 'Acomodador de Cajas - Personas con Discapacidad Cognitiva',
    company: 'Supermercado Inclusivo S.L.',
    location: 'Madrid, España',
    salary: '€18,000 - €22,000',
    contractType: 'Tiempo completo',
    match: '98%',
    savedDate: 'Hace 2 días',
    status: 'saved',
  },
  {
    id: '2',
    title: 'Operador de Telefonía - Personas Sordas',
    company: 'Centro de Atención Telefónica Inclusivo',
    location: 'Barcelona, España',
    salary: '€20,000 - €25,000',
    contractType: 'Tiempo completo',
    match: '92%',
    savedDate: 'Hace 1 semana',
    status: 'applied',
  },
  {
    id: '3',
    title: 'Tester de Accesibilidad - Personas Ciegas',
    company: 'Empresa de Desarrollo de Software',
    location: 'Valencia, España',
    salary: '€25,000 - €32,000',
    contractType: 'Tiempo completo',
    match: '95%',
    savedDate: 'Hace 2 semanas',
    status: 'interviewed',
  },
];

export const jobDetails: MockJob[] = mockJobs.filter(job =>
  ['1', '2', '3'].includes(job.id)
);

export const vacancies: MockVacancy[] = [
  {
    id: '1',
    position: 'Acomodador de Cajas - Personas con Discapacidad Cognitiva',
    company: 'Supermercado Inclusivo S.L.',
    candidates: 8,
    status: 'Activa',
    date: 'Hace 2 días',
    color: 'success',
    targetDisability: 'Discapacidad Cognitiva',
    salary: '€18,000 - €22,000',
    location: 'Madrid, España',
    description:
      'Buscamos personas con discapacidad cognitiva para trabajar como acomodadores de cajas en nuestro supermercado. Tareas de organización, clasificación y mantenimiento del orden en las estanterías.',
    requirements: [
      'Motivación y ganas de trabajar',
      'Capacidad de seguir instrucciones simples',
      'Aptitud para tareas repetitivas',
      'Trabajo en equipo',
      'No requiere experiencia previa',
    ],
    benefits: [
      'Apoyo personalizado continuo',
      'Horario estructurado (mañana)',
      'Formación adaptada',
      'Entorno de trabajo tranquilo',
      'Seguimiento profesional',
    ],
  },
  {
    id: '2',
    position: 'Operador de Telefonía - Personas Sordas',
    company: 'Centro de Atención Telefónica Inclusivo',
    candidates: 5,
    status: 'Activa',
    date: 'Hace 1 semana',
    color: 'success',
    targetDisability: 'Discapacidad Auditiva',
    salary: '€20,000 - €25,000',
    location: 'Barcelona, España',
    description:
      'Buscamos personas sordas para trabajar como operadores de telefonía usando tecnologías de comunicación adaptadas.',
    requirements: [
      'Persona sorda con certificado de discapacidad',
      'Buen nivel de escritura en español',
      'Habilidades de comunicación escrita',
      'Capacidad de trabajo en equipo',
      'Formación básica en informática',
    ],
    benefits: [
      'Tecnologías de comunicación adaptadas',
      'Intérprete de lengua de señas disponible',
      'Horario flexible',
      'Seguro médico',
      'Entorno de trabajo inclusivo',
    ],
  },
  {
    id: '3',
    position: 'Tester de Accesibilidad - Personas Ciegas',
    company: 'Empresa de Desarrollo de Software',
    candidates: 12,
    status: 'Cerrando',
    date: 'Hace 2 semanas',
    color: 'warning',
    targetDisability: 'Discapacidad Visual',
    salary: '€25,000 - €32,000',
    location: 'Valencia, España',
    description:
      'Buscamos personas ciegas para trabajar como testers de accesibilidad. Evaluación de aplicaciones y sitios web usando lectores de pantalla.',
    requirements: [
      'Persona ciega con experiencia en lectores de pantalla',
      'Conocimientos básicos de informática',
      'Capacidad de reportar problemas de accesibilidad',
      'Paciencia y atención al detalle',
      'No requiere formación técnica previa',
    ],
    benefits: [
      'Equipamiento adaptado completo',
      'Formación en testing de accesibilidad',
      'Trabajo remoto disponible',
      'Horario flexible',
      'Impacto directo en la accesibilidad digital',
    ],
  },
  {
    id: '4',
    position: 'Ayudante de Cocina - Personas con Discapacidad Cognitiva',
    company: 'Restaurante Inclusivo',
    candidates: 15,
    status: 'Activa',
    date: 'Hace 3 semanas',
    color: 'success',
    targetDisability: 'Discapacidad Cognitiva',
    salary: '€16,000 - €20,000',
    location: 'Sevilla, España',
    description:
      'Buscamos personas con discapacidad cognitiva para trabajar como ayudantes de cocina. Tareas de limpieza y preparación básica.',
    requirements: [
      'Motivación y ganas de aprender',
      'Capacidad de seguir instrucciones',
      'Trabajo en equipo',
      'Responsabilidad',
      'No requiere experiencia previa',
    ],
    benefits: [
      'Apoyo personalizado continuo',
      'Horario de mañana',
      'Formación en cocina básica',
      'Comida incluida',
      'Entorno de trabajo acogedor',
    ],
  },
];

export const applications: MockApplication[] = [
  {
    id: '1',
    name: 'María González',
    position: 'Acomodador de Cajas',
    match: '98%',
    status: 'Nueva',
    time: 'Hace 1 hora',
    color: 'success',
    disability: 'Discapacidad Cognitiva',
    experience: '2 años en organización',
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    position: 'Operador de Telefonía',
    match: '92%',
    status: 'En revisión',
    time: 'Hace 3 horas',
    color: 'primary',
    disability: 'Discapacidad Auditiva',
    experience: 'Experiencia en atención al cliente',
  },
  {
    id: '3',
    name: 'Ana Martínez',
    position: 'Tester de Accesibilidad',
    match: '95%',
    status: 'Entrevista',
    time: 'Hace 1 día',
    color: 'info',
    disability: 'Discapacidad Visual',
    experience: '5 años usando lectores de pantalla',
  },
  {
    id: '4',
    name: 'Luis Pérez',
    position: 'Ayudante de Cocina',
    match: '90%',
    status: 'Rechazada',
    time: 'Hace 2 días',
    color: 'danger',
    disability: 'Discapacidad Cognitiva',
    experience: 'Motivación y ganas de aprender',
  },
];

export const adminMetrics: AdminMetrics = {
  accessibility: {
    title: 'Métricas de Accesibilidad',
    data: [
      { label: 'WCAG 2.1 AA Compliance', value: '98%', color: 'success' },
      { label: 'Usuarios con Discapacidad', value: '1,247', color: 'info' },
      { label: 'Tests de Accesibilidad', value: '156/160', color: 'warning' },
      { label: 'Tiempo de Respuesta', value: '2.3s', color: 'primary' },
    ],
  },
  users: {
    title: 'Gestión de Usuarios',
    data: [
      { label: 'Usuarios Activos', value: '2,891', color: 'success' },
      { label: 'Nuevos Registros', value: '156', color: 'info' },
      { label: 'Solicitudes Pendientes', value: '23', color: 'warning' },
      { label: 'Reportes de Accesibilidad', value: '45', color: 'primary' },
    ],
  },
};
