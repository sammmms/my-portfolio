"use client";

import { recommendationLetters } from "@/data/recommendations";
import { Download, ExternalLink, FileCheck2, Calendar, Briefcase } from "lucide-react";
import { Button } from "@/components/Button";

interface RecommendationSectionProps {
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
}

export default function RecommendationSection({
  title = "recommendation letters",
  subtitle = "official certificates of employment and letters of recommendation.",
  id = "recommendations",
  className = "",
}: RecommendationSectionProps) {
  return (
    <div id={id} className={`w-full max-w-5xl mx-auto ${className}`}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tighter mb-2">{title}</h2>
        {subtitle && <p className="text-neutral-500 text-sm">{subtitle}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendationLetters.map((letter) => (
          <div
            key={letter.id}
            className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div>
              {/* Header Badge & Company */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-black dark:text-white shrink-0 group-hover:scale-105 transition-transform">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-black dark:text-white leading-tight">
                      {letter.company}
                    </h3>
                    <span className="text-xs font-mono text-neutral-400">
                      {letter.documentType}
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 whitespace-nowrap">
                  {letter.issueDate}
                </span>
              </div>

              {/* Title & Role Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  <Briefcase className="w-4 h-4 text-neutral-400" />
                  <span>{letter.role}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{letter.period}</span>
                </div>
                <div className="text-xs text-neutral-400 dark:text-neutral-500 italic">
                  Document: {letter.documentTitle}
                  {letter.referenceNumber ? ` (${letter.referenceNumber})` : ""}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                {letter.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <Button
                href={letter.previewUrl}
                variant="solid"
                size="sm"
                className="flex-1 text-xs"
              >
                <span className="flex items-center gap-1.5">
                  preview letter
                </span>
              </Button>

              <a
                href={letter.fileUrl}
                download={letter.fileName}
                className="inline-flex items-center justify-center gap-1.5 px-4 h-9 rounded-full text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300 transition-colors"
                title={`Download ${letter.fileName}`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>download</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
