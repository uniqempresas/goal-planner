import { useState, useMemo, useCallback } from 'react';
import type {
  Goal,
  GoalLevel,
  CreateGoalInput,
  UpdateGoalInput,
} from '@/types';
import { mockGoals } from '@/data/mockGoals';

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);

  // --- Getters ---

  const getGoals = useCallback(() => {
    return goals;
  }, [goals]);

  const getGoalById = useCallback(
    (id: string) => {
      return goals.find((g) => g.id === id);
    },
    [goals]
  );

  const getGoalsByLevel = useCallback(
    (level: GoalLevel) => {
      return goals.filter((g) => g.level === level);
    },
    [goals]
  );

  const getRootGoals = useCallback(
    (areaId?: string) => {
      return goals.filter(
        (g) => g.parentId === null && (areaId ? g.areaId === areaId : true)
      );
    },
    [goals]
  );

  const getChildGoals = useCallback(
    (parentId: string) => {
      return goals.filter((g) => g.parentId === parentId);
    },
    [goals]
  );

  const getBreadcrumbs = useCallback(
    (goalId: string): Goal[] => {
      const breadcrumbs: Goal[] = [];
      let current = goals.find((g) => g.id === goalId);

      while (current) {
        breadcrumbs.unshift(current);
        if (current.parentId) {
          current = goals.find((g) => g.id === current!.parentId);
        } else {
          break;
        }
      }
      return breadcrumbs;
    },
    [goals]
  );

  // --- Logic ---

  // Calculate progress recursively based on children
  const calculateProgress = useCallback(
    (goalId: string): number => {
      const goal = goals.find((g) => g.id === goalId);
      if (!goal) return 0;

      const children = goals.filter((g) => g.parentId === goalId);

      if (children.length === 0) {
        return goal.progress;
      }

      const totalProgress = children.reduce((acc, child) => {
        return acc + calculateProgress(child.id);
      }, 0);

      return Math.round(totalProgress / children.length);
    },
    [goals]
  );

  // --- Mutations ---

  const createGoal = useCallback((input: CreateGoalInput) => {
    const now = new Date().toISOString();
    const newGoal: Goal = {
      ...input,
      id: `g-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
      childrenCount: 0,
      completedChildrenCount: 0,
      progress: input.level === 'daily' ? 0 : (undefined as any), // Default for leaf nodes? Or calculated.
    };

    // If it's not a leaf node, initialize progress based on children or 0
    // If it has a parent, update parent's childrenCount
    setGoals((prev) => {
      const newGoals = [...prev, newGoal];
      if (newGoal.parentId) {
        return newGoals.map((g) =>
          g.id === newGoal.parentId
            ? { ...g, childrenCount: (g.childrenCount || 0) + 1 }
            : g
        );
      }
      return newGoals;
    });
  }, []);

  const updateGoal = useCallback((id: string, updates: UpdateGoalInput) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          return {
            ...g,
            ...updates,
            updatedAt: new Date().toISOString(),
            // If status changes to completed, update parent counts (recursively potentially)
          };
        }
        return g;
      })
    );
  }, []);

  const deleteGoal = useCallback(
    (id: string) => {
      // Prevent deletion if it has children? Or handle orphans.
      // For now, simple delete.
      const goal = goals.find((g) => g.id === id);
      if (goal?.parentId) {
        // Update parent counts
        setGoals((prev) =>
          prev
            .map((g) =>
              g.id === goal.parentId
                ? {
                    ...g,
                    childrenCount: Math.max(0, (g.childrenCount || 1) - 1),
                  }
                : g
            )
            .filter((g) => g.id !== id)
        );
      } else {
        setGoals((prev) => prev.filter((g) => g.id !== id));
      }
    },
    [goals]
  );

  // Stats for dashboard or list
  const stats = useMemo(() => {
    const total = goals.length;
    const completed = goals.filter((g) => g.status === 'completed').length;
    const inProgress = goals.filter((g) => g.status === 'in_progress').length;
    const oneThing = goals.find((g) => g.isOneThing);

    return {
      total,
      completed,
      inProgress,
      oneThing: oneThing ? oneThing.title : 'Nenhuma',
    };
  }, [goals]);

  return {
    goals,
    getGoals,
    getGoalById,
    getGoalsByLevel,
    getRootGoals,
    getChildGoals,
    getBreadcrumbs,
    calculateProgress,
    createGoal,
    updateGoal,
    deleteGoal,
    stats,
  };
}
