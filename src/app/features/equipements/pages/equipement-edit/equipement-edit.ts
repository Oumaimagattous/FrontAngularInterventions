import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { FormField, form, required, min } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { CreateEquipement } from 'src/app/core/models/equipement/create-equipement';
import { EquipementService } from '../../services/equipements.service';

@Component({
  selector: 'app-equipement-edit',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule,
    FormField,
    FormsModule
  ],

  templateUrl: './equipement-edit.html',

  styleUrl: './equipement-edit.scss'
})
export class EquipementEditComponent {

  private equipementService = inject(EquipementService);

  private router = inject(Router);

  private route = inject(ActivatedRoute);

  submitted = signal(false);

  loading = signal(false);

  error = signal('');

  equipementId!: number;

  equipementModal = signal<CreateEquipement>({
    code: '',
    designation: '',
    quantiteStock: 0
  });

  equipementForm = form(this.equipementModal, (schemaPath) => {

    required(schemaPath.code, {
      message: 'Code équipement obligatoire'
    });

    required(schemaPath.designation, {
      message: 'Désignation obligatoire'
    });

    min(schemaPath.quantiteStock, 1, {
      message: 'La quantité doit être supérieure à 0'
    });

  });

  ngOnInit(): void {

    this.equipementId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadEquipement();

  }

  loadEquipement(): void {

    this.equipementService.getById(this.equipementId).subscribe({

      next: (equipement) => {

        console.log('EQUIPEMENT EDIT :', equipement);

        this.equipementModal.set({

          code: equipement.code,

          designation: equipement.designation,

          quantiteStock: equipement.quantiteStock

        });

      },

      error: (err) => {

        console.error(err);

        this.error.set(
          'Impossible de charger l’équipement'
        );

      }

    });

  }

  onSubmit(event: Event): void {

    event.preventDefault();

    this.submitted.set(true);

    this.error.set('');

    this.loading.set(true);

    if (this.equipementForm().invalid()) {

      this.loading.set(false);

      return;

    }

    const request = this.equipementModal();

    this.equipementService.update(
      this.equipementId,
      request
    ).subscribe({

      next: () => {

        this.loading.set(false);

        this.router.navigate(['/equipements']);

      },

      error: (err) => {

        console.error(err);

        this.loading.set(false);

        this.error.set(
          'Erreur lors de la modification de l’équipement'
        );

      }

    });

  }

}