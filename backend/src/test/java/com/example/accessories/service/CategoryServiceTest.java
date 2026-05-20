package com.example.accessories.service;

import com.example.accessories.entity.Category;
import com.example.accessories.repository.CategoryRepository;
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
 * Tests unitaires pour la classe CategoryService.
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("Tests du service de catégories")
public class CategoryServiceTest {

    @Mock
    private CategoryRepository repository;

    @InjectMocks
    private CategoryService service;

    /**
     * Teste la récupération de toutes les catégories.
     */
    @Test
    @DisplayName("Doit retourner la liste de toutes les catégories")
    public void testFindAll() {
        Category cat1 = new Category(1L, "Coque", null);
        Category cat2 = new Category(2L, "Chargeur", null);
        when(repository.findAll()).thenReturn(Arrays.asList(cat1, cat2));

        List<Category> result = service.findAll();

        assertEquals(2, result.size());
        assertEquals("Coque", result.get(0).getName());
        verify(repository, times(1)).findAll();
    }

    /**
     * Teste la récupération d'une catégorie par son ID.
     */
    @Test
    @DisplayName("Doit retourner une catégorie par son ID")
    public void testFindById() {
        Category category = new Category(1L, "Chargeur", null);
        when(repository.findById(1L)).thenReturn(Optional.of(category));

        Category result = service.findById(1L);

        assertEquals("Chargeur", result.getName());
        verify(repository, times(1)).findById(1L);
    }

    /**
     * Teste que le service lève une exception pour une catégorie inexistante.
     */
    @Test
    @DisplayName("Doit lancer une exception pour un ID inexistant")
    public void testFindByIdNotFound() {
        when(repository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> service.findById(999L));
    }

    /**
     * Teste la sauvegarde d'une nouvelle catégorie.
     */
    @Test
    @DisplayName("Doit sauvegarder une nouvelle catégorie")
    public void testSave() {
        Category category = new Category(null, "Écran", null);
        Category savedCat = new Category(3L, "Écran", null);
        when(repository.save(category)).thenReturn(savedCat);

        Category result = service.save(category);

        assertEquals("Écran", result.getName());
        assertNotNull(result.getId());
        verify(repository, times(1)).save(category);
    }

    /**
     * Teste la mise à jour d'une catégorie existante.
     */
    @Test
    @DisplayName("Doit mettre à jour une catégorie existante")
    public void testUpdate() {
        Category existing = new Category(1L, "Old Category", null);
        Category update = new Category(null, "New Category", null);

        when(repository.findById(1L)).thenReturn(Optional.of(existing));
        when(repository.save(existing)).thenReturn(existing);

        Category result = service.update(1L, update);

        assertEquals("New Category", result.getName());
        verify(repository, times(1)).save(existing);
    }

    /**
     * Teste la suppression d'une catégorie.
     */
    @Test
    @DisplayName("Doit supprimer une catégorie")
    public void testDelete() {
        doNothing().when(repository).deleteById(1L);

        assertDoesNotThrow(() -> service.delete(1L));

        verify(repository, times(1)).deleteById(1L);
    }
}
