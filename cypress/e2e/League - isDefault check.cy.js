describe('Checks is selected league isDefault league ', () => {

    it('Check is isDefault', () => {
        let acron = "";
        cy.intercept('GET','**/api/league?sb=test&user=demo&group=bb*').as('res')
        cy.visit('/betbuilder?sb=test&demo=test&user=demo')
        cy.wait('@res').its('response.body').should('be.an', 'array')
        .then((response) => {
           // cy.log(response[0].isActive)
            let data = response;
            let resultdata = [];

            for (let i= 0 ; i<data.length ; i++){
                 //cy.log(data[i].acronym, data[i].isActive)
                 resultdata.push({'acronym': data[i].acronym, 'isDefault': data[i].isDefault})
                 //cy.log('default',typeof data[i].isDefault)
                 if(data[i].isDefault === true){
                    acron = data[i].acronym
                    cy.log(acron)
                }

            }
                cy.get('.ligues-slider__item--selected').should('contain', acron)

                cy.get('div.ligues-slider__item--selected > .ligues-slider__count ')
                    .invoke('text')
                    .then(parseInt)
                    .should('match', /^[1-9][0-9]?$|^100$/  )
                    .should('be.an', 'number')
                    .should('be.greaterThan', 0)

        })

    })

})