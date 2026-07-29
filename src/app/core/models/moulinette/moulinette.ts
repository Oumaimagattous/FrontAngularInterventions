import { LigneMoulinette } from './ligne-moulinette';

export interface Moulinette {

  id: number;

  dateGeneration: Date;

  periodeDebut: Date;

  periodeFin: Date;

  clientId: number;

  client: string;

  montantTotal: number;

  nombreInterventions: number;

  lignes: LigneMoulinette[];

}