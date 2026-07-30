import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { MoulinetteService } from '../../services/moulinette.service';
import { Moulinette } from 'src/app/core/models/moulinette/moulinette';



@Component({

selector:'app-moulinette-detail',

standalone:true,

imports:[
CommonModule,
RouterModule
],

templateUrl:'./moulinette-detail.html',

styleUrl:'./moulinette-detail.scss'

})
export class MoulinetteDetailComponent implements OnInit {



moulinette = signal<Moulinette | null>(null);


loading = signal<boolean>(true);





constructor(

private route:ActivatedRoute,

private service:MoulinetteService

){}





ngOnInit():void{


this.route.paramMap.subscribe(params=>{


const id =
Number(params.get('id'));



console.log(
"ID reçu :",
id
);



if(id){

this.load(id);

}



});


}





load(id:number):void{


console.log(
"📡 Chargement détail",
id
);



this.loading.set(true);



this.service.getById(id)
.subscribe({



next:(data:Moulinette)=>{


console.log(
"✅ Détail API :",
data
);



this.moulinette.set(data);



this.loading.set(false);



},



error:(err)=>{


console.error(
"Erreur détail",
err
);



this.loading.set(false);



}


});


}





exportExcel(id:number):void{


this.service.exportExcel(id)
.subscribe({


next:(file)=>{


const blob =
new Blob(
[file],
{
type:
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
}
);



const url =
window.URL.createObjectURL(blob);



const a =
document.createElement('a');


a.href=url;


a.download =
`Moulinette_${id}.xlsx`;



a.click();



window.URL.revokeObjectURL(url);



},


error:(err)=>{

console.error(err);

}


});



}



}