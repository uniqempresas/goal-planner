import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        {/* Ícone */}
        <div className="mb-6">
          <Search className="w-20 h-20 mx-auto text-neutral-400" />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Página não encontrada
        </h2>

        {/* Descrição */}
        <p className="text-neutral-500 mb-6">
          A página que você está procurando não existe ou foi movida para outro
          lugar.
        </p>

        {/* Botão Voltar */}
        <Link to="/dashboard">
          <Button>Voltar ao Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
