describe('BB+widgets' , function ()
{
    it('player search field', function () {
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test')
        cy.wait(2000);
        cy.intercept('GET','/api/player/playersByGame*').as(`arq`)
        cy.get('.banner-menu__build-button').click()
        cy.get('.players-dropdown__search.ng-pristine.ng-valid.ng-touched').click().type('a')
        cy.wait('@arq',{responseTimeout:30000}).its('response.body').should('not.be.null');




    })
})