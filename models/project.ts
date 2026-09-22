import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";

export type ProjectIcon =
  | LucideIcon
  | ComponentType<{ className?: string }>
  | string;

export type ProjectLinkTuple =
  | [ProjectIcon, string]
  | [ProjectIcon, string, string];

export interface ProjectLinkObject {
  name?: string;
  label?: string;
  link?: string;
  url?: string;
  icon?: ProjectIcon;
}

export type ProjectLink = ProjectLinkObject | ProjectLinkTuple;

export default interface Project {
  id: string;
  title: string;
  category: string;
  date: string;
  link?: string;
  links?: ProjectLink[];
  description: string;
  src?: string;
  avatar_src?: string;
}
