
import { useState } from 'react';
import { Header } from '@/components/Header';
import { CertificateGenerator } from '@/components/CertificateGenerator';
import { TrainingManagement } from '@/components/TrainingManagement';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'trainings'>('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      <main>
        {currentView === 'dashboard' ? (
          <CertificateGenerator />
        ) : (
          <TrainingManagement />
        )}
      </main>
    </div>
  );
};

export default Index;
