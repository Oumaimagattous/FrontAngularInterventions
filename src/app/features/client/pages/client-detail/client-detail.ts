import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ClientService } from '../../services/client.service';


@Component({

 selector:'app-client-detail',

 standalone:true,

 imports:[
   CommonModule
 ],

 templateUrl:'./client-detail.html',

 styleUrl:'./client-detail.scss'

})


export class ClientDetailComponent implements OnInit {


client:any = null;

loading:boolean = true;



constructor(

 private route:ActivatedRoute,

 private service:ClientService,

 private location:Location,

 private cdr:ChangeDetectorRef

){}





ngOnInit():void{


this.route.paramMap.subscribe(params=>{


 const id = Number(params.get('id'));


 console.log(
  "ID client :",
  id
 );



 if(id){


   this.loadClient(id);


 }



});



}




loadClient(id:number){



 this.loading=true;



 this.service.getById(id)
 .subscribe({



 next:(data)=>{


   console.log(
    "Client details",
    data
   );


   this.client = data;


   this.loading=false;



   // Force affichage automatique
   this.cdr.detectChanges();



 },



 error:(err)=>{


   console.error(
    "Erreur chargement client",
    err
   );


   this.loading=false;


   this.cdr.detectChanges();


 }



 });



}





goBack(){

 this.location.back();

}



}