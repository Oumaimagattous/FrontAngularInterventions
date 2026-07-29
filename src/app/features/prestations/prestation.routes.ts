import { Routes } from '@angular/router';


export const PRESTATION_ROUTES:Routes=[


{
 path:'',
 loadComponent:()=>import('./pages/prestation-list/prestation-list')
.then(m=>m.PrestationListComponent)

},



{
 path:'create',
 loadComponent:()=>import('./pages/prestation-create/prestation-create')
.then(m=>m.PrestationCreateComponent)

},



{
 path:'edit/:id',
 loadComponent:()=>import('./pages/prestation-edit/prestation-edit')
.then(m=>m.PrestationEditComponent)

},



{
 path:'details/:id',
 loadComponent:()=>import('./pages/prestation-detail/prestation-detail')
.then(m=>m.PrestationDetailComponent)

}


];