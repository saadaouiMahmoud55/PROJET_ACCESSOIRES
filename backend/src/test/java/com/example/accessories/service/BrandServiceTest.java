package com.example.accessories.service;

import com.example.accessories.entity.Brand;
import com.example.accessories.repository.BrandRepository;
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
 * Tests unitaires pour la classe BrandService.
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("Tests du service de marques")
public class BrandServiceTest {

    @Mock
    private BrandRepository repository;

    @InjectMocks
    private BrandService service;

    /**
     * Teste la récupération de toutes les marques.
     */
    @Test
    @DisplayName("Doit retourner la liste de toutes les marques")
    public void testFindAll() {
        Brand brand1 = new Brand(1L, "Apple", null);
        Brand brand2 = new Brand(2L, "Samsung", null);
        when(repository.findAll()).thenReturn(Arrays.asList(brand1, brand2));

        List<Brand> result = service.findAll();

        assertEquals(2, result.size());
        assertEquals("Apple", result.get(0).getName());
        verify(repository, times(1)).findAll();
    }

    /**
     * Teste la récupération d'une marque par son ID.
     */
    @Test
    @DisplayName("Doit retourner une marque par son ID")
    public void testFindById() {
        Brand brand = new Brand(1L, "Samsung", null);
        when(repository.findById(1L)).thenReturn(Optional.of(brand));

        Brand result = service.findById(1L);

        assertEquals("Samsung", result.getName());
        verify(repository, times(1)).findById(1L);
    }

    /**
     * Teste que le service lève une exception pour une marque inexistante.
     */
    @Test
    @DisplayName("Doit lancer une exception pour un ID inexistant")
    public void testFindByIdNotFound() {
        when(repository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> service.findById(999L));
    }

    /**
     * Teste la sauvegarde d'une nouvelle marque.
     */
    @Test
    @DisplayName("Doit sauvegarder une nouvelle marque")
    public void testSave() {
        Brand brand = new Brand(null, "Google", null);
        Brand savedBrand = new Brand(3L, "Google", null);
        when(repository.save(brand)).thenReturn(savedBrand);

        Brand result = service.save(brand);

        assertEquals("Google", result.getName());
        assertNotNull(result.getId());
        verify(repository, times(1)).save(brand);
    }

    /**
     * Teste la mise à jour d'une marque existante.
     */
    @Test
    @DisplayName("Doit mettre à jour une marque existante")
    public void testUpdate() {
        Brand existing = new Brand(1L, "Old Name", null);
        Brand update = new Brand(null, "New Name", null);

        when(repository.findById(1L)).thenReturn(Optional.of(existing));
        when(repository.save(existing)).thenReturn(existing);

        Brand result = service.update(1L, update);

        assertEquals("New Name", result.getName());
        verify(repository, times(1)).save(existing);
    }

    /**
     * Teste la suppression d'une marque.
     */
    @Test
    @DisplayName("Doit supprimer une marque")
    public void testDelete() {
        doNothing().when(repository).deleteById(1L);

        assertDoesNotThrow(() -> service.delete(1L));

        verify(repository, times(1)).deleteById(1L);
    }
}
