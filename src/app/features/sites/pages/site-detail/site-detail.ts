import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { SiteService } from '../../services/site.service';
import { Site } from 'src/app/core/models/site/Site';

@Component({
  selector: 'app-site-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './site-detail.html',
  styleUrl: './site-detail.scss'
})
export class SiteDetailComponent {
  private siteService = inject(SiteService);

  private route = inject(ActivatedRoute);

  site = signal<Site | null>(null);

  error = signal('');

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.loadSite(id);
  }

  loadSite(id: number): void {
    this.siteService.getById(id).subscribe({
      next: (data) => {
        console.log('SITE DETAIL :', data);

        this.site.set(data);
      },

      error: (err) => {
        console.error(err);

        this.error.set('Impossible de charger le site');
      }
    });
  }
}