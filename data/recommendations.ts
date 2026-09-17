import { RecommendationLetter } from "@/models/recommendation";

export const recommendationLetters: RecommendationLetter[] = [
  {
    id: "bizapps",
    company: "Bizapps.id",
    role: "Full Stack Engineer",
    documentTitle: "Surat Keterangan Kerja",
    documentType: "Certificate of Employment",
    period: "Jun 2025 – Sep 2026",
    issueDate: "15 Sep 2026",
    referenceNumber: "NO. SRK/BIZ/001/IX/2026",
    signer: "Ripin (Director)",
    description:
      "Official certificate of employment acknowledging dedicated contribution and professional service as Full Stack Engineer at Bizapps.id.",
    fileUrl: "/documents/recommendation_bizapps.pdf",
    fileName: "recommendation_bizapps.pdf",
    previewUrl: "/preview/bizapps",
  },
  {
    id: "sehat-plastik",
    company: "CV. Sehat Plastik",
    role: "Finance Administrator & Cashier",
    documentTitle: "Surat Rekomendasi Kerja",
    documentType: "Work Reference Letter",
    period: "Aug 2022 – Mar 2024",
    issueDate: "30 Mar 2024",
    signer: "Management of CV. Sehat",
    description:
      "Official recommendation letter certifying satisfactory work performance, financial integrity, and commitment during employment at CV. Sehat Plastik.",
    fileUrl: "/documents/recommendation_sehat_plastik.pdf",
    fileName: "recommendation_sehat_plastik.pdf",
    previewUrl: "/preview/sehat-plastik",
  },
];
