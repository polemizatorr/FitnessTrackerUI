describe('Final cleanup', () => {
    it('Deletes the test user via API', () => {

    const baseUrl = Cypress.env('apiUrl');
    const userToDelete = "testuser123";

      cy.request({
        method: 'DELETE',
        url: baseUrl + '/users/ByUsername/' + userToDelete, // adjust this endpoint as needed
        failOnStatusCode: false,    // prevents test from failing if user is already deleted
      }).then((response) => {
        cy.log(`Cleanup response status: ${response.status}`);
      });
    });
  });