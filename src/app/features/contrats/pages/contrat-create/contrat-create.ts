import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
FormBuilder,
FormGroup,
ReactiveFormsModule,
Validators
} from '@angular/forms';

import { Router } from '@angular/router';


import { ContratService }
from '../../services/contrat.service';


import { ClientService }
from '../../../client/services/client.service';
import { Client } from 'src/app/core/models/client/Client';






@Component({

selector:'app-contrat-create',

standalone:true,

imports:[
 CommonModule,
 ReactiveFormsModule
],

templateUrl:'./contrat-create.html',

styleUrl:'./contrat-create.scss'

})


export class ContratCreateComponent implements OnInit{


form!:FormGroup;


clients:Client[]=[];


loading=false;



constructor(

private fb:FormBuilder,

private contratService:ContratService,

private clientService:ClientService,

private router:Router

){}





ngOnInit():void{


this.initForm();


this.loadClients();


}




initForm(){


this.form=this.fb.group({


reference:[
 '',
 Validators.required
],



dateDebut:[
 '',
 Validators.required
],



dateFin:[
 '',
 Validators.required
],



clientId:[
 null,
 Validators.required
]



});


}







loadClients(){


this.clientService.getAll()
.subscribe({

next:(data)=>{


this.clients=data;


},


error:(err)=>{

console.error(
"Erreur chargement clients",
err
);


}


});


}






save(){


if(this.form.invalid){

this.form.markAllAsTouched();

return;

}



this.loading=true;



this.contratService
.create(this.form.value)
.subscribe({

next:(data)=>{


console.log(
"Contrat créé",
data
);


this.router.navigate([
'/contrats'
]);


},


error:(err)=>{


console.error(
"Erreur création contrat",
err
);


this.loading=false;


}


});



}






cancel(){


this.router.navigate([
'/contrats'
]);


}



}