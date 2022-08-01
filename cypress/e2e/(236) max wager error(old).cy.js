describe('BB+widgets' , function ()
{
    it('max wager error', function () {
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test')
        cy.get('.ligues-slider__item--selected').find('.ligues-slider__ligue-name')
            .as('isNBA');
        cy.wait(3000);
        cy.intercept('GET','/api/player/playersByGame*').as(`arq`)
        cy.get('.tiered-block__item__top').first().click()
        cy.get('.over-under-block__selector-text').first().click()
        cy.get('input').click().type('9999')
        



    })
})