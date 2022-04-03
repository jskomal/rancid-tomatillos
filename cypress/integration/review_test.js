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
  })
})
