describe('Place bet: checks bet successful + bet ID response', () => {
    it('place bet and checks success and  bet ID in response', () => {
        cy.visit('/betbuilder?sb=test&demo=test&user=demo')
        cy.wait(1000)
        //checks for active market
        cy.get('.main-markets__item--active')
            .invoke('text')
            .then((text) => {
                //checks or player filter is active/usable
                if(text.trim() !== 'Game Markets'){
                    cy.log('not game markets')
                    cy.get('.banner-menu__players > .banner-players').click()
                    cy.get(':nth-child(3) > .players-item__checkbox-wrapper > input').check()
                    cy.get('.banner-menu__players > .icon').click()
                    cy.get('.over-under-block__selector').first().click()
                    cy.get('.bat-slip__content').should('be.visible')
                    cy.get('.wager').type(1)
                    cy.intercept('POST', '**/api/bet?*').as('bet')
                    cy.get('.bat-slip__item__block-btn__btn').click()
                    cy.get('.btn-confirm').click()
                    cy.wait('@bet').its('response.statusCode').should('eq', 201)
                    cy.get('@bet').its('response.body')
                        .should('have.property', 'id').as('betid')
                    cy.get('@betid').should('not.be.null')
                        .should('match',/^[0-9]*[1-9][0-9]*$/) //regex for positive integers


                }
                if(text.trim() === 'Game Markets') {
                    cy.get('.main-markets__item--active').next()
                    cy.get('.banner-menu__players > .banner-players').click()
                    cy.get(':nth-child(3) > .players-item__checkbox-wrapper > input').check()
                    cy.get('.banner-menu__players > .icon').click()
                    cy.get('.over-under-block__selector').first().click()
                    cy.get('.bat-slip__content').should('be.visible')
                    cy.get('.wager').type(1)
                    cy.intercept('POST', '**/api/bet?*').as('bet')
                    cy.get('.bat-slip__item__block-btn__btn').click()
                    cy.get('.btn-confirm').click()
                    cy.wait('@bet').its('response.statusCode').should('eq', 201)
                    cy.get('@bet').its('response.body')
                        .should('have.property', 'id').as('betid')
                    cy.get('@betid').should('not.be.null')
                        .should('match',/^[0-9]*[1-9][0-9]*$/) //regex for positive integers

                }

            })

    })
})
