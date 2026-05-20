package com.example.accessories.service;

import com.example.accessories.entity.Category;
import com.example.accessories.repository.CategoryRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

/**
 * Service pour gérer les catégories d'accessoires. Utilise le cache Redis pour
 * améliorer les performances de lecture.
 */
@Service
public class CategoryService {

    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    /**
     * Récupère toutes les catégories (depuis le cache si disponible).
     */
    @Cacheable("categories")
    public List<Category> findAll() {
        return repository.findAll();
    }

    /**
     * Récupère une catégorie par son ID.
     *
     * @throws NoSuchElementException si la catégorie n'existe pas
     */
    @Cacheable(value = "category", key = "#id")
    public Category findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Catégorie non trouvée avec l'ID: " + id));
    }

    /**
     * Crée une nouvelle catégorie et invalide le cache.
     */
    @CacheEvict(value = {"categories", "category"}, allEntries = true)
    public Category save(Category category) {
        return repository.save(category);
    }

    /**
     * Met à jour une catégorie existante.
     */
    @CacheEvict(value = {"categories", "category"}, allEntries = true)
    public Category update(Long id, Category category) {
        Category existing = findById(id);
        existing.setName(category.getName());
        return repository.save(existing);
    }

    /**
     * Supprime une catégorie.
     */
    @CacheEvict(value = {"categories", "category"}, allEntries = true)
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
