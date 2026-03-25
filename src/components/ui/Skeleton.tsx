import { cn } from '@/lib/utils';

interface SkeletonProps {
  /** Classes CSS adicionais */
  className?: string;
  /** Variante visual do skeleton */
  variant?: 'text' | 'circular' | 'rectangular';
  /** Largura do skeleton */
  width?: string | number;
  /** Altura do skeleton */
  height?: string | number;
  /** Se deve desabilitar animação */
  disableAnimation?: boolean;
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  disableAnimation = false,
}: SkeletonProps) {
  const baseStyles = 'bg-neutral-200 dark:bg-neutral-800';

  const variantStyles = {
    text: 'rounded-sm h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        !disableAnimation && 'animate-pulse',
        className
      )}
      style={{
        width: width,
        height: height,
      }}
      aria-hidden="true"
    />
  );
}
