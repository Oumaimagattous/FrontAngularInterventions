import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Intervention } from 'src/app/core/models/intervention/Intervention';
import { InterventionService } from '../../services/intervention.service';

@Component({
  selector: 'app-intervention-list',
  standalone: true,
  templateUrl: './intervention-list.html',
  styleUrls: ['./intervention-list.scss'],
  imports: [CommonModule, RouterModule]
})
export class InterventionListComponent implements OnInit {
  interventions = signal<Intervention[]>([]);

  constructor(private service: InterventionService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next: (data) => {
        console.log('INTERVENTIONS :', data);

        this.interventions.set(data);
      },

      error: (err) => {
        console.error(err);
      }
    });
  }

  delete(id: number) {
    if (confirm('Supprimer cette intervention ?')) {
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