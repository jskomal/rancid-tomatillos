describe('All Movies View Tests', () => {
  beforeEach(() => {
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      statusCode: 201,
      fixture: 'movies'
    }).as('movies')
  })

  it('Should have a header with a title, home button, search bar, and log in button', () => {
    cy.visit('http://localhost:3000/')

    cy.get('header').contains('rancid tomatillos')

    cy.get('.home-button').contains('home')

    cy.get('.search').should('have.value', '')

    cy.get('.log-button').contains('log in')
  })

  it('Should render a movie posters', () => {
    cy.get('img[alt="Mulan poster"]').should('be.visible')
  })

  it('Should render a movie title', () => {
    cy.get('.poster-title').contains('Mulan')
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

  it('should render an error message if the server is not, reachable', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      statusCode: 500
    }).as('serverError')
    cy.visit('http://localhost:3000/')
      .get('.page-container')
      .contains('Server Error, try Rotten Tomatoes instead')
  })
})
