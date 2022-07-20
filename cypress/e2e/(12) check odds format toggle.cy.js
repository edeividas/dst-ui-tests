describe('Checks dds format toggle Decimal/American',() => {

   it('Checks odds american format ',  () => {
       cy.visit('/betbuilder?sb=test&demo=test&user=deividas1&oddsType=american')

       cy.get('.games-dropdown__item').click({force: true})
       cy.wait(1000)
       cy.get('.games-dropdown__item').first().next().click()
       cy.get('div > .over-under-block__selector ').first()
       cy.get('.over-under-block__selector-value').first()
               .invoke('text')
               .should('match', / \+|-/)
               .then(parseInt)
               .should('be.a', 'number')

   })

    it('Chceks decimal odds format ',() => {

        cy.visit('/betbuilder?sb=test&demo=test&user=deividas1&oddsType=decimal')
        cy.get('.games-dropdown__item').click({force: true})
        cy.wait(1000)
        cy.get('.games-dropdown__item').first().next().click()
        cy.get('div > .over-under-block__selector ').first()
        cy.get('.over-under-block__selector-value').first()
            .invoke('text')
            .then(parseInt)
            .should('be.a', 'number')
            .should('be.gte', 1)
            .should('match', /^([1-9][0-9]?|100)$/)

    })

 })