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

                    cy.intercept('POST', '**/api/bet/max-exposure*', {fixture: 'expores'}).as('res')

                    cy.get('.over-under-block__selector').first().click()
                    cy.get('.bat-slip__content').should('be.visible')
                    cy.wait('@res')
                    cy.get('.error__text')
                        .should('contain.text','Odds have changed. Please review and then place bet.')
                    cy.get('.error__text').click()

                    cy.intercept('POST','**/api/bet*').as('bet')

                    cy.get('.wager').type(1)
                    cy.get('.bat-slip__item__block-btn__btn').click()
                    cy.get('.btn-confirm').click()
                    cy.wait(1000)


                    cy.wait('@bet').its('response.statusCode').should('eq', 400)
                    cy.get('.errored > span').should('contain.text','Odds have changed. Please review and then place bet.')


            }
                if(text.trim() === 'Game Markets') {
                    cy.get('.main-markets__item--active').next()
                    cy.get('.banner-menu__players > .banner-players').click()
                    cy.get(':nth-child(3) > .players-item__checkbox-wrapper > input').check()
                    cy.get('.banner-menu__players > .icon').click()
                    cy.intercept('POST', '**/api/bet/max-exposure*', {fixture: 'expores'}).as('res')

                    cy.get('.over-under-block__selector').first().click()
                    cy.get('.bat-slip__content').should('be.visible')
                    cy.wait('@res')
                    cy.get('.error__text')
                        .should('contain.text','Odds have changed. Please review and then place bet.')
                    cy.get('.error__text').click()

                    cy.intercept('POST','**/api/bet*').as('bet')

                    cy.get('.wager').type(1)
                    cy.get('.bat-slip__item__block-btn__btn').click()
                    cy.get('.btn-confirm').click()


                    cy.wait('@bet').its('response.statusCode').should('eq', 400)
                    cy.get('.errored > span').should('contain.text','Odds have changed. Please review and then place bet.')

                }

            })
    })
})