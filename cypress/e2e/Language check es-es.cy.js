describe('Cheks Assets language ', () => {
    it('cheks es-es lang', () => {
        cy.intercept('GET', '**/betbuilder?sb=test&demo=test&user=demo&language=es-es*').as('lang')
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test&demo=test&user=demo&language=es-es')

        cy.wait('@lang').its('response.statusCode').should('eql', 200);
        cy.get('@lang').then((response) => {
            expect(response.body).to.not.be.null
            cy.get('div > .header-info__item').contains('Boleto')
        })

    })
})