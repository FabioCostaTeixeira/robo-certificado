
import { GraduationCap, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  currentView: 'dashboard' | 'trainings';
  onViewChange: (view: 'dashboard' | 'trainings') => void;
}

export const Header = ({ currentView, onViewChange }: HeaderProps) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-edhec-gradient rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-edhec-blue-900">EDHEC</h1>
                <p className="text-sm text-gray-600">Gerador de Certificados</p>
              </div>
            </div>
          </div>
          
          <nav className="flex space-x-2">
            <Button
              variant={currentView === 'dashboard' ? 'default' : 'outline'}
              onClick={() => onViewChange('dashboard')}
              className={`${
                currentView === 'dashboard'
                  ? 'bg-edhec-yellow-500 hover:bg-edhec-yellow-600 text-black'
                  : 'border-edhec-blue-200 text-edhec-blue-700 hover:bg-edhec-blue-50'
              } transition-all duration-200`}
            >
              <GraduationCap className="mr-2 h-4 w-4" />
              Gerar Certificados
            </Button>
            
            <Button
              variant={currentView === 'trainings' ? 'default' : 'outline'}
              onClick={() => onViewChange('trainings')}
              className={`${
                currentView === 'trainings'
                  ? 'bg-edhec-yellow-500 hover:bg-edhec-yellow-600 text-black'
                  : 'border-edhec-blue-200 text-edhec-blue-700 hover:bg-edhec-blue-50'
              } transition-all duration-200`}
            >
              <Settings className="mr-2 h-4 w-4" />
              Gerenciar Treinamentos
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
