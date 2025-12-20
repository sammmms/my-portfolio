"use client";

import Project from "@/models/project";
import { Button } from "@heroui/button";
import { MoveUpRight, Github, Linkedin, Link2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MainContentProps {
  project: Project;
}

export default function MainContent({ project }: MainContentProps) {
  const getIcon = (link?: string) => {
    if (!link) return MoveUpRight;
    if (link.includes("github.com")) return Github;
    if (link.includes("linkedin.com")) return Linkedin;
    return Link2;
  };

  const Icon = getIcon(project.link);

  return (
    <section className="flex-1 sticky top-10 self-start flex flex-col items-center justify-center min-h-[50vh] lg:min-h-full p-8 lg:p-12 bg-neutral-50 dark:bg-neutral-900 rounded-3xl mt-6 lg:mt-0 lg:ml-6 mb-20 transition-all duration-500 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex flex-col items-center text-center space-y-8 max-w-md"
        >
          {/* Project Thumbnail or Avatar */}
          {project.src ? (
            <div className="relative w-full aspect-video flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded-2xl shadow-sm mb-4 overflow-hidden border border-neutral-200 dark:border-neutral-800">
              <img
                src={project.src}
                alt={project.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          ) : (
            <div className="relative w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center bg-white dark:bg-black rounded-full shadow-lg mb-4 overflow-hidden border border-neutral-200 dark:border-neutral-800 p-2">
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

          <div className="w-full">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3 capitalize">
              {project.title}
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed">
              {project.description}
            </p>
          </div>

          {project.link && (
            <div className="flex gap-4 pt-4">
              <Button
                className="bg-black text-white dark:bg-white dark:text-black font-medium"
                radius="full"
                as="a"
                href={project.link}
                target="_blank"
                size="lg"
              >
                <span className="flex items-center gap-2">
                  visit
                  <Icon className="w-4 h-4" />
                </span>
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
