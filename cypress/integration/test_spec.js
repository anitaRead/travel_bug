describe("Test", function(){
    it("shows the homepage", function(){
        cy.visit("/");
        cy.get(".title").contains("I am a Test!");
    });
});