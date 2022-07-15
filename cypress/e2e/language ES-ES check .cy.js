describe('Cheks Assets language ', () => {
    it('cheks es-es lang', () => {
        cy.intercept('GET', '**/betbuilder?sb=test&demo=test&user=demo&language=es-es*').as('lang')
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test&demo=test&user=demo&language=es-es')

        cy.wait('@lang').its('response.statusCode').should('eql', 200);
        cy.get('@lang').then((response) => {

            cy.get('div > .header-info__item').contains('Boleto')
            cy.get(' .main-navigation__item > p.cap').should('have.text', 'Mis apuestas')
            cy.get('.header__logo > p').contains('Construir Props')
            cy.get('.header-info__item').contains('Acumuladas Especiales Cuotas:')
        })

    })
})