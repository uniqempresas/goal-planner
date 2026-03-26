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

export default function GoalCreate() {
  const { level } = useParams<{ level: string }>();
  const navigate = useNavigate();
  const { createGoal } = useGoals();

  const currentLevel = level ? levelMap[level] : 'grand';
  const pageTitle = level ? levelTitles[level] : 'Meta';

  const handleSubmit = async (data: any) => {
    await createGoal(data);
    // Navigate back to the list of that level
    navigate(`/metas/${level}`);
  };

  return (
    <div className="container mx-auto max-w-3xl py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Criar {pageTitle}</h1>
        <p className="text-muted-foreground">
          Defina seu objetivo de longo prazo
        </p>
      </div>

      <GoalForm onSubmit={handleSubmit} level={currentLevel} />
    </div>
  );
}
