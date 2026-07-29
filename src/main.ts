import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
//import { provideHttpClient } from '@angular/common/http';
import {
provideHttpClient,
withInterceptors
}
from '@angular/common/http';


import {
jwtInterceptor
}
from './app/core/interceptors/jwt.interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BrowserModule, 
    AppRoutingModule),
  provideHttpClient(withInterceptors([
 jwtInterceptor
]))
]
}).catch((err) => console.error(err));
