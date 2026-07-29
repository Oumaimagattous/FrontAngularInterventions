import { ShoppingList } from '../shopping-list/shopping-list';

export interface Contrat {

  id: number;

  reference: string;

  dateDebut: Date;

  dateFin: Date;

  clientId: number;

  client: string;

   // Validation contrat

  estValide: boolean;


  dateValidation?: Date;

  shoppingLists: ShoppingList[];

}