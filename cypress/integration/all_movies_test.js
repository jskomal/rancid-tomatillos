describe('All Movies View Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/')
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
    cy.wait(2000) // how to use aliasing to wait one the GET is finished
    cy.get('.search').type('Mulan').get('img[alt="Mulan poster"]').should('be.visible')
  })

  // add test for api server not responding (test error message) (will implement after Routing)
})
