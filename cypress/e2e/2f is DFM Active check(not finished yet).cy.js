describe('Check DFM active flag and ensure DFM markets are loaded', () => {
    it('cheks DFM active flag', () => {
        cy.visit('/betbuilder?sb=test&demo=test&user=demo')
        cy.intercept('GET', '**/api/game/allGames?sb=test&isActive=1&leagueId*').as('res')
        cy.wait('@res').its('response.body').should('be.an','array')
            .then((response) => {
                let data = response;
                let resultdata = [];


                for(let i = 0; i < data.length; i++) {

                    resultdata.push({
                        'isDfmActive': data[i].isDfmActive,
                        'isActive': data[i].isActive,
                    })

                    if (data[i].isDfmActive === true && data[i].isActive === true) {

                    }
                    //cy.log(JSON.stringify(resultdata))
                }
                cy.log(JSON.stringify(resultdata))
                cy.log(JSON.stringify(resultdata.length))

                })

    })
})