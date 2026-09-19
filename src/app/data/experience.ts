import { Company } from './data.model';

// Language-neutral facts. Role titles and descriptions live in content/{en,es}.ts.
// Ordered from most recent to oldest.
export const COMPANIES: Company[] = [
  {
    id: 'meinestadt',
    name: 'Meinestadt',
    url: 'https://www.meinestadt.de/',
    logo: 'logo-meinestadt',
    start: '2023-01',
    end: '2025-01',
    projects: [
      {
        id: 'meinestadt-app',
        name: 'Meinestadt App',
        logo: 'assets/projects/meine-app-logo.png',
        googleUrl: 'https://play.google.com/store/apps/details?id=com.meinestadt.appv3&gl=DE',
        appleUrl: 'https://apps.apple.com/de/app/meinestadt-de/id1603822055',
      },
    ],
  },
  {
    id: 'nttdata',
    name: 'NTT Data',
    url: 'https://www.nttdata.com/global/en/',
    logo: 'logo_nttdata',
    start: '2021-11',
    end: '2022-12',
    projects: [
      {
        id: 'reciclos',
        name: 'Reciclos',
        logo: 'assets/projects/reciclos-app-logo.png',
        googleUrl: 'https://play.google.com/store/apps/details?id=com.ecoembes.reciclos',
        appleUrl: 'https://apps.apple.com/es/app/reciclos-tu-app-para-reciclar/id1487106432',
      },
      {
        id: 'tarjeta-social-digital',
        name: 'Tarjeta Social Digital',
        logo: 'assets/projects/tsd-app-logo.png',
        googleUrl: 'https://play.google.com/store/apps/details?id=es.megss.tsu.android',
        appleUrl: 'https://apps.apple.com/es/app/tarjeta-social-digital/id1444737323',
      },
      {
        id: 'colechef',
        name: 'ColeChef',
        logo: 'assets/projects/colechef-app-logo.png',
        googleUrl: 'https://play.google.com/store/apps/details?id=com.colechef.educa.app.movil',
        appleUrl: 'https://apps.apple.com/es/app/colechef/id1510330780',
      },
      {
        id: 'colechef-pro',
        name: 'ColeChef Pro',
        logo: 'assets/projects/colepro-app-logo.png',
        googleUrl: 'https://play.google.com/store/apps/details?id=com.colechef.educa.app.monitores',
      },
      {
        id: 'calidad-del-aire',
        name: 'Calidad del Aire',
        logo: 'assets/projects/calidad-app-logo.png',
        googleUrl: 'https://play.google.com/store/apps/details?id=es.juntadeandalucia.cma.cda',
        appleUrl:
          'https://apps.apple.com/uz/app/calidad-del-aire-andaluc%C3%ADa/id1667232352',
      },
      {
        id: 'digitalizate-plus',
        name: 'Digitalízate Plus',
        logo: 'assets/projects/logo_fundae.svg',
      },
      {
        id: 'roble',
        name: 'Roble',
        logo: 'assets/projects/mova_icon.png',
      },
    ],
  },
  {
    id: 'magtel',
    name: 'Magtel',
    url: 'https://magtel.es/',
    logo: 'logo-magtel',
    start: '2021-06',
    end: '2021-10',
    stack: ['Ionic', 'Angular', 'Cordova', 'Laravel', 'AR / VR'],
    projects: [
      {
        id: 'museos-de-malaga',
        name: 'Museos de Málaga',
        logo: 'assets/projects/museos-app.png',
        googleUrl: 'https://play.google.com/store/apps/details?id=com.magtel.museosmalaga',
      },
      {
        id: 'universidad-de-malaga',
        name: 'Universidad de Málaga',
        logo: 'assets/projects/malaga-app.png',
        googleUrl: 'https://play.google.com/store/apps/details?id=es.uma.appuma',
        appleUrl: 'https://apps.apple.com/es/app/uma/id997729022',
      },
      {
        id: 'our-lady-of-la-leche',
        name: 'Our Lady of La Leche',
        logo: 'assets/projects/laleche-app.png',
        googleUrl:
          'https://play.google.com/store/apps/details?id=com.overlaping.mission_nombre_de_dios',
      },
      {
        id: 'galeon-juncal',
        name: 'Exposición Galeón Juncal',
        logo: 'assets/projects/galeon-app.png',
        googleUrl: 'https://play.google.com/store/apps/details?id=com.magtel.galeon',
      },
    ],
  },
  {
    id: 'ptv',
    name: 'PTV Telecom',
    url: 'https://www.ptvtelecom.com/',
    logo: 'logo-ptv-telecom',
    start: '2020-09',
    end: '2021-06',
    stack: ['Ionic', 'Angular', 'TypeScript', 'PHP'],
    projects: [
      {
        id: 'ptv-sat',
        name: 'PTV SAT',
        logo: 'assets/projects/ptvsat-app.png',
        googleUrl: 'https://play.google.com/store/apps/details?id=com.ptv.sat&pcampaignid=web_share',
        appleUrl: 'https://apps.apple.com/es/app/ptv-sat/id1542582727?l=en',
      },
      {
        id: 'mi-ptv',
        name: 'Mi PTV',
        logo: 'assets/projects/miptv-app.png',
        googleUrl:
          'https://play.google.com/store/apps/details?id=com.ptvtelecom.sistemas.miptv&pcampaignid=web_share',
        appleUrl: 'https://apps.apple.com/jm/app/mi-ptv/id1019419013',
      },
    ],
  },
];
