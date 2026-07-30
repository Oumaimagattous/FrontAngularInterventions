import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Equipement } from 'src/app/core/models/equipement/equipement';
import { EquipementService } from '../../services/equipements.service';

@Component({
  selector: 'app-equipement-list',

  standalone: true,

  imports: [CommonModule, RouterModule],

  templateUrl: './equipement-list.html',

  styleUrl: './equipement-list.scss'
})
export class EquipementListComponent implements OnInit {
  equipements = signal<Equipement[]>([]);

  constructor(private service: EquipementService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next: (data) => {
        console.log('EQUIPEMENTS :', data);

        this.equipements.set(data);
      },

      error: (err) => {
        console.error(err);
      }
    });
  }

  delete(id: number) {
    if (confirm('Supprimer cet équipement ?')) {
      this.service.delete(id).subscribe({
        next: () => {
          this.load();
        },

        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}