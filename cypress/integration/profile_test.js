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

    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      statusCode: 201,
      fixture: 'movies'
    })
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
      .get('.movies-to-rate-view')
      .contains('Mulan')
      .get('.ratings-view')
      .contains('Trolls World Tour')
  })

  it('Should be able to delete a previous rating', () => {
    cy.intercept(
      'DELETE',
      'https://rancid-tomatillos.herokuapp.com/api/v2/users/81/ratings/3116',
      {
        statusCode: 204
      }
    ).as('Delete Trolls')

    cy.get('#446893Button').click()
  })

  it('Should be able to route to a unrated Movie by clicking the card', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/340102', {
      statusCode: 201,
      fixture: 'mutants'
    })

    cy.get('#340102').click().get('.single-movie-details').contains('Tagline')
  })
})
