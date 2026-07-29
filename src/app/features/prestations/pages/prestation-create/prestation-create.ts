import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { PrestationService } from '../../services/prestation.service';

@Component({

  selector: 'app-prestation-create',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './prestation-create.html',

  styleUrl: './prestation-create.scss'

})

export class PrestationCreateComponent {

  form!: FormGroup;

  saving = false;

  constructor(

    private fb: FormBuilder,

    private service: PrestationService,

    private router: Router

  ) {

    this.form = this.fb.group({

      codeERP: [
        '',
        Validators.required
      ],

      designation: [
        '',
        Validators.required
      ],

      prix: [
        null,
        [
          Validators.required,
          Validators.min(0)
        ]
      ]

    });

  }

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.saving = true;

    this.service.create(this.form.value)

      .subscribe({

        next: () => {

          console.log("Prestation créée");

          this.router.navigate([
            '/prestations'
          ]);

        },

        error: (err) => {

          console.error(err);

          this.saving = false;

        }

      });

  }

  cancel(): void {

    this.router.navigate([
      '/prestations'
    ]);

  }

}