import { render, screen } from '@testing-library/react'
import App from './App'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

test('renders learn react link', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
