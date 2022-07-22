describe('Checks access to mybets ',() => {
    it('Checks access to Open bets',() => {
        cy.visit('/betbuilder?sb=test&demo=test&user=demo')
        cy.wait(2000)
        cy.get('p').contains('My Bets').click()
        cy.get('.open-bets__select').should('be.visible')
        cy.get('.open-bets__select__item__label').first().should('include.text','Open Bets')
            cy.get('.open-bets__select__item__label > span').first()

    })
    it('Checks access to Past bets',() => {
        cy.visit('/betbuilder?sb=test&demo=test&user=demo')
        cy.get('p').contains('My Bets').click()
        cy.get('.open-bets__select').should('be.visible')
        cy.get('#item2').first().next().should('include.text','Past Bets')
        cy.get('.open-bets__select__item__label > span').first()

    })
})