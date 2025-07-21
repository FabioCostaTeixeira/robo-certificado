
import { useState } from 'react';
import { Header } from '@/components/Header';
import { CertificateGenerator } from '@/components/CertificateGenerator';
import { TrainingManagement } from '@/components/TrainingManagement';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'trainings'>('dashboard');

  return (
    <div className="min-h-screen">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
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
