import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormField, form, required } from '@angular/forms/signals';

import { SiteService } from '../../services/site.service';
import { ClientService } from '../../../client/services/client.service';

import { CreateSite } from 'src/app/core/models/site/CreateSiteRequest';
import { Client } from 'src/app/core/models/client/Client';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-site-edit',

  standalone: true,

  imports: [CommonModule, RouterModule, FormField, FormsModule],

  templateUrl: './site-edit.html',

  styleUrl: './site-edit.scss'
})
export class SiteEditComponent {
  private siteService = inject(SiteService);

  private clientService = inject(ClientService);

  private router = inject(Router);

  private route = inject(ActivatedRoute);

  submitted = signal(false);

  loading = signal(false);

  error = signal('');

  clients = signal<Client[]>([]);

  siteId!: number;

  siteModal = signal<CreateSite>({
    codeSite: '',

    adresse: '',

    clientId: 0
  });

  siteForm = form(this.siteModal, (schemaPath) => {
    required(schemaPath.codeSite, {
      message: 'Code site obligatoire'
    });

    required(schemaPath.adresse, {
      message: 'Adresse obligatoire'
    });

    required(schemaPath.clientId, {
      message: 'Client obligatoire'
    });
  });

  ngOnInit() : void {
    this.siteId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadClients();

    this.loadSite();
  }

  loadClients() : void {
    this.clientService.getAll().subscribe({
      next: (data) => {
        this.clients.set(data);
      },

      error: (err) => {
        console.error(err);
      }
    });
  }

  loadSite() : void {
    this.siteService.getById(this.siteId).subscribe({
      next: (site) => {
        console.log('SITE EDIT :', site);

        this.siteModal.set({
          codeSite: site.codeSite,

          adresse: site.adresse,

          clientId: site.clientId
        });
      },

      error: (err) => {
        console.error(err);

        this.error.set('Impossible de charger le site');
      }
    });
  }

  onSubmit(event: Event) : void {
    event.preventDefault();

    this.submitted.set(true);

    this.error.set('');

    this.loading.set(true);

    if (this.siteModal().clientId === 0) {
      this.error.set('Veuillez sélectionner un client');
      this.loading.set(false);
      return;
    }

    if (this.siteForm().invalid()) {
      this.loading.set(false);
      return;
    }

    const request = this.siteModal();

    this.siteService.update(this.siteId, request).subscribe({
      next: () => {
        this.loading.set(false);

        this.router.navigate(['/sites']);
      },

      error: (err) => {
        console.error(err);

        this.loading.set(false);

        this.error.set('Erreur lors de la modification du site');
      }
    });
  }
}