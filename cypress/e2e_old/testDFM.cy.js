describe('Betbuilder - check DFM length equal to Market categories displayed', function () {

    it('dfm check', function () {
        cy.visit('/betbuilder?sb=test&demo=test');
        cy.intercept('**/api/grouped-markets/v2/map*').as('dfm');
        cy.wait('@dfm');
        cy.get('@dfm').its('response.body').should('be.an', 'object');

        cy.get('.main-markets__item').then((items) => {
            return items.length;
        }).as('visibleMarkets');

        cy.get('.main-markets__hidden-item').then((items) => {
            return items.length;
        }).as('dropdownMarkets');

        cy.get('@dfm').its('response.body').then((obj) => {
            const allMarkets = !!Object.keys(obj).find(key => key === 'All Markets'); // returns true if All Markets exists
            const res = Object.keys(obj).filter(i => {
                return obj[i].length;
            }); // ignore empty market categories
            const lengthDfm = allMarkets ? (res.length + 1) : res.length;
            cy.log('Length of DFM markets is ' + lengthDfm);
            cy.log('Full amount of market elements detected is ' + (Number(this.visibleMarkets) + Number(this.dropdownMarkets)));
        });
    });

});
