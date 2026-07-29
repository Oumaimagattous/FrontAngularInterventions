import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { PrestationService } from '../../services/prestation.service';

@Component({

  selector: 'app-prestation-edit',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './prestation-edit.html',

  styleUrl: './prestation-edit.scss'

})

export class PrestationEditComponent implements OnInit {

  form!: FormGroup;

  id!: number;

  loading = true;

  saving = false;

  constructor(

    private fb: FormBuilder,

    private route: ActivatedRoute,

    private router: Router,

    private service: PrestationService,

    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {

    this.initForm();

    this.route.paramMap.subscribe(params => {

      this.id = Number(params.get('id'));

      console.log("ID prestation :", this.id);

      if (this.id) {

        this.loadPrestation();

      }

    });

  }

  initForm(): void {

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

  loadPrestation(): void {

    this.loading = true;

    this.service.getById(this.id)

      .subscribe({

        next: (data) => {

          console.log("Prestation chargée :", data);

          this.form.reset();

          this.form.patchValue({

            codeERP: data.codeERP,

            designation: data.designation,

            prix: data.prix

          });

          this.loading = false;

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error("Erreur chargement :", err);

          this.loading = false;

          this.cdr.detectChanges();

        }

      });

  }

  update(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.saving = true;

    console.log("Modification :", this.form.value);

    this.service.update(

      this.id,

      this.form.value

    ).subscribe({

      next: () => {

        console.log("Prestation modifiée");

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