import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header text', () => {
  render(<App />);

  const elem = screen.getByText('numbers')

  expect(elem).toBeInTheDocument()
})
