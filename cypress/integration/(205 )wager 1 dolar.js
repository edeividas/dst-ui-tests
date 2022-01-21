describe('learning' , function ()
{
    it('learning', function () {


        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test')
        cy.get('.tiered-block__item__top').click({force: true}) // click on first game btn
        cy.get('.over-under-block__selector').first().click()
        cy.get('input').click().type('1')
        cy.get('.bat-slip__item__block-btn__btn').click()
        cy.intercept('post','https://widgets-bm.dev.digitalsportstech.com/api/bet?demo=test').as(`arq`); // expect our req to be send
        cy.get('.bets-single__btn.btn-confirm').click()
        cy.wait('@arq',{responseTimeout:10000}).its('response.statusCode').should ('eq', 201)
        //cy.wait('@arq',{responseTimeout:10000}).its('response.body').should('include','id')



    })


})