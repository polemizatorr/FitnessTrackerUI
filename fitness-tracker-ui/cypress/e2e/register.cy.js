describe('User Registration', () => {
    it('should navigate to register page and create a new user', () => {
      // Visit your application's homepage
      cy.visit('http://localhost:3000/')
      
      // Find and click on the register/signup link
      cy.contains('Register').click()
      
      // Verify we're on the registration page
      cy.url().should('include', '/register')
      
      // Fill out the registration form
      cy.get('[data-cy=username-input]').type('testuser123')
      cy.get('[data-cy=email-input]').type('testuser123@example.com')
      cy.get('[data-cy=password-input]').type('SecurePassword123!')
      cy.get('[data-cy=firstname-input]').type('John')
      cy.get('[data-cy=lastname-input]').type('Smith')
      
      // Submit the form
      cy.get('button[type="submit"]').click()
      
      cy.url().should('include', '/login')
    })
  })