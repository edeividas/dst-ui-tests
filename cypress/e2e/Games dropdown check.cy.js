describe('Check Games dropdown menu work on UI', () => {
    it('Dropdown menu check', () => {
        cy.intercept('GET', '**/api/league?sb=test&user=demo&group=bb*').as('res')
        cy.visit('/betbuilder?sb=test&demo=test&user=demo')
        cy.wait('@res').its('response.body').should('be.an', 'array')
            .then((response) => {
                let data = response;
                let resultdata = [];
                let activeGamesCount = 0;
                let league = "";

                for(let i = 0; i < data.length; i++) {

                    resultdata.push({
                        'isDefault': data[i].isDefault,
                        'activeGames': data[i].activeGames,
                        'league': data[i].acronym
                    })

                    if (data[i].isDefault === true && data[i].activeGames > 0) {

                        activeGamesCount = data[i].activeGames
                        league = data[i].acronym


                        cy.log(JSON.stringify(data[i].isDefault))
                        cy.log(JSON.stringify(data[i].activeGames))
                        cy.log(JSON.stringify(data[i].acronym))

                    }

                }

                    cy.get('.ligues-slider__item ')
                        .should('contain', league)
                    cy.get('.ligues-slider__item--selected> .ligues-slider__count')
                        .invoke('text')
                        .then(parseInt)
                        .should('equal', activeGamesCount)
                    cy.get('div.games-selection').click()
                    cy.get('.games-dropdown__item ').its('length')
                        .should('eq', activeGamesCount + 1)


            })
    })
})