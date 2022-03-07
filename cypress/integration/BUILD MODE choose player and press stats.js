describe('learning' , function ()
{
    it('press player stats', function () {


        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test')
        //cy.get('.icon-a-football').first().click(); // nuorodos visose lygose tos pačios todėl reikia nurodyt lygos ikoną norint ką atodayti
        cy.wait(5000); //kadangi puslapis per greit atsidaro reikia uždėti ilgesnį laukimą kad testas spėtų kartu su puslapiu
        cy.intercept('GET','/api/player/playersByGame*').as(`arq`); // test body po get raso pilna API, būtina parasyti pilna GET pavadinimą
        cy.get('.banner-menu__build-button').first().click();
        // cy.get('.player-searched__icon').first().click()
        cy.wait('@arq',{responseTimeout:30000}).its('response.body').should('not.be.null');
        cy.get('@arq').its('response.body').as('res'); //
        const res = cy.get('@res'); // const nustato vardą kintamąjam
        if (res.length) { // patikrina ar response body turi reikšmę
            cy.log('there are players in the array'); // log gražina žinutę po if funkcijos
        } else {
            cy.log('it is an empty array');
            cy.wait(5000) // uždėtas laukimas, kad pažiūrėt kas pasikeičia, nebūtina
            cy.get('.games-selection__select').first().click()// pasirinkti game su aktyviais žaidėjais
            cy.get('.games-dropdown__item-name').eq(2).click()// eq leidzia pasirinkti nurodyta elementa is sąrašo
        }
    })
})