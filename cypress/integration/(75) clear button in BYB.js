describe('BB+widgets' , function ()
{
    it('clear button in BYB', function () {
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test')
        cy.wait(5000);
        cy.intercept('GET','/api/player/playersByGame*').as(`arq`)
        cy.get('.banner-menu__build-button').click()
        cy.wait('@arq',{responseTimeout:30000}).its('response.body').should('not.be.null');
        cy.get('.icon.icon-add').eq(0).click()
        cy.wait(2000);
        cy.get('.build-form__clear-all').click()



    })
})