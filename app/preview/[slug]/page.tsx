import { notFound } from "next/navigation";
import { previewDocuments, documentSlugs } from "@/data/previewDocuments";
import DocumentViewer from "@/components/DocumentViewer";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return documentSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = previewDocuments[slug];
  if (!doc) return { title: "Document Preview" };

  return {
    title: `${doc.title} – Preview`,
    description: `Preview ${doc.title} for ${doc.company}`,
  };
}

export default async function PreviewPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = previewDocuments[slug];

  if (!doc) {
    notFound();
  }

  return <DocumentViewer doc={doc} />;
}
