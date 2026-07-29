import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ClientService } from '../../services/client.service';
import { Client } from '../../../../core/models/client/Client';
import { CreateClient } from '../../../../core/models/client/CreateClient';


@Component({
  selector: 'app-client-edit',
  standalone: true,

  imports:[
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl:'./client-edit.html',
  styleUrl:'./client-edit.scss'
})
export class ClientEditComponent implements OnInit {



  @Input()
  client!: Client;



  @Output()
  updated = new EventEmitter<void>();




  clientForm = this.fb.group({


    matricule:[
      '',
      Validators.required
    ],


    raisonSociale:[
      '',
      Validators.required
    ],


    adresse:[
      ''
    ],


    nom:[
      '',
      Validators.required
    ],


    email:[
      '',
      Validators.email
    ],


    telephone:[
      ''
    ]


  });





  constructor(
    private fb:FormBuilder,
    private clientService:ClientService
  ){}





  ngOnInit(): void {


    if(this.client){


      this.clientForm.patchValue({


        matricule:this.client.matricule,

        raisonSociale:this.client.raisonSociale,

        adresse:this.client.adresse,

        nom:this.client.nom,

        email:this.client.email,

        telephone:this.client.telephone


      });


    }


  }







  save():void {



    if(this.clientForm.invalid){


      console.log("❌ Formulaire invalide");


      this.clientForm.markAllAsTouched();


      return;

    }






    const client:CreateClient = {


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
      "📤 JSON modification :",
      client
    );





    this.clientService.update(
      this.client.id,
      client
    )
    .subscribe({



      next:(response)=>{


        console.log(
          "✅ Client modifié",
          response
        );



        this.updated.emit();



      },



      error:(err)=>{


        console.error(
          "❌ Erreur modification client",
          err.error
        );


      }



    });



  }






  close(){


    this.updated.emit();


  }




}