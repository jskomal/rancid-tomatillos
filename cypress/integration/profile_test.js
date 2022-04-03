describe('Profile view tests', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://rancid-tomatillos.herokuapp.com/api/v2/login', {
      statusCode: 201,
      body: { user: { id: 81, name: 'Charlie', email: 'charlie@turing.io' } }
    }).as('Log In')

    cy.intercept(
      'GET',
      'https://rancid-tomatillos.herokuapp.com/api/v2/users/81/ratings',
      {
        statusCode: 201,
        fixture: 'profile'
      }
    ).as('Get Ratings')
  })

  it('Should log in and route to the profile page', () => {
    cy.visit('http://localhost:3000/login')
      .get('[name="email"]')
      .type('charlie@turing.io')
      .get('[name="password"]')
      .type('qwerty')
      .get('.login-button')
      .click()
      .get('.login-view')
      .contains('Success, Routing you to the home page!')
      .wait(2000)
      .get('#profileButton')
      .click()
      .get('.profile-view')
      .contains("Welcome to Charlie's Rating Room")
  })
})
