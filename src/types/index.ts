// Status da área
export type AreaStatus = 'active' | 'inactive';

// Status da meta
export type GoalStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';

// Prioridade da meta
export type GoalPriority = 'low' | 'medium' | 'high';

// Meta associada a uma área
export interface Goal {
  id: string;
  title: string;
  description?: string;
  status: GoalStatus;
  priority: GoalPriority;
  dueDate?: string;
  completedAt?: string;
  areaId: string;
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
