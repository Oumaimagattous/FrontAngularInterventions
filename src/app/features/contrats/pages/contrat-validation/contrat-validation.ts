import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule,
  Location
} from '@angular/common';

import {
  ActivatedRoute
} from '@angular/router';

import { ContratService }
from '../../services/contrat.service';

@Component({

  selector:'app-contrat-validation',

  standalone:true,

  imports:[
    CommonModule
  ],

  templateUrl:'./contrat-validation.html',

  styleUrl:'./contrat-validation.scss'

})

export class ContratValidationComponent implements OnInit{

  contrat:any = null;

  loading = true;

  validating = false;

  constructor(

    private route:ActivatedRoute,

    private service:ContratService,

    private location:Location,

    private cdr:ChangeDetectorRef

  ){}

  ngOnInit():void{

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    console.log("ID contrat :",id);

    if(id){

      this.load(id);

    }

  }

  load(id:number):void{

    this.loading = true;

    this.service.getById(id)
    .subscribe({

      next:(data)=>{

        console.log("Contrat :",data);

        this.contrat = {...data};

        this.loading = false;

        this.cdr.detectChanges();

      },

      error:(err)=>{

        console.error(err);

        this.loading = false;

        this.cdr.detectChanges();

      }

    });

  }

  validate(): void {

  if (!this.contrat) {
    return;
  }

  this.validating = true;

  this.service
    .validate(this.contrat.id)
    .subscribe({

      next: (message: string) => {

        console.log(message);

        alert(message);

        this.location.back();

      },

      error: (err) => {

        console.error(err);

        this.validating = false;

        if (err.error) {

          alert(err.error);

        } else {

          alert("Erreur lors de la validation du contrat.");

        }

      }

    });

}

  goBack():void{

    this.location.back();

  }

}