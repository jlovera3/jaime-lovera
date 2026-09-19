import { Content } from '../core/i18n/content.model';

export const EN: Content = {
  meta: {
    title: 'Jaime Lovera — Frontend & Mobile Engineer',
    description:
      'Frontend and mobile engineer building fast, polished apps for web, iOS and Android. Portfolio and CV of Jaime Lovera.',
  },
  a11y: {
    skipToContent: 'Skip to content',
    primaryNav: 'Primary',
    language: 'Language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    backToTop: 'Back to top',
  },
  nav: {
    about: 'About',
    experience: 'Experience',
    work: 'Work',
    skills: 'Skills',
    contact: 'Contact',
  },
  splash: { role: 'Frontend & Mobile Engineer', skip: 'Skip intro' },
  hero: {
    eyebrow: 'Frontend & Mobile Engineer',
    headline: {
      before: 'I build fast, polished',
      accent: 'mobile & web',
      after: 'experiences.',
    },
    lead: 'I ship production apps to the App Store and Google Play, and I care about clean architecture, performance and the small details that make a product feel right.',
    ctaWork: 'View my work',
    ctaContact: 'Get in touch',
    scroll: 'Scroll',
  },
  about: {
    eyebrow: 'About',
    title: 'From industrial engineering to shipping apps.',
    paragraphs: [
      'After studying Industrial Engineering for a few years, I found my love for programming and making mobile apps. Since then I have been fully dedicated to getting better at the craft.',
      'I am friendly, I stay calm under pressure and I enjoy solving problems, whether that means untangling a bug in production, leading a small team or polishing an interaction until it feels right.',
    ],
    educationTitle: 'Education',
    education: {
      university: 'Industrial Engineering',
      degree: 'Higher Degree in Multiplatform Application Development',
    },
    stats: { years: 'Years of experience', companies: 'Companies', apps: 'Apps published' },
  },
  experience: {
    eyebrow: 'Experience',
    title: 'Where I have worked',
    subtitle: 'Four teams, four very different products, one common focus on quality.',
    present: 'Present',
    visit: 'Visit website',
    apps: ['app', 'apps'],
    units: { year: ['yr', 'yrs'], month: ['mo', 'mos'] },
    companies: {
      meinestadt: {
        role: 'Frontend Developer',
        highlights: [
          'Developed the app that represents the company’s web portal.',
          'Communicated, improved and applied internal product concepts.',
          'Owned the deployment of the apps to the stores.',
        ],
      },
      nttdata: {
        role: 'Full-Stack Developer & Team Leader',
        highlights: [
          'Worked on several apps at once to resolve bugs in production.',
          'Led a team of 4, managing and organising the tasks of 3 projects while covering a paternity leave.',
          'Developed and improved apps for external customers, raising product quality and effectiveness.',
        ],
      },
      magtel: {
        role: 'Full-Stack Developer',
        highlights: [
          'Web, Android and iOS development with Ionic, Angular and Cordova, plus a Laravel back end.',
          'Delivered “Museums of Málaga”, “Our Lady of La Leche” and “Galeón Juncal” exhibition apps.',
          'Virtual and augmented reality experiences on Android devices.',
          'Git-based workflow in an Agile / Scrum team.',
        ],
      },
      ptv: {
        role: 'Mobile Developer',
        highlights: [
          'Built the web, Android and iOS apps for PTV Telecom’s technical service from scratch.',
          'Ionic, Angular, TypeScript and PHP drivers, versioned on GitHub.',
          'Published to the App Store and Google Play.',
          'Integrated native Google Maps, SMS sending and card payments.',
        ],
      },
    },
  },
  work: {
    eyebrow: 'Selected work',
    title: 'Apps in the stores',
    subtitle: 'A selection of the apps I have built or maintained, live on iOS and Android.',
    all: 'All',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    filterLabel: 'Filter by company',
  },
  skills: {
    eyebrow: 'Skills',
    title: 'The toolbox',
    subtitle: 'Technologies I have used in production, grouped by what they are for.',
    groups: {
      frontend: {
        title: 'Frontend',
        description: 'Interfaces that are fast, accessible and easy to maintain.',
      },
      mobile: {
        title: 'Mobile',
        description: 'Hybrid apps shipped to the App Store and Google Play.',
      },
      backend: { title: 'Backend', description: 'The APIs and services behind the apps.' },
      data: { title: 'Data', description: 'From on-device storage to cloud databases.' },
      craft: { title: 'Craft', description: 'How I work with a team and get things released.' },
    },
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Let’s build something great together.',
    text: 'Have a project, a role or just want to say hi? My inbox is open.',
    copy: 'Copy email',
    copied: 'Copied!',
    write: 'Write me',
  },
  footer: { built: 'Designed & built by Jaime Lovera' },
};
