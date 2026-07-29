import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TechnicienService } from '../../services/technicien.service';
import { CreateTechnicien } from '../../../../core/models/technicien/create-technicien';

@Component({
  selector: 'app-technicien-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './technicien-create.html',
  styleUrl: './technicien-create.scss'
})
export class TechnicienCreateComponent {

  @Output()
  saved = new EventEmitter<void>();

  technicien: CreateTechnicien = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    matricule: ''
  };

  loading = false;

  constructor(
    private service: TechnicienService,
    public activeModal: NgbActiveModal
  ) { }

  save(): void {

    if (
      !this.technicien.nom ||
      !this.technicien.prenom ||
      !this.technicien.email ||
      !this.technicien.password ||
      !this.technicien.matricule
    ) {

      alert("Veuillez remplir tous les champs.");
      return;

    }

    this.loading = true;

    this.service.create(this.technicien)
      .subscribe({

        next: () => {

          this.loading = false;

          this.saved.emit();

        },

        error: err => {

          console.error(err);

          this.loading = false;

          alert("Erreur lors de la création.");

        }

      });

  }

  close() {

    this.activeModal.dismiss();

  }

}