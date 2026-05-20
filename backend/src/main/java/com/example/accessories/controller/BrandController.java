package com.example.accessories.controller;

import com.example.accessories.entity.Brand;
import com.example.accessories.service.BrandService;
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
 * Contrôleur REST pour les marques d'accessoires. Fournit les endpoints CRUD
 * pour gérer les marques.
 */
@RestController
@RequestMapping("/api/brands")
public class BrandController {

    private final BrandService service;

    public BrandController(BrandService service) {
        this.service = service;
    }

    /**
     * Récupère toutes les marques.
     *
     * @return Liste de toutes les marques
     */
    @GetMapping
    public List<Brand> getAll() {
        return service.findAll();
    }

    /**
     * Récupère une marque par son ID.
     *
     * @param id Identifiant de la marque
     * @return La marque trouvée
     * @throws ResponseStatusException 404 si la marque n'existe pas
     */
    @GetMapping("/{id}")
    public Brand getById(@PathVariable Long id) {
        try {
            return service.findById(id);
        } catch (NoSuchElementException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Marque non trouvée", ex);
        }
    }

    /**
     * Crée une nouvelle marque.
     *
     * @param brand Les données de la nouvelle marque
     * @return La marque créée
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Brand create(@RequestBody Brand brand) {
        return service.save(brand);
    }

    /**
     * Met à jour une marque existante.
     *
     * @param id Identifiant de la marque à modifier
     * @param brand Les nouvelles données
     * @return La marque mise à jour
     */
    @PutMapping("/{id}")
    public Brand update(@PathVariable Long id, @RequestBody Brand brand) {
        try {
            return service.update(id, brand);
        } catch (NoSuchElementException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Marque non trouvée", ex);
        }
    }

    /**
     * Supprime une marque.
     *
     * @param id Identifiant de la marque à supprimer
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
