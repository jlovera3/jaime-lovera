export type CompanyId = 'knowmad' | 'meinestadt' | 'nttdata' | 'magtel' | 'ptv';
export type EngagementId = 'generali' | 'nodus' | 'ofiteco';
export type SkillGroupId = 'frontend' | 'mobile' | 'backend' | 'data' | 'craft';
export type EducationId = 'university' | 'degree';

export interface AppProject {
  id: string;
  name: string;
  /** Client shown under the name when it differs from the employer */
  client?: string;
  logo: string;
  /** Wordmarks that are much wider than tall are shown as a banner instead of a square icon */
  wideLogo?: boolean;
  googleUrl?: string;
  appleUrl?: string;
  webUrl?: string;
}

/** A client project done while employed by a consultancy */
export interface Engagement {
  id: EngagementId;
  client: string;
  url?: string;
  /** ISO year-month; both omitted when the dates are not public */
  start?: string;
  end?: string | null;
  /** Still maintained today, alongside the current role */
  support?: boolean;
}

export interface Company {
  id: CompanyId;
  name: string;
  url: string;
  /** Path to the logo under assets/companies */
  logo: string;
  /** ISO year-month, e.g. "2023-01" */
  start: string;
  /** ISO year-month; null when it is the current position */
  end: string | null;
  /** Only technologies explicitly used there */
  stack?: string[];
  engagements?: Engagement[];
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
