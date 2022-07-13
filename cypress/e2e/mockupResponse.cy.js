describe('mockupResponse' , function ()
{
    it('checks "no games available" on load', function () {

        // inline response mockup
        // cy.intercept('GET', '**/api/league*', {
        //     body: []
        // }).as(`league`);

        // fixture files https://docs.cypress.io/api/commands/fixture#Shortcuts
        cy.intercept('GET', '**/api/league*', { fixture: 'league' }).as(`league`);

        cy.visit('/betbuilder?sb=test&demo=test');
        cy.wait('@league').its('response.body').should('not.be.null');
        cy.get('.ds-placeholder').find('p').contains('No games available');
    })
})