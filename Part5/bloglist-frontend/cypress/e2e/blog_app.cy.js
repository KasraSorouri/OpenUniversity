describe('Blog App Test', () => {
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

  describe('Login test', function () {
    it('Login fails whith wrong username', function () {
      cy.get('[name="username"]').type('wrong')
      cy.get('[name="password"]').type('1234')
      cy.contains('login').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(120, 5, 55)')
    })

    it('Login fails whith wrong password', function () {
      cy.get('[name="username"]').type('user1')
      cy.get('[name="password"]').type('wrong')
      cy.contains('login').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(120, 5, 55)')
    })

    it('Successful login', function () {
      cy.get('[name="username"]').type('user1')
      cy.get('[name="password"]').type('1234')
      cy.contains('login').click()

      cy.get('html')
        .should('contain', 'User Test logged in')
    })
  })
})
