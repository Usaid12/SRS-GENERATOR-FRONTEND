// Form.test.jsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import { server } from '../../mocks/server';
import { MemoryRouter } from 'react-router-dom';
import Form from '../Form';




test('renders Form component and submits the form with hardcoded values', async () => {
  // Render the Form component
  render(
    <MemoryRouter>
      <Form />
    </MemoryRouter>
  );

  // Hardcode values for name and description
  const nameInput = screen.getByPlaceholderText('name');
  const descriptionTextarea = screen.getByPlaceholderText('Description');
  const submitButton = screen.getByText('Submit');

  // Log initial state
  console.log('Initial form state:', {
    name: nameInput.value,
    description: descriptionTextarea.value,
  });

  fireEvent.change(nameInput, { target: { value: 'Weather Prediction' } });
  fireEvent.change(descriptionTextarea, { target: { value: '"Develop a weather prediction application leveraging machine learning algorithms to provide accurate forecasts based on historical data. Enhance user experience with real-time updates and intuitive interfaces for seamless access to weather information."' } });

  // Log updated state
  console.log('Updated form state:', {
    name: nameInput.value,
    description: descriptionTextarea.value,
  });

  // Submit the form
  fireEvent.click(submitButton);

  // Wait for the API call to complete
  await waitFor(() => {
    // Log success message
    console.log('Success message:', screen.getByText('Form submitted successfully!'));
    // Assert that the success message is displayed
    expect(screen.getByText('Form submitted successfully!')).toBeInTheDocument();
  });

  // Log final state
  // console.log('Final form state:', {
  //   name: nameInput.value,
  //   description: descriptionTextarea.value,
  // });


  // Assert that the navigation to '/download-srs' occurred
  // expect(window.location.pathname).toBe('/download-srs');
});
