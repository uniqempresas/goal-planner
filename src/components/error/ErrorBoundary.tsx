import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const isDev = import.meta.env.DEV;

      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="max-w-md w-full text-center">
            {/* Ícone */}
            <div className="mb-6">
              <AlertTriangle className="w-20 h-20 mx-auto text-red-500" />
            </div>

            {/* Título */}
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Algo deu errado
            </h2>

            {/* Descrição */}
            <p className="text-neutral-500 mb-6">
              Pedimos desculpas, mas ocorreu um erro inesperado ao carregar esta
              página.
            </p>

            {/* Botões */}
            <div className="space-y-3">
              <Button onClick={this.handleReset} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Tentar novamente
              </Button>

              <Link to="/dashboard" className="block">
                <Button variant="outline" className="w-full">
                  Voltar ao Dashboard
                </Button>
              </Link>
            </div>

            {/* Debug info - apenas em desenvolvimento */}
            {isDev && this.state.error && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
                <p className="text-sm text-red-600 dark:text-red-400 font-mono whitespace-pre-wrap">
                  {this.state.error.message}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
