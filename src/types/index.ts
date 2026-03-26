// Status da área
export type AreaStatus = 'active' | 'inactive';

// Status da meta
export type GoalStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';

// Prioridade da meta
export type GoalPriority = 'low' | 'medium' | 'high';

// Nível da meta hierárquica
export type GoalLevel = 'grand' | 'annual' | 'monthly' | 'weekly' | 'daily';

// Métrica SMART
export interface Metric {
  id: string;
  indicator: string;
  current: number;
  target: number;
  unit: string;
}

// Marco (Milestone)
export interface Milestone {
  id: string;
  title: string;
  completedAt?: string;
  dueDate: string;
  status: GoalStatus;
}

// Meta associada a uma área
export interface Goal {
  id: string;
  title: string;
  level: GoalLevel;
  parentId: string | null;
  areaId: string;

  // Conteúdo
  description?: string;
  focusingQuestion?: string;

  // SMART
  metrics?: Metric[];

  // Viabilidade/Relevância
  viabilityScore?: number; // 1-10
  relevanceScore?: number; // 1-10

  // Datas
  startDate?: string;
  dueDate: string;
  completedAt?: string;

  // Status
  status: GoalStatus;
  priority: GoalPriority;

  // Especial
  isOneThing: boolean;
  progress: number; // 0-100 (Calculated)

  // Contagem de filhos (Denormalizada)
  childrenCount?: number;
  completedChildrenCount?: number;

  // Marcos
  milestones?: Milestone[];

  createdAt: string;
  updatedAt: string;
}

// Área de vida
export interface Area {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  status: AreaStatus;
  goals: Goal[];
  createdAt: string;
  updatedAt: string;
  order: number;
}

// Dados para criação de área (sem id e timestamps)
export type CreateAreaInput = Omit<
  Area,
  'id' | 'createdAt' | 'updatedAt' | 'goals'
>;

// Dados para atualização de área
export type UpdateAreaInput = Partial<CreateAreaInput>;

// Tipo para filtragem na listagem
export type AreaFilter = 'all' | 'active' | 'inactive';

// Stats de uma área
export interface AreaStats {
  totalGoals: number;
  completedGoals: number;
  inProgressGoals: number;
  overdueGoals: number;
  progress: number;
}

// Inputs para Goal
export type CreateGoalInput = Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateGoalInput = Partial<CreateGoalInput>;
