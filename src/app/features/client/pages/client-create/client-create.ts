import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { ClientService } from '../../services/client.service';
import { CreateClient } from '../../../../core/models/client/CreateClient';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-client-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './client-create.html',
  styleUrl: './client-create.scss'
})
export class ClientCreateComponent {


  @Output()
  saved = new EventEmitter<void>();


  clientForm = this.fb.group({

    matricule: [
      '',
      Validators.required
    ],


    raisonSociale: [
      '',
      Validators.required
    ],


    adresse: [
      ''
    ],


    nom: [
      '',
      Validators.required
    ],


    email: [
      '',
      Validators.email
    ],


    telephone: [
      ''
    ]

  });



  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    public activeModal: NgbActiveModal
  ) {}




  save(): void {


    if(this.clientForm.invalid){


      console.log("❌ Formulaire invalide");


      console.log(
        "Champs invalides :",
        Object.keys(this.clientForm.controls)
        .filter(
          key => this.clientForm.get(key)?.invalid
        )
      );


      return;

    }



    const client: CreateClient = {


      matricule:
      this.clientForm.value.matricule ?? '',


      raisonSociale:
      this.clientForm.value.raisonSociale ?? '',


      adresse:
      this.clientForm.value.adresse ?? '',


      nom:
      this.clientForm.value.nom ?? '',


      email:
      this.clientForm.value.email ?? '',


      telephone:
      this.clientForm.value.telephone ?? ''

    };



    console.log(
      "📤 JSON envoyé :",
      client
    );



    this.clientService.create(client)
    .subscribe({


      next:(response)=>{


        console.log(
          "✅ Client ajouté :",
          response
        );


        this.saved.emit();


        this.clientForm.reset();

        this.activeModal.close();


      },


      error:(err)=>{


        console.error(
          "❌ Erreur ajout client :",
          err.error
        );


      }


    });


  }



  close(){

    this.clientForm.reset();
    this.activeModal.dismiss();

  }


}