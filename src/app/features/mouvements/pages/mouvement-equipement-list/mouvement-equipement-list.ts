import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MouvementEquipementService } from '../../services/mouvement-equipement.service';
import { MouvementEquipement } from 'src/app/core/models/mouvement/mouvement-equipement';

@Component({
  selector: 'app-mouvements-equipement-list',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './mouvement-equipement-list.html'
})
export class MouvementsEquipementListComponent {
  private service = inject(MouvementEquipementService);

  mouvements = signal<MouvementEquipement[]>([]);

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next: (data) => {
        console.log('MOUVEMENTS :', data);

        this.mouvements.set(data);
      },

      error: (err) => {
        console.error(err);
      }
    });
  }
}