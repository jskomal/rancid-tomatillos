describe('Review/Ratings Tests', () => {
  beforeEach(() => {
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      statusCode: 201,
      fixture: 'movies'
    }).as('movies')
    cy.intercept('POST', 'https://rancid-tomatillos.herokuapp.com/api/v2/login', {
      statusCode: 201,
      body: { user: { id: 81, name: 'Charlie', email: 'charlie@turing.io' } }
    }).as('Log In')
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/737173', {
      statusCode: 201,
      fixture: 'maraton'
    }).as('maraton')
  })

  it('should log in and route to a movie to review', () => {
    cy.visit('http://localhost:3000/login')
    .get('[name="email"]')
    .type('charlie@turing.io')
    .get('[name="password"]')
    .type('qwerty')
    .get('.login-button')
    .click()
    .get('.login-view')
    .wait(2000)
    .get('img[alt="Maratón After poster"]').click()
    .get('.review-view')
    .contains('your rating is:')
  })

  it('should be able to open and close the modal', () => {
    cy.get('#modalButton').click()
    .get('.modal-view')
    .contains('add your rating')
    .get('.close-button').click()
    .get('.review-view')
    .contains('your rating is:')
  })

  it('should be able to successfully add a review/rating', () => {
    cy.get('#modalButton').click()
    .get('input[name="ratingValue"]')
    .type('10')
    .get('#submitRatingButton').click()
    .get('.review-view')
    .contains('your rating is:')
  })
})
