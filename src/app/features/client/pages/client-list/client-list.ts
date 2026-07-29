import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClientService } from '../../services/client.service';
import { Client } from '../../../../core/models/client/Client';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientCreateComponent } from '../client-create/client-create';
import { ClientEditComponent } from '../client-edit/client-edit';
import { Router } from '@angular/router';
@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './client-list.html',
  styleUrl: './client-list.scss'
})
export class ClientListComponent implements OnInit {


  clients: Client[] = [];


  constructor(
    private service: ClientService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
     private router: Router
  ) {

    console.log("✅ ClientListComponent créé");

  }



  ngOnInit(): void {

    console.log("🚀 ngOnInit exécuté");

    this.load();

  }



  load(): void {


    console.log("📡 Appel API getAll()...");


    this.service.getAll()
      .subscribe({

        next: (data: Client[]) => {


          console.log(
            "✅ Réponse API Clients :",
            data
          );


          console.log(
            "📌 Nombre clients :",
            data.length
          );


          // Mise à jour de la liste
          this.clients = [...data];


          // Force Angular à actualiser le HTML
          this.cdr.detectChanges();


          console.log(
            "📋 Clients affichés :",
            this.clients
          );


        },


        error: (err: any) => {


          console.error(
            "❌ Erreur chargement clients :",
            err
          );


        }


      });

  }

openCreate(){

 const modal = this.modalService.open(ClientCreateComponent,{
    size:'lg',
    centered:true
 });

 modal.componentInstance.saved.subscribe(()=>{

    modal.close();

    this.load();

 });

}

openDetails(client:Client){


 console.log(
  "Ouverture détails client :",
  client.id
 );


 this.router.navigate(
 [
  '/clients/details',
  client.id
 ]
 );


}

openEdit(client:Client){


 const modal = this.modalService.open(
   ClientEditComponent,
   {
     size:'lg',
     centered:true
   }
 );


 modal.componentInstance.client = client;



 modal.componentInstance.updated.subscribe(()=>{


   modal.close();


   this.load();


 });


}
  delete(id: number): void {


    if (confirm('Supprimer ce client ?')) {


      this.service.delete(id)
        .subscribe({

          next: () => {


            console.log(
              "✅ Client supprimé"
            );


            // Recharge automatiquement le tableau
            this.load();


          },


          error: (err: any) => {


            console.error(
              "❌ Erreur suppression :",
              err
            );


          }

        });


    }

  }


}