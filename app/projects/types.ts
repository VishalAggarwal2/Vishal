export interface Project {
  title: string;
  src: string;
  color: string;
  url: string; // keep (used in detail page CTA)
  role: string;
  slug: string; // used for routing
  description: string; // full paragraph description
  techStack: string[]; // array of tech tags
  learnings: string[]; // what was learned/built
  github?: string; // optional github URL
  website?: string; // optional website URL (different from url)
}

export interface ProjectModal {
  active: boolean;
  index: number;
}
