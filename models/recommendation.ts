export interface RecommendationLetter {
  id: string;
  company: string;
  role: string;
  documentTitle: string;
  documentType: string;
  period: string;
  issueDate: string;
  referenceNumber?: string;
  signer?: string;
  description: string;
  fileUrl: string;
  fileName: string;
  previewUrl: string;
}
