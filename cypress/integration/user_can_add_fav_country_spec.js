describe('Home page', function() {
    it('can add favorite country', function() {
      cy.visit('/');
      cy.contains('Sign Up').click({force:true});
      cy.get('#sign-up-form').find('[name = "username"]').type('emma7563');
      cy.get('#sign-up-form').find('[name = "email"]').type('emma@example.com');
      cy.get('#sign-up-form').find('[name = "password"]').type('ilovethenorrf');
      cy.get('#sign-up-form').submit();
      cy.contains('Welcome!');

      cy.visit('/profile')
      cy.get('#fav-country-form').find('country_list').select('Andorra');
      cy.get('#fav-country-form').submit();
      cy.get('#fav-country-form').find('country_list').select('Angola');
      cy.get('#fav-country-form').submit();
      cy.contains('Andorra, Angola')


    });
});
