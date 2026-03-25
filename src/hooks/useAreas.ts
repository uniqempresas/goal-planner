import { useState, useCallback } from 'react';
import { mockAreas } from '@/data/mockAreas';
import type {
  Area,
  CreateAreaInput,
  UpdateAreaInput,
  AreaFilter,
  AreaStats,
} from '@/types';

export function useAreas() {
  const [areas, setAreas] = useState<Area[]>(mockAreas);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get area by ID
  const getAreaById = useCallback(
    (id: string) => {
      return areas.find((area) => area.id === id);
    },
    [areas]
  );

  // Calculate stats for an area
  const calculateStats = useCallback(
    (areaId: string): AreaStats => {
      const area = areas.find((a) => a.id === areaId);
      if (!area) {
        return {
          totalGoals: 0,
          completedGoals: 0,
          inProgressGoals: 0,
          overdueGoals: 0,
          progress: 0,
        };
      }

      const totalGoals = area.goals.length;
      const completedGoals = area.goals.filter(
        (g) => g.status === 'completed'
      ).length;
      const inProgressGoals = area.goals.filter(
        (g) => g.status === 'in_progress'
      ).length;
      const overdueGoals = area.goals.filter((g) => {
        if (g.status === 'completed') return false;
        if (!g.dueDate) return false;
        return new Date(g.dueDate) < new Date();
      }).length;

      const progress =
        totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

      return {
        totalGoals,
        completedGoals,
        inProgressGoals,
        overdueGoals,
        progress,
      };
    },
    [areas]
  );

  // Create new area
  const createArea = useCallback(
    async (data: CreateAreaInput): Promise<Area> => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const newArea: Area = {
          ...data,
          id: crypto.randomUUID(),
          goals: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          order: areas.length,
        };

        setAreas((prev) => [...prev, newArea]);
        return newArea;
      } catch (err) {
        setError('Erro ao criar área');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [areas.length]
  );

  // Update existing area
  const updateArea = useCallback(
    async (id: string, data: UpdateAreaInput): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        setAreas((prev) =>
          prev.map((area) =>
            area.id === id
              ? { ...area, ...data, updatedAt: new Date().toISOString() }
              : area
          )
        );
      } catch (err) {
        setError('Erro ao atualizar área');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Delete area
  const deleteArea = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAreas((prev) => prev.filter((area) => area.id !== id));
    } catch (err) {
      setError('Erro ao excluir área');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Reorder areas (for drag & drop)
  const reorderAreas = useCallback((newOrder: string[]): void => {
    setAreas((prev) => {
      const areaMap = new Map(prev.map((area) => [area.id, area]));
      return newOrder.map((id, index) => ({
        ...areaMap.get(id)!,
        order: index,
      }));
    });
  }, []);

  // Filter areas
  const filterAreas = useCallback(
    (filter: AreaFilter): Area[] => {
      if (filter === 'all') return areas;
      return areas.filter((area) => area.status === filter);
    },
    [areas]
  );

  // Search areas by name
  const searchAreas = useCallback(
    (query: string): Area[] => {
      if (!query.trim()) return areas;
      const lowerQuery = query.toLowerCase();
      return areas.filter((area) =>
        area.name.toLowerCase().includes(lowerQuery)
      );
    },
    [areas]
  );

  // Filtered and searched areas (combined)
  const getFilteredAreas = useCallback(
    (filter: AreaFilter, searchQuery: string): Area[] => {
      let result = areas;

      if (filter !== 'all') {
        result = result.filter((area) => area.status === filter);
      }

      if (searchQuery.trim()) {
        const lowerQuery = searchQuery.toLowerCase();
        result = result.filter((area) =>
          area.name.toLowerCase().includes(lowerQuery)
        );
      }

      return result.sort((a, b) => a.order - b.order);
    },
    [areas]
  );

  return {
    areas,
    isLoading,
    error,
    getAreaById,
    calculateStats,
    createArea,
    updateArea,
    deleteArea,
    reorderAreas,
    filterAreas,
    searchAreas,
    getFilteredAreas,
  };
}
