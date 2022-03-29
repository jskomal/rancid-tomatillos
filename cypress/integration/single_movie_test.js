describe('Single Movie View tests', () => {
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

    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/340102', {
      statusCode: 201,
      body: {
        movie: {
          id: 340102,
          title: 'The New Mutants',
          poster_path:
            'https://image.tmdb.org/t/p/original//xrI4EnZWftpo1B7tTvlMUXVOikd.jpg',
          backdrop_path:
            'https://image.tmdb.org/t/p/original//eCIvqa3QVCx6H09bdeOS8Al2Sqy.jpg',
          release_date: '2020-08-26',
          overview:
            'Five young mutants, just discovering their abilities while held in a secret facility against their will, fight to escape their past sins and save themselves.',
          genres: ['Action', 'Science Fiction', 'Horror', 'Adventure'],
          budget: 67000000,
          revenue: 3100000,
          runtime: 94,
          tagline: "It's time to face your demons",
          average_rating: 4
        }
      }
    }).as('mutants')

    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/737173', {
      statusCode: 201,
      body: {
        movie: {
          id: 737173,
          title: 'Maratón After',
          poster_path:
            'https://image.tmdb.org/t/p/original//opZKcgocttEOAUzqluX3bUbbDew.jpg',
          backdrop_path: 'https://www.esm.rochester.edu/uploads/NoPhotoAvailable.jpg',
          release_date: '2020-09-03',
          overview: '',
          genres: [],
          budget: 0,
          revenue: 0,
          runtime: 0,
          tagline: '',
          average_rating: 4.333333333333333
        }
      }
    }).as('maraton')

    cy.visit('http://localhost:3000/').get('img[alt="The New Mutants poster"]').click()
  })

  it('should display the same card from the main page', () => {
    cy.get('img[alt="The New Mutants poster"]').should('be.visible')

    cy.get('.poster-title').contains('The New Mutants')

    cy.get('.stars').should('be.visible')

    cy.get('.footer-r').contains('2020')
  })

  it('should render a backdrop image', () => {
    cy.get('.backdrop-img').should('be.visible')
  })

  it('can render a tagline, overview, genres, budget, revenue, and runtime', () => {
    cy.get('.movie-detail').contains('Tagline')
    cy.get('.movie-detail').contains('Overview')
    cy.get('.movie-detail').contains('Genre')
    cy.get('.movie-detail').contains('Budget')
    cy.get('.movie-detail').contains('Revenue')
    cy.get('.movie-detail').contains('Runtime')
  })

  it('can also render no tagline, overview, etc', () => {
    cy.get('.home-button').click()

    cy.get('img[alt="Maratón After poster"]').click()

    cy.wait('@maraton')

    cy.get('.movie-detail-error').contains('No information is available for this movie')
  })
})