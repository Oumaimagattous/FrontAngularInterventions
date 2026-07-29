import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Technicien } from '../../../../core/models/technicien/technicien';
import { TechnicienService } from '../../services/technicien.service';

import { TechnicienCreateComponent } from '../technicien-create/technicien-create';
import { TechnicienEditComponent } from '../technicien-edit/technicien-edit';

@Component({
  selector: 'app-technicien-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './technicien-list.html',
  styleUrl: './technicien-list.scss'
})
export class TechnicienListComponent implements OnInit {

  techniciens: Technicien[] = [];

  constructor(
    private service: TechnicienService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.load();

  }

  load(): void {

    this.service.getAll()
      .subscribe({

        next: (data) => {

          this.techniciens = [...data];

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  openCreate() {

    const modal = this.modalService.open(
      TechnicienCreateComponent,
      {
        size: 'lg',
        centered: true
      });

    modal.componentInstance.saved.subscribe(() => {

      modal.close();

      this.load();

    });

  }

  openEdit(technicien: Technicien) {

    const modal = this.modalService.open(
      TechnicienEditComponent,
      {
        size: 'lg',
        centered: true
      });

    modal.componentInstance.technicien = technicien;

    modal.componentInstance.updated.subscribe(() => {

      modal.close();

      this.load();

    });

  }

  openDetails(technicien: Technicien) {

    this.router.navigate([
      '/techniciens/details',
      technicien.id
    ]);

  }

  delete(id: number): void {

    if (confirm('Supprimer ce technicien ?')) {

      this.service.delete(id)
        .subscribe({

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