/**
 * Interfaces TypeScript pour la gestion des accessoires téléphoniques.
 * Définit les modèles de données utilisés dans l'application Angular.
 */

/**
 * Interface représentant une marque d'accessoires.
 */
export interface Brand {
  id?: number;
  name: string;
  accessories?: Accessory[];
}

/**
 * Interface représentant une catégorie d'accessoires.
 */
export interface Category {
  id?: number;
  name: string;
  accessories?: Accessory[];
}

/**
 * Interface représentant un accessoire téléphonique.
 * Contient tous les détails d'un produit.
 */
export interface Accessory {
  id?: number;
  name: string;
  price: number;
  stock: number;
  type: string;
  storage?: string;
  color?: string;
  brand?: Brand | null;
  category?: Category | null;
  image?: string;
  images?: string[];
}

/**
 * Interface pour la réponse API lors de la récupération de plusieurs éléments.
 */
export interface ApiResponse<T> {
  data: T[];
  message?: string;
}

/**
 * Interface pour les erreurs API.
 */
export interface ApiError {
  status: number;
  message: string;
  timestamp?: string;
}
