describe('Checks Build mode search player field' , function ()
{
    it('player search field ', function () {
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test&demo=true')
        cy.wait(1000);
        cy.get('.banner-menu__build-button').click()
        cy.get('.games-selection').click()
        cy.wait(2000)
        cy.get('app-game-filter-title > :nth-child(1) > :nth-child(1)').click({force:true})
       // cy.wait(2000)
        cy.intercept('GET','**/api/player/playersByGame*').as(`res`)
        cy.wait('@res').its('response.body').should('be.an','array')
            .then((response) => {

                let data = response
                let resultdata = [];
                let name = "";

                for (let i= 0 ; i<data.length ; i++){

                    resultdata.push({'name': data[i].name})

                    if(resultdata[0].name !== "" || resultdata[0].name !== null){
                      name = resultdata[0].name
                    }
                }
                cy.log(resultdata[0].name)
                cy.get('.players-dropdown__search').type(name)
                cy.get('.player-searched__icon > .icon').click()
                cy.get('.player-statistics__header > p').should('contain', name)
            })

    })
})