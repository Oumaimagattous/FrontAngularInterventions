import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Moulinette } from 'src/app/core/models/moulinette/moulinette';
import { MoulinetteService } from '../../services/moulinette.service';


@Component({
  selector: 'app-moulinette-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './moulinette-list.html',
  styleUrl: './moulinette-list.scss'
})
export class MoulinetteListComponent implements OnInit {


  moulinettes = signal<Moulinette[]>([]);

  loading = signal<boolean>(false);



  constructor(
    private service: MoulinetteService
  ) {}



  ngOnInit(): void {

    console.log("🚀 Liste moulinette chargée");

    this.load();

  }



  load():void{


    console.log("📡 Appel API GetAll Moulinette");


    this.loading.set(true);



    this.service.getAll()
    .subscribe({


      next:(data:Moulinette[])=>{


        console.log(
          "✅ Moulinettes reçues :",
          data
        );


        this.moulinettes.set(data);


        this.loading.set(false);



      },


      error:(err)=>{


        console.error(
          "❌ Erreur API Moulinette",
          err
        );


        this.loading.set(false);


      }


    });


  }





  delete(id:number):void{


    if(!confirm("Supprimer cette moulinette ?"))
      return;



    this.service.delete(id)
    .subscribe({


      next:()=>{


        console.log(
          "✅ Suppression OK"
        );


        this.load();


      },


      error:(err)=>{


        console.error(err);


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