import { ReactNode } from 'react';
import { CardSkeleton } from '@/components/skeletons/CardSkeleton';
import { ErrorState } from './ErrorState';
import { EmptyState } from './EmptyState';

type ContentState = 'loading' | 'success' | 'error' | 'empty';

interface ContentSwitchProps<T> {
  /** Estado atual do conteúdo */
  state: ContentState;
  /** Dados carregados */
  data?: T;
  /** Componente de loading customizado */
  loadingComponent?: ReactNode;
  /** Componente de erro customizado */
  errorComponent?: ReactNode;
  /** Componente vazio customizado */
  emptyComponent?: ReactNode;
  /** Componente de sucesso (children) */
  children: (data: T) => ReactNode;
  /** Props adicionais para componentes de estado */
  loadingProps?: Record<string, unknown>;
  errorProps?: Record<string, unknown>;
  emptyProps?: Record<string, unknown>;
}

export function ContentSwitch<T>({
  state,
  data,
  loadingComponent,
  errorComponent,
  emptyComponent,
  children,
  loadingProps,
  errorProps,
  emptyProps,
}: ContentSwitchProps<T>) {
  switch (state) {
    case 'loading':
      return loadingComponent || <CardSkeleton {...loadingProps} />;

    case 'error':
      return errorComponent || <ErrorState {...errorProps} />;

    case 'empty':
      return emptyComponent || <EmptyState {...emptyProps} />;

    case 'success':
    default:
      return data ? children(data) : null;
  }
}
