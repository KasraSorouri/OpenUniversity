import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AddBlog from './AddBlog'

describe('Add new blog', () => {
  test('The form updates parent state and calls onSubmit', async () => {
    const action = userEvent.setup()
    const addBlog = jest.fn()

    render(<AddBlog addBlog={addBlog} />)

    const sendButton = screen.getByText('Add Blog')
    const inputTitle = screen.getByPlaceholderText('Blog title')
    const inputAuthor = screen.getByPlaceholderText('Blog author')
    const inputUrl = screen.getByPlaceholderText('Blog url')

    await action.type(inputTitle, 'testing a form title...')
    await action.type(inputAuthor, 'testing a form author...')
    await action.type(inputUrl, 'testing a form url...')
    await action.click(sendButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('testing a form title...')
    expect(addBlog.mock.calls[0][0].author).toBe('testing a form author...')
    expect(addBlog.mock.calls[0][0].url).toBe('testing a form url...')
  })
})
