describe('Checks maxWager error mee=saage', () => {
    it('bet 9999 wager and get an error', () => {
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
                    cy.get('.wager').type(9999)
                    cy.get('.error__text > p')
                        .should('contain.text','Max wager exceeded. Limit for this bet is $1000')
                }
                if(text.trim() === 'Game Markets') {
                    cy.get('.main-markets__item--active').next()
                    cy.get('.banner-menu__players > .banner-players').click()
                    cy.get(':nth-child(3) > .players-item__checkbox-wrapper > input').check()
                    cy.get('.banner-menu__players > .icon').click()
                    cy.get('.over-under-block__selector').first().click()
                    cy.get('.bat-slip__content').should('be.visible')
                    cy.get('.wager').type(9999)
                    cy.get('.error__text > p')
                        .should('contain.text','Max wager exceeded. Limit for this bet is $1000')
                }

            })

    })
})
