import { TypeMouvement } from '../enums/type-mouvement';

export interface MouvementEquipement {

  id: number;

  typeMouvement: TypeMouvement;

  dateMouvement: Date;

  quantite: number;

  observation?: string;

  equipementId: number;

  equipement: string;

  interventionId?: number;

}