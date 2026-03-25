import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAreas } from '@/hooks/useAreas';
import { AreaCard } from '@/components/areas/AreaCard';
import { DeleteConfirmModal } from '@/components/areas/DeleteConfirmModal';
import { Skeleton } from '@/components/ui/Skeleton';
import type { AreaFilter } from '@/types';

// EmptyState inline component to avoid import issues
function EmptyState({
  title,
  message,
  actionLabel,
  onAction,
}: {
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-sm">{message}</p>
      <Button onClick={onAction}>
        <Plus className="w-4 h-4 mr-2" />
        {actionLabel}
      </Button>
    </div>
  );
}

export default function AreasList() {
  const navigate = useNavigate();
  const { areas, isLoading, calculateStats, deleteArea, getFilteredAreas } =
    useAreas();
  const [filter, setFilter] = useState<AreaFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [areaToDelete, setAreaToDelete] = useState<{
    id: string;
    name: string;
    goalsCount: number;
  } | null>(null);

  // Filtered areas
  const filteredAreas = useMemo(
    () => getFilteredAreas(filter, searchQuery),
    [getFilteredAreas, filter, searchQuery]
  );

  // Handle delete
  const handleDeleteClick = (id: string) => {
    const area = areas.find((a) => a.id === id);
    if (area) {
      setAreaToDelete({
        id: area.id,
        name: area.name,
        goalsCount: area.goals.length,
      });
      setDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (areaToDelete) {
      try {
        await deleteArea(areaToDelete.id);
        setDeleteModalOpen(false);
        setAreaToDelete(null);
      } catch (error) {
        console.error('Error deleting area:', error);
      }
    }
  };

  // Handle edit
  const handleEdit = (id: string) => {
    navigate(`/areas/${id}/edit`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-3 sm:px-4">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Áreas de Vida</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
          Gerencie as categorias da sua vida
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar áreas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={filter}
          onValueChange={(v) => setFilter(v as AreaFilter)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="active">Ativas</SelectItem>
            <SelectItem value="inactive">Inativas</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => navigate('/areas/new')}
          className="w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Área
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-32 w-full" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredAreas.length === 0 && (
        <EmptyState
          title="Nenhuma área cadastrada"
          message="Comece criando sua primeira área de vida para organizar suas metas"
          actionLabel="Criar Primeira Área"
          onAction={() => navigate('/areas/new')}
        />
      )}

      {/* Areas Grid */}
      {!isLoading && filteredAreas.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredAreas.map((area) => (
            <AreaCard
              key={area.id}
              area={area}
              stats={calculateStats(area.id)}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        itemName={areaToDelete?.name || ''}
        affectedItems={areaToDelete?.goalsCount}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
