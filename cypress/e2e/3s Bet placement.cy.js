describe('Bet placement', () => {
    it('Checks gfm markets ', () => {
        let data
        cy.intercept('GET', '**/api/grouped-markets/v2/map?sb=test&leagueId*').as('res')

        cy.visit('/betbuilder?sb=test&demo=test&user=demo')
        cy.wait('@res').its('response.body').should('be.an', 'object')
            .then((data) => {

                cy.log(JSON.stringify(data))

                let  xx  = data.h2h.length > 0 ? 'h2h' : data.ou.length > 0 ? "OU" : '';

                if(xx === 'h2h') {
                    cy.get('.main-markets__item').contains('Head to Head').click()
                    cy.wait(2000)
                    cy.get('app-main-stats-games').first().click()
                    cy.wait(1000)
                    cy.get('.over-under-block__selector-value').first().click()
                    cy.wait(1000)
                    cy.get('.wager').type(1)
                    cy.get('.bat-slip__item__block-btn__btn').click()
                    cy.get('.btn-confirm').click()


                }else if( xx === 'OU') {
                    cy.wait(1000)
                    cy.get('.main-markets__item').contains('Over/Under').click()
                    cy.wait(2000)
                    cy.get('app-main-stats-games').first().click()
                    cy.wait(1000)
                    cy.get('.over-under-block__selector-value').first().click()
                    cy.wait(1000)
                    cy.get('.wager').type(1)
                    cy.get('.bat-slip__item__block-btn__btn').click()
                    cy.get('.btn-confirm').click()

                }
                else {
                    cy.log('Problem with market selection!')
                }
            })

    })
})