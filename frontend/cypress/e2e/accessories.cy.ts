describe('Accessories catalogue', () => {
  it('loads the app and shows product list', () => {
    // Adjust baseUrl in cypress config or use full URL
    cy.visit('http://localhost:4200');
    cy.contains('Accessoires téléphoniques').should('exist');
    // check product container exists (works for both Angular app and simple-site)
    cy.get('#productsContainer, .product-grid, .cards').should('exist');
  });
});
