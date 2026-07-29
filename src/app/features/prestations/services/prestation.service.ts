import { Injectable } from '@angular/core';

import {
 HttpClient
} from '@angular/common/http';

import {
 Observable
} from 'rxjs';


import {
 environment
} from 'src/environments/environment';


import {
 Prestation
} from 'src/app/core/models/prestation/prestation';


import {
 CreatePrestation
} from 'src/app/core/models/prestation/create-prestation';



@Injectable({
providedIn:'root'
})
export class PrestationService {


private apiUrl =
environment.apiUrl + '/Prestation';



constructor(
private http:HttpClient
){}




getAll():Observable<Prestation[]>{


return this.http.get<Prestation[]>(
 this.apiUrl
);

}




getById(id:number):Observable<Prestation>{


return this.http.get<Prestation>(
 `${this.apiUrl}/${id}`
);

}




create(
dto:CreatePrestation
):Observable<Prestation>{


return this.http.post<Prestation>(
 this.apiUrl,
 dto
);

}




update(
id:number,
dto:CreatePrestation
):Observable<any>{


return this.http.put(
 `${this.apiUrl}/${id}`,
 dto
);

}




delete(
id:number
):Observable<any>{


return this.http.delete(
 `${this.apiUrl}/${id}`
);


}


}