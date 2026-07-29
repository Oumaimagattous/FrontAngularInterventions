import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  email,
  form,
  minLength,
  required,
  FormField
} from '@angular/forms/signals';

import { AuthService } from '../../../../core/services/auth.service';
import { TokenService } from '../../../../core/services/token.service';

import { LoginRequest } from '../../../../core/models/auth/LoginRequest';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormField
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private cd = inject(ChangeDetectorRef);

  private authService = inject(AuthService);

  private tokenService = inject(TokenService);

  private router = inject(Router);


  submitted = signal(false);

  loading = signal(false);

  error = signal('');


  loginModal = signal<LoginRequest>({
    email: '',
    motDePasse: ''
  });


  loginForm = form(this.loginModal, schema => {

    required(schema.email);

    email(schema.email);

    required(schema.motDePasse);

    minLength(schema.motDePasse, 8);

  });


  constructor() {
    console.log("LOGIN COMPONENT CHARGE");
  }


  onSubmit(event: SubmitEvent) {

    console.log("========== SUBMIT ==========");
    console.log("Bouton login clique");


    event.preventDefault();


    this.submitted.set(true);

    this.error.set('');

    console.log("Valeur formulaire :", this.loginModal());


    if (this.loginForm().invalid()) {

      console.log("FORMULAIRE INVALID");

      return;
    }


    this.loading.set(true);


    console.log("APPEL API LOGIN");


    this.authService.login(this.loginModal())
      .subscribe({

        next: response => {

          console.log("LOGIN SUCCESS :", response);


          this.loading.set(false);


          this.tokenService.save(response.token);


          this.tokenService.saveUser({

            userId: response.userId,
            nom: response.nom,
            prenom: response.prenom,
            email: response.email,
            role: response.role

          });


          this.router.navigate(['/default']);

        },


        error: err => {

          console.error("LOGIN ERROR :", err);


          this.loading.set(false);


          this.error.set(
            err.error?.message ??
            "Email ou mot de passe incorrect."
          );


          this.cd.detectChanges();

        }

      });

  }

}