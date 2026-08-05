import { Routes } from '@angular/router';


import { FactureListComponent }
from './pages/facture-list/facture-list';


import { FactureCreateComponent }
from './pages/facture-create/facture-create';


import { FactureDetailComponent }
from './pages/facture-detail/facture-detail';



export const FACTURE_ROUTES: Routes = [



  {
    path:'',
    component: FactureListComponent
  },



  {
    path:'create',
    component: FactureCreateComponent
  },



    {
    path:'detail/:id',
    component: FactureDetailComponent
  }


];