describe('The Dashboard', () => {
    it('successfully loads', () => {
        cy.login();

        cy.visit('/dashboard');
    });
});
