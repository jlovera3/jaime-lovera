import { SkillGroup } from './data.model';

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'frontend',
    items: [
      'Angular',
      'Vue.js',
      'React',
      'TypeScript',
      'JavaScript',
      'Web Components',
      'HTML',
      'CSS',
      'Sass',
      'Stylus',
    ],
  },
  { id: 'mobile', items: ['Ionic', 'Capacitor', 'Cordova', 'iOS & Android', 'AR / VR'] },
  { id: 'backend', items: ['Node.js', 'Laravel', 'PHP'] },
  { id: 'data', items: ['MongoDB', 'MySQL', 'SQLite', 'Firebase'] },
  { id: 'craft', items: [
      'Technical project management',
      'Team leadership',
      'Architecture',
      'Agile / Scrum',
      'Git',
      'Store releases',
    ], },
];
