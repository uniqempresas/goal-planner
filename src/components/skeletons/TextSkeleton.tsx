import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

interface TextSkeletonProps {
  /** Número de linhas */
  lines?: number;
  /** Largura da última linha (percentual) */
  lastLineWidth?: number;
  /** Classes CSS adicionais */
  className?: string;
}

export function TextSkeleton({
  lines = 3,
  lastLineWidth = 60,
  className,
}: TextSkeletonProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={i === lines - 1 ? `${lastLineWidth}%` : 'w-full'}
        />
      ))}
    </div>
  );
}
