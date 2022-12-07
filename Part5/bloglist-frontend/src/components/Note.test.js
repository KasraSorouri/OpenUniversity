import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  test('show url after press show button', async () => {

    render(<Blog blog={blog} user={user} />)

    const action = userEvent.setup()
    const button = screen.getByText('show')
    await action.click(button)

    const element = screen.getByText(/http:\/\/www.test.com/i)
    expect(element).toBeVisible()
  })

  test('show likes after press show button', async () => {

    render(<Blog blog={blog} user={user} />)

    const action = userEvent.setup()
    const button = screen.getByText('show')
    await action.click(button)

    const element = screen.getByText(/likes/i)
    expect(element).toBeVisible()
  })

})