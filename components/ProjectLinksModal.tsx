"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import Project from "@/models/project";
import { getProjectLinks, cleanUrl } from "@/utils/projectLinks";

interface ProjectLinksModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectLinksModal({
  project,
  isOpen,
  onClose,
}: ProjectLinksModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const links = getProjectLinks(project);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            className="relative w-full max-w-md rounded-3xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div>
              <h2
                id="modal-title"
                className="text-2xl font-bold tracking-tighter text-black dark:text-white pr-8 capitalize"
              >
                {project.title}
              </h2>

              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="text-xs text-neutral-500 font-light">
                  {project.category}
                </span>
                {project.date && project.date !== "unknown" && (
                  <>
                    <span className="text-neutral-300 dark:text-neutral-700 text-xs">
                      •
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      {project.date}
                    </span>
                  </>
                )}
              </div>

              {project.description && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3 line-clamp-3">
                  {project.description}
                </p>
              )}
            </div>

            {/* Destination Options */}
            <div className="mt-6">
              <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3">
                choose destination
              </p>

              <div className="flex flex-col gap-2.5">
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-black dark:text-white group-hover:scale-105 transition-transform shrink-0 shadow-xs">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-sm sm:text-base text-black dark:text-white capitalize group-hover:underline underline-offset-4 truncate">
                            {link.label}
                          </span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono truncate">
                            {cleanUrl(link.url)}
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
