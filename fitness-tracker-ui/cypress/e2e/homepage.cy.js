describe('Homepage', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Register')
    cy.contains('Login')
  })
})