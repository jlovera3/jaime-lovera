export type CompanyId = 'meinestadt' | 'nttdata' | 'magtel' | 'ptv';
export type SkillGroupId = 'frontend' | 'mobile' | 'backend' | 'data' | 'craft';
export type EducationId = 'university' | 'degree';

export interface AppProject {
  id: string;
  name: string;
  logo: string;
  googleUrl?: string;
  appleUrl?: string;
}

export interface Company {
  id: CompanyId;
  name: string;
  url: string;
  /** File name (without extension) under assets/companies */
  logo: string;
  /** ISO year-month, e.g. "2023-01" */
  start: string;
  /** ISO year-month; null when it is the current position */
  end: string | null;
  /** Only technologies explicitly used there */
  stack?: string[];
  projects: AppProject[];
}

export interface SkillGroup {
  id: SkillGroupId;
  items: string[];
}

export interface EducationEntry {
  id: EducationId;
  start: number;
  end: number;
  place: string;
  mapUrl: string;
}

export interface Profile {
  name: string;
  email: string;
  /** Month the professional career started (ISO year-month); drives "years of experience" */
  careerStart: string;
  /** Optional links: sections hide themselves when empty */
  links: { label: string; url: string }[];
}
