import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';


import {
  CommonModule
} from '@angular/common';


import {
  ActivatedRoute,
  Router
} from '@angular/router';


import {
  ContratService
} from '../../services/contrat.service';


import {
  PrestationService
} from '../../../prestations/services/prestation.service';



@Component({

  selector:'app-contrat-add-prestations',

  standalone:true,

  imports:[
    CommonModule
  ],

  templateUrl:'./contrat-add-prestations.html',

  styleUrl:'./contrat-add-prestations.scss'

})


export class ContratAddPrestationsComponent 
implements OnInit {



  contratId!:number;


  prestations:any[]=[];


  selected:number[]=[];


  loading=true;



  constructor(

    private route:ActivatedRoute,

    private router:Router,

    private contratService:ContratService,

    private prestationService:PrestationService,

    private cdr:ChangeDetectorRef

  ){}



  ngOnInit():void{


    this.contratId =
    Number(
      this.route.snapshot.paramMap.get('id')
    );


    console.log(
      "Contrat ID :",
      this.contratId
    );


    this.loadPrestations();


  }






  loadPrestations(){


    this.prestationService.getAll()

    .subscribe({


      next:(data)=>{


        console.log(
          "Prestations disponibles :",
          data
        );


        this.prestations=data;


        this.loading=false;


        this.cdr.detectChanges();


      },



      error:(err)=>{


        console.error(err);


        this.loading=false;


        this.cdr.detectChanges();


      }


    });


  }








  toggleSelection(id:number){


    if(this.selected.includes(id)){


      this.selected =
      this.selected.filter(
        x=>x!==id
      );


    }

    else{


      this.selected.push(id);


    }


    console.log(
      "Sélection :",
      this.selected
    );


  }







  save(){


    if(this.selected.length===0){


      alert(
        "Sélectionner au moins une prestation"
      );


      return;


    }




    const body={


      prestations:

      this.selected.map(id=>({


        prestationId:id


      }))


    };



    console.log(
      "Body envoyé :",
      body
    );




    this.contratService
    .addPrestations(
      this.contratId,
      body
    )

    .subscribe({



      next:(message:string)=>{



        console.log(
          "Réponse API :",
          message
        );



        alert(message);



        this.router.navigate([

          '/contrats',

          this.contratId

        ]);



      },



      error:(err)=>{


        console.error(
          "Erreur ajout prestation :",
          err
        );


        alert(
          err.error ||
          "Erreur lors de l'ajout des prestations."
        );


      }


    });



  }







  cancel(){


    this.router.navigate([

      '/contrats',

      this.contratId

    ]);


  }



}