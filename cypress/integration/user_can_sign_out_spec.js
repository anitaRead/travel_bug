describe('Sign out page', function() {
    it('can sign out a user', function() {
      cy.visit('/');
      cy.contains('Sign Up').click({force:true});
      cy.get('#sign-up-form').find('[name = "username"]').type('eddie007');
      cy.get('#sign-up-form').find('[name = "email"]').type('eddie@example.com');
      cy.get('#sign-up-form').find('[name = "password"]').type('coach4lyf');
      cy.get('#sign-up-form').submit();
      cy.contains('Welcome!');

      cy.get('#sign-in-form').find('[name = "username"]').type('eddie007');
      cy.get('#sign-in-form').find('[name = "password"]').type('coach4lyf');
      cy.get('#sign-in-form').submit();

      cy.get('#fav-country-form').contains("Andorra")
      cy.contains('Profile').click();
      cy.contains('Sign Out').click();
      
      cy.contains('Explore');
      cy.contains('Sign Up');
      cy.contains('Sign In');
      cy.contains('Profile');
    });
});
