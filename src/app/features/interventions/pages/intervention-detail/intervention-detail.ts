import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { InterventionService } from '../../services/intervention.service';

import { Intervention } from 'src/app/core/models/intervention/Intervention';
import { ValiderIntervention } from 'src/app/core/models/intervention/valider-intervention';

@Component({
  selector: 'app-intervention-detail',

  standalone: true,

  templateUrl: './intervention-detail.html',

  styleUrls: ['./intervention-detail.scss'],

  imports: [CommonModule, RouterModule]
})
export class InterventionDetailComponent implements OnInit {
  intervention = signal<Intervention | null>(null);
  interventionId!: number;
  error = signal('');

  constructor(
    private route: ActivatedRoute,
    private service: InterventionService
  ) {}

  ngOnInit(): void {
    this.interventionId = Number(this.route.snapshot.paramMap.get('id'));

    this.load(this.interventionId);
  }

  load(id: number) {
    this.service.getById(id).subscribe({
      next: (data) => {
        console.log('INTERVENTION DETAIL :', data);

        this.intervention.set(data);
      },

      error: (err) => {
        console.error(err);
      }
    });
  }

  valider(accepter: boolean) {
    const request: ValiderIntervention = {
      interventionId: this.interventionId,

      accepter: accepter
    };

    this.service.valider(request).subscribe({
      next: () => {
        console.log('Validation effectuée');

        // Recharger les données et mettre à jour le signal
        this.load(this.interventionId);
      },

      error: (err) => {
        console.error(err);
      }
    });
  }

  genererFiche() {
    if (!this.intervention()) return;

    const id = this.intervention()!.id;

    this.service.genererFiche(id).subscribe({
      next: (blob) => {
        const fileURL = URL.createObjectURL(blob);

        window.open(fileURL, '_blank');
      },

      error: (err) => {
        console.error(err);
      }
    });
  }
}