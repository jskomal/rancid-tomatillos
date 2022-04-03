describe('Login Flow Test', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      statusCode: 201,
      fixture: 'movies'
    }).as('movies')
  })

  it('should have a title and inputs for email and password', () => {
    cy.visit('http://localhost:3000')
    cy.get('#logButton')
      .click()
      .get('.login-view')
      .contains('Log In')
      .get('[name="email"]')
      .should('be.visible')
      .get('[name="password"]')
      .should('be.visible')
  })

  it('should be able to login successfully', () => {
    cy.intercept('POST', 'https://rancid-tomatillos.herokuapp.com/api/v2/login', {
      statusCode: 201,
      body: { user: { id: 81, name: 'Charlie', email: 'charlie@turing.io' } }
    })
      .as('Log In')
      .get('[name="email"]')
      .type('charlie@turing.io')
      .get('[name="password"]')
      .type('qwerty')
      .get('.login-button')
      .click()
      .get('.login-view')
      .contains('Success, Routing you to the home page!')
  })

  it('should show an error message if login is unsuccessful', () => {
    cy.intercept('POST', 'https://rancid-tomatillos.herokuapp.com/api/v2/login', {
      statusCode: 403
    })
      .as('Log In')
      .visit('http://localhost:3000/login')
      .get('[name="email"]')
      .type('charlie@turing.io')
      .get('[name="password"]')
      .type('password')
      .get('.login-button')
      .click()
      .get('.login-view')
      .contains('Incorrect email and password combination')
  })

  it('should show an error message if there is a server error', () => {
    cy.intercept('POST', 'https://rancid-tomatillos.herokuapp.com/api/v2/login', {
      statusCode: 500
    })
      .as('Log In')
      .visit('http://localhost:3000/login')
      .get('[name="email"]')
      .type('charlie@turing.io')
      .get('[name="password"]')
      .type('password')
      .get('.login-button')
      .click()
      .get('.login-view')
      .contains('Something went wrong, please try again later')
  })

  it('should require both inputs to be filled for submission', () => {
    cy.visit('http://localhost:3000/login')
      .get('.login-button')
      .click()
      .get('.login-view')
      .contains('You must provide an email and password to submit')
  })
})
