describe('Explore Page', function() {
    it('can display countries with red status', function() {
      cy.visit('/explore');
      cy.get('#red-button').dblclick();
      cy.get('#red-list').should('be.visible');
    });

    it('can display countries with amber status', function() {
        cy.visit('/explore');
        cy.get('#amber-button').dblclick();
        cy.get('#amber-list').should('be.visible');
    });

    it('can display countries with green status', function() {
        cy.visit('/explore');
        cy.get('#green-button').dblclick();
        cy.get('#green-list').should('be.visible');
    });
});