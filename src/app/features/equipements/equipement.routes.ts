import { Routes } from '@angular/router';

import { EquipementListComponent } from './pages/equipement-list/equipement-list';
import { EquipementCreateComponent } from './pages/equipement-create/equipement-create';
import { EquipementEditComponent } from './pages/equipement-edit/equipement-edit';
import { EquipementDetailComponent } from './pages/equipement-detail/equipement-detail';

export const EQUIPEMENT_ROUTES: Routes = [

  {
    path: '',
    component: EquipementListComponent
  },

  {
    path: 'create',
    component: EquipementCreateComponent
  },

  {
    path: 'detail/:id',
    component: EquipementDetailComponent
  },

   {
    path: 'edit/:id',
    component: EquipementEditComponent
  }

];