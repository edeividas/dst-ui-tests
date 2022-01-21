describe('BB+widgets' , function ()
{
    it('clear button in BYB', function () {
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test')
        cy.wait(2000);
        cy.intercept('GET','/api/player/playersByGame*').as(`arq`)
        cy.get('.ligues-slider__ligue-name').eq(2).click()
        cy.wait(2000)
        cy.get('.main-markets__item').eq(1).click()
        cy.get('.tiered-block__item').first().click()
        cy.wait(2000)
        cy.intercept('POST','/api/cm-exposure').as(`exp`)
        cy.get('.shots-slider__item.sliderItem.hoverStyle').eq(2).click()
        cy.wait('@exp',{responseTimeout:10000}).its('response.body').should('not.be.null')
        cy.get('@exp').its('response.body').as('exp_res')
            .should('have.property', 'data')



    })
})