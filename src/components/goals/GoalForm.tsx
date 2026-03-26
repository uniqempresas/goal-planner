import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Star,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
  initialDates?: {
    startDate: string;
    dueDate: string;
  };
}

const STEPS = [
  { id: 1, title: 'Identidade', fields: ['title', 'focusingQuestion'] },
  {
    id: 2,
    title: 'Estratégia',
    fields: ['description', 'viabilityScore', 'relevanceScore'],
  },
  {
    id: 3,
    title: 'Planejamento',
    fields: ['startDate', 'dueDate', 'areaId', 'priority', 'parentId'],
  },
  { id: 4, title: 'Foco', fields: ['isOneThing'] },
];

export function GoalForm({
  goal,
  onSubmit,
  isLoading = false,
  level,
  initialDates,
}: GoalFormProps) {
  const { areas } = useAreas();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<GoalFormData>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      title: goal?.title || '',
      focusingQuestion: goal?.focusingQuestion || '',
      description: goal?.description || '',
      viabilityScore: goal?.viabilityScore || 5,
      relevanceScore: goal?.relevanceScore || 5,
      startDate:
        goal?.startDate ||
        initialDates?.startDate ||
        new Date().toISOString().split('T')[0],
      dueDate: goal?.dueDate || initialDates?.dueDate || '',
      areaId: goal?.areaId || '',
      priority: goal?.priority || 'medium',
      isOneThing: goal?.isOneThing || false,
      parentId: goal?.parentId || null,
    },
  });

  // Watch for validation
  const titleValue = watch('title');
  const titleIsValid = titleValue.length >= GOAL_VALIDATION.title.minLength;

  const handleNext = async () => {
    const step = STEPS.find((s) => s.id === currentStep);
    if (step) {
      const isValid = await trigger(step.fields as any);
      if (isValid) {
        setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
      }
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFormSubmit = async (_data: GoalFormData) => {
    // Show success animation only
    setShowSuccess(true);

    // Do NOT submit yet - wait for user to click "Continuar"
  };

  const handleSuccessConfirm = async () => {
    // Get current form data
    const data = watch();

    await onSubmit({
      ...data,
      level: level,
      parentId: data.parentId || null,
      status: goal?.status || 'pending',
      progress: goal?.progress || 0,
    });
  };

  const getScoreColor = (value: number) => {
    if (value <= 3) return 'text-red-500';
    if (value <= 7) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="space-y-8">
      {/* Success Animation */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-300">
          <div className="bg-background p-8 rounded-xl shadow-2xl text-center animate-in zoom-in-95 duration-300">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Meta Criada!
            </h2>
            <p className="text-muted-foreground mb-6">Ótimo trabalho!</p>
            <Button onClick={handleSuccessConfirm} className="w-full">
              Continuar
            </Button>
          </div>
        </div>
      )}

      {/* Stepper */}
      <div className="space-y-4">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -z-10 rounded-full" />
          <div
            className="absolute top-1/2 left-0 h-1 bg-primary -z-10 rounded-full transition-all duration-500"
            style={{
              width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
            }}
          />
          {STEPS.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center gap-2 bg-background px-2"
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors',
                  step.id === currentStep
                    ? 'border-primary bg-primary text-primary-foreground'
                    : step.id < currentStep
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-muted text-muted-foreground'
                )}
              >
                {step.id < currentStep ? '✓' : step.id}
              </div>
              <span
                className={cn(
                  'text-xs font-medium',
                  step.id === currentStep
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Step Content */}
        <div className="transition-all duration-300 ease-in-out">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Identidade da Meta</CardTitle>
                <CardDescription>
                  Defina o que você quer alcançar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Título */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="title">
                      Título <span className="text-destructive">*</span>
                    </Label>
                    {titleIsValid && (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <Input
                    id="title"
                    {...register('title')}
                    placeholder="Ex: Tornar-me um líder na indústria de tecnologia"
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Focusing Question */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="focusingQuestion">
                      Pergunta Focal <span className="text-destructive">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger type="button">
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>
                            A "Única Coisa" é o foco principal que move todos os
                            outros esforços. É a pergunta que direciona sua
                            energia para o que realmente importa.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
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
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Estratégia</CardTitle>
                  <CardDescription>
                    Defina como você medirá o sucesso.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <Label>Viabilidade (1-10)</Label>
                        <span
                          className={cn(
                            'font-bold',
                            getScoreColor(watch('viabilityScore'))
                          )}
                        >
                          {watch('viabilityScore')}
                        </span>
                      </div>
                      <Slider
                        value={[watch('viabilityScore')]}
                        onValueChange={(val) =>
                          setValue(
                            'viabilityScore',
                            Array.isArray(val) ? val[0] : val
                          )
                        }
                        min={1}
                        max={10}
                        step={1}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Difícil</span>
                        <span>Fácil</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <Label>Relevância (1-10)</Label>
                        <span
                          className={cn(
                            'font-bold',
                            getScoreColor(watch('relevanceScore'))
                          )}
                        >
                          {watch('relevanceScore')}
                        </span>
                      </div>
                      <Slider
                        value={[watch('relevanceScore')]}
                        onValueChange={(val) =>
                          setValue(
                            'relevanceScore',
                            Array.isArray(val) ? val[0] : val
                          )
                        }
                        min={1}
                        max={10}
                        step={1}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Pouco</span>
                        <span>Muito</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Planejamento</CardTitle>
                  <CardDescription>
                    Quando e onde isso será realizado?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Datas */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">
                        Data de Início{' '}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="startDate"
                        type="date"
                        {...register('startDate')}
                      />
                      {errors.startDate && (
                        <p className="text-sm text-destructive">
                          {errors.startDate.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dueDate">
                        Data de Conclusão{' '}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="dueDate"
                        type="date"
                        {...register('dueDate')}
                      />
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
                        onValueChange={(value) =>
                          setValue('areaId', value || '')
                        }
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
                          setValue(
                            'priority',
                            value as 'low' | 'medium' | 'high'
                          )
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
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Foco Final</CardTitle>
                  <CardDescription>
                    Revise e defina a prioridade máxima.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Resumo da Meta</h4>
                        <p className="text-sm text-muted-foreground">
                          {titleValue}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* One Thing Toggle */}
                  <div
                    className={cn(
                      'cursor-pointer relative overflow-hidden rounded-xl border-2 p-6 transition-all',
                      watch('isOneThing')
                        ? 'border-primary bg-primary/5 shadow-lg'
                        : 'border-border hover:border-primary/50'
                    )}
                    onClick={() => setValue('isOneThing', !watch('isOneThing'))}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            'p-3 rounded-full',
                            watch('isOneThing')
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          )}
                        >
                          <Star className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">
                            A Coisa Certa (One Thing)
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Definir como o foco principal de atenção
                          </p>
                        </div>
                      </div>
                      <div
                        className={cn(
                          'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
                          watch('isOneThing')
                            ? 'bg-primary border-primary'
                            : 'border-muted-foreground'
                        )}
                      >
                        {watch('isOneThing') && (
                          <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1 || isLoading}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Button>

          {currentStep < STEPS.length ? (
            <Button type="button" onClick={handleNext} className="gap-2">
              Próximo
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isLoading} className="gap-2">
              {isLoading ? 'Salvando...' : 'Criar Meta'}
              <Star className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
