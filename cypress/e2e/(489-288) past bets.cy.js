describe('BB+widgets' , function ()
{
    it('clear button in BYB', function () {
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test')
        cy.wait(5000);
        cy.intercept('GET','/api/player/playersByGame*').as(`arq`)
        cy.get('.icon.icon-my-bets-icon').click()
        cy.get('.open-bets__select__item__label').eq(1).click()

    })
})