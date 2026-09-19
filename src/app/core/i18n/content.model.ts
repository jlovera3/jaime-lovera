import { CompanyId, EducationId, SkillGroupId } from '../../data/data.model';

export type Lang = 'en' | 'es';

export interface DurationUnits {
  year: [one: string, many: string];
  month: [one: string, many: string];
}

/** Every user-facing string of the site, per language. Adding a key here forces both languages to provide it. */
export interface Content {
  meta: { title: string; description: string };
  a11y: {
    skipToContent: string;
    primaryNav: string;
    language: string;
    openMenu: string;
    closeMenu: string;
    backToTop: string;
  };
  nav: {
    about: string;
    experience: string;
    work: string;
    skills: string;
    contact: string;
  };
  splash: { role: string; skip: string };
  hero: {
    eyebrow: string;
    /** Rendered word by word; `accent` is highlighted with the brand gradient */
    headline: { before: string; accent: string; after: string };
    lead: string;
    ctaWork: string;
    ctaContact: string;
    scroll: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    educationTitle: string;
    education: Record<EducationId, string>;
    stats: { years: string; companies: string; apps: string };
  };
  experience: {
    eyebrow: string;
    title: string;
    subtitle: string;
    present: string;
    visit: string;
    apps: [one: string, many: string];
    units: DurationUnits;
    companies: Record<CompanyId, { role: string; highlights: string[] }>;
  };
  work: {
    eyebrow: string;
    title: string;
    subtitle: string;
    all: string;
    googlePlay: string;
    appStore: string;
    filterLabel: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    subtitle: string;
    groups: Record<SkillGroupId, { title: string; description: string }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    copy: string;
    copied: string;
    write: string;
  };
  footer: { built: string };
}
