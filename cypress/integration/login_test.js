describe('Login Flow Test', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      statusCode: 201,
      body: {
        movies: [
          {
            id: 337401,
            poster_path:
              'https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg',
            backdrop_path:
              'https://image.tmdb.org/t/p/original//zzWGRw277MNoCs3zhyG3YmYQsXv.jpg',
            title: 'Mulan',
            average_rating: 5.2727272727272725,
            release_date: '2020-09-04'
          },
          {
            id: 340102,
            poster_path:
              'https://image.tmdb.org/t/p/original//xrI4EnZWftpo1B7tTvlMUXVOikd.jpg',
            backdrop_path:
              'https://image.tmdb.org/t/p/original//eCIvqa3QVCx6H09bdeOS8Al2Sqy.jpg',
            title: 'The New Mutants',
            average_rating: 4,
            release_date: '2020-08-26'
          },
          {
            id: 737173,
            poster_path:
              'https://image.tmdb.org/t/p/original//opZKcgocttEOAUzqluX3bUbbDew.jpg',
            backdrop_path: 'https://www.esm.rochester.edu/uploads/NoPhotoAvailable.jpg',
            title: 'Maratón After',
            average_rating: 4.333333333333333,
            release_date: '2020-09-03'
          }
        ]
      }
    }).as('movies')
  })

  it('should have a title and inputs for email and password', () => {
    cy.visit('http://localhost:3000')
    cy.get('#logButton')
    .click()
    .get('.login-view')
    .contains('Log In')
    .get('[name="email"]').should('be.visible')
    .get('[name="password"]').should('be.visible')
  })

  it('should be able to login successfully', () => {
    cy.intercept('POST', 'https://rancid-tomatillos.herokuapp.com/api/v2/login', {statusCode: 201, body: {user: {id: 81, name: "Charlie", email: "charlie@turing.io"}}}).as('Log In')
    .get('[name="email"]').type('charlie@turing.io')
    .get('[name="password"]').type('qwerty')
    .get('.login-button').click()
    .get('.login-view').contains('Success, Routing you to the home page!')
  })

  it('should show an error message if login is unsuccessful', () => {
    cy.intercept('POST', 'https://rancid-tomatillos.herokuapp.com/api/v2/login', {statusCode: 403}).as('Log In')
    .get('[name="email"]').type('charlie@turing.io')
    .get('[name="password"]').type('password')
    .get('.login-button').click()
    .get('.login-view').contains('Incorrect email and password combination')
  })
})
