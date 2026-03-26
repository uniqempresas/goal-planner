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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAreas } from '@/hooks/useAreas';
import { GOAL_VALIDATION } from '@/lib/constants';
import type { Goal, CreateGoalInput, GoalLevel } from '@/types';
import { ParentGoalSelector } from './ParentGoalSelector';

const goalFormSchema = z.object({
  title: z
    .string()
    .min(
      GOAL_VALIDATION.title.minLength,
      `Título deve ter pelo menos ${GOAL_VALIDATION.title.minLength} caracteres`
    )
    .max(
      GOAL_VALIDATION.title.maxLength,
      `Título deve ter no máximo ${GOAL_VALIDATION.title.maxLength} caracteres`
    ),
  focusingQuestion: z
    .string()
    .max(
      GOAL_VALIDATION.focusingQuestion.maxLength,
      `Pergunta focal deve ter no máximo ${GOAL_VALIDATION.focusingQuestion.maxLength} caracteres`
    )
    .optional()
    .or(z.literal('')),
  description: z
    .string()
    .max(
      GOAL_VALIDATION.description.maxLength,
      `Descrição deve ter no máximo ${GOAL_VALIDATION.description.maxLength} caracteres`
    )
    .optional(),
  viabilityScore: z.coerce.number().min(1).max(10),
  relevanceScore: z.coerce.number().min(1).max(10),
  startDate: z.string().min(1, 'Data de início é obrigatória'),
  dueDate: z.string().min(1, 'Data de conclusão é obrigatória'),
  areaId: z.string().min(1, 'Selecione uma área de vida'),
  priority: z.enum(['low', 'medium', 'high']),
  isOneThing: z.boolean(),
  parentId: z.string().optional().nullable(),
});

type GoalFormData = z.infer<typeof goalFormSchema>;

interface GoalFormProps {
  goal?: Goal;
  onSubmit: (data: CreateGoalInput) => Promise<void>;
  isLoading?: boolean;
  level: GoalLevel;
}

export function GoalForm({
  goal,
  onSubmit,
  isLoading = false,
  level,
}: GoalFormProps) {
  const navigate = useNavigate();
  const { areas } = useAreas();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GoalFormData>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      title: goal?.title || '',
      focusingQuestion: goal?.focusingQuestion || '',
      description: goal?.description || '',
      viabilityScore: goal?.viabilityScore || 5,
      relevanceScore: goal?.relevanceScore || 5,
      startDate: goal?.startDate || new Date().toISOString().split('T')[0],
      dueDate: goal?.dueDate || '',
      areaId: goal?.areaId || '',
      priority: goal?.priority || 'medium',
      isOneThing: goal?.isOneThing || false,
      parentId: goal?.parentId || null,
    },
  });

  const handleFormSubmit = async (data: GoalFormData) => {
    await onSubmit({
      ...data,
      level: level,
      parentId: data.parentId || null,
      status: goal?.status || 'pending',
      progress: goal?.progress || 0,
    });
  };

  const pageTitle = goal
    ? `Editar ${level === 'grand' ? 'Meta Grande' : level === 'annual' ? 'Meta Anual' : 'Meta'}`
    : `Criar ${level === 'grand' ? 'Meta Grande' : level === 'annual' ? 'Meta Anual' : 'Meta'}`;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{pageTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Título <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Ex: Tornar-me um líder na indústria de tecnologia"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Focusing Question */}
          <div className="space-y-2">
            <Label htmlFor="focusingQuestion">
              Pergunta Focal <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="focusingQuestion"
              {...register('focusingQuestion')}
              placeholder="Qual é a ÚNICA coisa que, se eu fizer, fará tudo mais fácil?"
              rows={3}
            />
            {errors.focusingQuestion && (
              <p className="text-sm text-destructive">
                {errors.focusingQuestion.message}
              </p>
            )}
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Detalhe seu objetivo... Por que é importante? O que você quer alcançar?"
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground text-right">
              {GOAL_VALIDATION.description.maxLength} caracteres máximo
            </p>
          </div>

          {/* Scores */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="viabilityScore">Viabilidade (1-10)</Label>
              <Input
                id="viabilityScore"
                type="number"
                min="1"
                max="10"
                {...register('viabilityScore')}
                className="w-full"
              />
              {errors.viabilityScore && (
                <p className="text-sm text-destructive">
                  {errors.viabilityScore.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="relevanceScore">Relevância (1-10)</Label>
              <Input
                id="relevanceScore"
                type="number"
                min="1"
                max="10"
                {...register('relevanceScore')}
                className="w-full"
              />
              {errors.relevanceScore && (
                <p className="text-sm text-destructive">
                  {errors.relevanceScore.message}
                </p>
              )}
            </div>
          </div>

          {/* Datas */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">
                Data de Início <span className="text-destructive">*</span>
              </Label>
              <Input id="startDate" type="date" {...register('startDate')} />
              {errors.startDate && (
                <p className="text-sm text-destructive">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">
                Data de Conclusão <span className="text-destructive">*</span>
              </Label>
              <Input id="dueDate" type="date" {...register('dueDate')} />
              {errors.dueDate && (
                <p className="text-sm text-destructive">
                  {errors.dueDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Área e Prioridade */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="areaId">Área de Vida</Label>
              <Select
                value={watch('areaId') || ''}
                onValueChange={(value) => setValue('areaId', value || '')}
              >
                <SelectTrigger id="areaId">
                  <SelectValue placeholder="Selecione uma área" />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem key={area.id} value={area.id}>
                      {area.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.areaId && (
                <p className="text-sm text-destructive">
                  {errors.areaId.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select
                value={watch('priority')}
                onValueChange={(value) =>
                  setValue('priority', value as 'low' | 'medium' | 'high')
                }
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Parent Goal Selector */}
          <ParentGoalSelector
            currentLevel={level}
            value={watch('parentId')}
            onChange={(parentId) => setValue('parentId', parentId)}
          />

          {/* Is ONE Thing */}
          <div className="flex items-center space-x-2">
            <Switch
              id="isOneThing"
              checked={watch('isOneThing')}
              onCheckedChange={(checked) => setValue('isOneThing', checked)}
            />
            <Label htmlFor="isOneThing" className="font-normal">
              Definir como "A Coisa Certa" (One Thing)
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(-1)}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading
            ? 'Salvando...'
            : goal
              ? 'Salvar Alterações'
              : 'Criar Meta'}
        </Button>
      </div>
    </form>
  );
}
