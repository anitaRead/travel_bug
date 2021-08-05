describe('Profile page', function() {
  it('can remove a selected favorite country', function() {
    cy.visit('/');
    cy.contains('Sign Up').click({force:true});
    cy.get('#sign-up-form').find('[name = "username"]').type('jim');
    cy.get('#sign-up-form').find('[name = "email"]').type('jim@example.com');
    cy.get('#sign-up-form').find('[name = "password"]').type('jim');
    cy.get('#sign-up-form').submit();
    cy.contains('Welcome!');

    cy.get('#sign-in-form').find('[name = "username"]').type('jim');
    cy.get('#sign-in-form').find('[name = "password"]').type('jim');
    cy.get('#sign-in-form').submit();

    cy.get('#fav-country-form').find('[name = "country"]').select('Andorra');
    cy.get('#fav-country-form').submit();
    cy.get('#fav-country-list').contains('Andorra');

    cy.get('#remove-country-form').find('[name = "favCountry"]').select('Andorra');
    cy.get('#remove-country-form').submit();

    cy.get('#fav-country-list').contains('Andorra').should('not.exist');

  });
});
