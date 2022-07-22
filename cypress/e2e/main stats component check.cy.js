describe('Checks selected statistic ar show all', () => {
    it('checks selected market',() => {
        cy.visit('/betbuilder?sb=test&demo=test&user=demo')
        cy.get('.ligues-slider__item--selected')
        const kiek =  cy.get('div.ligues-slider__item--selected > .ligues-slider__count ')
            .invoke('text')
            .then(parseInt)
            .then((kiek) =>{
                cy.log(kiek)

                if(kiek === 1) {
                    cy.log(kiek)
                    cy.get('.main-stats__item')
                        .first()
                        .should('have.class','main-stat--open')
                    cy.get('.markets-block')
                        .should('have.length.greaterThan',1)
                }
                if (kiek > 1) {

                    cy.get('.games-selection__select').click()
                    cy.get('.games-selection__dropdown').first().click()
                    cy.get('.main-stats__item')
                        .first()
                        .should('have.class','main-stat--open')
                    cy.get('.markets-block')
                        .should('have.length.greaterThan',1)

                }
                else {
                    cy.log('error!')
                }

            })

    })

})