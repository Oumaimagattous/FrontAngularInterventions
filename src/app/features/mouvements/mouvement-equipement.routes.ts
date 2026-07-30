import { Routes } from '@angular/router';


import { MouvementsEquipementListComponent }
from './pages/mouvement-equipement-list/mouvement-equipement-list';


import { MouvementEquipementDetailComponent }
from './pages/mouvement-equipement-detail/mouvement-equipement-detail';



export const MOUVEMENT_EQUIPEMENT_ROUTES: Routes = [


  {
    path: '',
    component: MouvementsEquipementListComponent
  },


  {
    path: 'detail/:id',
    component: MouvementEquipementDetailComponent
  }


];