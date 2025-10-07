import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AccessDeniedComponent} from './access-denied/access-denied.component';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'access',
    component: AccessDeniedComponent
  }
]
