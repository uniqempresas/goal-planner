import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2, Plus, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAreas } from '@/hooks/useAreas';
import { DeleteConfirmModal } from '@/components/areas/DeleteConfirmModal';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  Briefcase,
  Laptop,
  Code,
  GraduationCap,
  Heart,
  Activity,
  Apple,
  Dumbbell,
  Wallet,
  DollarSign,
  PieChart,
  TrendingUp,
  Users,
  Home,
  Baby,
  Star,
  Smile,
  Coffee,
  BookOpen,
  Target,
  Calendar,
  MapPin,
  Plane,
  Music,
  Gamepad2,
  Palette,
} from 'lucide-react';
import { useState } from 'react';

// EmptyState inline component
function EmptyState({
  title,
  message,
  actionLabel,
  onAction,
}: {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Flag className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-sm">{message}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>
          <Plus className="w-4 h-4 mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

// Map of icon names to components
const ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  Briefcase,
  Laptop,
  Code,
  GraduationCap,
  Heart,
  Activity,
  Apple,
  Dumbbell,
  Wallet,
  DollarSign,
  PieChart,
  TrendingUp,
  Users,
  Home,
  Baby,
  Star,
  Smile,
  Coffee,
  BookOpen,
  Target,
  Flag,
  Calendar,
  MapPin,
  Plane,
  Music,
  Gamepad2,
  Palette,
};

export default function AreaDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAreaById, calculateStats, isLoading, deleteArea } = useAreas();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const area = id ? getAreaById(id) : undefined;
  const stats = id ? calculateStats(id) : undefined;

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl py-6 px-4 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!area) {
    return (
      <div className="container mx-auto max-w-4xl py-6 px-4">
        <EmptyState
          title="Área não encontrada"
          message="A área que você está procurando não existe ou foi removida."
          actionLabel="Voltar para Áreas"
          onAction={() => navigate('/areas')}
        />
      </div>
    );
  }

  const IconComponent = area.icon ? ICON_MAP[area.icon] : Flag;

  const handleDelete = async () => {
    try {
      await deleteArea(area.id);
      navigate('/areas');
    } catch (error) {
      console.error('Error deleting area:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      high: 'destructive',
      medium: 'default',
      low: 'secondary',
    };
    return (
      <Badge variant={variants[priority] || 'secondary'}>{priority}</Badge>
    );
  };

  return (
    <div className="container mx-auto max-w-4xl py-6 px-4">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/areas">Áreas de Vida</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{area.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/areas')}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div
              className="p-3 rounded-lg"
              style={{ backgroundColor: `${area.color}20` }}
            >
              <IconComponent
                className="w-6 h-6"
                style={{ color: area.color }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: area.color }}>
                {area.name}
              </h1>
              {area.description && (
                <p className="text-muted-foreground mt-1">{area.description}</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">
                Criada em: {formatDate(area.createdAt)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/areas/${area.id}/edit`)}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button
            variant="destructive"
            onClick={() => setDeleteModalOpen(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Excluir
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{stats?.totalGoals}</p>
              <p className="text-sm text-muted-foreground">Total de Metas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {stats?.completedGoals}
              </p>
              <p className="text-sm text-muted-foreground">Concluídas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {stats?.inProgressGoals}
              </p>
              <p className="text-sm text-muted-foreground">Em Andamento</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">
                {stats?.overdueGoals}
              </p>
              <p className="text-sm text-muted-foreground">Atrasadas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso Geral</span>
              <span className="font-medium">{stats?.progress}%</span>
            </div>
            <Progress value={stats?.progress || 0} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Goals Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Metas</h2>
          <Button size="sm" onClick={() => navigate('/goals/new')}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Meta
          </Button>
        </div>

        {area.goals.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <EmptyState
                title="Nenhuma meta nesta área"
                message="Crie sua primeira meta para esta área de vida"
                actionLabel="Criar Meta"
                onAction={() => navigate('/goals/new')}
              />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Status</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Prazo</TableHead>
                  <TableHead>Prioridade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {area.goals.map((goal) => (
                  <TableRow key={goal.id} className="cursor-pointer">
                    <TableCell>
                      <Checkbox checked={goal.status === 'completed'} />
                    </TableCell>
                    <TableCell className="font-medium">{goal.title}</TableCell>
                    <TableCell>
                      {goal.dueDate ? formatDate(goal.dueDate) : '-'}
                    </TableCell>
                    <TableCell>{getPriorityBadge(goal.priority)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        itemName={area.name}
        affectedItems={area.goals.length}
        onConfirm={handleDelete}
      />
    </div>
  );
}
