
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Training } from '@/types/training';
import { toast } from '@/hooks/use-toast';

export const TrainingManagement = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    workload: ''
  });

  // Mock data - Replace with real API calls
  useEffect(() => {
    const mockTrainings: Training[] = [
      {
        id: '1',
        name: 'Treinamento de Segurança do Trabalho',
        workload: 8,
        createdAt: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'Capacitação em Liderança',
        workload: 16,
        createdAt: new Date('2024-02-10')
      },
      {
        id: '3',
        name: 'Workshop de Inovação',
        workload: 4,
        createdAt: new Date('2024-03-05')
      }
    ];
    setTrainings(mockTrainings);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.workload) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const workloadNum = parseInt(formData.workload);
    if (workloadNum <= 0) {
      toast({
        title: "Erro",
        description: "A carga horária deve ser maior que zero.",
        variant: "destructive",
      });
      return;
    }

    if (editingTraining) {
      // Update existing training
      setTrainings(prev => prev.map(training => 
        training.id === editingTraining.id
          ? { ...training, name: formData.name.trim(), workload: workloadNum }
          : training
      ));
      toast({
        title: "Sucesso",
        description: "Treinamento atualizado com sucesso!",
      });
    } else {
      // Add new training
      const newTraining: Training = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        workload: workloadNum,
        createdAt: new Date()
      };
      setTrainings(prev => [...prev, newTraining]);
      toast({
        title: "Sucesso",
        description: "Treinamento cadastrado com sucesso!",
      });
    }

    resetForm();
  };

  const handleEdit = (training: Training) => {
    setEditingTraining(training);
    setFormData({
      name: training.name,
      workload: training.workload.toString()
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTrainings(prev => prev.filter(training => training.id !== id));
    toast({
      title: "Sucesso",
      description: "Treinamento excluído com sucesso!",
    });
  };

  const resetForm = () => {
    setFormData({ name: '', workload: '' });
    setEditingTraining(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="clean-card">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Gerenciar Treinamentos
              </h2>
              <p className="text-muted-foreground">
                Cadastre e gerencie os treinamentos disponíveis para geração de certificados.
              </p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  onClick={() => resetForm()}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Treinamento
                </Button>
              </DialogTrigger>
                
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingTraining ? 'Editar Treinamento' : 'Novo Treinamento'}
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome do Treinamento</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ex: Treinamento de Segurança do Trabalho"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="workload">Carga Horária (horas)</Label>
                    <Input
                      id="workload"
                      type="number"
                      value={formData.workload}
                      onChange={(e) => setFormData(prev => ({ ...prev, workload: e.target.value }))}
                      placeholder="Ex: 8"
                      min="1"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancelar
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      {editingTraining ? 'Atualizar' : 'Cadastrar'}
                    </Button>
                    </div>
                  </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Training List */}
      <div className="grid gap-4">
        {trainings.length === 0 ? (
          <Card className="clean-card">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Nenhum treinamento cadastrado
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Comece cadastrando seu primeiro treinamento para gerar certificados.
              </p>
            </CardContent>
          </Card>
        ) : (
          trainings.map((training) => (
            <Card key={training.id} className="clean-card hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                      {training.name}
                    </h3>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{training.workload} hora{training.workload !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Criado em {training.createdAt.toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(training)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(training.id)}
                      className="text-destructive border-destructive/20 hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
