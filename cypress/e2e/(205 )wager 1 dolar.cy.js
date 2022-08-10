 describe('Betbuilder - place bet wager for 1 dollar', function () {

    it('navigate and open a category/game', function () {
        cy.visit('/betbuilder?sb=test&demo=test');
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
                // cy.get('.main-markets__item--active').first().click({ force: true }); // click on first game btn
                cy.wait(3000);
                cy.get('.tiered-block__title').first({force: true}).click();
                cy.wait(3000);
            }
        });
    });

    it('adds market to betslip and fetches max exposure', function () {
        cy.log('checking if it fetches max exposure after placing bet');
        cy.intercept('POST', '**/api/bet/max-exposure*').as(`maxExposure`); // expect our req to be sent. add intercept before action.
        cy.get('.over-under-block__selector').first().click();
        cy.wait('@maxExposure').its('response.statusCode').should('eq', 201)
        cy.get('@maxExposure').its('response.body')
            .should('have.property', 'data')
            .should('have.deep.property', 'maxExposure').as('maxExposureValue')
            .should('be.greaterThan', 0);
        cy.get('@maxExposureValue').then(val => {
            cy.log('Max Exposure value fetched: ' + val.toString());
        });
    });

    it('place a bet for 1 dollar', function () {
        cy.get('.bat-slip').should('have.class', 'show-betslip'); // check betslip is open
        cy.get('input').click().type('1');
        cy.intercept('POST', '**/api/bet*').as(`betPlace`); // expect our req to be sent. add intercept before action.
        cy.get('.bat-slip__item__block-btn__btn').click(); // single bet
        cy.get('.btn-confirm').click(); // click place
        cy.wait('@betPlace').its('response.statusCode').should('eq', 201);
        //cy.wait('@arq',{responseTimeout:10000}).its('response.body').should('include','id')
    });

    it('placed the bet successfully', function () {
        cy.log('checking if it placed and shows successful confirmation');
        cy.get('.success'); // just checks for a "success" class anywhere

    });

    it('fetched max exposure after place bet', function () {
        cy.log('checking if it fetches max exposure after placing bet');
        cy.wait('@maxExposure').its('response.statusCode').should('eq', 201);
    });

});
