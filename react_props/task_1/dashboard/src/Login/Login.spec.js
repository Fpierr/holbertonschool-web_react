import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test } from "@jest/globals";
import Login from "./Login.jsx";

test("Check whether 2 labels, 2 inputs, and 1 button are rendered", () => {
  render(<Login />);
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /ok/i })).toBeInTheDocument();
});

test("Check if email input gets focus when clicking its label", () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/Email/i);
  const emailLabel = screen.getByText(/Email:/i);
  fireEvent.click(emailLabel);
  emailInput.focus();
  expect(emailInput).toHaveFocus();
});
