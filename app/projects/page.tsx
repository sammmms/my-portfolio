"use client";

import { useState, useMemo } from "react";
import ProjectSidebar from "@/components/ProjectSidebar";
import MainContent from "@/components/MainContent";
import ProjectLinksModal from "@/components/ProjectLinksModal";
import ProjectGridView from "@/components/ProjectGridView";
import { projects } from "@/data/projects";
import { useScrollNavigation } from "@/hooks/useScrollNavigation";
import Project from "@/models/project";
import {
  ProjectCategoryFilter,
  matchesCategory,
  groupProjectsByYear,
  FEATURED_PROJECT_IDS,
} from "@/utils/projectFilter";
import { Search, LayoutGrid, Columns, Star, Sparkles } from "lucide-react";
import { cn } from "@heroui/react";

export default function ProjectsPage() {
  useScrollNavigation({ prevPath: "/", nextPath: "/experience" });

  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"split" | "grid">("grid");

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    projects[0]?.id || ""
  );
  const [modalProject, setModalProject] = useState<Project | null>(null);

  // Filter projects by category and search term
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const passesCategory = matchesCategory(project, selectedCategory);
      if (!passesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const searchable =
        `${project.title} ${project.category} ${project.description} ${project.date}`.toLowerCase();
      return searchable.includes(q);
    });
  }, [selectedCategory, searchQuery]);

  // Group filtered projects by year
  const groupedProjects = useMemo(() => {
    return groupProjectsByYear(filteredProjects);
  }, [filteredProjects]);

  const selectedProject =
    filteredProjects.find((p) => p.id === selectedProjectId) ||
    filteredProjects[0] ||
    projects[0];

  const categories: { key: ProjectCategoryFilter; label: string; icon?: typeof Star }[] = [
    { key: "all", label: `All (${projects.length})` },
    { key: "featured", label: `Featured (${FEATURED_PROJECT_IDS.size})`, icon: Star },
    { key: "web", label: "Web & Fullstack" },
    { key: "mobile", label: "macOS & Mobile" },
    { key: "automation", label: "Automation & CLI" },
    { key: "systems", label: "AI & Systems" },
  ];

  return (
    <div className="w-full flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Header & Executive Summary Bar */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter capitalize">
              projects
            </h1>
            <p className="text-sm md:text-base text-neutral-500 mt-1">
              Curated archive of production web apps, native macOS tools, automations, and systems.
            </p>
          </div>

          {/* Quick Metrics Bar for Recruiters */}
          <div className="flex items-center gap-2 self-start md:self-auto text-xs font-mono py-1.5 px-3 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>25 Shipped</span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span>14 in 2026</span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span className="text-black dark:text-white font-medium">10+ Live</span>
          </div>
        </div>

        {/* Controls Toolbar: Search, Filters, and View Switcher */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-2 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-4">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer border",
                    isActive
                      ? "bg-black text-white dark:bg-white dark:text-black border-transparent shadow-sm"
                      : "bg-transparent text-neutral-500 hover:text-black dark:hover:text-white border-neutral-200 dark:border-neutral-800 hover:border-neutral-300"
                  )}
                >
                  {Icon && <Icon className="w-3 h-3 fill-amber-400 text-amber-400" />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Controls: Search & View Toggle */}
          <div className="flex items-center gap-3">
            {/* Live Search */}
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search stack or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
              />
            </div>

            {/* View Switcher (Grid vs Split) */}
            <div className="flex items-center p-0.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                title="Grid Showcase View (HR Friendly)"
                className={cn(
                  "p-1.5 rounded-full transition-all cursor-pointer",
                  viewMode === "grid"
                    ? "bg-white dark:bg-black text-black dark:text-white shadow-xs"
                    : "text-neutral-400 hover:text-black dark:hover:text-white"
                )}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("split")}
                title="Interactive Split View"
                className={cn(
                  "p-1.5 rounded-full transition-all cursor-pointer",
                  viewMode === "split"
                    ? "bg-white dark:bg-black text-black dark:text-white shadow-xs"
                    : "text-neutral-400 hover:text-black dark:hover:text-white"
                )}
              >
                <Columns className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Showcase Content */}
      {viewMode === "grid" ? (
        <ProjectGridView
          groups={groupedProjects}
          onOpenModal={setModalProject}
        />
      ) : (
        <div className="flex flex-col lg:flex-row min-h-full w-full gap-4">
          <ProjectSidebar
            projects={filteredProjects}
            selectedProjectId={selectedProjectId}
            onProjectHover={setSelectedProjectId}
            onOpenModal={setModalProject}
          />
          <div className="hidden lg:block lg:flex-1 lg:sticky lg:top-10 lg:self-start lg:h-full">
            {selectedProject && (
              <MainContent
                project={selectedProject}
                onOpenModal={setModalProject}
              />
            )}
          </div>
        </div>
      )}

      {/* Project Links Modal */}
      <ProjectLinksModal
        project={modalProject}
        isOpen={!!modalProject}
        onClose={() => setModalProject(null)}
      />
    </div>
  );
}
