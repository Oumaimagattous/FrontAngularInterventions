export interface Historique {

  id: number;

  dateAction: Date;

  action: string;

  entite: string;

  entiteId: number;

  ancienneValeur?: string;

  nouvelleValeur?: string;

  utilisateurId: number;

  utilisateur: string;

}