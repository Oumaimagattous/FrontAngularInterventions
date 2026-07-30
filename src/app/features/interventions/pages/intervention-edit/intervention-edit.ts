import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FormField, form, required } from '@angular/forms/signals';

import { InterventionService } from '../../services/intervention.service';
import { SiteService } from '../../../sites/services/site.service';
import { TechnicienService } from '../../../techniciens/services/technicien.service';

import { CreateIntervention } from 'src/app/core/models/intervention/create-intervention';
import { Site } from 'src/app/core/models/site/Site';
import { Technicien } from 'src/app/core/models/technicien/technicien';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-intervention-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FormField],
  templateUrl: './intervention-edit.html',
  styleUrls: ['./intervention-edit.scss']
})
export class InterventionEditComponent {
  private interventionService = inject(InterventionService);
  private siteService = inject(SiteService);
  private technicienService = inject(TechnicienService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  interventionId!: number;

  submitted = signal(false);
  loading = signal(false);
  error = signal('');

  sites = signal<Site[]>([]);
  techniciens = signal<Technicien[]>([]);

  interventionModel = signal<CreateIntervention>({
    datePlanifiee: new Date(),
    siteId: 0,
    techniciensIds: []
  });

  interventionForm = form(this.interventionModel, (p) => {
    required(p.datePlanifiee, {
      message: 'Date obligatoire'
    });

    required(p.siteId, {
      message: 'Site obligatoire'
    });
  });

  ngOnInit() {
    this.interventionId = Number(this.route.snapshot.paramMap.get('id'));

    forkJoin({
      sites: this.siteService.getAll(),

      techniciens: this.technicienService.getAll(),

      intervention: this.interventionService.getById(this.interventionId)
    }).subscribe({
      next: (data) => {
        console.log('INTERVENTION EDIT :', data.intervention);

        this.sites.set(data.sites);

        this.techniciens.set(data.techniciens);
        console.log('TECHNICIENS LIST :', this.techniciens());
        console.log('IDS SELECTIONNES :', data.intervention.techniciensIds);

        this.interventionModel.update((i) => ({
          ...i,

          datePlanifiee: new Date(data.intervention.datePlanifiee),

          siteId: data.intervention.siteId,

          techniciensIds: data.intervention.techniciensIds
        }));

        console.log('MODEL APRES UPDATE :', this.interventionModel());
      },

      error: (err) => {
        console.error(err);

        this.error.set("Impossible de charger l'intervention");
      }
    });
  }

  loadTechniciens() {
    this.technicienService.getAll().subscribe((data) => {
      this.techniciens.set(data);
    });
  }

  loadIntervention() {
    this.interventionService.getById(this.interventionId).subscribe({
      next: (data) => {
        this.interventionModel.update((i) => ({
          ...i,
          datePlanifiee: new Date(data.datePlanifiee),
          siteId: data.siteId,
          techniciensIds: []
        }));
      },

      error: () => {
        this.error.set("Impossible de charger l'intervention");
      }
    });
  }

  ajouterTechnicien(id: number) {
    if (!id) return;

    if (this.interventionModel().techniciensIds.includes(id)) return;

    this.interventionModel.update((i) => ({
      ...i,
      techniciensIds: [...i.techniciensIds, id]
    }));
  }

  supprimerTechnicien(id: number) {
    this.interventionModel.update((i) => ({
      ...i,
      techniciensIds: i.techniciensIds.filter((t) => t !== id)
    }));
  }

  getNomTechnicien(id: number) {
    const t = this.techniciens().find((x) => x.id === id);

    return t ? `${t.nom} ${t.prenom}` : '';
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.submitted.set(true);

    if (this.interventionForm().invalid()) return;

    this.loading.set(true);

    this.interventionService.update(this.interventionId, this.interventionModel()).subscribe({
      next: () => {
        this.loading.set(false);

        this.router.navigate(['/interventions']);
      },

      error: () => {
        this.loading.set(false);

        this.error.set('Erreur lors de la modification');
      }
    });
  }
}