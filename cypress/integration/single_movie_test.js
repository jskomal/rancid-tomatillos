describe('Single Movie View tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/')
      .visit('http://localhost:3000/')
      .get('img[alt="The New Mutants poster"]')
      .click()
  })

  it('should display the same card from the main page', () => {
    cy.get('img[alt="Mulan poster"]').should('be.visible')

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
    cy.wait(2000) // same issue as before, how to correctly use aliasing to wait dynamically
    cy.get('.home-button').click()

    cy.get('img[alt="Maratón After poster"]').click()

    cy.get('.movie-detail-error').contains('No information is available for this movie')
  })
})
