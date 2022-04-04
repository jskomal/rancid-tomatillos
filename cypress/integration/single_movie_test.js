describe('Single Movie View tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      statusCode: 201,
      fixture: 'movies'
    }).as('movies')

    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/340102', {
      statusCode: 201,
      fixture: 'mutants'
    }).as('mutants')

    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/737173', {
      statusCode: 201,
      fixture: 'maraton'
    }).as('maraton')
  })

  it('should display the same card from the main page', () => {
    cy.visit('http://localhost:3000/').get('img[alt="The New Mutants poster"]').click()

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

  it('should render an error message if the server is not reachable', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/337401', {
      statusCode: 500
    }).as('serverError')
    cy.visit('http://localhost:3000/337401')
      .get('.page-container')
      .contains('Something went wrong, try again later')
  })
})
