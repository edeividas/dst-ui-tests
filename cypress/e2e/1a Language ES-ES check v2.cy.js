describe('Language check', () => {

    it('Checks ES-ES language ',() => {
        //modify outgoing request using fixture
        cy.intercept('GET', '**/api/application-config*', {fixture:'language'}).as('lang')
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test&demo=test&user=demo')
        cy.wait('@lang').its('response.statusCode').should('eql', 200);
    })
    it('Checks for UI language changes', () => {
        cy.get('div > .header-info__item').contains('Boleto')
        cy.get(' .main-navigation__item > p.cap').should('have.text', 'Mis apuestas')
        cy.get('.header__logo > p').contains('Construir Props')
        cy.get('.header-info__item').contains('Acumuladas Especiales Cuotas:')
    })
})