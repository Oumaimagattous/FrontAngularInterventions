export interface FicheLigne {

  designation: string;

  quantite: number;

  observation: string;

}

export interface FicheIntervention {

  numero: string;

  date: Date;

  client: string;

  site: string;

  techniciens: string[];

  lignes: FicheLigne[];

}