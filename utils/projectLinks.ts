import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import { Github, Globe, ExternalLink, Play, Linkedin } from "lucide-react";
import Project, { ProjectLink, ProjectIcon } from "@/models/project";

export interface NormalizedProjectLink {
  label: string;
  url: string;
  icon: LucideIcon | ComponentType<{ className?: string }>;
}

export function cleanUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function resolveIcon(
  iconInput?: ProjectIcon,
  url: string = ""
): LucideIcon | ComponentType<{ className?: string }> {
  if (
    typeof iconInput === "function" ||
    (typeof iconInput === "object" && iconInput !== null)
  ) {
    return iconInput as LucideIcon;
  }

  if (typeof iconInput === "string") {
    const lower = iconInput.toLowerCase();
    if (lower.includes("git")) return Github;
    if (
      lower.includes("globe") ||
      lower.includes("web") ||
      lower.includes("demo") ||
      lower.includes("live") ||
      lower.includes("portfolio")
    )
      return Globe;
    if (lower.includes("link")) return Linkedin;
    if (lower.includes("play") || lower.includes("store") || lower.includes("app"))
      return Play;
  }

  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes("github.com")) return Github;
  if (lowerUrl.includes("linkedin.com")) return Linkedin;
  if (lowerUrl.includes("play.google.com")) return Play;
  if (
    lowerUrl.includes("vercel.app") ||
    lowerUrl.includes("netlify.app") ||
    lowerUrl.includes("http")
  )
    return Globe;

  return ExternalLink;
}

function resolveLabel(
  labelInput?: string,
  iconInput?: ProjectIcon,
  url: string = ""
): string {
  if (labelInput && labelInput.trim().length > 0) {
    return labelInput.trim();
  }

  const iconName =
    typeof iconInput === "string"
      ? iconInput.toLowerCase()
      : typeof iconInput === "object" &&
        iconInput !== null &&
        "displayName" in iconInput &&
        typeof (iconInput as { displayName?: unknown }).displayName === "string"
      ? ((iconInput as { displayName: string }).displayName).toLowerCase()
      : typeof iconInput === "function"
      ? iconInput.name.toLowerCase()
      : "";

  const lowerUrl = url.toLowerCase();

  if (iconName.includes("git") || lowerUrl.includes("github.com")) {
    return "github";
  }
  if (lowerUrl.includes("linkedin.com")) {
    return "linkedin";
  }
  if (lowerUrl.includes("play.google.com")) {
    return "play store";
  }
  if (
    iconName.includes("globe") ||
    lowerUrl.includes("vercel.app") ||
    lowerUrl.includes("netlify.app") ||
    lowerUrl.includes(".my.id") ||
    lowerUrl.includes("http")
  ) {
    return "deployed web";
  }

  return "visit";
}

export function normalizeProjectLink(
  linkItem: ProjectLink | string
): NormalizedProjectLink | null {
  if (!linkItem) return null;

  // Tuple: [Icon, url, label?]
  if (Array.isArray(linkItem)) {
    const iconInput = linkItem[0];
    const url = typeof linkItem[1] === "string" ? linkItem[1] : "";
    const labelInput =
      typeof linkItem[2] === "string" ? linkItem[2] : undefined;

    if (!url) return null;

    return {
      label: resolveLabel(labelInput, iconInput, url),
      url,
      icon: resolveIcon(iconInput, url),
    };
  }

  // Object: { icon?, url?, link?, label?, name? }
  if (typeof linkItem === "object") {
    const url = linkItem.url || linkItem.link || "";
    if (!url) return null;

    const labelInput = linkItem.label || linkItem.name;
    const iconInput = linkItem.icon;

    return {
      label: resolveLabel(labelInput, iconInput, url),
      url,
      icon: resolveIcon(iconInput, url),
    };
  }

  // Raw string URL
  if (typeof linkItem === "string" && linkItem.trim().length > 0) {
    const url = linkItem.trim();
    return {
      label: resolveLabel(undefined, undefined, url),
      url,
      icon: resolveIcon(undefined, url),
    };
  }

  return null;
}

export function getProjectLinks(project: Project): NormalizedProjectLink[] {
  if (project.links && Array.isArray(project.links) && project.links.length > 0) {
    const parsed = project.links
      .map(normalizeProjectLink)
      .filter((l): l is NormalizedProjectLink => l !== null);
    if (parsed.length > 0) return parsed;
  }

  if (project.link) {
    const single = normalizeProjectLink(project.link);
    if (single) return [single];
  }

  return [];
}
