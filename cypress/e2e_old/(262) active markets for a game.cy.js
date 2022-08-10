describe('BB+widgets' , function ()
{
    it('check wizard active markets', function () {
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test&demo=true')
        cy.wait(3000);
        cy.get('.main-markets__item').eq(1).click();
        cy.intercept('GET','/api/game-props/marketsByGp*').as(`arq`);
        cy.get('.tiered-block__title').first().click();
        cy.wait('@arq',{responseTimeout:5000}).its('response.body').should('no');
        cy.wait(3000);
        //cy.get('@arq').its('response.body').its('length');
        if ('@arq') { // patikrina ar response body turi reikšmę
            cy.log('there are game props'); // log gražina žinutę po if funkcijos
            cy.get('@arq').its('response.body').as('num'); // gražina atsakymo turini
            cy.get('@num').its('length') // nurodoma kad mnumeris turi ilgi t.y vertę
                .then(num =>
            cy.get('app-main-stats-game-props > .desktop').children().its('length').should('equal', num) // nurodyto elemento "vaikai" turetu buti lygūs rastai lenght vertei
                );
        } else {
            cy.log('it is an empty array of game props');
        }
    })
})