import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { TechnicienService } from '../../services/technicien.service';


@Component({
  selector: 'app-technicien-detail',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './technicien-detail.html',
  styleUrl: './technicien-detail.scss'
})
export class TechnicienDetailComponent implements OnInit {


  technicien: any;

  interventions: any[] = [];

  loading = true;


  constructor(
    private route: ActivatedRoute,
    private service: TechnicienService,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}



  ngOnInit(): void {


    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );


    console.log("ID technicien :", id);


    if(id){

      this.load(id);

    }


  }





  load(id:number):void{


    this.loading = true;



    // Chargement informations technicien

    this.service.getById(id)
    .subscribe({

      next:(data)=>{


        console.log(
          "✅ Technicien détail :",
          data
        );


        this.technicien = data;


        this.checkLoading();


      },


      error:(err)=>{


        console.error(
          "Erreur technicien :",
          err
        );


        this.checkLoading();


      }


    });





    // Chargement interventions

    this.service.getInterventions(id)
    .subscribe({

      next:(data)=>{


        console.log(
          "✅ Interventions :",
          data
        );


        this.interventions = data;


        this.checkLoading();


      },


      error:(err)=>{


        console.error(
          "Erreur interventions :",
          err
        );


        this.checkLoading();


      }


    });



  }





  private requestsDone = 0;


  checkLoading(){


    this.requestsDone++;


    if(this.requestsDone === 2){


      this.loading = false;


      // Force Angular refresh

      this.cdr.detectChanges();


      console.log(
        "✅ Affichage détails terminé"
      );


    }


  }





  goBack(){


    this.location.back();


  }



}