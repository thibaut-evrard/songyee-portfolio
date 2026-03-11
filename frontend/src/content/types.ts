export type MediaType = "image" | "video";
export type MediaSize = "small" | "medium" | "large";

export interface MediaContent {
  src: string;
  alt: string;
  type: MediaType | string;
}

export interface ProjectMediaContent extends MediaContent {
  size: MediaSize | string;
}

export interface ProjectSectionContent {
  title: string;
  description: string;
  media: ProjectMediaContent[];
}

export interface ProjectInfoContent {
  client: string;
  project_name: string;
  tag: string;
  year: string;
}

export interface ProjectMetaContent {
  title: string;
  description: string;
}

export interface ProjectContent {
  currentKey: string;
  slug: string;
  meta: ProjectMetaContent;
  info: ProjectInfoContent;
  section: ProjectSectionContent[];
}
