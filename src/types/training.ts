
export interface Training {
  id: string;
  name: string;
  workload: number;
  createdAt: Date;
}

export interface Certificate {
  id: string;
  studentName: string;
  trainingName: string;
  workload: number;
  completionDate: Date;
  location: string;
  city: string;
  pngUrl: string;
  pdfUrl: string;
  createdAt: Date;
}

export interface CertificateGenerationRequest {
  templateFile: File;
  trainingId: string;
  completionDate: string;
  location: string;
  city: string;
  googleSheetsUrl: string;
}
