describe('Bet placement (intercept & mockup response for changed ODDS)', () => {
    it('intercept & mockup response for changed ODDS', () => {
        cy.visit('/betbuilder?sb=test&demo=true')
        cy.get('.main-markets__item--active')
            .invoke('text')
            .then((text) => {
                //checks or player filter is active/usable
                if (text.trim() !== 'Game Markets') {
                    cy.log('not game markets')
                    cy.get('.banner-menu__players > .banner-players').click()
                    cy.get(':nth-child(3) > .players-item__checkbox-wrapper > input').check()
                    cy.get('.banner-menu__players > .icon').click()

                    cy.intercept('POST', '**/api/bet/max-exposure*', {fixture: 'maxWager_low_value'}).as('res')

                    cy.get('.over-under-block__selector').first().click()
                    cy.get('.bat-slip__content').should('be.visible')
                    cy.wait('@res').its('response.statusCode').should('eq', 200)
                    cy.get('.wager').type(3)
                    cy.get('.error__text > p').should('contain.text','Max wager exceeded. Limit for this bet is $2')


                }
                if(text.trim() === 'Game Markets') {
                    cy.get('.main-markets__item--active').next()
                    cy.get('.banner-menu__players > .banner-players').click()
                    cy.get(':nth-child(3) > .players-item__checkbox-wrapper > input').check()
                    cy.get('.banner-menu__players > .icon').click()

                    cy.intercept('POST', '**/api/bet/max-exposure*', {fixture: 'maxWager_low_value'}).as('res')

                    cy.get('.over-under-block__selector').first().click()
                    cy.get('.bat-slip__content').should('be.visible')
                    cy.wait('@res').its('response.statusCode').should('eq', 200)
                    cy.get('.wager').type(3)
                    cy.wait(1000)
                    cy.get('.error__text > p').should('contain.text', 'Max wager exceeded. Limit for this bet is $2')

                    }
                })
    })
})