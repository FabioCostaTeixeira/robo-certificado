
import { FileText, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  currentView: 'dashboard' | 'trainings';
  onViewChange: (view: 'dashboard' | 'trainings') => void;
}

export const Header = ({ currentView, onViewChange }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Gerador de Certificados</h1>
              <p className="text-xs text-muted-foreground">Sistema de certificação</p>
            </div>
          </div>
          
          <nav className="flex space-x-1">
            <Button
              variant={currentView === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => onViewChange('dashboard')}
              className="text-sm"
            >
              <FileText className="mr-2 h-4 w-4" />
              Certificados
            </Button>
            
            <Button
              variant={currentView === 'trainings' ? 'default' : 'ghost'}
              onClick={() => onViewChange('trainings')}
              className="text-sm"
            >
              <Settings className="mr-2 h-4 w-4" />
              Treinamentos
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
