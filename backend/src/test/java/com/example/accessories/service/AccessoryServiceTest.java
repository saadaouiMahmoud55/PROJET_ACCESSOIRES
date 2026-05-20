package com.example.accessories.service;

import com.example.accessories.entity.Accessory;
import com.example.accessories.repository.AccessoryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Tests unitaires pour la classe AccessoryService. Utilise Mockito pour simuler
 * l'interaction avec le repository.
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("Tests du service d'accessoires")
public class AccessoryServiceTest {

    @Mock
    private AccessoryRepository repository;

    @InjectMocks
    private AccessoryService service;

    /**
     * Teste la récupération de tous les accessoires. Vérifie que le service
     * retourne la liste complète des accessoires.
     */
    @Test
    @DisplayName("Doit retourner la liste de tous les accessoires")
    public void testFindAll() {
        // GIVEN - Setup des données de test
        Accessory acc1 = new Accessory(1L, "Coque", 19.99, 10, "Protection", null, null);
        Accessory acc2 = new Accessory(2L, "Chargeur", 29.99, 5, "Charge", null, null);
        when(repository.findAll()).thenReturn(Arrays.asList(acc1, acc2));

        // WHEN - Exécution de la méthode testée
        List<Accessory> result = service.findAll();

        // THEN - Vérification des résultats
        assertEquals(2, result.size());
        assertEquals("Coque", result.get(0).getName());
        assertEquals("Chargeur", result.get(1).getName());
        verify(repository, times(1)).findAll();
    }

    /**
     * Teste la récupération d'un accessoire par son ID.
     */
    @Test
    @DisplayName("Doit retourner un accessoire par son ID")
    public void testFindById() {
        // GIVEN
        Accessory acc = new Accessory(1L, "Coque", 19.99, 10, "Protection", null, null);
        when(repository.findById(1L)).thenReturn(Optional.of(acc));

        // WHEN
        Accessory result = service.findById(1L);

        // THEN
        assertNotNull(result);
        assertEquals("Coque", result.getName());
        verify(repository, times(1)).findById(1L);
    }

    /**
     * Teste que le service lève une exception lorsque l'accessoire n'existe
     * pas.
     */
    @Test
    @DisplayName("Doit lancer une exception pour un ID inexistant")
    public void testFindByIdNotFound() {
        // GIVEN - L'ID n'existe pas
        when(repository.findById(999L)).thenReturn(Optional.empty());

        // WHEN & THEN - Vérifier que l'exception est lancée
        assertThrows(NoSuchElementException.class, () -> service.findById(999L));
    }

    /**
     * Teste la création d'un nouvel accessoire.
     */
    @Test
    @DisplayName("Doit sauvegarder un nouvel accessoire")
    public void testSave() {
        // GIVEN
        Accessory newAcc = new Accessory(null, "Écran Protecteur", 15.99, 20, "Protection", null, null);
        when(repository.save(newAcc)).thenReturn(new Accessory(3L, "Écran Protecteur", 15.99, 20, "Protection", null, null));

        // WHEN
        Accessory result = service.save(newAcc);

        // THEN
        assertNotNull(result.getId());
        assertEquals("Écran Protecteur", result.getName());
        verify(repository, times(1)).save(newAcc);
    }

    /**
     * Teste la mise à jour d'un accessoire existant.
     */
    @Test
    @DisplayName("Doit mettre à jour un accessoire existant")
    public void testUpdate() {
        // GIVEN
        Accessory existing = new Accessory(1L, "Coque", 19.99, 10, "Protection", null, null);
        Accessory updated = new Accessory(null, "Coque Premium", 29.99, 15, "Protection", null, null);

        when(repository.findById(1L)).thenReturn(Optional.of(existing));
        when(repository.save(existing)).thenReturn(existing);

        // WHEN
        Accessory result = service.update(1L, updated);

        // THEN
        assertEquals("Coque Premium", result.getName());
        assertEquals(29.99, result.getPrice());
        assertEquals(15, result.getStock());
        verify(repository, times(1)).save(existing);
    }

    /**
     * Teste la suppression d'un accessoire.
     */
    @Test
    @DisplayName("Doit supprimer un accessoire")
    public void testDelete() {
        // GIVEN
        doNothing().when(repository).deleteById(1L);

        // WHEN
        service.delete(1L);

        // THEN
        verify(repository, times(1)).deleteById(1L);
    }
}
