import { Routes } from '@angular/router';

import { MoulinetteListComponent } from './pages/moulinette-list/moulinette-list';
import { MoulinetteCreateComponent } from './pages/moulinette-create/moulinette-create';
import { MoulinetteDetailComponent } from './pages/moulinette-detail/moulinette-detail';

export const MOULINETTE_ROUTES: Routes = [

  {
    path: '',
    component: MoulinetteListComponent
  },

  {
    path: 'create',
    component: MoulinetteCreateComponent
  },

  {
    path: ':id',
    component: MoulinetteDetailComponent
  }

];