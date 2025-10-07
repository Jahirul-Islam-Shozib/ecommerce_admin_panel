import {Routes} from '@angular/router';
import {OrderListComponent} from './order-list/order-list.component';

export const orderRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: OrderListComponent,
  },
]
