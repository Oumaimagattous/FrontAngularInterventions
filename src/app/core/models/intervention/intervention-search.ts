import { BaseSearch } from '../common/base-search';

export interface InterventionSearch extends BaseSearch {

  clientId?: number;

  siteId?: number;

  technicienId?: number;

  statut?: string;

  dateDebut?: Date;

  dateFin?: Date;

  facturee?: boolean;

}