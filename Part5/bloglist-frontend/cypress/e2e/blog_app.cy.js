describe('Blog App Test', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'User Test1',
      username: 'user1',
      password: '1234'
    }
    const user2 = {
      name: 'User Test2',
      username: 'user2',
      password: '1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
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
        .should('contain', 'User Test1 logged in')
    })
  })

  describe('After logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'user1', password: '1234' })
      cy.addBlog({ title: 'First Blog', author: 'Person 1', url: 'www.test.com' })
      cy.login({ username: 'user2', password: '1234' })
      cy.addBlog({ title: 'Secound Blog', author: 'Person 2', url: 'www.test.com' })
      cy.login({ username: 'user1', password: '1234' })
    })

    it('New blog can be created', function () {
      cy.contains('Add Blog').click()
      cy.get('[name="title"]').type('The test blog')
      cy.get('[name="author"]').type('Test Person')
      cy.get('[name="url"]').type('www.test.com')
      cy.get('#createNewBlog').click()

      cy.contains('The test blog by Test Person')
    })

    it('User can like a blog', function () {
      cy.contains('Secound Blog')
        .contains('show').click()

      cy.contains('Secound Blog').parent()
        .find('#like').click()

      cy.contains('Secound Blog').parent()
        .contains('likes: 1')
    })

    it('User who created blog can delete it', function () {
      cy.contains('First Blog')
        .contains('show').click()

      cy.contains('First Blog').parent()
        .find('#delete').click()

      cy.get('html').should('not.contain','First Blog')
    })

    it('User who not created blog can not delete it', function () {
      cy.contains('Secound Blog')
        .contains('show').click()

      cy.contains('Secound Blog').parent()
        .should('not.contain', '#delete')
    })

    it('blogs are ordered acording to their likes', function () {
      cy.get('.blog').eq(0).should('contain', 'First Blog')
      cy.get('.blog').eq(1).should('contain', 'Secound Blog')

      cy.contains('Secound Blog').contains('show').click()
      cy.contains('Secound Blog').parent().find('#like').as('like-blog2')
      cy.get('@like-blog2').click()

      cy.visit('/')
      cy.get('.blog').then((blogs) => {
        expect(blogs.eq(1)).to.contain('First Blog')
        expect(blogs.eq(0)).to.contain('Secound Blog')
      })

      cy.contains('First Blog').contains('show').click()
      cy.contains('First Blog').parent().find('#like').as('like-blog1')
      cy.get('@like-blog1').click()
      cy.get('@like-blog1').click()

      cy.visit('/')
      cy.get('.blog').then((blogs) => {
        expect(blogs.eq(0)).to.contain('First Blog')
        expect(blogs.eq(1)).to.contain('Secound Blog')
      })

    })
  })
})

