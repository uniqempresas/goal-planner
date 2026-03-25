import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, MoreVertical, Flag } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import type { Area, AreaStats } from '@/types';

interface AreaCardProps {
  area: Area;
  stats: AreaStats;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
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

export function AreaCard({ area, stats, onEdit, onDelete }: AreaCardProps) {
  const navigate = useNavigate();
  const IconComponent = area.icon ? ICON_MAP[area.icon] : Flag;

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(area.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(area.id);
  };

  return (
    <Card
      className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
      onClick={() => navigate(`/areas/${area.id}`)}
    >
      {/* Colored left border */}
      <div
        className="h-1 rounded-t-lg"
        style={{ backgroundColor: area.color }}
      />

      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${area.color}20` }}
          >
            <IconComponent className="w-5 h-5" style={{ color: area.color }} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{area.name}</h3>
            {area.description && (
              <p className="text-sm text-muted-foreground line-clamp-1">
                {area.description}
              </p>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem onClick={handleEditClick}>
              <Pencil className="w-4 h-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteClick} variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>
            {stats.totalGoals} meta{stats.totalGoals !== 1 ? 's' : ''}
          </span>
          <span>
            {stats.completedGoals} concluída
            {stats.completedGoals !== 1 ? 's' : ''}
          </span>
        </div>
        <Progress value={stats.progress} className="h-2" />
      </CardContent>

      <CardFooter className="pt-0 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          {stats.progress}% completo
        </span>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            area.status === 'active'
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          {area.status === 'active' ? 'Ativo' : 'Inativo'}
        </span>
      </CardFooter>
    </Card>
  );
}
