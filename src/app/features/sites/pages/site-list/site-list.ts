import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Site } from 'src/app/core/models/site/Site';
import { SiteService } from '../../services/site.service';

@Component({
  selector: 'app-site-list',
  standalone: true,
  templateUrl: './site-list.html',
  styleUrls: ['./site-list.scss'],
  imports: [CommonModule, RouterModule]
})
export class SiteListComponent implements OnInit {
  sites = signal<Site[]>([]);

  constructor(private service: SiteService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next: (data) => {
        console.log('SITES :', data);

        this.sites.set(data);
      },

      error: (err) => console.error(err)
    });
  }

  delete(id: number) {
    if (confirm('Supprimer ce site ?')) {
      this.service.delete(id).subscribe(() => {
        this.load();
      });
    }
  }
}