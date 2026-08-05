import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FormField, form, required } from '@angular/forms/signals';

import { InterventionService } from '../../services/intervention.service';
import { SiteService } from '../../../sites/services/site.service';
import { TechnicienService } from '../../../techniciens/services/technicien.service';
import { PrestationService } from '../../../prestations/services/prestation.service';

import { Prestation } from 'src/app/core/models/prestation/prestation';
import { CreateIntervention } from 'src/app/core/models/intervention/create-intervention';
import { Site } from 'src/app/core/models/site/Site';
import { Technicien } from 'src/app/core/models/technicien/technicien';

import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-intervention-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FormField
  ],
  templateUrl: './intervention-edit.html',
  styleUrls: ['./intervention-edit.scss']
})
export class InterventionEditComponent {


  private interventionService = inject(InterventionService);
  private siteService = inject(SiteService);
  private technicienService = inject(TechnicienService);
  private prestationService = inject(PrestationService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);



  interventionId!: number;


  submitted = signal(false);
  loading = signal(false);
  error = signal('');



  sites = signal<Site[]>([]);
  techniciens = signal<Technicien[]>([]);
  prestations = signal<Prestation[]>([]);



  interventionModel = signal<CreateIntervention>({

    datePlanifiee: new Date(),

    siteId: 0,

    techniciensIds: [],

    prestationsIds: []

  });




  interventionForm = form(
    this.interventionModel,

    (p)=>{


      required(
        p.datePlanifiee,
        {
          message:'Date obligatoire'
        }
      );


      required(
        p.siteId,
        {
          message:'Site obligatoire'
        }
      );


    }
  );






  ngOnInit(){


    this.interventionId =
      Number(
        this.route.snapshot.paramMap.get('id')
      );



    forkJoin({


      sites:this.siteService.getAll(),

      techniciens:this.technicienService.getAll(),

      prestations:this.prestationService.getAll(),

      intervention:
      this.interventionService.getById(
        this.interventionId
      )


    })
    .subscribe({


      next:(data:any)=>{


        console.log(
          "INTERVENTION EDIT : ",
          data.intervention
        );



        console.log(
          "PRESTATIONS API : ",
          data.prestations
        );



        // listes

        this.sites.set(
          data.sites
        );


        this.techniciens.set(
          data.techniciens
        );


        this.prestations.set(
          data.prestations
        );



        const intervention =
        data.intervention;



        // récupérer anciennes prestations


        const prestationsIds =

        intervention.prestationsIds

        ??

        intervention.prestations?.map(
          (p:any)=>p.id
        )

        ??

        [];




        // récupérer anciens techniciens


        const techniciensIds =

        intervention.techniciensIds

        ??

        intervention.techniciens?.map(
          (t:any)=>t.id
        )

        ??

        [];





        this.interventionModel.update(i=>({


          ...i,


          datePlanifiee:
          new Date(
            intervention.datePlanifiee
          ),



          siteId:
          intervention.siteId,



          techniciensIds:
          techniciensIds,



          prestationsIds:
          prestationsIds



        }));




        console.log(
          "MODEL CHARGE : ",
          this.interventionModel()
        );



      },



      error:(err)=>{


        console.error(err);


        this.error.set(
          "Impossible de charger l'intervention"
        );


      }


    });


  }









  // =========================
  // TECHNICIENS
  // =========================



  ajouterTechnicien(id:number){


    if(!id)
      return;


    if(
      this.interventionModel()
      .techniciensIds
      .includes(id)
    )
      return;



    this.interventionModel.update(i=>({


      ...i,


      techniciensIds:[

        ...i.techniciensIds,

        id

      ]

    }));

  }






  supprimerTechnicien(id:number){


    this.interventionModel.update(i=>({


      ...i,


      techniciensIds:

      i.techniciensIds.filter(
        t=>t!==id
      )


    }));

  }






  getNomTechnicien(id:number){


    const tech =
    this.techniciens()
    .find(
      t=>t.id===id
    );


    return tech
    ?
    `${tech.nom} ${tech.prenom}`
    :
    '';

  }









  // =========================
  // PRESTATIONS
  // =========================



  ajouterPrestation(id:number){


    if(!id)
      return;



    if(
      this.interventionModel()
      .prestationsIds
      .includes(id)
    )
      return;



    this.interventionModel.update(i=>({


      ...i,


      prestationsIds:[

        ...i.prestationsIds,

        id

      ]


    }));


  }







  supprimerPrestation(id:number){


    this.interventionModel.update(i=>({


      ...i,


      prestationsIds:

      i.prestationsIds.filter(
        p=>p!==id
      )


    }));


  }







  getDesignationPrestation(id:number){


    const prestation =
    this.prestations()
    .find(
      p=>p.id===id
    );



    return prestation
    ?
    prestation.designation
    :
    '';

  }









  onSubmit(event:Event){


    event.preventDefault();


    this.submitted.set(true);



    if(
      this.interventionForm().invalid()
    )
      return;



    this.loading.set(true);



    this.interventionService
    .update(
      this.interventionId,
      this.interventionModel()
    )
    .subscribe({


      next:()=>{


        this.loading.set(false);


        this.router.navigate(
          ['/interventions']
        );


      },



      error:(err)=>{


        console.error(err);


        this.loading.set(false);


        this.error.set(
          "Erreur lors de la modification"
        );


      }



    });



  }



}