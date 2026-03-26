import type { Goal } from '@/types';

export const mockGoals: Goal[] = [
  {
    // 1. Grand Goal: "Tornar-se referência em React" (Carreira)
    id: 'g-grand-1',
    title: 'Tornar-se referência em React',
    level: 'grand',
    parentId: null,
    areaId: '1', // Carreira

    description:
      'Dominar o ecossistema React ao ponto de ser reconhecido como referência na comunidade.',
    focusingQuestion:
      'O que eu preciso dominar para ser a referência que quero ser?',

    // Viability/Relevance
    viabilityScore: 8,
    relevanceScore: 9,

    // Dates
    startDate: '2026-01-01',
    dueDate: '2026-12-31',

    // Status
    status: 'in_progress',
    priority: 'high',

    // Special
    isOneThing: true,
    progress: 35, // Calculated

    childrenCount: 1,
    completedChildrenCount: 0,

    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-03-10T14:30:00Z',
  },
  {
    // 2. Annual Goal: "Dominar React 19 e Server Components"
    id: 'g-annual-1',
    title: 'Dominar React 19 e Server Components',
    level: 'annual',
    parentId: 'g-grand-1',
    areaId: '1', // Carreira

    description:
      'Estudar e implementar profundamente os novos recursos do React 19, com foco em Server Components.',
    focusingQuestion:
      'Quais projetos práticos vou criar para demonstrar esse domínio?',

    viabilityScore: 9,
    relevanceScore: 10,

    startDate: '2026-01-01',
    dueDate: '2026-12-31',

    status: 'in_progress',
    priority: 'high',

    isOneThing: false,
    progress: 40,

    childrenCount: 1,
    completedChildrenCount: 0,

    createdAt: '2026-01-20T08:00:00Z',
    updatedAt: '2026-03-12T10:00:00Z',
  },
  {
    // 3. Monthly Goal: "Estudar Server Actions e Form Actions"
    id: 'g-monthly-1',
    title: 'Estudar Server Actions e Form Actions',
    level: 'monthly',
    parentId: 'g-annual-1',
    areaId: '1', // Carreira

    description:
      'Entender profundamente como Server Actions funcionam e como usar Form Actions para mutations.',
    focusingQuestion: 'Que problemas do mundo real posso resolver com isso?',

    // No explicit Viability/Relevance for lower levels in this mock, defaults

    startDate: '2026-03-01',
    dueDate: '2026-03-31',

    status: 'in_progress',
    priority: 'high',

    isOneThing: true,
    progress: 60,

    childrenCount: 1,
    completedChildrenCount: 0,

    createdAt: '2026-03-01T09:00:00Z',
    updatedAt: '2026-03-15T11:00:00Z',
  },
  {
    // 4. Weekly Goal: "Criar projeto teste com Server Actions"
    id: 'g-weekly-1',
    title: 'Criar projeto teste com Server Actions',
    level: 'weekly',
    parentId: 'g-monthly-1',
    areaId: '1', // Carreira

    description:
      'Implementar um projeto prático parafixar o aprendizado de Server Actions.',

    startDate: '2026-03-16',
    dueDate: '2026-03-22',

    status: 'in_progress',
    priority: 'high',

    isOneThing: false,
    progress: 20,

    childrenCount: 2, // Two daily tasks
    completedChildrenCount: 0,

    createdAt: '2026-03-15T14:00:00Z',
    updatedAt: '2026-03-16T08:00:00Z',
  },
  {
    // 5a. Daily Goal: "Setup Vite project"
    id: 'g-daily-1',
    title: 'Configurar projeto Vite',
    level: 'daily',
    parentId: 'g-weekly-1',
    areaId: '1', // Carreira

    description: 'Inicializar o projeto com Vite e TypeScript.',

    startDate: '2026-03-16',
    dueDate: '2026-03-16',

    status: 'in_progress',
    priority: 'high',

    isOneThing: false,
    progress: 0,

    childrenCount: 0,
    completedChildrenCount: 0,

    createdAt: '2026-03-16T08:00:00Z',
    updatedAt: '2026-03-16T08:00:00Z',
  },
  {
    // 5b. Daily Goal: "Implement form"
    id: 'g-daily-2',
    title: 'Implementar formulário',
    level: 'daily',
    parentId: 'g-weekly-1',
    areaId: '1', // Carreira

    description: 'Criar um formulário utilizando Server Actions.',

    startDate: '2026-03-17',
    dueDate: '2026-03-17',

    status: 'pending',
    priority: 'high',

    isOneThing: false,
    progress: 0,

    childrenCount: 0,
    completedChildrenCount: 0,

    createdAt: '2026-03-16T08:00:00Z',
    updatedAt: '2026-03-16T08:00:00Z',
  },
];
