import { Intervention } from '../intervention/Intervention';




export interface PhotoSite{
  id:number;
  nomFichier:string;
  chemin:string;
  dateCapture:string;
}
export interface Site {

  id: number;

  code: string;

  adresse: string;

  clientId: number;

  clientNom: string;

  interventions: Intervention[];

  photos:PhotoSite[];

}