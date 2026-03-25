import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ColorPicker } from './ColorPicker';
import { IconPicker } from './IconPicker';
import { AREA_VALIDATION } from '@/lib/constants';
import type { Area, CreateAreaInput } from '@/types';

const areaFormSchema = z.object({
  name: z
    .string()
    .min(
      AREA_VALIDATION.name.minLength,
      `Nome deve ter pelo menos ${AREA_VALIDATION.name.minLength} caracteres`
    )
    .max(
      AREA_VALIDATION.name.maxLength,
      `Nome deve ter no máximo ${AREA_VALIDATION.name.maxLength} caracteres`
    ),
  description: z
    .string()
    .max(
      AREA_VALIDATION.description.maxLength,
      `Descrição deve ter no máximo ${AREA_VALIDATION.description.maxLength} caracteres`
    )
    .optional(),
  color: z.string().min(1, 'Selecione uma cor'),
  icon: z.string().optional(),
  status: z.enum(['active', 'inactive']),
});

type AreaFormData = z.infer<typeof areaFormSchema>;

interface AreaFormProps {
  area?: Area;
  onSubmit: (data: CreateAreaInput) => Promise<void>;
  isLoading?: boolean;
}

export function AreaForm({ area, onSubmit, isLoading = false }: AreaFormProps) {
  const navigate = useNavigate();
  const [customColor, setCustomColor] = useState<string>(
    area?.color || '#3B82F6'
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AreaFormData>({
    resolver: zodResolver(areaFormSchema),
    defaultValues: {
      name: area?.name || '',
      description: area?.description || '',
      color: area?.color || '#3B82F6',
      icon: area?.icon || '',
      status: area?.status || 'active',
    },
  });

  const selectedColor = watch('color');

  const handleColorChange = (color: string) => {
    setValue('color', color, { shouldValidate: true });
  };

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color);
    setValue('color', color, { shouldValidate: true });
  };

  const handleIconChange = (icon: string) => {
    setValue('icon', icon);
  };

  const handleFormSubmit = async (data: AreaFormData) => {
    await onSubmit({
      name: data.name,
      description: data.description,
      color: data.color,
      icon: data.icon,
      status: data.status,
      order: area?.order || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {area ? 'Editar Área de Vida' : 'Nova Área de Vida'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Nome <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Ex: Carreira, Saúde, Família"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Descreva o objetivo desta área de vida..."
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground text-right">
              {AREA_VALIDATION.description.maxLength} caracteres máximo
            </p>
          </div>

          {/* Cor */}
          <ColorPicker
            value={selectedColor}
            onChange={handleColorChange}
            customColor={customColor}
            onCustomColorChange={handleCustomColorChange}
          />
          {errors.color && (
            <p className="text-sm text-destructive">{errors.color.message}</p>
          )}

          {/* Ícone */}
          <IconPicker value={watch('icon')} onChange={handleIconChange} />

          {/* Status */}
          <div className="flex items-center justify-between">
            <Label htmlFor="status">Status</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Inativo</span>
              <Switch
                id="status"
                checked={watch('status') === 'active'}
                onCheckedChange={(checked) =>
                  setValue('status', checked ? 'active' : 'inactive')
                }
              />
              <span className="text-sm text-muted-foreground">Ativo</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações do formulário */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(-1)}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? 'Salvando...'
            : area
              ? 'Salvar Alterações'
              : 'Criar Área'}
        </Button>
      </div>
    </form>
  );
}
