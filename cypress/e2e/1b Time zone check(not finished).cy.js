const dayjs = require("dayjs");
const todaysDate = dayjs().format("MMM DD, YYYY");
const Timenow12hours = dayjs().format("hh:mm:ss a");

describe('BBv2' , function ()
{
    it('clear button in BYB', function () {
        cy.log(todaysDate)
        cy.log(Timenow12hours);
        cy.visit('/betbuilder?sb=test&demo=true')
        cy.wait(1000)
        //checks for active market
        cy.get('.main-markets__item--active')
            .invoke('text')
            .then((text) => {
                //checks or player filter is active/usable
                if(text.trim() !== 'Game Markets'){
                    cy.log('not game markets')

                    cy.get('.banner-menu__players > .banner-players').click()
                    cy.get(':nth-child(3) > .players-item__checkbox-wrapper > input').check()
                    cy.get('.banner-menu__players > .icon').click()
                    cy.get('.over-under-block__selector').first().click()
                    cy.get('.bat-slip__content').should('be.visible')
                    cy.get('.wager').type(1)
                    cy.get('.bat-slip__item__block-btn__btn').click({force:true})
                    cy.intercept('POST','**/api/bet?*').as('res')
                    cy.get('.btn-confirm').click({force:true})
                    cy.wait('@res').its('response.body').should('be.an','object')
                        .then((response) =>  {
                            let data = response;

                            cy.log(data.created)
                            cy.log(todaysDate)
                            cy.log(Timenow12hours);
                            cy.log(todaysDate)
                            //need to compare local and responsed time and make assert


                        })

                }
                if(text.trim() === 'Game Markets') {
                    cy.get('.main-markets__item--active').next()
                    cy.get('.banner-menu__players > .banner-players').click()
                    cy.get(':nth-child(3) > .players-item__checkbox-wrapper > input').check()
                    cy.get('.banner-menu__players > .icon').click()
                    cy.get('.over-under-block__selector').first().click()
                    cy.get('.bat-slip__content').should('be.visible')
                }

            })

    })
})