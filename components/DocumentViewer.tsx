"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Download, ExternalLink, FileCheck2, Calendar, FileText } from "lucide-react";
import { PreviewDocument } from "@/data/previewDocuments";
import { useState } from "react";

interface DocumentViewerProps {
  doc: PreviewDocument;
}

export default function DocumentViewer({ doc }: DocumentViewerProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(doc.fallbackPath);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-4 animate-in fade-in duration-300">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/80 dark:bg-black/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-sm">
        {/* Left: Back button & Info */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>back</span>
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-bold tracking-tight truncate text-black dark:text-white">
                {doc.title}
              </h1>
              <span className="px-2 py-0.5 text-[10px] sm:text-xs font-mono rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 whitespace-nowrap">
                {doc.documentType}
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
              {doc.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <a
            href={doc.fileUrl}
            download={doc.fileName}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300 transition-colors"
            title={`Download ${doc.fileName}`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>download</span>
          </a>

          <a
            href={doc.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-black text-white dark:bg-white dark:text-black hover:scale-105 active:scale-95 transition-transform"
            title="Open raw PDF file in a new tab"
          >
            <span>open raw</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* PDF Viewer Container */}
      <div className="relative w-full h-[75vh] md:h-[82vh] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-md">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-50 dark:bg-neutral-950 text-neutral-400 z-10">
            <FileText className="w-8 h-8 animate-pulse" />
            <span className="text-xs font-mono">loading document preview...</span>
          </div>
        )}

        <iframe
          src={`${doc.fileUrl}#toolbar=0&view=FitH`}
          className="w-full h-full border-0"
          title={doc.title}
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Helper Footer */}
      <div className="flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-600 px-2">
        <span>Click <strong>back</strong> above to return to the previous page</span>
        <span>{doc.fileName}</span>
      </div>
    </div>
  );
}
