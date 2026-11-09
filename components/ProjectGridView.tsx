"use client";

import Project from "@/models/project";
import { getProjectLinks } from "@/utils/projectLinks";
import {
  YearGroup,
  parseTechTags,
  FEATURED_PROJECT_IDS,
} from "@/utils/projectFilter";
import { ExternalLink, Star, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectGridViewProps {
  groups: YearGroup[];
  onOpenModal: (project: Project) => void;
}

export default function ProjectGridView({
  groups,
  onOpenModal,
}: ProjectGridViewProps) {
  if (groups.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-neutral-500 text-sm">
          No projects found matching the filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-24">
      {groups.map((group) => (
        <section key={group.year} className="relative">
          {/* Year Section Header */}
          <div className="flex items-center gap-4 pt-14 pb-6 first:pt-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-black dark:text-white">
              {group.year}
            </h2>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
            <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
              {group.projects.length} {group.projects.length === 1 ? "project" : "projects"}
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {group.projects.map((project, idx) => {
              const isFeatured = FEATURED_PROJECT_IDS.has(project.id);
              const links = getProjectLinks(project);
              const tags = parseTechTags(project.category).slice(0, 3);

              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="group relative flex flex-col justify-between rounded-3xl bg-neutral-50/70 dark:bg-neutral-900/60 border border-neutral-200/70 dark:border-neutral-800/70 hover:border-neutral-300 dark:hover:border-neutral-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5"
                >
                  {/* Top Image Preview */}
                  <div className="relative aspect-video w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                    {project.src ? (
                      <img
                        src={project.src}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    ) : project.avatar_src ? (
                      <div className="w-full h-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                        <img
                          src={project.avatar_src}
                          alt={project.title}
                          className="w-20 h-20 rounded-full object-cover shadow-md"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-neutral-300 dark:text-neutral-700 uppercase">
                        {project.title.charAt(0)}
                      </div>
                    )}

                    {/* Featured Star Badge */}
                    {isFeatured && (
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 dark:bg-white/90 text-white dark:text-black text-[11px] font-semibold tracking-wide backdrop-blur-md shadow-md">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>Featured</span>
                      </div>
                    )}

                    {/* Date Tag */}
                    {project.date && project.date !== "unknown" && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 dark:bg-black/80 text-neutral-600 dark:text-neutral-300 text-[11px] font-mono backdrop-blur-md shadow-sm">
                        <Calendar className="w-3 h-3" />
                        <span>{project.date}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Tech Pills */}
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2.5">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-neutral-200/60 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-lg font-bold tracking-tight capitalize text-black dark:text-white mb-2 group-hover:text-black dark:group-hover:text-white transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Action Links Footer */}
                    <div className="pt-4 mt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {links.length === 1 ? (
                          <a
                            href={links[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black hover:opacity-90 transition-opacity"
                          >
                            <span>{links[0].label}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : links.length > 1 ? (
                          <button
                            type="button"
                            onClick={() => onOpenModal(project)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black hover:opacity-90 transition-opacity cursor-pointer"
                          >
                            <span>View Links ({links.length})</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        ) : null}
                      </div>

                      {links.length > 1 && (
                        <span className="text-[11px] text-neutral-400 font-mono">
                          Multiple URLs
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
