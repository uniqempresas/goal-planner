import { ReactNode } from 'react';
import { Inbox, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  /** Título do estado vazio */
  title?: string;
  /** Mensagem descritiva */
  message?: string;
  /** Label da ação principal */
  actionLabel?: string;
  /** Função da ação */
  onAction?: () => void;
  /** Ícone personalizado */
  icon?: ReactNode;
  /** Classes CSS adicionais */
  className?: string;
}

export function EmptyState({
  title = 'Nenhum item encontrado',
  message = 'Comece criando algo novo!',
  actionLabel,
  onAction,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center',
        'bg-muted/30 border border-dashed rounded-lg',
        className
      )}
    >
      {icon || <Inbox className="w-12 h-12 text-muted-foreground mb-4" />}
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-sm">{message}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>
          <Plus className="w-4 h-4 mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
