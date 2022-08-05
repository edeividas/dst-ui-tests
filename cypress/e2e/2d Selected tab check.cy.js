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

                   cy.get('.main-markets__item').should('be.visible')
                       .contains('All Markets')
                       .parent()
                       .should('have.class', 'main-markets__item--active')
                   cy.log("Selected statistic is:\'All Markets\'")
               }
                   if (kiek > 1) {

                       cy.get('.main-markets__item.main-markets__item--active').should('have.class', 'main-markets__item--active')
                           .invoke('text')
                           .then((text) => {
                               cy.log(JSON.stringify(text))
                               cy.log('Selected market is:' + ' ' + text)

                           })

                       cy.get('.games-selection__select').click()
                       cy.get('.games-selection__dropdown').first().click()
                       cy.get('app-game-filter-title > div > div').its('length')
                          .should('be.gte',1)

                   }

                   if( kiek  === 0 ) {

                       cy.log("Something wrong - No games on League")

                   }
           })

   })

})