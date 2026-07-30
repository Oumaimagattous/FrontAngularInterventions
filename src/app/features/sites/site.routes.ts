import { Routes } from '@angular/router';


import { SiteListComponent }
from './pages/site-list/site-list';


import { SiteCreateComponent }
from './pages/site-create/site-create';


import { SiteEditComponent }
from './pages/site-edit/site-edit';


import { SiteDetailComponent }
from './pages/site-detail/site-detail';



export const SITE_ROUTES: Routes = [


  {
    path: '',
    component: SiteListComponent
  },


  {
    path: 'create',
    component: SiteCreateComponent
  },


  {
    path: 'detail/:id',
    component: SiteDetailComponent
  },


  {
    path: 'edit/:id',
    component: SiteEditComponent
  }


];