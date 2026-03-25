import { useState, useEffect, useCallback } from 'react';

interface UseContentStateOptions<T> {
  /** Função para buscar dados */
  queryFn?: () => Promise<T>;
  /** Dados iniciais */
  initialData?: T;
  /** Se deve carregar imediatamente */
  immediate?: boolean;
}

interface UseContentStateReturn<T> {
  /** Estado atual */
  state: 'loading' | 'success' | 'error' | 'empty';
  /** Dados */
  data: T | undefined;
  /** Erro se houver */
  error: Error | null;
  /** Se está carregando */
  isLoading: boolean;
  /** Se houve erro */
  isError: boolean;
  /** Se dados estão vazios */
  isEmpty: boolean;
  /** Função para carregar dados */
  refetch: () => Promise<void>;
  /** Função para definir dados manualmente */
  setData: (data: T) => void;
}

// Versão standalone (sem React Query)
export function useContentState<T>({
  queryFn,
  initialData,
  immediate = true,
}: UseContentStateOptions<T>): UseContentStateReturn<T> {
  const [state, setState] = useState<'loading' | 'success' | 'error' | 'empty'>(
    'loading'
  );
  const [data, setData] = useState<T | undefined>(initialData);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    if (!queryFn) return;

    setState('loading');
    setError(null);

    try {
      const result = await queryFn();
      setData(result);
      setState(
        result && (Array.isArray(result) ? result.length > 0 : true)
          ? 'success'
          : 'empty'
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setState('error');
    }
  }, [queryFn]);

  useEffect(() => {
    if (immediate && queryFn) {
      refetch();
    }
  }, [immediate, queryFn, refetch]);

  return {
    state,
    data,
    error,
    isLoading: state === 'loading',
    isError: state === 'error',
    isEmpty: state === 'empty',
    refetch,
    setData,
  };
}
