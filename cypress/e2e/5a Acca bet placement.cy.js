describe('Acca Bet Placement', () => {
    it('Place acca bet', () => {
        cy.visit('/betbuilder?sb=test&demo=test&user=demo')
        cy.get('.ligues-slider__item--selected')

        const kiek = cy.get('div.ligues-slider__item--selected > .ligues-slider__count ')
            .invoke('text')
            .then(parseInt)
            .then((kiek) => {
                cy.log(kiek)

                if (kiek === 1) {
                    cy.log(kiek)
                   // cy.get('.games-selection__select').click()
                    cy.wait(1000)
                   // cy.get('app-game-filter-title > :nth-child(1) > :nth-child(2)').first().click()
                   // cy.wait(2000)
                    cy.get('.main-markets__item').contains('Game Markets').click()
                    cy.get('.markets-block__selector').first().click()
                    cy.get('.bat-slip__header__btn.btn-remove').click()
                    cy.get('.main-markets__item').contains('Over/Under').click()
                    cy.get('.over-under-block__selector').first().click()
                    cy.get('.header__info').click()
                    cy.get('.wager').first().type(1)
                    cy.intercept('POST', '**/api/bet?*').as('bet')

                    cy.get('.bat-slip__accumulator__btn').click({force: true})
                    cy.get('.btn-confirm').click({force: true})
                    cy.wait(3000)
                    cy.wait('@bet').its('response.statusCode').should('eq', 201)
                    cy.get('.bets-single__success__content > .bets-single__accumulator__text > span')
                        .should('contain.text', 'Your bet was successfully submitted.')
                    cy.get('@bet').its('response.body')
                        .should('have.property', 'id').as('betid')
                    cy.get('@betid').should('not.be.null')
                        .should('match', /^[0-9]*[1-9][0-9]*$/) //regex for positive integers

                } else if (kiek > 1) {

                    cy.get('.games-selection__select').click()
                    cy.wait(1000)
                    cy.get('app-game-filter-title > :nth-child(1) > :nth-child(2)').first().click()
                    cy.get('.markets-block__selector').first().click()
                    cy.get('.bat-slip__header__btn.btn-remove').click()
                    cy.get('.main-markets__item').contains('Over/Under').click()
                    cy.get('.over-under-block__selector').first().click()
                    cy.get('.header__info').click()
                    cy.get('.wager').first().type(1)
                    cy.intercept('POST', '**/api/bet?*').as('bet')

                    cy.get('.bat-slip__accumulator__btn').click({force: true})
                    cy.get('.btn-confirm').click({force: true})
                    cy.wait(3000)
                    cy.wait('@bet').its('response.statusCode').should('eq', 201)
                    cy.get('.bets-single__success__content > .bets-single__accumulator__text > span')
                        .should('contain.text', 'Your bet was successfully submitted.')
                    cy.get('@bet').its('response.body')
                        .should('have.property', 'id').as('betid')
                    cy.get('@betid').should('not.be.null')
                        .should('match', /^[0-9]*[1-9][0-9]*$/) //regex for positive integers

                    cy.log('Games count on this League is:' + ' ' + kiek)

                } else {

                    cy.log('error smth goes wrong!')
                }

            })
    })
    it('Checks acca maxExposure,odds response', () => {
        cy.wait(2000)
        cy.intercept('POST', '**/api/bet/max-exposure*').as('expo')

        cy.get('.bets-single__success__btn-close').click()
        cy.wait('@expo').should('be.an', 'object').then((res) => {
            const ant = res.request.body
            const ant1 = res.response.body

            cy.log(JSON.stringify(ant))

            if (ant.events.length === 2) {
                cy.log(JSON.stringify(ant1.data))
                //maxWager should be returned?
                cy.get('@expo').its('response.body.data').should('have.keys', 'odds', 'maxExposure')

                cy.log('Odds returned :' + ' ' + ant1.data.odds)
                cy.log('maxExposure returned' + ' ' + ant1.data.maxExposure)
            }
        })
    })


    it('Cheks acca error message with alowed wager amount ', function () {
            cy.visit('/betbuilder?sb=test&demo=test&user=demo')
            cy.get('.ligues-slider__item--selected')

            const kiek = cy.get('div.ligues-slider__item--selected > .ligues-slider__count ')
                .invoke('text')
                .then(parseInt)
                .then((kiek) => {
                    cy.log(kiek)

                    if (kiek === 1) {
                        cy.log(kiek)
                      //  cy.get('.games-selection__select').click()
                        cy.wait(1000)
                       // cy.get('app-game-filter-title > :nth-child(1) > :nth-child(2)').first().click()
                       // cy.wait(2000)
                        cy.get('.main-markets__item').contains('Game Markets').click()
                        cy.get('.markets-block__selector').first().click()
                        cy.get('.bat-slip__header__btn.btn-remove').click()
                        cy.get('.main-markets__item').contains('Over/Under').click()
                        cy.get('.over-under-block__selector').first().click()
                        cy.get('.header__info').click()
                        cy.get('.wager').first().type(9999)
                        cy.get('.error__text > p')
                            .should('contain.text','Max wager limit exceeded. Limit for this bet is ')

                    } else if (kiek > 1) {

                        cy.get('.games-selection__select').click()
                        cy.wait(1000)
                        cy.get('app-game-filter-title > :nth-child(1) > :nth-child(2)').first().click()
                        cy.get('.markets-block__selector').first().click()
                        cy.get('.bat-slip__header__btn.btn-remove').click()
                        cy.get('.main-markets__item').contains('Over/Under').click()
                        cy.get('.over-under-block__selector').first().click()
                        cy.get('.header__info').click()
                        cy.get('.wager').first().type(9999)
                        cy.get('.error__text > p')
                            .should('contain.text','Max wager limit exceeded. Limit for this bet is ')

                    } else {

                        cy.log('error smth goes wrong!')
                    }
                })

    })

})


