// Form.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Form from '../Form';

test('renders Form component correctly', () => {
  // Render the Form component
  render(<Form />);

  // Use queries to interact with and assert on the rendered content
  expect(screen.getByLabelText('Username:')).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Username:' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
});
