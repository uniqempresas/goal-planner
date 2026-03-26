import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Plus, Filter } from 'lucide-react';
import { useGoals } from '@/hooks/useGoals';
import { GoalCard } from '@/components/goals/GoalCard';
import type { GoalLevel } from '@/types';

export function GoalsList() {
  const { level } = useParams(); // This will be "grandes", "anual", etc.
  const [searchParams] = useSearchParams();
  const areaFilter = searchParams.get('area');

  // Map URL params to GoalLevel
  const levelMap: Record<string, GoalLevel> = {
    grandes: 'grand',
    anual: 'annual',
    mensal: 'monthly',
    semanal: 'weekly',
    diarias: 'daily',
  };

  const currentLevel = level ? levelMap[level] : undefined;
  const { getGoalsByLevel, getRootGoals } = useGoals();

  // Filter logic
  let goals = [];
  if (currentLevel) {
    goals = getGoalsByLevel(currentLevel);
  } else {
    goals = getRootGoals(areaFilter || undefined);
  }

  // Title handling
  const title = level
    ? level.charAt(0).toUpperCase() + level.slice(1)
    : 'Grand';

  // If no level specific, default to Grand
  if (!currentLevel) {
    goals = getRootGoals();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {level ? `Metas ${title}` : 'Metas Grand'}
          </h1>
          <p className="text-slate-500">
            Gerencie seus objetivos de {level || 'alto nível'}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Filter className="h-4 w-4" />
            Filtrar
          </button>
          <Link
            to={level ? `/metas/${level}/criar` : '/metas/grandes/criar'}
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Nova Meta
          </Link>
        </div>
      </div>

      {goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 p-12 text-center">
          <h3 className="text-lg font-medium text-slate-900">
            Nenhuma meta encontrada
          </h3>
          <p className="text-slate-500">
            Comece criando sua primeira meta {level || 'grand'}.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      )}
    </div>
  );
}
