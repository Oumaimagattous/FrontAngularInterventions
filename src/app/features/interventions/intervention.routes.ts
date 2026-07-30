import { Routes } from '@angular/router';


import { InterventionListComponent }
from './pages/intervention-list/intervention-list';


import { InterventionCreateComponent }
from './pages/intervention-create/intervention-create';


import { InterventionEditComponent }
from './pages/intervention-edit/intervention-edit';


import { InterventionDetailComponent }
from './pages/intervention-detail/intervention-detail';



export const INTERVENTION_ROUTES: Routes = [


  {
    path: '',
    component: InterventionListComponent
  },


  {
    path: 'create',
    component: InterventionCreateComponent
  },


  {
    path: 'detail/:id',
    component: InterventionDetailComponent
  },


  {
    path: 'edit/:id',
    component: InterventionEditComponent
  }


];