import { Intervention } from '../intervention/intervention';

export interface Site {

  id: number;

  codeSite: string;

  adresse?: string;

  clientId: number;

  clientNom: string;

  interventions: Intervention[];

}