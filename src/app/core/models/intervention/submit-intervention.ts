import { EquipementUtilise } from '../equipement/equipement-utilise';

export interface SubmitIntervention {

  interventionId: number;

  commentaireTechnicien?: string;

  prestationsIds: number[];

  equipements: EquipementUtilise[];

}