describe('Profile page', function() {
  it('can view profile details', function() {
    cy.visit('/');
    cy.contains('Sign Up').click({force:true});
    cy.get('#sign-up-form').find('[name = "username"]').type('josue2');
    cy.get('#sign-up-form').find('[name = "email"]').type('josue2@example.com');
    cy.get('#sign-up-form').find('[name = "password"]').type('josuejosue');
    cy.get('#sign-up-form').submit();
    cy.contains('Welcome!');

    cy.get('#sign-in-form').find('[name = "username"]').type('josue2');
    cy.get('#sign-in-form').find('[name = "password"]').type('josuejosue');
    cy.get('#sign-in-form').submit();

    cy.contains('vaccination status: unvaccinated');

  });
});