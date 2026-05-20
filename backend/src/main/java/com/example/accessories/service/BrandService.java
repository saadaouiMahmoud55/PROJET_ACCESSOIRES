package com.example.accessories.service;

import com.example.accessories.entity.Brand;
import com.example.accessories.repository.BrandRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

/**
 * Service pour gérer les marques d'accessoires. Cache Redis pour optimiser les
 * requêtes de lecture.
 */
@Service
public class BrandService {

    private final BrandRepository repository;

    public BrandService(BrandRepository repository) {
        this.repository = repository;
    }

    /**
     * Récupère toutes les marques (depuis le cache si disponible).
     */
    @Cacheable("brands")
    public List<Brand> findAll() {
        return repository.findAll();
    }

    /**
     * Récupère une marque par son ID.
     *
     * @throws NoSuchElementException si la marque n'existe pas
     */
    @Cacheable(value = "brand", key = "#id")
    public Brand findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Marque non trouvée avec l'ID: " + id));
    }

    /**
     * Crée une nouvelle marque et invalide le cache.
     */
    @CacheEvict(value = {"brands", "brand"}, allEntries = true)
    public Brand save(Brand brand) {
        return repository.save(brand);
    }

    /**
     * Met à jour une marque existante.
     */
    @CacheEvict(value = {"brands", "brand"}, allEntries = true)
    public Brand update(Long id, Brand brand) {
        Brand existing = findById(id);
        existing.setName(brand.getName());
        return repository.save(existing);
    }

    /**
     * Supprime une marque.
     */
    @CacheEvict(value = {"brands", "brand"}, allEntries = true)
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
