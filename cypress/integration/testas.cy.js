describe('Betbuilder - place bet wager for 1 dollar', function () {

    it('should add selection(s) and place a bet for 1 dollar', function () {
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test&demo=test&user=deividas1');
        cy.wait(3000); // delay for BB page to load up
        let selectedMarket; // set a variable that we will use to check conditions
        cy.get('.main-markets__item--active').invoke('text').then((text) => {
            // regular cypress logic asserts something to be true i.e. if something is not true then the test will fail overall.
            // instead because betbuilder has dynamic data (changes a lot), you can use regular javascript "if/else" conditions.
            // this means you can check and do different things in the same test, depending on what data is loaded on the betbuilder.
            if (text.trim() === 'Game Markets') {
                cy.log('Game Markets category currently selected.');
                selectedMarket = 'GFM'; // set variable for game markets
            }
            if (selectedMarket === 'GFM') {
                // check if variable is set for Game markets
                cy.log('running test against Game Markets section');
                cy.get('.tiered-block__item__top').first().click({ force: true }); // click on first game btn
                cy.get('.markets-block__selector').not('.inactive').first().click();
                cy.get('.silkScreen').click();
                cy.get('.markets-block__selector').not('.inactive').not('.markets-block__selector--selected').as('buttonNotSelectedNotInactive');
                cy.get('@buttonNotSelectedNotInactive').first().click();
                cy.get('p.header-info__item').as('betslipButton').should('contain.text', 'Slip');
                cy.get('@betslipButton').click();
                cy.get('input').click().type('1');
                cy.get('.bat-slip__accumulator__btn').click(); // game markets are only for accumulators
                cy.intercept('POST', '**/api/bet*').as(`betPlace`); // expect our req to be sent. add intercept before action.
                cy.get('.btn-confirm').click(); // click place
                cy.wait('@betPlace').its('response.statusCode').should('eq', 201);
                //cy.wait('@arq',{responseTimeout:10000}).its('response.body').should('include','id')
            } else {
                // if variable is not GFM then do this instead
                cy.log('Non-GFM market category is currently selected.');
                cy.get('.main-markets__item--active').first().click({ force: true }); // click on first game btn
                cy.get('.over-under-block__selector').first().click();
                cy.get('.text-bg').as('betslipButton').its('text').should('contain.text', 'Slip');
                cy.get('@betslipButton').click();
                cy.get('.bat-slip__item__block-btn__btn').click();
                cy.get('input').click().type('1');
                cy.intercept('POST', '**/api/bet*').as(`betPlace`); // expect our req to be sent. add intercept before action.
                cy.get('.bat-slip__item__block-btn__btn').click(); // single bet
                cy.get('.btn-confirm').click(); // click place
                cy.wait('@betPlace').its('response.statusCode').should('eq', 201);
                //cy.wait('@arq',{responseTimeout:10000}).its('response.body').should('include','id')
            }
        });
    });

    it('placed the bet successfully', function () {
        cy.log('checking if it placed and shows successful confirmation');
        cy.get('.success'); // just checks for a "success" class anywhere
    });

});
