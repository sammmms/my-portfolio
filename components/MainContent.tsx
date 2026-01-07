"use client";

import Project from "@/models/project";
import { motion, AnimatePresence } from "framer-motion";

interface MainContentProps {
  project: Project;
}

export default function MainContent({
  project,
  isMobileView = false,
}: MainContentProps & { isMobileView?: boolean }) {
  if (isMobileView) {
    return (
      <div className="w-full h-64 sm:h-80 md:h-96 relative overflow-hidden rounded-2xl">
        {project.src ? (
          <img
            src={project.src}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
            {project.avatar_src ? (
              <img
                src={project.avatar_src}
                alt={project.title}
                className="w-24 h-24 object-cover rounded-full"
              />
            ) : (
              <span className="text-4xl capitalize">
                {project.title.charAt(0)}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="flex-1 sticky top-10 self-start flex flex-col items-center justify-center min-h-[50vh] lg:min-h-full p-8 lg:p-12 rounded-3xl mt-6 lg:mt-0 lg:ml-6 mb-20 transition-all duration-500">
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center w-full h-full"
        >
          <div
            className="w-full h-full relative overflow-hidden rounded-3xl shadow-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center p-2"
            style={{ perspective: "1000px" }}
          >
            {project.src ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={project.src}
                  alt={project.title}
                  className="w-full h-full object-contain rounded-2xl transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            ) : (
              <div className="relative w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center bg-white dark:bg-black rounded-full shadow-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 p-2">
                {project.avatar_src ? (
                  <img
                    src={project.avatar_src}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-4xl capitalize">
                    {project.title.charAt(0)}
                  </span>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
