import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Equipement } from 'src/app/core/models/equipement/equipement';
import { EquipementService } from '../../services/equipements.service';

@Component({
  selector: 'app-equipement-detail',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule
  ],

  templateUrl: './equipement-detail.html',

  styleUrl: './equipement-detail.scss'
})
export class EquipementDetailComponent {

  private equipementService = inject(EquipementService);

  private route = inject(ActivatedRoute);

  equipement = signal<Equipement | null>(null);

  error = signal('');

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadEquipement(id);

  }

  loadEquipement(id: number): void {

    this.equipementService.getById(id).subscribe({

      next: (data) => {

        console.log('EQUIPEMENT DETAIL :', data);

        this.equipement.set(data);

      },

      error: (err) => {

        console.error(err);

        this.error.set(
          'Impossible de charger l’équipement'
        );

      }

    });

  }

}