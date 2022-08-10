describe('Betbuilder - select NBA and place wager for 1 dollar', function () {
    it('find NBA', function () {
        cy.visit('/betbuilder?sb=test&demo=true');
        cy.wait(3000); // delay for BB page to load up
        cy.get('.ligues-slider__item--selected').find('.ligues-slider__ligue-name')
            .as('isNBA');
        cy.get('@isNBA').invoke('text').then(text => {
            if (text.trim() === 'NBA') {
                cy.log('NBA is selected');
            } else {
                cy.log('not NBA');
            }
        });
        cy.wait(3000); // delay for categories to load
    });

    it('should select Points', function () {
        cy.get('.main-markets__item').find('p').contains('Points').click(); // click on Points market
        cy.get('.main-markets__item').invoke('text').then((text) => {
            cy.log(text);
            if (text.trim().toLowerCase() === 'all markets') {
                // single game is selected so Points markets on this game should already be "opened"
                cy.get('.props').get('div').first().click();
            } else {
                // more than 1 game available ("All Games" in dropdown) so need to select a game first
                cy.get('.tiered-block__item__top').first().click({ force: true }); // click on first game btn
                cy.get('.shots-slider__item').first().click();
            }
        });
    });

    it('should place a bet', function() {
        cy.get('input').click().type('1');
        cy.get('.bat-slip__item__block-btn__btn').click();
        cy.intercept('post', '**/api/bet*').as(`arq`); // expect our req to be sent. intercept added before action.
        cy.get('.bets-single__btn.btn-confirm').click();
        cy.wait('@arq').its('response.statusCode').should('eq', 201);
    });

});
