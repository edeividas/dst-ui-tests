describe('BB+widgets' , function ()
{
    it('clear button in BYB', function () {
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test')
        cy.wait(2000)
        cy.intercept('GET','/api/player/playersByGame*').as(`arq`)
        cy.get('.banner-menu__build-button').click()
        cy.wait(2000)
        cy.get('.icon.icon-add').eq(0).click()
        cy.get('.build-form__statistics-head').click()
        cy.wait(2000)
        cy.get('.build-form__statistics-item').eq(1).click()
        cy.get('.build-form__counter-plus').click()
        cy.get('.build-form__button').click()
        


    })
})