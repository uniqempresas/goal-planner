import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

interface ListSkeletonProps {
  /** Número de itens na lista */
  count?: number;
  /** Se deve exibir avatar/thumbnail */
  showAvatar?: boolean;
  /** Tamanho do avatar */
  avatarSize?: 'sm' | 'md' | 'lg';
  /** Classes CSS adicionais */
  className?: string;
}

const avatarSizes = {
  sm: 32,
  md: 40,
  lg: 48,
};

export function ListSkeleton({
  count = 5,
  showAvatar = true,
  avatarSize = 'md',
  className,
}: ListSkeletonProps) {
  const size = avatarSizes[avatarSize];

  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          {showAvatar && (
            <Skeleton variant="circular" width={size} height={size} />
          )}
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" className="w-1/3" />
            <Skeleton variant="text" className="w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
