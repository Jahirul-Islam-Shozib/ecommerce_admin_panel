import {MainComponent} from './main.component';
import {Routes} from '@angular/router';
import {DashboardComponent} from '../../workspace/dashboard/dashboard.component';
import {ProductComponent} from '../../workspace/product/product.component';

export const mainRoutes: Routes = [
  {

    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'product',
        loadChildren: () => import('../../workspace/product/product.routes').then(c => c.productRoutes)
      }
    ]
  },
]
