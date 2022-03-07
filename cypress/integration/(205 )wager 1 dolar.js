describe('learning' , function ()
{
    it('learning', function () {


        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test&demo=true')
        cy.get('.ligues-slider__item--selected').find('.ligues-slider__ligue-name')
            .as('isNBA');

        cy.get('@isNBA').invoke('text').then(text => {
            cy.log(text);

            if (text.trim() === 'NBA') {

                cy.get('.main-markets__item').find('p').contains('Points').click()// click on Points market
                cy.get('.props').get('div').first().click()
                cy.get('input').click().type('1')
                cy.get('.bat-slip__item__block-btn__btn').click()
                cy.intercept('post', 'https://widgets-bm.dev.digitalsportstech.com/api/bet?demo=test').as(`arq`); // expect our req to be send
                cy.get('.bets-single__btn.btn-confirm').click()
                cy.wait('@arq', {responseTimeout: 10000}).its('response.statusCode').should('eq', 201)
            } else {
                cy.log('not NBA');
            }
        })
    })

})