import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import type { Goal } from '@/types';

interface GoalCardProps {
  goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="group relative flex flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">
            <Link to={`/metas/grandes/${goal.id}`} className="hover:underline">
              {goal.title}
            </Link>
          </h3>
          {goal.focusingQuestion && (
            <p className="mt-1 text-sm text-slate-500 italic">
              "{goal.focusingQuestion}"
            </p>
          )}
        </div>
        {goal.isOneThing && (
          <div className="ml-2 flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            <span>ONE Thing</span>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-xs font-medium text-slate-500">Progresso</p>
          <div className="mt-1 flex items-center gap-2">
            <Progress value={goal.progress} className="h-2 w-full" />
            <span className="text-xs font-bold text-slate-700">
              {goal.progress}%
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-slate-500">Prioridade</p>
          <p
            className={`mt-1 font-semibold capitalize ${getPriorityColor(goal.priority)}`}
          >
            {goal.priority}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Calendar className="h-3 w-3" />
          <span>{new Date(goal.dueDate).toLocaleDateString('pt-BR')}</span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getStatusColor(goal.status)}>
            {goal.status === 'in_progress' ? 'Em Progresso' : goal.status}
          </Badge>

          {goal.childrenCount !== undefined && goal.childrenCount > 0 && (
            <Link
              to={`/metas/grandes/${goal.id}`}
              className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
            >
              <span>
                {goal.childrenCount} filho{goal.childrenCount > 1 ? 's' : ''}
              </span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
