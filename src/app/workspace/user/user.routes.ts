import {Routes} from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {UserCreateFormComponent} from './user-create-form/user-create-form.component';

export const userRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: UserListComponent,
  },
  {
    path: 'add',
    component: UserCreateFormComponent,
  },
  {
    path: 'edit/:id',
    component: UserCreateFormComponent,
  },
]
