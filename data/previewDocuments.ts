export interface PreviewDocument {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "resume" | "recommendation";
  company: string;
  documentType: string;
  period?: string;
  issueDate: string;
  referenceNumber?: string;
  fileUrl: string;
  fileName: string;
  fallbackPath: string;
}

export const previewDocuments: Record<string, PreviewDocument> = {
  cv: {
    id: "cv",
    slug: "cv",
    title: "Curriculum Vitae (CV)",
    subtitle: "Samuel Onasis • Full Stack Developer (September 2026)",
    category: "resume",
    company: "Samuel Onasis",
    documentType: "Curriculum Vitae",
    issueDate: "Sep 2026",
    fileUrl: "/documents/cv_sep2026.pdf",
    fileName: "cv_sep2026.pdf",
    fallbackPath: "/",
  },
  resume: {
    id: "resume",
    slug: "resume",
    title: "Curriculum Vitae (CV)",
    subtitle: "Samuel Onasis • Full Stack Developer (September 2026)",
    category: "resume",
    company: "Samuel Onasis",
    documentType: "Curriculum Vitae",
    issueDate: "Sep 2026",
    fileUrl: "/documents/cv_sep2026.pdf",
    fileName: "cv_sep2026.pdf",
    fallbackPath: "/",
  },
  bizapps: {
    id: "bizapps",
    slug: "bizapps",
    title: "Surat Keterangan Kerja",
    subtitle: "Bizapps.id • Certificate of Employment • Full Stack Engineer",
    category: "recommendation",
    company: "Bizapps.id",
    documentType: "Certificate of Employment",
    period: "Jun 2025 – Sep 2026",
    issueDate: "15 Sep 2026",
    referenceNumber: "NO. SRK/BIZ/001/IX/2026",
    fileUrl: "/documents/recommendation_bizapps.pdf",
    fileName: "recommendation_bizapps.pdf",
    fallbackPath: "/experience",
  },
  "recommendation-bizapps": {
    id: "bizapps",
    slug: "recommendation-bizapps",
    title: "Surat Keterangan Kerja",
    subtitle: "Bizapps.id • Certificate of Employment • Full Stack Engineer",
    category: "recommendation",
    company: "Bizapps.id",
    documentType: "Certificate of Employment",
    period: "Jun 2025 – Sep 2026",
    issueDate: "15 Sep 2026",
    referenceNumber: "NO. SRK/BIZ/001/IX/2026",
    fileUrl: "/documents/recommendation_bizapps.pdf",
    fileName: "recommendation_bizapps.pdf",
    fallbackPath: "/experience",
  },
  "sehat-plastik": {
    id: "sehat-plastik",
    slug: "sehat-plastik",
    title: "Surat Rekomendasi Kerja",
    subtitle: "CV. Sehat Plastik • Work Reference Letter • Finance Administrator",
    category: "recommendation",
    company: "CV. Sehat Plastik",
    documentType: "Letter of Recommendation",
    period: "Aug 2022 – Mar 2024",
    issueDate: "30 Mar 2024",
    fileUrl: "/documents/recommendation_sehat_plastik.pdf",
    fileName: "recommendation_sehat_plastik.pdf",
    fallbackPath: "/experience",
  },
  "recommendation-sehat-plastik": {
    id: "sehat-plastik",
    slug: "recommendation-sehat-plastik",
    title: "Surat Rekomendasi Kerja",
    subtitle: "CV. Sehat Plastik • Work Reference Letter • Finance Administrator",
    category: "recommendation",
    company: "CV. Sehat Plastik",
    documentType: "Letter of Recommendation",
    period: "Aug 2022 – Mar 2024",
    issueDate: "30 Mar 2024",
    fileUrl: "/documents/recommendation_sehat_plastik.pdf",
    fileName: "recommendation_sehat_plastik.pdf",
    fallbackPath: "/experience",
  },
};

export const documentSlugs = Object.keys(previewDocuments);
