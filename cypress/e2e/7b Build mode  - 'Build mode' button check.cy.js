describe('Build mode  - "Build Mode button check"', () => {
    it('Cheks button "Build mode" work correctly', () => {
        cy.visit('/betbuilder?sb=test&demo=test&user=demo')
        cy.get('.cap').contains('Build Mode ').click()
        cy.intercept('GET', '**/api/player/playersByGame?gameId=*').as('res')
        cy.wait('@res').its('response.body').should('be.an','array')
            .then((response) => {

                let data = response
                let resultdata = [];
                let name = "";

                for (let i = 0; i < data.length; i++) {

                    resultdata.push({'name': data[i].name})

                    if (resultdata[0].name !== "" || resultdata[0].name !== null) {
                        name = resultdata[0].name
                    }
                }
                cy.log(resultdata[0].name)
                cy.get('.players-dropdown__search').type(name)
                cy.get('.player-searched__icon > .icon').click()
                cy.get('.player-statistics__header > p').should('contain', name)
                cy.get('span.closebtn').click()
                cy.get('.player-searched__control > i.icon.icon-add').click()
                cy.get('.build-form__statistics-head  > .icon.icon-header-dropdown').click()
                cy.get('.absoluteDropdown > :nth-child(1)').click()
                cy.wait(2000)

                cy.get('#numberInput').invoke('val')
                    .then((val) => {
                        cy.log('Selected statistic has value :' + val)

                        if( val > 0) {
                            cy.get('.build-form__button').click()
                            cy.get('.bat-slip__content').should('be.visible')
                        }

                        if(val =0 ) {
                            cy.log('No statistic value ')
                        }
                    })

            })
    })
})