import { useParams, useNavigate } from 'react-router-dom';
import { GoalForm } from '@/components/goals/GoalForm';
import { useGoals } from '@/hooks/useGoals';
import type { GoalLevel } from '@/types';

const levelMap: Record<string, GoalLevel> = {
  grandes: 'grand',
  anual: 'annual',
  mensal: 'monthly',
  semanal: 'weekly',
  diarias: 'daily',
};

const levelTitles: Record<string, string> = {
  grandes: 'Meta Grande',
  anual: 'Meta Anual',
  mensal: 'Meta Mensal',
  semanal: 'Meta Semanal',
  diarias: 'Tarefa Diária',
};

export default function GoalEdit() {
  const { level, id } = useParams<{ level: string; id: string }>();
  const navigate = useNavigate();
  const { getGoalById, updateGoal } = useGoals();

  const goal = getGoalById(id || '');

  const currentLevel = level ? levelMap[level] : 'grand';
  const pageTitle = level ? levelTitles[level] : 'Meta';

  const handleSubmit = async (data: any) => {
    await updateGoal(id!, data);
    // Navigate back to detail or list
    navigate(`/metas/${level}/${id}`);
  };

  if (!goal) {
    return <div>Meta não encontrada</div>;
  }

  return (
    <div className="container mx-auto max-w-3xl py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Editar {pageTitle}</h1>
        <p className="text-muted-foreground">Atualize os dados da sua meta</p>
      </div>

      <GoalForm goal={goal} onSubmit={handleSubmit} level={currentLevel} />
    </div>
  );
}
