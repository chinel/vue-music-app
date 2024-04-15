/* eslint-disable cypress/no-unnecessary-waiting */
describe('Audio Player', () => {
  it('Plays Audio', () => {
    cy.visit('/')
    cy.get('.composition-name:first').click()
    cy.get('#play-btn').click()
    cy.wait(5000)
    cy.get('#player-play-btn').click()
  })
})
