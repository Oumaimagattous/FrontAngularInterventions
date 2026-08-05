import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { InterventionService } from '../../services/intervention.service';

import { SiteService } from '../../../sites/services/site.service';
import { TechnicienService } from '../../../techniciens/services/technicien.service';
import { PrestationService } from '../../../prestations/services/prestation.service';
import { Site } from 'src/app/core/models/site/Site';
import { Technicien } from 'src/app/core/models/technicien/technicien';
import { Prestation } from 'src/app/core/models/prestation/prestation';
import { CreateIntervention } from 'src/app/core/models/intervention/create-intervention';

@Component({
  selector: 'app-intervention-create',
  standalone: true,

  templateUrl: './intervention-create.html',

  styleUrls: ['./intervention-create.scss'],

  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class InterventionCreateComponent implements OnInit {
  form!: FormGroup;

  sites = signal<Site[]>([]);

  techniciens = signal<Technicien[]>([]);
 techniciensSelectionnes = signal<Technicien[]>([]);
 prestations = signal<Prestation[]>([]);
 prestationsSelectionnes = signal<Prestation[]>([]);

  constructor(
    private fb: FormBuilder,

    private interventionService: InterventionService,

    private siteService: SiteService,

    private technicienService: TechnicienService,

    private prestationService: PrestationService,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      datePlanifiee: ['', Validators.required],

      siteId: [null, Validators.required],

      techniciensIds: [[], Validators.required],

      prestationsIds: [[], Validators.required]
    });

    this.loadSites();

    this.loadTechniciens();

    this.loadPrestations();
  }

  loadSites() {
    this.siteService.getAll().subscribe({
      next: (data) => {
        this.sites.set(data);
      },

      error: (err) => {
        console.error(err);
      }
    });
  }

  loadTechniciens() {
    this.technicienService.getAll().subscribe({
      next: (data) => {
        this.techniciens.set(data);
      },

      error: (err) => {
        console.error(err);
      }
    });
  }

   loadPrestations() {
    this.prestationService.getAll().subscribe({
      next: (data) => {
        this.prestations.set(data);
      },

      error: (err) => {
        console.error(err);
      }
    });
  }

  onSubmit() {
    console.log('SUBMIT CLICKED');

    if (this.form.invalid) {
      console.log('FORM INVALID', this.form.value);
      return;
    }

    console.log('FORM VALID', this.form.value);

    const dto: CreateIntervention = {
      datePlanifiee: new Date(this.form.value.datePlanifiee),

      siteId: this.form.value.siteId,

      techniciensIds: this.form.value.techniciensIds,

      prestationsIds: this.form.value.prestationsIds
    };

    console.log('CREATE INTERVENTION', dto);

    this.interventionService.create(dto).subscribe({
      next: () => {
        this.router.navigate(['/interventions']);
      },

      error: (err) => {
        console.error(err);
      }
    });
  }

  addTechnicien(event: any) {
    const id = Number(event.target.value);

    if (!id) return;

    const tech = this.techniciens().find((t) => t.id === id);

    if (!tech) return;

    const existe = this.techniciensSelectionnes().some((t) => t.id === id);

    if (!existe) {
      this.techniciensSelectionnes.update((list) => [...list, tech]);
    }

    // remettre le select à sa valeur initiale
    event.target.value = '';

    this.form.patchValue({
      techniciensIds: this.techniciensSelectionnes().map((t) => t.id)
    });
  }

  removeTechnicien(id: number) {
    this.techniciensSelectionnes.update((list) => list.filter((t) => t.id !== id));

    this.form.patchValue({
      techniciensIds: this.techniciensSelectionnes().map((t) => t.id)
    });
  }


  addPrestation(event: any) {
    const id = Number(event.target.value);

    if (!id) return;

    const tech = this.prestations().find((t) => t.id === id);

    if (!tech) return;

    const existe = this.prestationsSelectionnes().some((t) => t.id === id);

    if (!existe) {
      this.prestationsSelectionnes.update((list) => [...list, tech]);
    }

    // remettre le select à sa valeur initiale
    event.target.value = '';

    this.form.patchValue({
      prestationsIds: this.prestationsSelectionnes().map((t) => t.id)
    });
  }

  removePrestation(id: number) {
    this.prestationsSelectionnes.update((list) => list.filter((t) => t.id !== id));

    this.form.patchValue({
      prestationsIds: this.prestationsSelectionnes().map((t) => t.id)
    });
  }
}