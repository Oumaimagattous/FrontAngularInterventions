import {
Component,
OnInit,
ChangeDetectorRef
} from '@angular/core';


import {
CommonModule
} from '@angular/common';


import {
RouterModule,
Router
} from '@angular/router';


import {
PrestationService
} from '../../services/prestation.service';


import {
Prestation
} from 'src/app/core/models/prestation/prestation';



@Component({

selector:'app-prestation-list',

standalone:true,

imports:[
 CommonModule,
 RouterModule
],

templateUrl:'./prestation-list.html',

styleUrl:'./prestation-list.scss'

})


export class PrestationListComponent implements OnInit {



prestations:Prestation[]=[];



constructor(

private service:PrestationService,

private cdr:ChangeDetectorRef,

private router:Router

){}




ngOnInit():void{


this.load();


}






load():void{


console.log(
"Chargement prestations..."
);



this.service.getAll()

.subscribe({


next:(data)=>{


console.log(
"Liste prestations :",
data
);



this.prestations=[
 ...data
];



this.cdr.detectChanges();



},



error:(err)=>{


console.error(
"Erreur chargement prestations",
err
);


}


});



}






openCreate(){


this.router.navigate([

'/prestations/create'

]);


}





openDetails(
prestation:Prestation
){


this.router.navigate([

'/prestations/details',

prestation.id

]);


}






openEdit(
prestation:Prestation
){


this.router.navigate([

'/prestations/edit',

prestation.id

]);


}







delete(
id:number
){


if(confirm(
'Supprimer cette prestation ?'
)){



this.service.delete(id)

.subscribe({



next:()=>{


console.log(
"Prestation supprimée"
);



this.load();


},



error:(err)=>{


console.error(err);


}


});



}



}




}