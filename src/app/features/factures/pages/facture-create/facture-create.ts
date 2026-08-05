import { Component, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { FactureService } from '../../services/facture.service';

import { Moulinette } from 'src/app/core/models/moulinette/moulinette';
import { MoulinetteService } from 'src/app/features/moulinettes/services/moulinette.service';
import { CreateFacture } from 'src/app/core/models/facture/create-facture';

@Component({
  selector: 'app-facture-create',

  standalone: true,

  imports: [CommonModule, RouterModule, FormsModule],

  templateUrl: './facture-create.html',

  styleUrl: './facture-create.scss'
})
export class FactureCreateComponent {
  private factureService = inject(FactureService);

  private moulinetteService = inject(MoulinetteService);

  private router = inject(Router);

  moulinettes = signal<Moulinette[]>([]);

  loading = signal(false);

  error = signal('');

  model = signal<CreateFacture>({
    moulinetteId: 0,

    tauxTVA: 19
  });

  ngOnInit() {
    this.loadMoulinettes();
  }

  loadMoulinettes() {
    this.moulinetteService.getAll().subscribe({
      next: (data) => {
        this.moulinettes.set(data);
      },

      error: (err) => {
        console.error(err);

        this.error.set('Impossible de charger les moulinettes.');
      }
    });
  }

  generate() {
    if (this.model().moulinetteId === 0) {
      this.error.set('Veuillez choisir une moulinette.');

      return;
    }

    this.loading.set(true);

    this.factureService.create(this.model()).subscribe({
      next: () => {
        this.loading.set(false);

        this.router.navigate(['/factures']);
      },

      error: (err) => {
        console.error(err);

        this.loading.set(false);

        this.error.set('Erreur lors de la génération.');
      }
    });
  }
}