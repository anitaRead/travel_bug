describe('Edit profile page', function() {
  it('can edit username and vaccination status', function() {
    cy.visit('/');
    cy.contains('Sign Up').click({force:true});
    cy.get('#sign-up-form').find('[name = "username"]').type('anita24');
    cy.get('#sign-up-form').find('[name = "email"]').type('anita24@example.com');
    cy.get('#sign-up-form').find('[name = "password"]').type('annieruok');
    cy.get('#sign-up-form').submit();
    cy.contains('Welcome!');

    cy.get('#sign-in-form').find('[name = "username"]').type('anita24');
    cy.get('#sign-in-form').find('[name = "password"]').type('annieruok');
    cy.get('#sign-in-form').submit();

    cy.contains('Profile').click();
    cy.get('.edit-profile-link').click();
    cy.contains('anita24');
    cy.get('#username-form').find('[name = "username"]').type('anita5000');
    cy.get('#username-form').submit();
    cy.contains('anita5000');

    cy.get('#vax-status').find('[name = "vaccination_status"]').select('Vaccinated');
    cy.get('#vax-status').submit();
    cy.contains('vaccination status: Vaccinated');
  });
});