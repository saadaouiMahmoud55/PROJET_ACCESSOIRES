import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models';

/**
 * Service pour gérer les catégories d'accessoires.
 * Communique avec l'API REST backend.
 */
@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = 'http://localhost:8081/api/categories';

  constructor(private http: HttpClient) { }

  /**
   * Récupère toutes les catégories.
   * @returns Observable contenant la liste des catégories
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  /**
   * Récupère une catégorie par son ID.
   * @param id Identifiant de la catégorie
   * @returns Observable contenant la catégorie
   */
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crée une nouvelle catégorie.
   * @param category Les données de la nouvelle catégorie
   * @returns Observable contenant la catégorie créée
   */
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  /**
   * Met à jour une catégorie existante.
   * @param id Identifiant de la catégorie à modifier
   * @param category Les nouvelles données
   * @returns Observable contenant la catégorie mise à jour
   */
  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category);
  }

  /**
   * Supprime une catégorie.
   * @param id Identifiant de la catégorie à supprimer
   * @returns Observable vide
   */
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}