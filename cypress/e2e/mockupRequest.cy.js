describe('mockupRequest' , function ()
{
    it('check for invalid game prop market ID on bet place', function () {

        cy.visit('/betbuilder?sb=test&demo=test');
        cy.wait(3000); // delay for BB page to load up
        cy.get('.main-markets__item').find('p').contains('Game Props').click();
        cy.log('Game Props section is currently selected.');
        cy.wait(3000);
        cy.get('.shots-slider__item').first().click(); // click first Game Prop market
        cy.wait(3000);
        cy.get('input').click().type('1');

        // modify outgoing request https://runebook.dev/en/docs/cypress/api/commands/intercept?page=3#Asserting-on-a-request-1
        cy.intercept('POST', '**/api/bet*', (req) => {

            // example of supplying full request body
            // req.body = {
            //     name: 'Peter Pan',
            // }

            // replacing valid marketId (already exists in request body) with invalid data.
            req.body.marketId = "invalid_ID";
            req.body.events[0].title = req.body.events[0].title.split('ws_id:')[0] + "ws_id:invalid_ID";
            req.body.events[0].marketId = "invalid_ID";

        }).as(`betPlace`);

        cy.get('.bat-slip__item__block-btn__btn').click(); // single bet
        cy.get('.btn-confirm').click(); // click place
        cy.wait('@betPlace').its('response.statusCode').should('eql', 400);
        cy.log('Game Props market ID is not valid. Place bet rejected.');

    })
})