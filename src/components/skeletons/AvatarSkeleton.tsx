import { Skeleton } from '@/components/ui/Skeleton';

interface AvatarSkeletonProps {
  /** Tamanho do avatar */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Classes CSS adicionais */
  className?: string;
}

const avatarSizes = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

export function AvatarSkeleton({
  size = 'md',
  className,
}: AvatarSkeletonProps) {
  return (
    <Skeleton
      variant="circular"
      width={avatarSizes[size]}
      height={avatarSizes[size]}
      className={className}
    />
  );
}
