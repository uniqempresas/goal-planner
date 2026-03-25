import { ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  /** Título da mensagem de erro */
  title?: string;
  /** Mensagem de erro detalhada */
  message?: string;
  /** Função para tentar novamente */
  onRetry?: () => void;
  /** Label do botão de retry */
  retryLabel?: string;
  /** Ícone personalizado */
  icon?: ReactNode;
  /** Classes CSS adicionais */
  className?: string;
}

export function ErrorState({
  title = 'Algo deu errado',
  message = 'Não foi possível carregar os dados.',
  onRetry,
  retryLabel = 'Tentar novamente',
  icon,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center',
        'bg-destructive/5 border border-destructive/20 rounded-lg',
        className
      )}
      role="alert"
    >
      {icon || <AlertCircle className="w-12 h-12 text-destructive mb-4" />}
      <h3 className="text-lg font-semibold text-destructive mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-sm">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
