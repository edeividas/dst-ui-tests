describe('BB+widgets' , function ()
{
    it('clear button in BYB', function () {
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test')
        cy.wait(2000);
        cy.intercept('GET','/api/player/playersByGame*').as(`arq`)
        cy.get('.ligues-slider__ligue-name').eq(2).click()
        cy.get('.icon.icon-header-dropdown').first().click()
    })
})