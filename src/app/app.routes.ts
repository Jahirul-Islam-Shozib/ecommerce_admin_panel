import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    canActivate: [],
    path: '',
    loadChildren: () => import('./layout/main/main.routes').then(m => m.mainRoutes)
  },
];
