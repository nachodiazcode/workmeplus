import { WmpStatus, WmpPriority } from '../framework/wmp/types';

export interface Task {
  id: string;
  code: string;
  title: string;
  description: string;
  status: WmpStatus;
  priority: WmpPriority;
  progress: number;
  assignee: {
    name: string;
    avatar?: string;
  };
  tags: string[];
  dueDate: string;
  createdAt: string;
}

export interface Project {
  id: string;
  key: string;
  name: string;
  description: string;
  version: string;
  lead: string;
  tasks: Task[];
}

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    key: 'WMP',
    name: 'WorkMePlus (WMP Core)',
    description: 'Framework de etiquetas personalizadas y gestor ágil de proyectos tipo Jira',
    version: 'v1.0.0',
    lead: 'Ignacio Díaz',
    tasks: [
      {
        id: 't-1',
        code: 'WMP-101',
        title: 'Diseñar el sistema de componentes <wmp-*>',
        description: 'Implementar el motor JSX runtime para soportar etiquetas personalizadas tipo <wmp-card> y <wmp-badge>.',
        status: 'done',
        priority: 'urgent',
        progress: 100,
        assignee: { name: 'Ignacio Díaz' },
        tags: ['Framework', 'JSX'],
        dueDate: 'Hoy',
        createdAt: '2026-09-29',
      },
      {
        id: 't-2',
        code: 'WMP-102',
        title: 'Tablero Kanban Interactivo',
        description: 'Organizar columnas dinámicas por estado (Backlog, Por Hacer, En Proceso, Revisión, Listo).',
        status: 'in_progress',
        priority: 'high',
        progress: 75,
        assignee: { name: 'Ignacio Díaz' },
        tags: ['UI', 'Kanban'],
        dueDate: 'Mañana',
        createdAt: '2026-09-29',
      },
      {
        id: 't-3',
        code: 'WMP-103',
        title: 'Filtros rápidos por prioridad y responsable',
        description: 'Permitir filtrar tarjetas en un toque por tickets urgentes o asignados a mí.',
        status: 'todo',
        priority: 'medium',
        progress: 0,
        assignee: { name: 'Ignacio Díaz' },
        tags: ['UX'],
        dueDate: '30 Sep',
        createdAt: '2026-09-29',
      },
      {
        id: 't-4',
        code: 'WMP-104',
        title: 'Persistencia offline con AsyncStorage',
        description: 'Guardar cambios de estados y nuevos tickets automáticamente en el dispositivo.',
        status: 'backlog',
        priority: 'medium',
        progress: 0,
        assignee: { name: 'Ignacio Díaz' },
        tags: ['Storage'],
        dueDate: '2 Oct',
        createdAt: '2026-09-29',
      },
      {
        id: 't-5',
        code: 'WMP-105',
        title: 'Verificación de métricas de avance y velocidad',
        description: 'Calcular % de completitud global del proyecto a partir de las tareas terminadas.',
        status: 'in_review',
        priority: 'high',
        progress: 90,
        assignee: { name: 'Ignacio Díaz' },
        tags: ['Analytics'],
        dueDate: 'Hoy',
        createdAt: '2026-09-29',
      },
    ],
  },
  {
    id: 'proj-2',
    key: 'TMPL',
    name: 'Templa App',
    description: 'Generador de plantillas y layouts dinámicos',
    version: 'v2.4.0',
    lead: 'Ignacio Díaz',
    tasks: [
      {
        id: 't-201',
        code: 'TMPL-45',
        title: 'Optimizar renderizado de Preview Builder',
        description: 'Mejorar el pipeline de compilación de plantillas en tiempo real.',
        status: 'in_progress',
        priority: 'urgent',
        progress: 60,
        assignee: { name: 'Ignacio Díaz' },
        tags: ['Performance'],
        dueDate: '1 Oct',
        createdAt: '2026-09-25',
      },
      {
        id: 't-202',
        code: 'TMPL-46',
        title: 'Soporte para temas oscuros en componentes',
        description: 'Alinear paleta de estilos con la especificación moderna.',
        status: 'done',
        priority: 'medium',
        progress: 100,
        assignee: { name: 'Ignacio Díaz' },
        tags: ['Design'],
        dueDate: 'Ayer',
        createdAt: '2026-09-20',
      },
    ],
  },
  {
    id: 'proj-3',
    key: 'SND',
    name: 'Sendero Azul React',
    description: 'Plataforma web interactiva comunitaria',
    version: 'v1.2.0',
    lead: 'Ignacio Díaz',
    tasks: [
      {
        id: 't-301',
        code: 'SND-12',
        title: 'Integrar streaming en vivo y chat social',
        description: 'Conectar módulos de interacción en tiempo real.',
        status: 'todo',
        priority: 'high',
        progress: 15,
        assignee: { name: 'Ignacio Díaz' },
        tags: ['Social', 'WebSockets'],
        dueDate: '5 Oct',
        createdAt: '2026-09-27',
      },
    ],
  },
  {
    id: 'proj-4',
    key: 'LUP',
    name: 'Lúpulos Frontend & API',
    description: 'Gestor y catálogo cervecero artesanal',
    version: 'v1.5.0',
    lead: 'Ignacio Díaz',
    tasks: [
      {
        id: 't-401',
        code: 'LUP-88',
        title: 'Migración a arquitectura modular de endpoints',
        description: 'Refactorizar controladores de inventario y pedidos.',
        status: 'in_review',
        priority: 'medium',
        progress: 85,
        assignee: { name: 'Ignacio Díaz' },
        tags: ['Backend', 'API'],
        dueDate: 'Hoy',
        createdAt: '2026-09-28',
      },
    ],
  },
];
