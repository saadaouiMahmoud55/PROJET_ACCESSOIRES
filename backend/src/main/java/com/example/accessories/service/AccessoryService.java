package com.example.accessories.service;

import com.example.accessories.entity.Accessory;
import com.example.accessories.repository.AccessoryRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

/**
 * Service pour gérer les accessoires. Utilise le cache Redis pour optimiser les
 * lectures. Le cache est invalidé lors de chaque modification (save, update,
 * delete).
 */
@Service
public class AccessoryService {

    private final AccessoryRepository repository;

    public AccessoryService(AccessoryRepository repository) {
        this.repository = repository;
    }

    /**
     * Récupère tous les accessoires. Résultat mis en cache pour éviter les
     * requêtes répétées à la base de données.
     */
    @Cacheable(value = "accessories")
    public List<Accessory> findAll() {
        return repository.findAll();
    }

    /**
     * Récupère un accessoire par son ID. Le cache garde une copie pour
     * optimiser les accès futurs.
     *
     * @param id Identifiant de l'accessoire
     * @return L'accessoire trouvé
     * @throws NoSuchElementException si l'accessoire n'existe pas
     */
    @Cacheable(value = "accessory", key = "#id")
    public Accessory findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Accessoire non trouvé avec l'ID: " + id));
    }

    /**
     * Crée un nouvel accessoire. Invalide le cache pour forcer la re-lecture
     * lors du prochain appel à findAll().
     */
    @CacheEvict(value = {"accessories", "accessory"}, allEntries = true)
    public Accessory save(Accessory accessory) {
        return repository.save(accessory);
    }

    /**
     * Met à jour un accessoire existant. Récupère l'accessoire existant et met
     * à jour ses propriétés.
     *
     * @param id Identifiant de l'accessoire à modifier
     * @param accessory Les nouvelles données
     */
    @CacheEvict(value = {"accessories", "accessory"}, allEntries = true)
    public Accessory update(Long id, Accessory accessory) {
        // Récupère l'accessoire existant en base de données
        Accessory existing = findById(id);

        // Met à jour les champs autorisés
        existing.setName(accessory.getName());
        existing.setPrice(accessory.getPrice());
        existing.setStock(accessory.getStock());
        existing.setType(accessory.getType());
        existing.setBrand(accessory.getBrand());
        existing.setCategory(accessory.getCategory());

        return repository.save(existing);
    }

    /**
     * Supprime un accessoire. Invalide le cache pour refléter cette
     * suppression.
     */
    @CacheEvict(value = {"accessories", "accessory"}, allEntries = true)
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
