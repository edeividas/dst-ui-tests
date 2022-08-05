describe('Checks returned games count length is equal activeGames on UI ', () => {
    it('Cheks allGames count', () => {
        cy.intercept('GET', '**api/game/allGames?sb=test&isActive=1&leagueId*').as('res')
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test&demo=test&user=demo')

        cy.wait('@res',).its('response.body').should('be.an', 'array')
            .then((response) => {
              let data = response;
              let activeGames = 0;

                cy.log(parseInt(data.length))
                activeGames = parseInt(data.length)
                cy.get('.games-selection__select').click()
                cy.get('.games-dropdown__item ')
                    .its("length")
                    .should('be.eq', activeGames+1)
                cy.log('We have' + ' ' + activeGames + ' ' + 'active games.')
            })
    })


})