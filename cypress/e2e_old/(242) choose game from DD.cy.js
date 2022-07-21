describe('BB+widgets' , function ()
{
    it('player search field', function () {
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test')
        cy.wait(2000);
        cy.intercept('GET','/api/player/playersByGame*').as(`arq`)
        cy.get('.banner-menu__build-button').click()
        cy.get('.games-selection__select').first().click()
        cy.get('.games-dropdown__item-name').eq(2).click()

    })
})