import { Routes } from '@angular/router';


import { ContratListComponent } 
from './pages/contrat-list/contrat-list';


import { ContratCreateComponent }
from './pages/contrat-create/contrat-create';


import { ContratEditComponent }
from './pages/contrat-edit/contrat-edit';


import { ContratDetailComponent }
from './pages/contrat-detail/contrat-detail';

import { ContratAddPrestationsComponent }
from './pages/contrat-add-prestations/contrat-add-prestations';


import { ContratValidationComponent }
from './pages/contrat-validation/contrat-validation';

export const CONTRAT_ROUTES:Routes=[


{
 path:'',
 component:ContratListComponent
},


{
 path:'create',
 component:ContratCreateComponent
},



{
 path:':id/edit',
 component:ContratEditComponent
},
{
 path:'add-prestations/:id',
 component:ContratAddPrestationsComponent
},




{
 path:'validation/:id',
 component:ContratValidationComponent
},


{
 path:':id',
 component:ContratDetailComponent
}



];