import React from 'react'
import { render, screen } from '@testing-library/react'
import { Square } from './index'

describe('General...', () => {
  test('should sum to 2', () => {
    expect(1 + 1).toBe(2)
  })
})

describe('<Square />...', () => {
  test('renders the Square component', () => {
    render(<Square data-testid='my-square' />)

    // screen.debug()
    const square = screen.getByTestId('my-square')
    expect(square).toBeInTheDocument()
  })

  test('renders the text "Testing 123..."', () => {
    render(<Square />)

    const square = screen.getByText('Testing 123...')
    expect(square).toBeInTheDocument()
  })
})
