import { EquipementIntervention } from '../equipement/equipement-intervention';

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

  prestations: string[];

  nombrePhotos: number;

  equipements: EquipementIntervention[];
}