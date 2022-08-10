describe('Bet placement (intercept & mockup response for changed maxWager low value)', () => {
    it('intercept & mockup response for changed maxWager is low value', () => {
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

                    cy.intercept('POST', '**/api/bet/max-exposure*', {fixture: 'maxExposure_zero'}).as('res')

                    cy.get('.over-under-block__selector').first().click()
                    cy.get('.bat-slip__content').should('be.visible')
                    cy.wait('@res')
                    cy.get('.error__text')
                        .should('contain.text','Limit exceeded, please try adding a different selection.')


                }
                if(text.trim() === 'Game Markets') {
                    cy.get('.main-markets__item--active').next()
                    cy.get('.banner-menu__players > .banner-players').click()
                    cy.get(':nth-child(3) > .players-item__checkbox-wrapper > input').check()
                    cy.get('.banner-menu__players > .icon').click()

                    cy.intercept('POST', '**/api/bet/max-exposure*', {fixture: 'maxExposure_zero'}).as('res')

                    cy.get('.over-under-block__selector').first().click()
                    cy.get('.bat-slip__content').should('be.visible')
                    cy.wait('@res')
                    cy.get('.error__text')
                        .should('contain.text','Limit exceeded, please try adding a different selection.')

                }

            })
    })
})