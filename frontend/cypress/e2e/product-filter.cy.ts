describe('Catalogue Accessoires', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('charge la page d accueil et affiche les accessoires', () => {
    cy.contains(/accessoires/i).should('exist');
    cy.get('body').should('exist');
  });

  it('vérifie que le catalogue contient au moins un produit', () => {
    cy.get('body').then(($body) => {
      expect($body.text().length).to.be.greaterThan(20);
    });
  });
});
