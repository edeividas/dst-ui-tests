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

        cy.intercept('POST', '**/api/bet?**', req => {
            //add 'conditionValue': 225.5 - to get an error
            req.body =
                {
                    "sportbookUser": "demo",
                    "amount": 10,
                    "currency": "USD",
                    "odds": 1000,
                    "events": [{
                        "type": 18,
                        "game1Id": 163532,
                        "statisticId": 2174,
                        "statisticTitle": "Pass Completions",
                        "conditionType": 3,
                        "conditionValue": 225.5,
                        "player1Id": 124625
                    }],
                    "verificationType": 1,
                    "sb": "test",
                    "group": "bb"
                }

        }).as('req')

        cy.get('.over-under-block__selector').contains('Over').first()
        cy.get('.over-under-block__selector-value').first().click()
        cy.get('.wager').type(1)
        cy.wait(2000)
        cy.get('.bat-slip__item__block-btn__btn').click()
        cy.wait(2000)
        cy.get('.btn-confirm').click()
        cy.wait('@req').its('response.statusCode').should('eq', 400)
            .then(response => {
                cy.log(response.body);
            })
        cy.wait(5000)
        cy.get('.errored > span').should('have.text','Unable to place a bet. ')
        cy.get('[style="font-size: 16px;"]').should('have.text', '1 Bet not placed.')
        cy.get('.errorText > :nth-child(3)').should('have.text','Please review.')

    })

})