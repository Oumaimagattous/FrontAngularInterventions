import { Routes } from '@angular/router';

import { TechnicienListComponent } from './pages/technicien-list/technicien-list';

import { TechnicienCreateComponent } from './pages/technicien-create/technicien-create';

import { TechnicienEditComponent } from './pages/technicien-edit/technicien-edit';

import { TechnicienDetailComponent } from './pages/technicien-detail/technicien-detail';

export const TECHNICIEN_ROUTES: Routes = [

  {
    path: '',
    component: TechnicienListComponent
  },

  {
    path: 'create',
    component: TechnicienCreateComponent
  },

  {
    path: 'details/:id',
    component: TechnicienDetailComponent
  },

  {
    path: ':id/edit',
    component: TechnicienEditComponent
  }

];