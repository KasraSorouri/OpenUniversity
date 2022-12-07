import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('render content', () => {
  const blog = {
    title: 'This is a test blog',
    author: 'Blog Tester',
    url: 'http://www.test.com',
    likes: 5,
    user: '1'
  }
  const user = {
    id: '1',
    name: 'Jone Smith',
    username: 'username'
  }

  test('show title and author', () => {

    render(<Blog blog={blog} user={user} />)

    const element = screen.getByText(/This is a test blog by Blog Tester/i)
    expect(element).toBeDefined()
  })

  test('hide url', () => {

    render(<Blog blog={blog} user={user} />)

    const element = screen.getByText(/http:\/\/www.test.com/i)
    expect(element).toHaveStyle('display: none')
  })

  test('hide likes', () => {

    render(<Blog blog={blog} user={user} />)

    const element = screen.getByText(/likes/i)
    expect(element).toHaveStyle('display: none')
  })

} )
