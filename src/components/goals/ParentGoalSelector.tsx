import { useState, useMemo } from 'react';
import { Link2, Search, Check, CircleDashed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useGoals } from '@/hooks/useGoals';
import { useAreas } from '@/hooks/useAreas';
import type { GoalLevel, Goal } from '@/types';
import { cn } from '@/lib/utils';

interface ParentGoalSelectorProps {
  currentLevel: GoalLevel;
  value: string | null | undefined;
  onChange: (parentId: string | null) => void;
}

const LEVEL_ORDER: GoalLevel[] = [
  'grand',
  'annual',
  'monthly',
  'weekly',
  'daily',
];

const LEVEL_LABELS: Record<GoalLevel, string> = {
  grand: 'Meta Grande',
  annual: 'Meta Anual',
  monthly: 'Meta Mensal',
  weekly: 'Meta Semanal',
  daily: 'Meta Diária',
};

export function ParentGoalSelector({
  currentLevel,
  value,
  onChange,
}: ParentGoalSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { getGoalsByLevel } = useGoals();
  const { getAreaById } = useAreas();

  // Calculate parent level
  const parentLevel = useMemo(() => {
    const currentIndex = LEVEL_ORDER.indexOf(currentLevel);
    // Grand goals don't have parents (level - 1 is undefined)
    if (currentIndex <= 0) return null;
    return LEVEL_ORDER[currentIndex - 1];
  }, [currentLevel]);

  // Fetch potential parent goals
  const parentGoals = useMemo(() => {
    if (!parentLevel) return [];
    return getGoalsByLevel(parentLevel);
  }, [parentLevel, getGoalsByLevel]);

  // Filter goals based on search
  const filteredGoals = useMemo(() => {
    if (!searchQuery.trim()) return parentGoals;

    const lowerQuery = searchQuery.toLowerCase();
    return parentGoals.filter((goal) => {
      const area = getAreaById(goal.areaId);
      return (
        goal.title.toLowerCase().includes(lowerQuery) ||
        area?.name.toLowerCase().includes(lowerQuery)
      );
    });
  }, [parentGoals, searchQuery, getAreaById]);

  const selectedGoal = useMemo(() => {
    if (!value) return null;
    return parentGoals.find((g) => g.id === value);
  }, [value, parentGoals]);

  const selectedArea = selectedGoal ? getAreaById(selectedGoal.areaId) : null;

  const handleSelect = (goal: Goal) => {
    onChange(goal.id);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleClear = () => {
    onChange(null);
  };

  if (!parentLevel) {
    return null; // Root goals don't have parents
  }

  return (
    <div className="space-y-2">
      <Label>Vincular a uma meta</Label>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start font-normal',
              !selectedGoal && 'text-muted-foreground'
            )}
          >
            {selectedGoal ? (
              <div className="flex items-center gap-2 overflow-hidden">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: selectedArea?.color }}
                />
                <span className="truncate">{selectedGoal.title}</span>
              </div>
            ) : (
              <>
                <Link2 className="mr-2 h-4 w-4" />
                Selecionar {LEVEL_LABELS[parentLevel]}
              </>
            )}
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              Vincular a uma {LEVEL_LABELS[parentLevel]}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título ou área..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
                autoFocus
              />
            </div>

            <div className="max-h-[300px] overflow-y-auto space-y-1">
              {filteredGoals.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <CircleDashed className="mx-auto h-8 w-8 opacity-50 mb-2" />
                  <p>Nenhuma {LEVEL_LABELS[parentLevel]} encontrada</p>
                  {searchQuery && (
                    <p className="text-sm">Tente buscar por outro termo</p>
                  )}
                </div>
              ) : (
                filteredGoals.map((goal) => {
                  const area = getAreaById(goal.areaId);
                  const isSelected = goal.id === value;

                  return (
                    <button
                      key={goal.id}
                      onClick={() => handleSelect(goal)}
                      className={cn(
                        'w-full text-left p-3 rounded-lg border transition-colors hover:bg-accent',
                        isSelected && 'bg-accent border-primary'
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: area?.color }}
                            />
                            <span className="font-medium truncate text-sm">
                              {goal.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{area?.name}</span>
                            <span>•</span>
                            <span>{goal.progress}%</span>
                          </div>
                        </div>

                        {isSelected && (
                          <Check className="h-4 w-4 text-primary shrink-0" />
                        )}
                      </div>

                      <Progress value={goal.progress} className="mt-2 h-1" />
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {selectedGoal && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="text-xs text-muted-foreground h-auto py-1 px-2 hover:text-destructive"
        >
          Limpar seleção
        </Button>
      )}
    </div>
  );
}
