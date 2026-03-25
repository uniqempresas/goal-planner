import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
            Dashboard
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Bem-vindo ao seu planner de metas
          </p>
        </div>
        <Button>Nova Meta</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Metas Ativas</CardTitle>
            <Target className="h-4 w-4 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-neutral-500">+2 esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-neutral-500">40% do total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              ONE Thing Hoje
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-warning-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">
              Finalizar apresentação
            </div>
            <p className="text-xs text-neutral-500">Prazo: 18:00</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Blocks</CardTitle>
            <Calendar className="h-4 w-4 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-neutral-500">Agendados hoje</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <Target className="h-5 w-5" />
            <span>Nova Meta</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <Calendar className="h-5 w-5" />
            <span>Agendar</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <TrendingUp className="h-5 w-5" />
            <span>Revisão</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <span>Concluir</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
