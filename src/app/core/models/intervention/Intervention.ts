import { EquipementIntervention } from '../equipement/equipement-intervention';
import { PhotoIntervention } from '../photo/PhotoIntervention';

export interface Intervention {

  id: number;

  numero: string;

  datePlanifiee: Date;

  dateRealisation?: Date;

  statut: string;

  commentaire?: string;

  siteId: number;

  techniciensIds: number[];

  techniciens: string[];

  prestationsIds: number[];

  prestations: string[];

  nombrePhotos: number;

  equipements: EquipementIntervention[];

  photos?: PhotoIntervention[];   

  client: string;

  site: string;
}