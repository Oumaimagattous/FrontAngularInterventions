import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { SHARED_IMPORTS } from 'src/app/theme/shared/shared.module';

import { TokenService } from 'src/app/core/services/token.service'

@Component({
  selector: 'app-nav-right',
  imports: [...SHARED_IMPORTS, RouterModule],
  templateUrl: './nav-right.component.html',
  styleUrl: './nav-right.component.scss'
})
export class NavRightComponent {
 private tokenService = inject(TokenService);

  private router = inject(Router);



  logout(): void
  {

    // suppression JWT + utilisateur
    this.tokenService.logout();


    // retour page login
    this.router.navigate(['/login']);

  }


 }
