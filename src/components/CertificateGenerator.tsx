
import { useState, useEffect } from 'react';
import { Upload, FileText, Calendar, MapPin, Link, Zap, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Training } from '@/types/training';
import { toast } from '@/hooks/use-toast';

interface GeneratedCertificate {
  studentName: string;
  pngUrl: string;
  pdfUrl: string;
}

export const CertificateGenerator = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedCertificates, setGeneratedCertificates] = useState<GeneratedCertificate[]>([]);
  const [formData, setFormData] = useState({
    templateFile: null as File | null,
    trainingId: '',
    completionDate: '',
    location: '',
    city: '',
    googleSheetsUrl: ''
  });

  // Mock trainings data
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

  // Update selected training when training ID changes
  useEffect(() => {
    const training = trainings.find(t => t.id === formData.trainingId);
    setSelectedTraining(training || null);
  }, [formData.trainingId, trainings]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.pptx')) {
        toast({
          title: "Erro",
          description: "Por favor, selecione um arquivo .pptx",
          variant: "destructive",
        });
        return;
      }
      setFormData(prev => ({ ...prev, templateFile: file }));
    }
  };

  const validateForm = () => {
    if (!formData.templateFile) {
      toast({
        title: "Erro",
        description: "Por favor, selecione o arquivo modelo do certificado.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.trainingId) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um treinamento.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.completionDate) {
      toast({
        title: "Erro",
        description: "Por favor, informe a data de conclusão.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.location.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, informe o local do treinamento.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.city.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, informe a cidade do treinamento.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.googleSheetsUrl.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, informe o link da planilha Google Sheets.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleGenerate = async () => {
    if (!validateForm()) return;

    setIsGenerating(true);
    setProgress(0);
    setGeneratedCertificates([]);

    try {
      // Simulate certificate generation process
      const mockStudents = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa'];
      const certificates: GeneratedCertificate[] = [];

      for (let i = 0; i < mockStudents.length; i++) {
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const student = mockStudents[i];
        certificates.push({
          studentName: student,
          pngUrl: `https://drive.google.com/file/d/mock-png-${i}/view`,
          pdfUrl: `https://drive.google.com/file/d/mock-pdf-${i}/download`
        });

        setProgress(((i + 1) / mockStudents.length) * 100);
        setGeneratedCertificates([...certificates]);
      }

      toast({
        title: "Sucesso!",
        description: `${certificates.length} certificados foram gerados com sucesso!`,
      });

      // Mock email notification
      console.log('Email sent to: edhec.ti@gmail.com, fabiosportnutre@gmail.com');

    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro durante a geração dos certificados.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="clean-card">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Zap className="mr-3 h-8 w-8 text-primary" />
            Gerador de Certificados
          </CardTitle>
          <p className="text-muted-foreground">
            Faça o upload do modelo e configure os dados para gerar certificados em massa.
          </p>
        </CardHeader>
      </Card>

      {/* Form */}
      <Card className="clean-card">
            <CardContent className="p-6 space-y-6">
              
              {/* File Upload */}
              <div>
                <Label className="font-semibold">
                  Upload do Modelo (.pptx)
                </Label>
                <div className="mt-2">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/10 hover:bg-muted/20 transition-colors border-border">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        {formData.templateFile ? (
                          <span className="font-semibold text-primary">
                            {formData.templateFile.name}
                          </span>
                        ) : (
                          <>
                            <span className="font-semibold">Clique para enviar</span> ou arraste o arquivo
                          </>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">PowerPoint (.pptx)</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept=".pptx"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              </div>

              {/* Training Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Treinamento</Label>
                  <Select value={formData.trainingId} onValueChange={(value) => setFormData(prev => ({ ...prev, trainingId: value }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecione um treinamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainings.map((training) => (
                        <SelectItem key={training.id} value={training.id}>
                          {training.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-semibold">Carga Horária</Label>
                  <Input
                    value={selectedTraining ? `${selectedTraining.workload} horas` : ''}
                    disabled
                    placeholder="Será preenchido automaticamente"
                    className="mt-2 bg-muted/30"
                  />
                </div>
              </div>

              {/* Date and Location */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="font-semibold">Data de Conclusão</Label>
                  <Input
                    type="date"
                    value={formData.completionDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, completionDate: e.target.value }))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="font-semibold">Local do Treinamento</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Ex: Auditório Reframax"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="font-semibold">Cidade</Label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Ex: Ipatinga/MG"
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Google Sheets URL */}
              <div>
                <Label className="font-semibold">Link da Planilha Google Sheets</Label>
                <Input
                  value={formData.googleSheetsUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, googleSheetsUrl: e.target.value }))}
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  A planilha deve conter os nomes dos alunos em uma única coluna.
                </p>
              </div>

              {/* Generate Button */}
              <div className="pt-4">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 text-lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                      Gerando Certificados...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      GERAR CERTIFICADOS
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

      {/* Progress */}
      {isGenerating && (
        <Card className="clean-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Progresso da Geração</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Processando certificados... Por favor aguarde.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Table */}
      {generatedCertificates.length > 0 && (
        <Card className="clean-card">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <FileText className="mr-2 h-6 w-6" />
              Certificados Gerados ({generatedCertificates.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Aluno</TableHead>
                  <TableHead>PNG</TableHead>
                  <TableHead>PDF</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {generatedCertificates.map((cert, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{cert.studentName}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(cert.pngUrl, '_blank')}
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Visualizar
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(cert.pdfUrl, '_blank')}
                      >
                        <Download className="mr-1 h-3 w-3" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
