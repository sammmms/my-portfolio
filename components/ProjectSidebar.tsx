"use client";

import { MoveRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@heroui/react";
import Project from "@/models/project";
import { useState } from "react";
import MainContent from "./MainContent";

interface ProjectSidebarProps {
  projects: Project[];
  selectedProjectId: string;
  onProjectHover: (id: string) => void;
}

export default function ProjectSidebar({
  projects,
  selectedProjectId,
  onProjectHover,
}: ProjectSidebarProps) {
  const [sortType, setSortType] = useState<"priority" | "date">("priority");

  const parseDate = (dateStr: string) => {
    if (dateStr === "unknown") return new Date(0);
    return new Date(dateStr);
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortType === "priority") return 0; // Keep original order
    return parseDate(b.date).getTime() - parseDate(a.date).getTime(); // Newest first
  });

  return (
    <section className="w-full lg:w-[50%] flex flex-col gap-6 pb-24 pr-4">
      <div className="lg:hidden mb-4">
        <h1 className="text-2xl font-bold tracking-tighter">my portfolio</h1>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-neutral-500">
          Sort by:
          <button
            onClick={() => setSortType("priority")}
            className={cn(
              "ml-2 hover:text-black dark:hover:text-white transition-colors",
              sortType === "priority"
                ? "text-black dark:text-white font-medium"
                : "text-neutral-500"
            )}
          >
            Priority
          </button>
          <span className="mx-2 text-neutral-300">/</span>
          <button
            onClick={() => setSortType("date")}
            className={cn(
              "hover:text-black dark:hover:text-white transition-colors",
              sortType === "date"
                ? "text-black dark:text-white font-medium"
                : "text-neutral-500"
            )}
          >
            Date
          </button>
        </span>
      </div>

      <div className="flex flex-col gap-1">
        {sortedProjects.map((project) => (
          <div
            key={project.id}
            className="group relative mb-8 lg:mb-0"
            onMouseEnter={() => onProjectHover(project.id)}
          >
            <Link href={project.link || "#"} className="block" target="_blank">
              <div className="flex flex-col transition-all">
                <div
                  className={cn(
                    "flex items-center justify-between py-2 lg:py-4 lg:border-b border-neutral-200 dark:border-neutral-800 transition-all duration-300 hover:pl-2",
                    selectedProjectId === project.id
                      ? "opacity-100 pl-2"
                      : "opacity-100 lg:opacity-60 hover:opacity-100" // Always 100 on mobile
                  )}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline flex-col">
                      <span
                        className={cn(
                          "text-2xl lg:text-xl font-bold lg:font-medium tracking-tighter transition-all",
                          selectedProjectId === project.id
                            ? "underline decoration-1 underline-offset-4"
                            : "group-hover:underline decoration-1 underline-offset-4"
                        )}
                      >
                        {project.title}
                      </span>
                      <span className="text-sm text-neutral-500 font-light">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {project.date !== "unknown" && (
                      <span className="text-sm text-neutral-400 font-mono hidden sm:block">
                        {project.date}
                      </span>
                    )}
                    <MoveRight
                      className={cn(
                        "w-4 h-4 transition-all duration-300",
                        selectedProjectId === project.id
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      )}
                    />
                  </div>
                </div>
                <div className="block lg:hidden mt-4">
                  <MainContent project={project} isMobileView={true} />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
