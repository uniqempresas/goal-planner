import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

interface TableSkeletonProps {
  /** Número de colunas */
  columns?: number;
  /** Número de linhas */
  rows?: number;
  /** Se deve exibir header */
  showHeader?: boolean;
  /** Classes CSS adicionais */
  className?: string;
}

export function TableSkeleton({
  columns = 4,
  rows = 5,
  showHeader = true,
  className,
}: TableSkeletonProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {showHeader && (
        <div className="flex gap-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} variant="text" className="flex-1 h-4" />
          ))}
        </div>
      )}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} variant="text" className="flex-1 h-4" />
          ))}
        </div>
      ))}
    </div>
  );
}
