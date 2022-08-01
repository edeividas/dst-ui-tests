describe('Place be (simple way)', () => {
    it('checks market and select player ', function () {
        cy.visit('/betbuilder?sb=test&demo=test&user=demo')
        cy.wait(1000)
        cy.get('.main-markets__item--active')
            .invoke('text')
            .then((text) => {
                if(text.trim() !== 'Game Markets'){
                    cy.log('not game markets')
                    cy.wait(1000)
                    cy.get('.main-markets__item--active').next()
                   // cy.get('.main-markets__item').contains('Hits').next()


                    // cy.get('.banner-menu__players > .banner-players').click()
                    // cy.get(':nth-child(3) > .players-item__checkbox-wrapper > input').check()
                    // cy.get('.banner-menu__players > .icon').click()
                    // // cy.wait(1000)
                    // cy.get('.over-under-block__selector').first().click()
                    // cy.get('.bat-slip__content').should('be.visible')
                }
                if(text.trim() === 'Game Markets') {
                   // cy.get('.main-markets__item').contains('Game Markets').next()

                }

            })



    })
})