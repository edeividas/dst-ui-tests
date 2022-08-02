describe('Checks O/U different line response',() => {

    it('Checks O/U line,response mockup ',  () => {
        cy.visit('/betbuilder?sb=test&demo=test&user=demo')
        cy.get('.games-selection__select').click()
        cy.get('.games-selection__dropdown').first().click()
        cy.wait(1000)
        cy.get('.banner-menu__players').first().click({force: true}).click()
        cy.get('[type="checkbox"]').first().check()

        cy.get('.banner-menu__players').first().click()

        cy.get('div >.over-under-block__selector ')
        cy.wait(2000)

        //cy.intercept('POST', '**/api/bet?**',{fixture:'linechange'}).as('req')
       // cy.wait('@req')
        cy.intercept('POST', '**/api/bet*', {fixture:'linechange'}).as(`betPlace`);

        cy.get('.over-under-block__selector').first()
        cy.get('.over-under-block__selector-value').first().click()
        cy.get('.wager').type(1)
        cy.wait('@betPlace').its('response.statusCode').should('eq', 400)
        cy.get('.bat-slip__item__block-btn__btn').click()
        cy.wait(2000)
        cy.wait('@betPlace').its('response.statusCode').should('eq', 400)
       // cy.wait('@req')
      //  cy.get('.bat-slip__item__block-btn__btn').click()
       // cy.wait('@betPlace')
        cy.wait(2000)
       // cy.wait('@betplace')
        cy.get('.btn-confirm').click()
        cy.wait(3000)
       // cy.wait('@betplace')
        cy.wait(2000)
        //cy.wait('@req')
        // cy.wait('@req').its('response.statusCode').should('eq', 400)
        //     .then(response => {
        //         cy.log(response.body);
        //     })
        cy.wait(5000)
        cy.get('.errored > span').should('have.text','Unable to place a bet. conditionValue should match the line value "25.5"')
        cy.get('[style="font-size: 16px;"]').should('have.text', '1 Bet not placed.')
        cy.get('.errorText > :nth-child(3)').should('have.text','Please review.')

    })

})