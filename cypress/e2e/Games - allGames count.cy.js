describe('Checks returned games count length is equal activeGames on UI ', () => {
    it('Cheks allGames count', () => {
        cy.intercept('GET', '**/api/dfm/gamesByOu?gameId=null&statistic=Passing%20Yards&leagueId=*').as('res')
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test&demo=test&user=demo')

        cy.wait('@res',).its('response.body').should('be.an', 'array')
            .then((response) => {
              let data = response;
              let activeGames = 0;

                cy.log(parseInt(data.length))
                activeGames = parseInt(data.length)
                cy.get('.games-selection__select').click()
                cy.get('.games-dropdown__item >').its("length")
                    .should('be.eq', activeGames)
            })
    })


})