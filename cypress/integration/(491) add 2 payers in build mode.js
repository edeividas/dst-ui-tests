
describe('BB+widgets' , function ()
{
    it('2 players in build mode', function () {
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test&demo=true');
        cy.wait(5000); // nerodė žaidėjų nes per greit užsikrovė, todėl reikia duot palaukt
        cy.intercept('GET','/api/player/playersByGame*').as(`arq`)
        cy.get('.banner-menu__build-button').first().click()
        cy.wait('@arq',{responseTimeout:30000}).its('response.body').should('not.be.null'); // kai atsiranda erroras dėl laukimo
        cy.get('.build-form__tab').eq(1).click()
        cy.wait(2000);
        cy.get('.icon.icon-add').eq(0).click()
        cy.get('.icon.icon-add').eq(1).click()




    })
})