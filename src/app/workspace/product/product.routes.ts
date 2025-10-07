import {Routes} from '@angular/router';
import {ProductFormComponent} from './views/product-form/product-form.component';
import {ProductListComponent} from './views/product-list/product-list.component';
import {BulkFileUploadComponent} from './views/bulk-file-upload/bulk-file-upload.component';

export const productRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ProductListComponent,
  },
  {
    path: 'add',
    component: ProductFormComponent,
  },
  {
    path: 'edit/:id',
    component: ProductFormComponent,
  },
  {
    path: 'upload',
    component: BulkFileUploadComponent
  }
];
