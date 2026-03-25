import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

interface CardSkeletonProps {
  /** Se deve exibir área de imagem */
  showImage?: boolean;
  /** Altura da imagem placeholder */
  imageHeight?: string | number;
  /** Classes CSS adicionais */
  className?: string;
}

export function CardSkeleton({
  showImage = true,
  imageHeight = 160,
  className,
}: CardSkeletonProps) {
  return (
    <div className={cn('rounded-lg border p-4 space-y-3', className)}>
      {showImage && (
        <Skeleton
          variant="rectangular"
          height={imageHeight}
          className="w-full"
        />
      )}
      <Skeleton variant="text" className="w-3/4 h-5" />
      <div className="space-y-2">
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-5/6" />
      </div>
      <Skeleton variant="text" className="w-24 h-6" />
    </div>
  );
}
