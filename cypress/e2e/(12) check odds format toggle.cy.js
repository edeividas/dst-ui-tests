describe('Checks dds format toggle Decimal/American',() => {

   it('Checks odds american format ',  () => {
       cy.visit('/betbuilder?sb=test&demo=test&user=demo&oddsType=american')

       cy.get('.games-selection__select').click()
       cy.get('.games-selection__dropdown').first().click()
       cy.wait(1000)
       cy.get('.banner-menu__players').first().click({force:true}).click()
       cy.get('[type="checkbox"]').first().check()
       // cy.wait(1000)
       cy.get('.banner-menu__players').first().click()
       cy.get('div >.over-under-block__selector ')
       cy.get('.over-under-block__selector').contains('Over').first()
       cy.get('.over-under-block__selector-value').first()
           .invoke('text')
                //Regex number with symbol (-/+)
               .should('match', / \+|-/)
               .then(parseInt)
               .should('be.a', 'number')

   })

    it('Chceks decimal odds format ',() => {

        cy.visit('/betbuilder?sb=test&demo=test&user=deividas1&oddsType=decimal')
        cy.get('.games-selection__select').click()
        cy.get('.games-selection__dropdown').first().click()
        cy.wait(1000)
        cy.get('.banner-menu__players').first().click({force:true}).click()
        cy.get('[type="checkbox"]').first().check()
        // cy.wait(1000)
        cy.get('.banner-menu__players').first().click()
        cy.get('div >.over-under-block__selector ')
        cy.get('.over-under-block__selector').contains('Over').first()
        cy.get('.over-under-block__selector-value').first()
            .invoke('text')
            .then(parseInt)
            .should('be.a', 'number')
            .should('be.gte', 1)
            //check regex number is 1-100 in interval
            .should('match', /^([1-9][0-9]?|100)$/)

    })

 })