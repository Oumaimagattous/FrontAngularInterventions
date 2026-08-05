import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Facture } from 'src/app/core/models/facture/facture';
import { FactureService } from '../../services/facture.service';

@Component({
  selector: 'app-facture-list',

  standalone: true,

  templateUrl: './facture-list.html',

  styleUrls: ['./facture-list.scss'],

  imports: [CommonModule, RouterModule]
})
export class FactureListComponent implements OnInit {
  factures = signal<Facture[]>([]);

  constructor(private service: FactureService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next: (data) => {
        console.log('FACTURES :', data);

        this.factures.set(data);
      },

      error: (err) => {
        console.error(err);
      }
    });
  }

  downloadPdf(id: number) {
    this.service.downloadPdf(id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');

        a.href = url;

        a.download = `Facture_${id}.pdf`;

        a.click();

        window.URL.revokeObjectURL(url);
      },

      error: (err) => {
        console.error(err);
      }
    });
  }

  delete(id: number) {
    if (confirm('Supprimer cette facture ?')) {
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