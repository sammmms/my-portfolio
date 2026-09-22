"use client";

import { useState } from "react";
import ProjectSidebar from "@/components/ProjectSidebar";
import MainContent from "@/components/MainContent";
import ProjectLinksModal from "@/components/ProjectLinksModal";
import { projects } from "@/data/projects";
import { useScrollNavigation } from "@/hooks/useScrollNavigation";
import Project from "@/models/project";

export default function ProjectsPage() {
  useScrollNavigation({ prevPath: "/", nextPath: "/experience" });

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    projects[0].id
  );
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <div className="flex flex-col lg:flex-row min-h-full w-full gap-4">
      <ProjectSidebar
        projects={projects}
        selectedProjectId={selectedProjectId}
        onProjectHover={setSelectedProjectId}
        onOpenModal={setModalProject}
      />
      <div className="hidden lg:block lg:flex-1 lg:sticky lg:top-10 lg:self-start lg:h-full">
        <MainContent
          project={selectedProject}
          onOpenModal={setModalProject}
        />
      </div>
      <ProjectLinksModal
        project={modalProject}
        isOpen={!!modalProject}
        onClose={() => setModalProject(null)}
      />
    </div>
  );
}
