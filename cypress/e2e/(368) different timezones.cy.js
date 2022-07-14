const dayjs = require("dayjs");
const todaysDate = dayjs().format("MMM DD, YYYY");
const Timenow12hours = dayjs().format("hh:mm:ss a");

describe('BBv2' , function ()
{
    it('clear button in BYB', function () {
        cy.log(todaysDate)
        cy.log(Timenow12hours);
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test&demo=true')
        cy.wait(3000);
        cy.intercept('GET','/api/player/playersByGame*').as(`arq`)
        cy.get('.games-selection__select').first().click()
       // cy.wait('@arq',{responseTimeout:30000}).its('response.body').should('not.be.null');
        cy.get('.games-dropdown__item-name').eq(1).click()




    })
})