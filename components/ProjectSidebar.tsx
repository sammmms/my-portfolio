"use client";

import { MoveRight, Star } from "lucide-react";
import { cn } from "@heroui/react";
import Project from "@/models/project";
import { useState, useMemo } from "react";
import MainContent from "./MainContent";
import ProjectLinksModal from "./ProjectLinksModal";
import { getProjectLinks } from "@/utils/projectLinks";
import {
  groupProjectsByYear,
  parseTechTags,
  FEATURED_PROJECT_IDS,
} from "@/utils/projectFilter";

interface ProjectSidebarProps {
  projects: Project[];
  selectedProjectId: string;
  onProjectHover: (id: string) => void;
  onOpenModal?: (project: Project) => void;
}

export default function ProjectSidebar({
  projects,
  selectedProjectId,
  onProjectHover,
  onOpenModal,
}: ProjectSidebarProps) {
  const [sortType, setSortType] = useState<"priority" | "date">("priority");
  const [internalModalProject, setInternalModalProject] =
    useState<Project | null>(null);

  const handleOpenModal = (project: Project) => {
    if (onOpenModal) {
      onOpenModal(project);
    } else {
      setInternalModalProject(project);
    }
  };

  const parseDate = (dateStr: string) => {
    if (dateStr === "unknown") return new Date(0);
    return new Date(dateStr);
  };

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (sortType === "priority") return 0; // Keep original order
      return parseDate(b.date).getTime() - parseDate(a.date).getTime(); // Newest first
    });
  }, [projects, sortType]);

  const yearGroups = useMemo(() => {
    return groupProjectsByYear(sortedProjects);
  }, [sortedProjects]);

  return (
    <section className="w-full lg:w-[50%] flex flex-col gap-6 pb-24 pr-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-neutral-500">
          Sort by:
          <button
            onClick={() => setSortType("priority")}
            className={cn(
              "ml-2 hover:text-black dark:hover:text-white transition-colors cursor-pointer",
              sortType === "priority"
                ? "text-black dark:text-white font-semibold"
                : "text-neutral-500"
            )}
          >
            Priority
          </button>
          <span className="mx-2 text-neutral-300">/</span>
          <button
            onClick={() => setSortType("date")}
            className={cn(
              "hover:text-black dark:hover:text-white transition-colors cursor-pointer",
              sortType === "date"
                ? "text-black dark:text-white font-semibold"
                : "text-neutral-500"
            )}
          >
            Date
          </button>
        </span>
      </div>

      {/* Year-grouped project list */}
      <div className="flex flex-col gap-8">
        {yearGroups.map((group) => (
          <div key={group.year} className="relative">
            {/* Year Section Header */}
            <div className="flex items-center gap-3 pt-6 pb-2 first:pt-0 mb-2">
              <span className="font-bold text-sm tracking-tight text-black dark:text-white">
                {group.year}
              </span>
              <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
              <span className="text-[11px] font-mono text-neutral-400">
                {group.projects.length}
              </span>
            </div>

            {/* List for this year */}
            <div className="flex flex-col gap-1 pl-1">
              {group.projects.map((project) => {
                const isFeatured = FEATURED_PROJECT_IDS.has(project.id);
                const links = getProjectLinks(project);
                const hasMultipleLinks = links.length > 1;
                const singleLink = links.length === 1 ? links[0].url : undefined;
                const tags = parseTechTags(project.category).slice(0, 2);

                const innerContent = (
                  <div className="flex flex-col transition-all">
                    <div
                      className={cn(
                        "flex items-center justify-between py-2.5 lg:py-3.5 lg:border-b border-neutral-200/70 dark:border-neutral-800/70 transition-all duration-300 hover:pl-2",
                        selectedProjectId === project.id
                          ? "opacity-100 pl-2 bg-neutral-50/50 dark:bg-neutral-900/30 rounded-xl"
                          : "opacity-100 lg:opacity-60 hover:opacity-100"
                      )}
                    >
                      <div className="flex flex-col gap-1 pr-2">
                        <div className="flex items-baseline flex-wrap gap-2">
                          <span
                            className={cn(
                              "text-xl lg:text-lg font-bold lg:font-medium tracking-tight transition-all capitalize",
                              selectedProjectId === project.id
                                ? "underline decoration-1 underline-offset-4 text-black dark:text-white font-bold"
                                : "group-hover:underline decoration-1 underline-offset-4"
                            )}
                          >
                            {project.title}
                          </span>

                          {isFeatured && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                              <Star className="w-2.5 h-2.5 fill-current" />
                              featured
                            </span>
                          )}
                        </div>

                        {/* Tech tags preview */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] text-neutral-500 dark:text-neutral-400 font-light"
                            >
                              {tag} •
                            </span>
                          ))}
                          <span className="text-[11px] text-neutral-400 font-mono">
                            {project.date}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {links.length > 0 && (
                          <MoveRight
                            className={cn(
                              "w-4 h-4 transition-all duration-300",
                              selectedProjectId === project.id
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                            )}
                          />
                        )}
                      </div>
                    </div>

                    {/* Mobile preview */}
                    <div className="block lg:hidden mt-4">
                      <MainContent project={project} isMobileView={true} />
                    </div>
                  </div>
                );

                return (
                  <div
                    key={project.id}
                    className="group relative mb-6 lg:mb-0"
                    onMouseEnter={() => onProjectHover(project.id)}
                  >
                    {hasMultipleLinks ? (
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleOpenModal(project)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleOpenModal(project);
                          }
                        }}
                        className="block w-full text-left cursor-pointer focus:outline-none"
                      >
                        {innerContent}
                      </div>
                    ) : singleLink ? (
                      <a
                        href={singleLink}
                        className="block cursor-pointer focus:outline-none"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {innerContent}
                      </a>
                    ) : (
                      <div
                        onClick={() => onProjectHover(project.id)}
                        className="block cursor-default"
                      >
                        {innerContent}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!onOpenModal && (
        <ProjectLinksModal
          project={internalModalProject}
          isOpen={!!internalModalProject}
          onClose={() => setInternalModalProject(null)}
        />
      )}
    </section>
  );
}
