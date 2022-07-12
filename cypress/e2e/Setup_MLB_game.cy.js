describe('Setting up MLB game', () => {
    it('Go to Backend and set up MLB game', () => {
       //cy.visit('https://backend.dev.digitalsportstech.com',{failOnStatusCode: false})
        cy.visit('https://backend.dev.digitalsportstech.com/propbetting/game-manager',{failOnStatusCode: false})
        cy.get('[type="text"]').type('admin')
        cy.get('[type="password"]').type('udEq8eAkHFTj')
        cy.get('.btn').click()
    })
    it('find ', () => {
       // cy.get(':nth-child(58) > a').should('be.visible').click()
        cy.visit('https://backend.dev.digitalsportstech.com/propbetting/game-manager',{failOnStatusCode: false})
        //cy.viewport(1600, 1000)
        cy.get('[type="text"]').type('admin')
        cy.get('[type="password"]').type('udEq8eAkHFTj')
        cy.get('.btn').click()
        cy.get(':nth-child(58) > a').click()
        cy.get('.tabbable > .nav > :nth-child(7) > a').click()
        cy.wait(2000)
        //cy.get('#Grid143 > tbody')
         
      //  if (cy.get('#Grid143 > tbody > :nth-child(1) > :nth-child(4)').contains('Pregame')) {
       //        cy.get('#Grid143 > tbody > :nth-child(1) > :nth-child(1) > .active-checkbox').should('not.be.checked')

      //  }
        
      if (  cy.get('#Grid143 > tbody > :nth-child(1) > :nth-child(4)').contains('Pregame') &&
        cy.get('#Grid143 > tbody > :nth-child(1) > :nth-child(1) > .active-checkbox').should('not.be.checked'))
{

        // do smth
        cy.get('#Grid143 > tbody > :nth-child(1) > :nth-child(1) > .active-checkbox').should('not.be.checked').check()
} else {

}   

})
})