import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TechnicienService } from '../../services/technicien.service';
import { Technicien } from '../../../../core/models/technicien/technicien';
import { UpdateTechnicien } from '../../../../core/models/technicien/update-technicien';

@Component({
  selector: 'app-technicien-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './technicien-edit.html',
  styleUrl: './technicien-edit.scss'
})
export class TechnicienEditComponent {

  @Input()
  technicien!: Technicien;

  @Output()
  updated = new EventEmitter<void>();

  model: UpdateTechnicien = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    matricule: ''
  };

  loading = false;

  constructor(
    private service: TechnicienService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {

    this.model = {

      nom: this.technicien.nom,
      prenom: this.technicien.prenom,
      email: this.technicien.email,
      telephone: this.technicien.telephone,
      matricule: this.technicien.matricule

    };

  }

  update(): void {

    this.loading = true;

    this.service.update(
      this.technicien.id,
      this.model
    ).subscribe({

      next: () => {

        this.loading = false;

        this.updated.emit();

      },

      error: err => {

        console.error(err);

        this.loading = false;

        alert("Erreur lors de la modification");

      }

    });

  }

  close() {

    this.activeModal.dismiss();

  }

}