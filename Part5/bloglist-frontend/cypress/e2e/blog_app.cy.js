describe('First test', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'User Test',
      username: 'user1',
      password: '1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('/')
  })

  it('Login form is shown', function () {
    cy.get('html')
      .should('contain', 'login')
      .should('contain', 'username')
      .should('contain', 'password')
      .should('not.contain', 'blogs')

  })


})
