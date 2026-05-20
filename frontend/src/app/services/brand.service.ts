import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../models';

/**
 * Service pour gérer les marques d'accessoires.
 * Communique avec l'API REST backend.
 */
@Injectable({ providedIn: 'root' })
export class BrandService {
  private apiUrl = 'http://localhost:8081/api/brands';

  constructor(private http: HttpClient) { }

  /**
   * Récupère toutes les marques.
   * @returns Observable contenant la liste des marques
   */
  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }

  /**
   * Récupère une marque par son ID.
   * @param id Identifiant de la marque
   * @returns Observable contenant la marque
   */
  getBrand(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crée une nouvelle marque.
   * @param brand Les données de la nouvelle marque
   * @returns Observable contenant la marque créée
   */
  createBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.apiUrl, brand);
  }

  /**
   * Met à jour une marque existante.
   * @param id Identifiant de la marque à modifier
   * @param brand Les nouvelles données
   * @returns Observable contenant la marque mise à jour
   */
  updateBrand(id: number, brand: Brand): Observable<Brand> {
    return this.http.put<Brand>(`${this.apiUrl}/${id}`, brand);
  }

  /**
   * Supprime une marque.
   * @param id Identifiant de la marque à supprimer
   * @returns Observable vide
   */
  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}