describe('Language check', () => {
    it('Checks ES-ES language', () => {
        //modify request body
        cy.intercept('GET', '**/api/application-config*',

            {
                "name": "test",
                "demo": true,
                "settings": {
                    "currency": "usd",
                    "language": "es-es",
                    "theme": "demo",
                    "layout": null,
                    "showMyBets": true,
                    "showAltTitle": null,
                    "showLeagueSchedule": true,
                    "allowLiveGames": true,
                    "odds": {
                        "default": "decimal",
                        "options": ["decimal", "american"]
                    },
                    "lowerCaseUsersExposure": false,
                    "allowCaseSensitiveUsers": true,
                    "logo": {"name": false, "link": "https://www.digitalsportstech.com/"},
                    "allowMixedMultiOnly": false
                },
                "ou": true,
                "pph": false
            }
        ).as('lang')


        cy.visit('https://widgets-bm.dev.digitalsportstech.com/betbuilder?sb=test&demo=test&user=demo')
        cy.wait('@lang').its('response.statusCode').should('eq', 200)

    })
    it('Checks for UI language changes',() => {
        cy.get('div > .header-info__item').contains('Boleto')
        cy.get(' .main-navigation__item > p.cap').should('have.text', 'Mis apuestas')
        cy.get('.header__logo > p').contains('Construir Props')
        cy.get('.header-info__item').contains('Acumuladas Especiales Cuotas:')

    })
})