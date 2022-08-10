describe('Checks Build mode game dropdown menu', () => {
    it('Build mode - game drop down check', () => {
       // cy.visit('/betbuilder?sb=test&demo=test&user=demo')
       // cy.get('.cap').contains('Build Mode ').click()
        cy.intercept('GET','**/api/game/allGames?sb=test&isActive=1&leagueId*').as('res')
        cy.visit('/betbuilder?sb=test&demo=test&user=demo')
        cy.get('.cap').contains('Build Mode ').click()
        cy.wait('@res').its('response.body').should('be.an', 'array')
            .then((response) => {
                //cy.log(JSON.stringify(response))

                let data = response;
                let mydata = [];

                cy.log(response.length)
                cy.get('.banner-menu__games').click()
                cy.get('app-game-filter-title > div > div').its('length')
                    .should('eq',response.length)
                   // .should('not.contain.text','All Games')
                for(let i = 0 ; i < response.length; i++){
                    // my new array
                    mydata.push({'gametitle':data[i].homeTeam.title})
                    // prints games titles
                    cy.log(data[i].homeTeam.title)


                }
                cy.get('app-game-filter-title > div > div').first().invoke('text').then((text) => {
                    cy.log(text)
                })
                    .should('include',mydata[0].gametitle)

            })
    })
})