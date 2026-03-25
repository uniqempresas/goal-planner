import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const recoverSchema = z.object({
  email: z.string().email('Email inválido'),
});

type RecoverForm = z.infer<typeof recoverSchema>;

export default function RecoverPassword() {
  const navigate = useNavigate();
  const { recoverPassword, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoverForm>({
    resolver: zodResolver(recoverSchema),
  });

  const onSubmit = async (data: RecoverForm) => {
    const success = await recoverPassword(data.email);

    if (success) {
      toast.success(
        'Email de recuperação enviado! Verifique sua caixa de entrada.'
      );
      navigate('/login');
    } else {
      toast.error('Erro ao enviar email de recuperação');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-primary-600">
            Recuperar Senha
          </CardTitle>
          <CardDescription>
            Digite seu email para receber o link de recuperação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Enviar Email'}
            </Button>
            <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">
              Lembrou a senha?{' '}
              <Link
                to="/login"
                className="hover:underline text-primary-600 dark:text-primary-400"
              >
                Voltar ao Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
