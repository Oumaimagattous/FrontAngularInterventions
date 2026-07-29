import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { authGuard } from './core/guards/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/default',
        pathMatch: 'full'
      },
      {
        path: 'default',
        loadComponent: () =>
          import('./demo/dashboard/default/default.component')
            .then(c => c.DefaultComponent)
      },
      {
        path: 'typography',
        loadComponent: () =>
          import('./demo/elements/typography/typography.component')
            .then(c => c.TypographyComponent)
      },
      {
        path: 'color',
        loadComponent: () =>
          import('./demo/elements/element-color/element-color.component')
            .then(c => c.ElementColorComponent)
      },
      {
        path: 'sample-page',
        loadComponent: () =>
          import('./demo/other/sample-page/sample-page.component')
            .then(c => c.SamplePageComponent)
      },

      // ======== CLIENTS ========
      {
        path: 'clients',
        loadChildren: () =>
          import('./features/client/client.routes')
            .then(m => m.CLIENT_ROUTES)
      },
      {
      path: 'techniciens',
      loadChildren: () =>
      import('./features/techniciens/technicien.routes')
      .then(m => m.TECHNICIEN_ROUTES)
    },

    {
     path:'contrats',
     loadChildren:()=> 
     import('./features/contrats/contrat.routes')
    .then(m=>m.CONTRAT_ROUTES)
   },

   {
 path:'prestations',

 loadChildren:()=>import(
 './features/prestations/prestation.routes'
 )
.then(m=>m.PRESTATION_ROUTES)

}

    ]
  },

  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./demo/pages/authentication/login/login.component')
            .then(c => c.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./demo/pages/authentication/register/register.component')
            .then(c => c.RegisterComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }