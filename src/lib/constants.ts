// Cores predefinidas para áreas de vida
export const AREA_COLORS = [
  { name: 'Azul', value: '#3B82F6', emotion: 'Profissional, confiança' },
  { name: 'Verde', value: '#10B981', emotion: 'Crescimento, saúde' },
  { name: 'Amarelo', value: '#F59E0B', emotion: 'Energia, cautela' },
  { name: 'Laranja', value: '#F97316', emotion: 'Motivação, ação' },
  { name: 'Roxo', value: '#8B5CF6', emotion: 'Criatividade, espiritualidade' },
  { name: 'Pink', value: '#EC4899', emotion: 'Amor, relacionamentos' },
  { name: 'Cinza', value: '#6B7280', emotion: 'Neutro, geral' },
  { name: 'Ciano', value: '#06B6D4', emotion: 'Calma, comunicação' },
] as const;

// Ícones disponíveis para áreas (lucide-react)
export const AREA_ICONS = [
  // Trabalho
  { name: 'Briefcase', category: 'Trabalho' },
  { name: 'Laptop', category: 'Trabalho' },
  { name: 'Code', category: 'Trabalho' },
  { name: 'GraduationCap', category: 'Trabalho' },
  // Saúde
  { name: 'Heart', category: 'Saúde' },
  { name: 'Activity', category: 'Saúde' },
  { name: 'Apple', category: 'Saúde' },
  { name: 'Dumbbell', category: 'Saúde' },
  // Finanças
  { name: 'Wallet', category: 'Finanças' },
  { name: 'DollarSign', category: 'Finanças' },
  { name: 'PieChart', category: 'Finanças' },
  { name: 'TrendingUp', category: 'Finanças' },
  // Família
  { name: 'Users', category: 'Família' },
  { name: 'Home', category: 'Família' },
  { name: 'Baby', category: 'Família' },
  { name: 'Heart', category: 'Família' },
  // Pessoal
  { name: 'Star', category: 'Pessoal' },
  { name: 'Smile', category: 'Pessoal' },
  { name: 'Coffee', category: 'Pessoal' },
  { name: 'BookOpen', category: 'Pessoal' },
  // Outros
  { name: 'Target', category: 'Outros' },
  { name: 'Flag', category: 'Outros' },
  { name: 'Calendar', category: 'Outros' },
  { name: 'MapPin', category: 'Outros' },
  { name: 'Plane', category: 'Outros' },
  { name: 'Music', category: 'Outros' },
  { name: 'Gamepad2', category: 'Outros' },
  { name: 'Palette', category: 'Outros' },
] as const;

// Limites de validação
export const AREA_VALIDATION = {
  name: {
    minLength: 2,
    maxLength: 100,
  },
  description: {
    maxLength: 500,
  },
} as const;

// Limites de validação para Metas
export const GOAL_VALIDATION = {
  title: {
    minLength: 3,
    maxLength: 200,
  },
  focusingQuestion: {
    maxLength: 300,
  },
  description: {
    maxLength: 1000,
  },
} as const;
