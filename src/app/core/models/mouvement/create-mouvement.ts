import { TypeMouvement } from '../enums/type-mouvement';

export interface CreateMouvement {

  typeMouvement: TypeMouvement;

  equipementId: number;

  quantite: number;

  observation?: string;

  interventionId?: number;

}