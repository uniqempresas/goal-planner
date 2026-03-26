import { useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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

const SMART_DATES: Record<
  GoalLevel,
  (start: Date) => { start: string; due: string }
> = {
  grand: (start) => ({
    start: start.toISOString().split('T')[0],
    due: new Date(start.getFullYear() + 1, start.getMonth(), start.getDate())
      .toISOString()
      .split('T')[0],
  }),
  annual: (start) => ({
    start: start.toISOString().split('T')[0],
    due: new Date(start.getFullYear() + 1, start.getMonth(), start.getDate())
      .toISOString()
      .split('T')[0],
  }),
  monthly: (start) => ({
    start: start.toISOString().split('T')[0],
    due: new Date(start.getFullYear(), start.getMonth() + 1, start.getDate())
      .toISOString()
      .split('T')[0],
  }),
  weekly: (start) => ({
    start: start.toISOString().split('T')[0],
    due: new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7)
      .toISOString()
      .split('T')[0],
  }),
  daily: (start) => ({
    start: start.toISOString().split('T')[0],
    due: new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1)
      .toISOString()
      .split('T')[0],
  }),
};

export default function GoalCreate() {
  const { level: paramLevel } = useParams<{ level: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { createGoal } = useGoals();

  // Extract level from URL path if param is missing
  const pathSegments = location.pathname.split('/').filter(Boolean);
  // ["metas", "anual", "criar"]

  let levelFromUrl = paramLevel;
  if (!levelFromUrl && pathSegments.length >= 2) {
    levelFromUrl = pathSegments[1]; // "anual", "grandes", etc.
  }

  let currentLevel: GoalLevel = 'grand';
  let pageTitle = 'Meta';

  if (levelFromUrl) {
    currentLevel = levelMap[levelFromUrl] || 'grand';
    pageTitle = levelTitles[levelFromUrl] || 'Meta';
  }

  const smartDates = useMemo(() => {
    const start = new Date();
    const calculated = SMART_DATES[currentLevel]?.(start);
    return calculated
      ? { startDate: calculated.start, dueDate: calculated.due }
      : undefined;
  }, [currentLevel]);

  const handleSubmit = async (data: any) => {
    await createGoal(data);
    // Navigate back to the list of that level
    navigate(`/metas/${levelFromUrl}`);
  };

  return (
    <div className="container mx-auto max-w-3xl py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Criar {pageTitle}</h1>
        <p className="text-muted-foreground">
          Defina seu objetivo de longo prazo
        </p>
      </div>

      <GoalForm
        onSubmit={handleSubmit}
        level={currentLevel}
        initialDates={smartDates}
      />
    </div>
  );
}
