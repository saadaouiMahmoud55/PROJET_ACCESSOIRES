import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accessory } from '../models';

/**
 * Service pour gérer les accessoires téléphoniques.
 * Communique avec l'API REST backend via HTTP.
 */
@Injectable({ providedIn: 'root' })
export class AccessoryService {
  private apiUrl = 'http://localhost:8081/api/accessories';

  constructor(private http: HttpClient) { }

  /**
   * Récupère tous les accessoires.
   * @returns Observable contenant la liste des accessoires
   */
  getAccessories(): Observable<Accessory[]> {
    return this.http.get<Accessory[]>(this.apiUrl);
  }

  /**
   * Récupère un accessoire par son ID.
   * @param id Identifiant de l'accessoire
   * @returns Observable contenant l'accessoire
   */
  getAccessory(id: number): Observable<Accessory> {
    return this.http.get<Accessory>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crée un nouvel accessoire.
   * @param accessory Les données du nouvel accessoire
   * @returns Observable contenant l'accessoire créé
   */
  createAccessory(accessory: Accessory): Observable<Accessory> {
    return this.http.post<Accessory>(this.apiUrl, accessory);
  }

  /**
   * Met à jour un accessoire existant.
   * @param id Identifiant de l'accessoire à modifier
   * @param accessory Les nouvelles données
   * @returns Observable contenant l'accessoire mis à jour
   */
  updateAccessory(id: number, accessory: Accessory): Observable<Accessory> {
    return this.http.put<Accessory>(`${this.apiUrl}/${id}`, accessory);
  }

  /**
   * Supprime un accessoire.
   * @param id Identifiant de l'accessoire à supprimer
   * @returns Observable vide
   */
  deleteAccessory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
