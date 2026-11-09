import Project from "@/models/project";

export const FEATURED_PROJECT_IDS = new Set([
  "tiktok-streak",
  "hoyolab",
  "jukebox",
  "orbit",
  "backdrop-player",
  "kasir-pos",
  "telurin",
  "tovs-fleur",
  "deepfake-defense-deck",
]);

export type ProjectCategoryFilter =
  | "all"
  | "featured"
  | "web"
  | "mobile"
  | "automation"
  | "systems";

export interface YearGroup {
  year: string;
  projects: Project[];
}

export function getProjectYear(dateStr: string): string {
  const match = dateStr.match(/\b(202\d)\b/);
  return match ? match[1] : "Earlier";
}

export function parseTechTags(categoryStr: string): string[] {
  if (!categoryStr) return [];
  return categoryStr
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function matchesCategory(
  project: Project,
  filter: ProjectCategoryFilter
): boolean {
  if (filter === "all") return true;
  if (filter === "featured") return FEATURED_PROJECT_IDS.has(project.id);

  const text = `${project.title} ${project.category} ${project.description}`.toLowerCase();

  switch (filter) {
    case "web":
      return (
        text.includes("react") ||
        text.includes("next.js") ||
        text.includes("tanstack") ||
        text.includes("node") ||
        text.includes("express") ||
        text.includes("supabase") ||
        text.includes("pwa") ||
        text.includes("vue") ||
        text.includes("nuxt") ||
        text.includes("web")
      );
    case "mobile":
      return (
        text.includes("swift") ||
        text.includes("swiftui") ||
        text.includes("flutter") ||
        text.includes("macos") ||
        text.includes("kotlin") ||
        text.includes("compose") ||
        text.includes("appkit")
      );
    case "automation":
      return (
        text.includes("playwright") ||
        text.includes("python") ||
        text.includes("tui") ||
        text.includes("scheduler") ||
        text.includes("launchagent") ||
        text.includes("launchd") ||
        text.includes("cron") ||
        text.includes("baileys") ||
        text.includes("automation") ||
        text.includes("streak")
      );
    case "systems":
      return (
        text.includes("docker") ||
        text.includes("k8s") ||
        text.includes("kubernetes") ||
        text.includes("deepfake") ||
        text.includes("gemini") ||
        text.includes("ai") ||
        text.includes("iot") ||
        text.includes("fastapi")
      );
    default:
      return true;
  }
}

export function groupProjectsByYear(projects: Project[]): YearGroup[] {
  const groupsMap = new Map<string, Project[]>();

  for (const project of projects) {
    const year = getProjectYear(project.date);
    const label =
      year === "2023" || year === "2022" || year === "Earlier"
        ? "2023 & Earlier"
        : year;

    if (!groupsMap.has(label)) {
      groupsMap.set(label, []);
    }
    groupsMap.get(label)!.push(project);
  }

  // Predefined sort order for years
  const preferredOrder = ["2026", "2025", "2024", "2023 & Earlier"];

  return Array.from(groupsMap.entries())
    .sort(([a], [b]) => {
      const idxA = preferredOrder.indexOf(a);
      const idxB = preferredOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return b.localeCompare(a);
    })
    .map(([year, projs]) => ({
      year,
      projects: projs,
    }));
}
