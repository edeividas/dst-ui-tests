describe('Checks access to mybets ',() => {
    it('Checks access to Open bets', () => {
        cy.visit('/betbuilder?sb=test&demo=test&user=demo')
        cy.wait(2000)
        cy.get('p').contains('My Bets').click()
        cy.get('.open-bets__select').should('be.visible')
        cy.get('.open-bets__select__item__label').first().should('include.text', 'Open Bets')
        cy.get('.open-bets__select__item__label > span').first()

    })
    it('Checks access to Past bets', () => {
        cy.visit('/betbuilder?sb=test&demo=test&user=demo')
        cy.get('p').contains('My Bets').click()
        cy.get('.open-bets__select').should('be.visible')
        cy.get('#item2').first().next().should('include.text', 'Past Bets')
        cy.get('.open-bets__select__item__label > span').first()

    })
    it('checks Past bets count response', () => {
        cy.visit('/betbuilder?sb=test&demo=test&user=demo')
        cy.intercept('GET', '**/api/my-bets?sportbookUser**').as('res')
        cy.get('p').contains('My Bets').click()
        cy.wait('@res').its('response.body').should('be.an', 'object')
            .then((obj) => {

                let details = obj;

                const value1 = JSON.stringify(obj.options.totalPagesCount)
                cy.log(JSON.stringify(value1))
                cy.get('.open-bets__select__item ').next().click()
                cy.get(':nth-child(2) > .open-bets__select__item__label > span').invoke('text')
                    .should('include', value1)
            })
    })
        it('checks Open bets count response', () => {
            cy.visit('/betbuilder?sb=test&demo=test&user=demo')
            cy.intercept('GET', '**/api/my-bets?sportbookUser=demo&sb=test&group=bb&order=desc&sort=created&bet.isActive=1&limit=10&page=1&jwtToken=null').as('res1')
            cy.get('p').contains('My Bets').click()
            cy.wait('@res1').its('response.body').should('be.an', 'object')
                .then((obj) => {

                    let details = obj;

                    const value1 = JSON.parse(obj.options.totalItemsCount)

                    cy.log(value1)
                    cy.get('.open-bets__select__item ').next().click()
                    cy.get(':nth-child(1) > .open-bets__select__item__label > span').invoke('text')
                        .should('include', value1)
                })
        })


})

