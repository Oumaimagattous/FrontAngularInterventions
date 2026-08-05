import { MouvementEquipement } from "../mouvement/mouvement-equipement";

export interface EquipementDetail {

  id: number;

  code: string;

  designation: string;

  quantiteEntree: number;

  quantiteSortie: number;

  quantiteAffectee: number;

  stockActuel: number;

  mouvements: MouvementEquipement[];
}