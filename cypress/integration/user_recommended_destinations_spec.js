describe("Profile page", function() {
    it("shows a user's recommended destinations", function() {
      cy.visit("/");
      cy.contains("Sign Up").click({force:true});
      cy.get("#sign-up-form").find("[name = 'username']").type("josue");
      cy.get("#sign-up-form").find("[name = 'email']").type("josue@example.com");
      cy.get("#sign-up-form").find("[name = 'password']").type("makers4lyf");
      cy.get("#sign-up-form").submit();
      cy.contains("Welcome!");

      cy.get("#sign-in-form").find("[name = 'username']").type("josue");
      cy.get("#sign-in-form").find("[name = 'password']").type("makers4lyf");
      cy.get("#sign-in-form").submit();

      cy.contains("Destinations recommended for you");
      cy.get(".recommended-list").should("be.visible");

    });
});