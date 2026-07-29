import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contrat } from 'src/app/core/models/contrat/contrat';
import { CreateContrat } from 'src/app/core/models/contrat/create-contrat';
import { UpdateContrat } from 'src/app/core/models/contrat/update-contrat';
import { AjouterPrestationsContrat } from 'src/app/core/models/contrat/ajouter-prestations-contrat';




@Injectable({
  providedIn:'root'
})
export class ContratService {


private apiUrl = `${environment.apiUrl}/Contrat`;


constructor(
 private http:HttpClient
){}



// GET ALL

getAll():Observable<Contrat[]>{

 return this.http.get<Contrat[]>(
   this.apiUrl
 );

}




// GET BY ID

getById(id:number):Observable<Contrat>{

 return this.http.get<Contrat>(
   `${this.apiUrl}/${id}`
 );

}





// CREATE

create(
 dto:CreateContrat
):Observable<Contrat>{

 return this.http.post<Contrat>(
   this.apiUrl,
   dto
 );

}




// UPDATE

update(
 id:number,
 dto:UpdateContrat
):Observable<any>{

 return this.http.put(
   `${this.apiUrl}/${id}`,
   dto
 );

}





// DELETE

delete(
 id:number
):Observable<any>{

 return this.http.delete(
   `${this.apiUrl}/${id}`
 );

}





// AJOUTER PRESTATIONS

addPrestations(
  contratId:number,
  data:any
){

  return this.http.post<string>(
    `${this.apiUrl}/${contratId}/prestations`,
    data,
    {
      responseType:'text' as 'json'
    }
  );

}





// VALIDATION

validate(id:number){

  return this.http.post<string>(
    `${this.apiUrl}/${id}/valider`,
    {},
    {
      responseType:'text' as 'json'
    }
  );

}




// SUPPRIMER PRESTATION

deletePrestation(
  contratId: number,
  prestationId: number
) {
  return this.http.delete(
    `${this.apiUrl}/${contratId}/prestations/${prestationId}`,
    {
      responseType: 'text'
    }
  );
}



}