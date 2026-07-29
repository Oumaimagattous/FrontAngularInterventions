import { Site } from '../site/Site';

export interface Client {

  id: number;
  nom: string;

  matricule: string;

  raisonSociale: string;

  adresse?: string;

  email?: string;

  telephone?: string;

  sites: Site[];

}