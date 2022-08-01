describe('Place be (simple way)', () => {
    it('checks market and select player ', function () {
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
                    cy.get('.bat-slip__item__block-btn__btn').click()
                    cy.get('.btn-confirm').click()
                    cy.wait(5000)
                    cy.get('.bets-single__success__btn-close').click()
                }
                if(text.trim() === 'Game Markets') {
                    cy.get('.main-markets__item--active').next()
                    cy.get('.banner-menu__players > .banner-players').click()
                    cy.get(':nth-child(3) > .players-item__checkbox-wrapper > input').check()
                    cy.get('.banner-menu__players > .icon').click()
                    cy.get('.over-under-block__selector').first().click()
                    cy.get('.bat-slip__content').should('be.visible')
                    cy.get('.wager').type(1)
                    cy.get('.bat-slip__item__block-btn__btn').click()
                    cy.get('.btn-confirm').click()
                    cy.wait(5000)
                    cy.get('.bets-single__success__btn-close').click()
                }
            })
    })

        it('checks MAx exposure', function () {
            cy.log('checking if it fetches max exposure after placing bet')
            cy.intercept('POST', '**/api/bet/max-exposure*').as(`maxExposure`); // expect our req to be sent. add intercept before action.
            cy.visit('/betbuilder?sb=test&demo=test&user=demo')
            cy.wait(3000)
            cy.get('.banner-menu__players > .banner-players').click()
            cy.get(':nth-child(3) > .players-item__checkbox-wrapper > input').check()
            cy.get('.banner-menu__players > .icon').click()
            cy.get('.over-under-block__selector').first().click()
            cy.get('.bat-slip__content').should('be.visible')
            cy.wait('@maxExposure').its('response.statusCode').should('eq', 201)
            cy.get('@maxExposure').its('response.body').should('be.an','object')
                .should('have.property', 'data')
                .should('have.deep.property', 'maxExposure').as('maxExposureValue')
                .should('be.greaterThan', 0)
                .should('be.lessThan',5000)
            cy.get('@maxExposureValue').then(val => {
                cy.log('Max Exposure value fetched: ' + val.toString());
            })


        })
    it('Checks response properties maxWager, maxExposure, odds', () => {
       cy.log('resonse have values')
        cy.intercept('POST', '**/api/bet/max-exposure*').as(`maxExposure`)
        cy.visit('/betbuilder?sb=test&demo=test&user=demo')
        cy.wait(3000)
        cy.get('.banner-menu__players > .banner-players').click()
        cy.get(':nth-child(3) > .players-item__checkbox-wrapper > input').check()
        cy.get('.banner-menu__players > .icon').click()
        cy.get('.over-under-block__selector').first().click()
        cy.get('.bat-slip__content').should('be.visible')
        cy.wait('@maxExposure').its('response.statusCode').should('eq', 201)
        cy.get('@maxExposure').its('response.body').should('be.an','object')

            .then((data) => {
                let result = data;
                const value1 = JSON.stringify(data.data)
                // need to finish this .....................
                cy.log(value1)



            })

    })
})