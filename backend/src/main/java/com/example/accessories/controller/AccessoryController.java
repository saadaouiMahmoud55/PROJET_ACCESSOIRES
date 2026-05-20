package com.example.accessories.controller;

import com.example.accessories.entity.Accessory;
import com.example.accessories.service.AccessoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.NoSuchElementException;

/**
 * Contrôleur REST pour les accessoires téléphoniques. Fournit les endpoints
 * CRUD pour les opérations sur les accessoires.
 */
@RestController
@RequestMapping("/api/accessories")
public class AccessoryController {

    private final AccessoryService service;

    public AccessoryController(AccessoryService service) {
        this.service = service;
    }

    /**
     * Récupère tous les accessoires.
     *
     * @return Liste de tous les accessoires
     */
    @GetMapping
    public List<Accessory> getAll() {
        return service.findAll();
    }

    /**
     * Récupère un accessoire par son ID.
     *
     * @param id Identifiant de l'accessoire
     * @return L'accessoire trouvé
     * @throws ResponseStatusException 404 si l'accessoire n'existe pas
     */
    @GetMapping("/{id}")
    public Accessory getById(@PathVariable Long id) {
        try {
            return service.findById(id);
        } catch (NoSuchElementException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Accessoire non trouvé", ex);
        }
    }

    /**
     * Crée un nouvel accessoire.
     *
     * @param accessory Les données du nouvel accessoire
     * @return L'accessoire créé
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Accessory create(@RequestBody Accessory accessory) {
        return service.save(accessory);
    }

    /**
     * Met à jour un accessoire existant.
     *
     * @param id Identifiant de l'accessoire à modifier
     * @param accessory Les nouvelles données
     * @return L'accessoire mis à jour
     */
    @PutMapping("/{id}")
    public Accessory update(@PathVariable Long id, @RequestBody Accessory accessory) {
        try {
            return service.update(id, accessory);
        } catch (NoSuchElementException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Accessoire non trouvé", ex);
        }
    }

    /**
     * Supprime un accessoire.
     *
     * @param id Identifiant de l'accessoire à supprimer
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
