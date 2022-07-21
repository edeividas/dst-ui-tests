describe('BB+widgets' , function ()
{
    it('press stats button', function () {
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test&demo=true')
        cy.wait(2000);
        cy.intercept('GET','/api/player/playersByGame*').as(`arq`)
        //cy.get('.games-selection__selec').eq(2).click()
        cy.get('.main-markets__item').eq(3).click()
        cy.get('.tiered-block__item__top').first().click()
        cy.get('.over-under-block__statistics').first().click()





    })
})