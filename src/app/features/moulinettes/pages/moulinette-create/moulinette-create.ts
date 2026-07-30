import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MoulinetteService } from '../../services/moulinette.service';
import { CreateMoulinette } from 'src/app/core/models/moulinette/create-moulinette';

import { ClientService } from '../../../client/services/client.service';
import { Client } from 'src/app/core/models/client/Client';


@Component({
  selector: 'app-moulinette-create',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],

  templateUrl: './moulinette-create.html',
  styleUrl: './moulinette-create.scss'
})
export class MoulinetteCreateComponent implements OnInit {


  clients: Client[] = [];

  loading = false;



  moulinette: CreateMoulinette = {

    clientId: 0,

    periodeDebut: '',

    periodeFin: ''

  };





  constructor(

    private service: MoulinetteService,

    private clientService: ClientService,

    private router: Router

  ) {}





  ngOnInit(): void {

    this.loadClients();

  }





  loadClients(): void {


    this.clientService.getAll()
    .subscribe({

      next:(data)=>{

        console.log(
          "Clients :",
          data
        );


        this.clients = data;

      },


      error:(err)=>{

        console.error(
          err
        );

      }


    });


  }







  save():void {


    console.log(
      "DATA FORM :",
      this.moulinette
    );



    if(this.moulinette.clientId === 0){

      alert(
        "Veuillez sélectionner un client"
      );

      return;

    }





    if(
      !this.moulinette.periodeDebut ||
      !this.moulinette.periodeFin
    ){

      alert(
        "Veuillez choisir les dates"
      );

      return;

    }






    this.loading=true;





    const data = {


      clientId:
      Number(this.moulinette.clientId),



      periodeDebut:
      this.formatDate(
        this.moulinette.periodeDebut,
        false
      ),




      periodeFin:
      this.formatDate(
        this.moulinette.periodeFin,
        true
      )


    };





    console.log(
      "JSON envoyé API :",
      data
    );







    this.service.create(data)
    .subscribe({


      next:(result)=>{


        console.log(
          "Moulinette créée :",
          result
        );



        alert(
          "Moulinette générée avec succès"
        );



        this.router.navigate([
          '/moulinettes'
        ]);


      },





      error:(err)=>{


        console.error(
          "Erreur API complète :",
          err
        );



        console.error(
          "Erreur serveur :",
          err.error
        );



        alert(
          err.error?.message ??
          "Erreur création moulinette"
        );



        this.loading=false;


      },





      complete:()=>{

        this.loading=false;

      }



    });



  }








  /**
   * Convertir date Angular vers API
   * début = 00:00:00
   * fin = 23:59:59
   */
  formatDate(
    date:string,
    isEnd:boolean
  ):string {



    const d = new Date(date);



    const year =
    d.getFullYear();



    const month =
    String(
      d.getMonth()+1
    )
    .padStart(2,'0');



    const day =
    String(
      d.getDate()
    )
    .padStart(2,'0');





    if(isEnd){


      return `${year}-${month}-${day}T23:59:59`;

    }



    return `${year}-${month}-${day}T00:00:00`;


  }








  cancel():void{


    this.router.navigate([
      '/moulinettes'
    ]);


  }



}