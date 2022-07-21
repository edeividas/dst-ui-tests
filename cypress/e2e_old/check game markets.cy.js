describe('learning' , function ()
{
    it('Quick picks mode: check game markets', function () {
        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test&demo=true')
        cy.intercept('GET','/api/grouped-markets/groupedByCategory*',{query:{category:'gfm'}}).as(`arq`);
        cy.get('.main-markets__item').first().click()
        //cy.wait('@arq',{responseTimeout:10000}).its('response.statusCode').should ('eq', 200)
            cy.wait('@arq',{responseTimeout:10000}).its('response.body').should('not.be.null')
    })
})