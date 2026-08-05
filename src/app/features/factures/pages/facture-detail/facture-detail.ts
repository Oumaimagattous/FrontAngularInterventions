import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Facture } from 'src/app/core/models/facture/facture';
import { FactureService } from '../../services/facture.service';

@Component({
  selector: 'app-facture-detail',

  standalone: true,

  imports: [CommonModule, RouterModule],

  templateUrl: './facture-detail.html',

  styleUrls: ['./facture-detail.scss']
})
export class FactureDetailComponent implements OnInit {
  private factureService = inject(FactureService);

  private route = inject(ActivatedRoute);

  facture = signal<Facture | null>(null);

  error = signal('');

  factureId!: number;

  ngOnInit(): void {
    this.factureId = Number(this.route.snapshot.paramMap.get('id'));

    this.load();
  }

  load() {
    this.factureService.getById(this.factureId).subscribe({
      next: (data) => {
        console.log('FACTURE DETAIL :', data);

        this.facture.set(data);
      },

      error: (err) => {
        console.error(err);

        this.error.set('Impossible de charger la facture');
      }
    });
  }

  envoyer() {
    if (!confirm('Voulez-vous marquer cette facture comme envoyée ?')) {
      return;
    }

    this.factureService.envoyer(this.factureId).subscribe({
      next: () => {
        this.load();
      },

      error: (err) => {
        console.error(err);

        this.error.set("Impossible de marquer la facture comme envoyée");
      }
    });
  }

  payer() {
    if (!confirm('Voulez-vous marquer cette facture comme payée ?')) {
      return;
    }

    this.factureService.payer(this.factureId).subscribe({
      next: () => {
        this.load();
      },

      error: (err) => {
        console.error(err);

        this.error.set('Impossible de marquer la facture comme payée');
      }
    });
  }

  downloadPdf() {
    this.factureService.downloadPdf(this.factureId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');

        a.href = url;

        a.download = `Facture_${this.factureId}.pdf`;

        a.click();

        window.URL.revokeObjectURL(url);
      },

      error: (err) => {
        console.error(err);
      }
    });
  }
}