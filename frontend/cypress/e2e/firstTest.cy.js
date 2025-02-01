describe('template spec', () => {

  // beforeEach(function () {
  //   cy.task('db:seed')
  //   cy.loginByGoogleApi()
  // })


  it('login', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-testid="cypress-login-button"]').should('exist')

  })


})