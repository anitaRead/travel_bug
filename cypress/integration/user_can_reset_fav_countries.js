describe('Profile page', function() {
  it('can reset all saved favorite countries', function() {
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
    cy.contains('Andorra');

    cy.contains('Reset Favourites').click({force:true});

    cy.contains('Andorra').should('not.exist');

  });
});
