import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';


import { CommonModule } from '@angular/common';


import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';


import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


import { ContratService }
from '../../services/contrat.service';



@Component({

selector:'app-contrat-edit',

standalone:true,

imports:[

 CommonModule,

 ReactiveFormsModule

],

templateUrl:'./contrat-edit.html',

styleUrl:'./contrat-edit.scss'

})


export class ContratEditComponent implements OnInit {



@Input() contrat:any;



@Output() updated =
new EventEmitter<void>();



form!:FormGroup;


loading=true;



constructor(

private fb:FormBuilder,

private service:ContratService,

public activeModal:NgbActiveModal

){}







ngOnInit():void{


this.initForm();


if(this.contrat){

 this.loadData();

}


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

]


});


}









loadData(){


console.log(
"Contrat reçu :",
this.contrat
);



this.form.patchValue({


reference:this.contrat.reference,


dateDebut:this.formatDate(
this.contrat.dateDebut
),


dateFin:this.formatDate(
this.contrat.dateFin
)



});



this.loading=false;


}










formatDate(date:any):string{


if(!date)
return '';



return new Date(date)
.toISOString()
.substring(0,10);


}









update(){


if(this.form.invalid){


this.form.markAllAsTouched();

return;


}



console.log(
"Données update :",
this.form.value
);




this.service.update(

this.contrat.id,

this.form.value

)

.subscribe({



next:()=>{


console.log(
"Contrat modifié"
);



this.updated.emit();



this.activeModal.close();



},




error:(err)=>{


console.error(
"Erreur modification",
err
);


}



});



}









cancel(){


this.activeModal.close();


}



}