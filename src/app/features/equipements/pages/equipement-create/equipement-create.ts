import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { FormField, form, required, min } from '@angular/forms/signals';

import { CreateEquipement } from 'src/app/core/models/equipement/create-equipement';

import { FormsModule } from '@angular/forms';

import { EquipementService } from '../../services/equipements.service';

@Component({
  selector: 'app-equipement-create',

  standalone: true,

  imports: [CommonModule, RouterModule, FormField, FormsModule],

  templateUrl: './equipement-create.html',

  styleUrl: './equipement-create.scss'
})
export class EquipementCreateComponent {
  private equipementService = inject(EquipementService);

  private router = inject(Router);

  submitted = signal(false);

  loading = signal(false);

  error = signal('');

  equipementModal = signal<CreateEquipement>({
    code: '',

    designation: '',

    quantiteStock: 0
  });

  equipementForm = form(
    this.equipementModal,

    (schemaPath) => {
      required(schemaPath.code, {
        message: 'Code équipement obligatoire'
      });

      required(schemaPath.designation, {
        message: 'Désignation obligatoire'
      });

      min(schemaPath.quantiteStock, 1, {
        message: 'La quantité doit être supérieure à 0'
      });
    }
  );

  onSubmit(event: Event) {
    event.preventDefault();

    this.submitted.set(true);

    this.error.set('');

    this.loading.set(true);

    if (this.equipementForm().invalid()) {
      this.loading.set(false);

      return;
    }

    const request = this.equipementModal();

    this.equipementService.create(request).subscribe({
      next: () => {
        this.loading.set(false);

        this.router.navigate(['/equipements']);
      },

      error: (err) => {
        console.error(err);

        this.loading.set(false);

        this.error.set('Erreur lors de la création de l’équipement');
      }
    });
  }
}