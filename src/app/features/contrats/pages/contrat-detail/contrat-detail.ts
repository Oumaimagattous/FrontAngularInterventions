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
  ActivatedRoute,
  Router
} from '@angular/router';


import {
  ContratService
} from '../../services/contrat.service';



@Component({

selector:'app-contrat-detail',

standalone:true,

imports:[

 CommonModule

],

templateUrl:'./contrat-detail.html',

styleUrl:'./contrat-detail.scss'

})


export class ContratDetailComponent implements OnInit {



contrat:any = null;


loading:boolean = true;



constructor(

private route:ActivatedRoute,
private router: Router,

private service:ContratService,



private cdr:ChangeDetectorRef

){}







ngOnInit():void{


const id = Number(

this.route.snapshot.paramMap.get('id')

);



console.log(
"ID contrat :",
id
);



if(id){

 this.load(id);

}


}








load(id:number){


this.loading=true;



this.service.getById(id)

.subscribe({



next:(data)=>{


console.log(

"Contrat détails :",

data

);



// affectation

this.contrat = data;



this.loading=false;



// force refresh Angular

this.cdr.detectChanges();



},




error:(err)=>{


console.error(

"Erreur chargement contrat",

err

);


this.loading=false;


this.cdr.detectChanges();



}



});



}








goBack(){

  this.router.navigate([
    '/contrats'
  ]);

}

addPrestations(){

 if(!this.contrat)
   return;


 this.router.navigate([
   '/contrats/add-prestations',
   this.contrat.id
 ]);

}



validateContrat(){

 if(!this.contrat)
   return;


 this.router.navigate([
   '/contrats/validation',
   this.contrat.id
 ]);

}

deletePrestation(prestationId: number): void {

  if (!this.contrat) {
    return;
  }

  if (this.contrat.estValide) {
    alert("Impossible de supprimer une prestation d'un contrat validé.");
    return;
  }

  if (!confirm("Supprimer cette prestation du contrat ?")) {
    return;
  }

  this.service
    .deletePrestation(this.contrat.id, prestationId)
    .subscribe({

      next: (message) => {

        console.log(message);

        alert("Prestation supprimée avec succès.");

        this.load(this.contrat.id);

      },

      error: (err) => {

        console.error(err);

        alert(err.error);

      }

    });

}


}