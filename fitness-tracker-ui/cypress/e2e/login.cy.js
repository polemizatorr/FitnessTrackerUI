describe('User Login', () => {
    it('should login as a test user', () => {
      // Visit your application's homepage
      cy.visit('http://localhost:3000/')
      
      // Fill out the registration form
      cy.get('[data-cy=username-login-input]').type('testuser123')
      cy.get('[data-cy=password-login-input]').type('SecurePassword123!')
      
      // Submit the form
      cy.get('button[type="submit"]').click()
      
      cy.url().should('include', '/aerobic')
    })
  })