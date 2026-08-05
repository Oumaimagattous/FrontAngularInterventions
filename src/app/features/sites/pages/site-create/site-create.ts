import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormField, form, required } from '@angular/forms/signals';

import { SiteService } from '../../services/site.service';
import { ClientService } from '../../../client/services/client.service';

import { CreateSite } from 'src/app/core/models/site/CreateSiteRequest';
import { Client } from 'src/app/core/models/client/Client';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-site-create',
  standalone: true,
  imports: [CommonModule, RouterModule, FormField, FormsModule],
  templateUrl: './site-create.html',
  styleUrl: './site-create.scss'
})
export class SiteCreateComponent {
  private siteService = inject(SiteService);

  private clientService = inject(ClientService);

  private router = inject(Router);
  private location = inject(Location);

  submitted = signal(false);

  loading = signal(false);

  error = signal('');

  clients = signal<Client[]>([]);

  siteModal = signal<CreateSite>({
    code: '',
    adresse: '',
    clientId: 0
  });

  siteForm = form(this.siteModal, (schemaPath) => {
    required(schemaPath.code, {
      message: 'Code site obligatoire'
    });

    required(schemaPath.adresse, {
      message: 'Adresse obligatoire'
    });

    required(schemaPath.clientId, {
      message: 'Client obligatoire'
    });
  });

  constructor() {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getAll().subscribe({
      next: (data) => {
        this.clients.set(data);
      },

      error: (err) => {
        console.error(err);
      }
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.submitted.set(true);

    this.error.set('');

    this.loading.set(true);

    if (this.siteModal().clientId === 0) {
      this.loading.set(false);

      return;
    }

    if (this.siteForm().invalid()) {
      this.loading.set(false);

      return;
    }

    const request = this.siteModal();

    this.siteService.create(request).subscribe({
      next: () => {
        this.loading.set(false);

        this.router.navigate(['/sites']);
      },

      error: (err) => {
        this.loading.set(false);

        this.error.set('Erreur lors de la création du site');

        console.error(err);
      }
    });
  }
  convertToNumber(value: string): number {
    return Number(value);
  }
    retour(): void {
  this.location.back();
}
}