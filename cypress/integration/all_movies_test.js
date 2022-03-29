describe('All Movies View Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/', {
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

    cy.visit('http://localhost:3000/')
  })

  it('Should have a header with a title, home button, search bar, and log in button', () => {
    cy.get('header').contains('rancid tomatillos')

    cy.get('.home-button').contains('home')

    cy.get('.search').should('have.value', '')

    cy.get('.log-button').contains('log in')
  })

  it('Should render a movie posters', () => {
    cy.get('img[alt="Mulan poster"]').should('be.visible')
  })

  it('Should render a movie title', () => {
    cy.get('.poster-title').contains('Money Plane')
  })

  it("Should render a movie poster's rating", () => {
    cy.get('.stars').should('be.visible')
  })

  it("Should render a movie poster's release year", () => {
    cy.get('.footer-r').contains('2020')
  })

  it('Should be able to type in the search bar and filter movie results', () => {
    cy.get('.search').type('Mulan').get('img[alt="Mulan poster"]').should('be.visible')
  })

  // add test for api server not responding (test error message) (will implement after Routing) and add aliasing waits for consistent results
})
