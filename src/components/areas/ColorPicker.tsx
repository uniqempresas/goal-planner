import { Check } from 'lucide-react';
import { AREA_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  customColor?: string;
  onCustomColorChange?: (color: string) => void;
}

export function ColorPicker({
  value,
  onChange,
  customColor,
  onCustomColorChange,
}: ColorPickerProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Cor de Identificação</label>
      <div className="flex flex-wrap gap-2">
        {AREA_COLORS.map((color) => (
          <button
            key={color.value}
            type="button"
            onClick={() => onChange(color.value)}
            className={cn(
              'w-8 h-8 rounded-full border-2 transition-all',
              'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2',
              value === color.value
                ? 'border-foreground ring-2 ring-primary'
                : 'border-transparent'
            )}
            style={{ backgroundColor: color.value }}
            title={color.name}
          >
            {value === color.value && (
              <Check className="w-4 h-4 text-white mx-auto" />
            )}
          </button>
        ))}
      </div>

      {/* Custom color input */}
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={customColor || value}
          onChange={(e) => onCustomColorChange?.(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border-0"
        />
        <span className="text-sm text-muted-foreground">Cor customizada</span>
      </div>
    </div>
  );
}
