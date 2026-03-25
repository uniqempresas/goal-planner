import { AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemName: string;
  affectedItems?: number;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function DeleteConfirmModal({
  open,
  onOpenChange,
  itemName,
  affectedItems = 0,
  onConfirm,
  isLoading = false,
}: DeleteConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
              <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
            </div>
          </div>
          <DialogDescription className="mt-2">
            Tem certeza que deseja excluir "{itemName}"?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Esta ação não pode ser desfeita.
            {affectedItems > 0 && (
              <>
                {' '}
                As {affectedItems} meta{affectedItems !== 1 ? 's' : ''}{' '}
                associada
                {affectedItems !== 1 ? 's' : ''} não será
                {affectedItems !== 1 ? 'ão' : ''} excluída
                {affectedItems !== 1 ? 's' : ''}.
              </>
            )}
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Excluindo...' : 'Excluir'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
