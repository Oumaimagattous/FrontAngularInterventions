import { Routes } from '@angular/router';

import { ClientListComponent } from './pages/client-list/client-list';
import { ClientCreateComponent } from './pages/client-create/client-create';
import { ClientEditComponent } from './pages/client-edit/client-edit';
import { ClientDetailComponent } from './pages/client-detail/client-detail';


export const CLIENT_ROUTES: Routes = [

  {
    path: '',
    component: ClientListComponent
  },

  {
    path: 'create',
    component: ClientCreateComponent
  },

  {
    path: ':id/edit',
    component: ClientEditComponent
  },

  {
    path: 'details/:id',
    component: ClientDetailComponent
  }

];