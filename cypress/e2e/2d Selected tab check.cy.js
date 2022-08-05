describe('Checks selected statistic ar show all', () => {
    it('checks selected market',() => {
        cy.visit('/betbuilder?sb=test&demo=test&user=demo')
        cy.get('.ligues-slider__item--selected')
        const kiek =  cy.get('div.ligues-slider__item--selected > .ligues-slider__count ')
            .invoke('text')
            .then(parseInt)
            .then((kiek) =>{
               cy.log(kiek)

               if(kiek === 1) {
                   cy.log('kiek')
                   cy.get('.main-markets__item').should('be.visible')
                       .contains('All Markets')
                       .parent()
                       .should('have.class', 'main-markets__item--active')
               }
                   if (kiek > 1) {
                       cy.get('.games-selection__select').click()
                       cy.get('.games-selection__dropdown').first().click()
                       cy.get('app-game-filter-title > div > div').its('length')
                           .should('be.greaterThan',0)


                   }
                   if( kiek  === 0 ) {

                       cy.log("Something wrong - No games on League")

                   }
           })

   })

})