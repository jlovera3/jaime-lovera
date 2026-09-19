import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'intro',
        loadComponent: () => import('../pages/intro/intro.page').then((m) => m.IntroPage),
      },
      {
        path: 'career',
        loadComponent: () => import('../pages/career/career.page').then((m) => m.CareerPage),
      },
      {
        path: 'about-me',
        loadComponent: () => import('../pages/about-me/about-me.page').then((m) => m.AboutMePage),
      },
      {
        path: '',
        redirectTo: '/tabs/intro',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/intro',
    pathMatch: 'full',
  },
];
