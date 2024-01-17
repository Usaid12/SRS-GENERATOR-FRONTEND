// Form.test.jsx
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { server } from "../../mocks/server";
import { MemoryRouter } from "react-router-dom";
import Form from "../Form";

test("renders Form component and submits the form with hardcoded values", async () => {
  render(
    <MemoryRouter>
      <Form />
    </MemoryRouter>
  );

  const nameInput = screen.getByPlaceholderText("name");
  const descriptionTextarea = screen.getByPlaceholderText("Description");
  const submitButton = screen.getByText("Submit");

  console.log("Initial form state:", {
    name: nameInput.value,
    description: descriptionTextarea.value,
  });

  fireEvent.change(nameInput, { target: { value: "Weather Prediction" } });
  fireEvent.change(descriptionTextarea, {
    target: {
      value:
        '"Develop a weather prediction application leveraging machine learning algorithms to provide accurate forecasts based on historical data. Enhance user experience with real-time updates and intuitive interfaces for seamless access to weather information."',
    },
  });

  console.log("Updated form state:", {
    name: nameInput.value,
    description: descriptionTextarea.value,
  });

  fireEvent.click(submitButton);

  await waitFor(() => {
    console.log(
      "Success message:",
      screen.getByText("Form submitted successfully!")
    );
    expect(
      screen.getByText("Form submitted successfully!")
    ).toBeInTheDocument();
  });
});
