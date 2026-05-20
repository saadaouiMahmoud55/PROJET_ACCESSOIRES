package com.example.accessories.controller;

import com.example.accessories.entity.Category;
import com.example.accessories.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;

/**
 * Contrôleur REST pour les catégories d'accessoires. Fournit les endpoints CRUD
 * pour gérer les catégories.
 */
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    /**
     * Récupère toutes les catégories.
     *
     * @return Liste de toutes les catégories
     */
    @GetMapping
    public List<Category> getAll() {
        return service.findAll();
    }

    /**
     * Récupère une catégorie par son ID.
     *
     * @param id Identifiant de la catégorie
     * @return La catégorie trouvée
     * @throws ResponseStatusException 404 si la catégorie n'existe pas
     */
    @GetMapping("/{id}")
    public Category getById(@PathVariable Long id) {
        try {
            return service.findById(id);
        } catch (NoSuchElementException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Catégorie non trouvée", ex);
        }
    }

    /**
     * Crée une nouvelle catégorie.
     *
     * @param category Les données de la nouvelle catégorie
     * @return La catégorie créée
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Category create(@RequestBody Category category) {
        return service.save(category);
    }

    /**
     * Met à jour une catégorie existante.
     *
     * @param id Identifiant de la catégorie à modifier
     * @param category Les nouvelles données
     * @return La catégorie mise à jour
     */
    @PutMapping("/{id}")
    public Category update(@PathVariable Long id, @RequestBody Category category) {
        try {
            return service.update(id, category);
        } catch (NoSuchElementException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Catégorie non trouvée", ex);
        }
    }

    /**
     * Supprime une catégorie.
     *
     * @param id Identifiant de la catégorie à supprimer
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            service.delete(id);
            return ResponseEntity.ok().build();
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erreur lors de la suppression", ex);
        }
    }
}
