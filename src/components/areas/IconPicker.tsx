import { AREA_ICONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

// Import individual icons
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
  Flag,
  Calendar,
  MapPin,
  Plane,
  Music,
  Gamepad2,
  Palette,
} from 'lucide-react';

interface IconPickerProps {
  value?: string;
  onChange: (icon: string) => void;
}

// Map of icon names to components
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
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

export function IconPicker({ value, onChange }: IconPickerProps) {
  // Get unique icon names
  const iconNames = [...new Set(AREA_ICONS.map((i) => i.name))];

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Ícone (opcional)</label>
      <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto p-2 border rounded-lg">
        {iconNames.map((iconName) => {
          const IconComponent = ICON_MAP[iconName];

          if (!IconComponent) return null;

          return (
            <button
              key={iconName}
              type="button"
              onClick={() => onChange(iconName)}
              className={cn(
                'p-2 rounded-lg transition-all hover:bg-muted',
                value === iconName && 'bg-primary text-primary-foreground'
              )}
              title={iconName}
            >
              <IconComponent className="w-5 h-5" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
