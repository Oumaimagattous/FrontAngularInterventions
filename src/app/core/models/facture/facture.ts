import { FactureDetail } from './facture-detail';

export interface Facture {

  id: number;

  numeroFacture: string;

  dateFacture: Date;

  montantHT: number;

  tva: number;

  montantTTC: number;

  statut: string;

  client: string;

  lignes: FactureDetail[];

}