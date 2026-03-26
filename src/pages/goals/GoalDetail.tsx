import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Edit,
  Trash2,
  ChevronRight,
  Star,
  BarChart2,
} from 'lucide-react';
import { useGoals } from '@/hooks/useGoals';
import { Breadcrumbs } from '@/components/goals/Breadcrumbs';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function GoalDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    getGoalById,
    getChildGoals,
    getBreadcrumbs,
    calculateProgress,
    deleteGoal,
  } = useGoals();

  const goal = getGoalById(id || '');

  if (!goal) {
    return (
      <div className="p-6">
        <h1>Meta não encontrada</h1>
        <Link to="/metas/grandes" className="text-blue-600 hover:underline">
          Voltar
        </Link>
      </div>
    );
  }

  const children = getChildGoals(goal.id);
  const breadcrumbs = getBreadcrumbs(goal.id);
  const realProgress = calculateProgress(goal.id);

  // Map level to readable name
  const levelNames: Record<string, string> = {
    grand: 'Meta Grand',
    annual: 'Meta Anual',
    monthly: 'Meta Mensal',
    weekly: 'Meta Semanal',
    daily: 'Tarefa Diária',
  };

  // Map level to URL path
  const levelPaths: Record<string, string> = {
    grand: 'grandes',
    annual: 'anual',
    monthly: 'mensal',
    weekly: 'semanal',
    daily: 'diarias',
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta meta?')) {
      await deleteGoal(goal.id);
      navigate(`/metas/${levelPaths[goal.level]}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={breadcrumbs.slice(1).map((b) => ({
          label: b.title,
          href: `/metas/${levelPaths[b.level]}/${b.id}`,
        }))}
      />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-900">{goal.title}</h1>
            {goal.isOneThing && (
              <div className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span>ONE Thing</span>
              </div>
            )}
          </div>
          {goal.focusingQuestion && (
            <p className="mt-2 text-lg italic text-slate-600">
              "{goal.focusingQuestion}"
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Link
            to={`/metas/${levelPaths[goal.level]}/${goal.id}/editar`}
            className="rounded-md border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50"
          >
            <Edit className="h-5 w-5" />
          </Link>

          <button
            className="rounded-md border border-slate-200 bg-white p-2 text-red-600 hover:bg-red-50"
            onClick={handleDelete}
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso</CardTitle>
            <BarChart2 className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realProgress}%</div>
            <Progress value={realProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Limite</CardTitle>
            <Calendar className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(goal.dueDate).toLocaleDateString('pt-BR')}
            </div>
            <p className="text-xs text-slate-500">
              Status:{' '}
              {goal.status === 'in_progress' ? 'Em Progresso' : goal.status}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nível</CardTitle>
            <span className="text-xs font-bold uppercase text-slate-500">
              {goal.level}
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{levelNames[goal.level]}</div>
            {goal.areaId && (
              <p className="text-xs text-slate-500">Área: {goal.areaId}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      {goal.description && (
        <div className="rounded-lg border bg-white p-6">
          <h3 className="mb-2 font-semibold text-slate-900">Descrição</h3>
          <p className="text-slate-600">{goal.description}</p>
        </div>
      )}

      {/* Viability & Relevance (only for G and A) */}
      {(goal.level === 'grand' || goal.level === 'annual') && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Viabilidade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Progress value={(goal.viabilityScore || 0) * 10} />
                </div>
                <span className="text-lg font-bold">
                  {goal.viabilityScore || '-'}/10
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Relevância</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Progress value={(goal.relevanceScore || 0) * 10} />
                </div>
                <span className="text-lg font-bold">
                  {goal.relevanceScore || '-'}/10
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Children */}
      {children.length > 0 && (
        <div className="rounded-lg border bg-white p-6">
          <h3 className="mb-4 font-semibold text-slate-900">
            Metas Filhas ({children.length})
          </h3>
          <div className="space-y-3">
            {children.map((child) => (
              <Link
                key={child.id}
                to={`/metas/grandes/${child.id}`}
                className="flex items-center justify-between rounded-md border p-3 hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${child.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`}
                  />
                  <span className="font-medium text-slate-900">
                    {child.title}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>{child.progress}%</span>
                    <Progress value={child.progress} className="h-1 w-16" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
