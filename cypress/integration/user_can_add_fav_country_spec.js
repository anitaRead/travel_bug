describe('Home page', function() {
    it('can add favorite country', function() {
      cy.visit('/');
      cy.contains('Sign Up').click({force:true});
      cy.get('#sign-up-form').find('[name = "username"]').type('greg');
      cy.get('#sign-up-form').find('[name = "email"]').type('greg@example.com');
      cy.get('#sign-up-form').find('[name = "password"]').type('gregs');
      cy.get('#sign-up-form').submit();

      cy.get('#sign-in-form').find('[name = "username"]').type('greg');
      cy.get('#sign-in-form').find('[name = "password"]').type('gregs');
      cy.get('#sign-in-form').submit();

      cy.get('#fav-country-form').find('[name = "country"]').select('Andorra');
      cy.get('#fav-country-form').submit();
      cy.get('#fav-country-form').find('[name = "country"]').select('Angola');
      cy.get('#fav-country-form').submit();
      cy.contains('Andorra,Angola')
    });
});
