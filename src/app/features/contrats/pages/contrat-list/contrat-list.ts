import {
Component,
OnInit,
ChangeDetectorRef
} from '@angular/core';


import { CommonModule } from '@angular/common';

import { RouterModule, Router } from '@angular/router';


import { ContratService }
from '../../services/contrat.service';
import { Contrat } from 'src/app/core/models/contrat/contrat';
import { NgbModal }
from '@ng-bootstrap/ng-bootstrap';


import { ContratEditComponent }
from '../contrat-edit/contrat-edit';






@Component({

selector:'app-contrat-list',

standalone:true,

imports:[
 CommonModule,
 RouterModule
],

templateUrl:'./contrat-list.html',

styleUrl:'./contrat-list.scss'

})


export class ContratListComponent implements OnInit{


contrats:Contrat[]=[];



constructor(
private service:ContratService,
private cdr:ChangeDetectorRef,
private router:Router,
private modalService:NgbModal
){}



ngOnInit():void{

this.load();

}





load(){


this.service.getAll()
.subscribe({

next:(data)=>{


console.log(
"Liste contrats",
data
);


this.contrats=[
 ...data
];


this.cdr.detectChanges();


},


error:(err)=>{

console.error(err);

}


});


}





openDetails(
contrat:Contrat
){

this.router.navigate([
'/contrats',
contrat.id
]);


}




openCreate(){

this.router.navigate([
'/contrats/create'
]);

}

openEdit(contrat:Contrat){


const modal =
this.modalService.open(

ContratEditComponent,

{
 size:'lg',
 centered:true
}

);



modal.componentInstance.contrat = contrat;



modal.componentInstance.updated.subscribe(()=>{


modal.close();


this.load();


});



}


delete(id:number){


if(confirm(
'Supprimer ce contrat ?'
)){


this.service.delete(id)
.subscribe({

next:()=>{

this.load();

}

});


}


}




}