import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test } from "@jest/globals";
import Login from "./Login.jsx";

test("Check whether 2 labels, 2 inputs, and 1 button are rendered", () => {
  render(<Login />);
  expect(screen.getAllByLabelText(/email|password/i)).toHaveLength(2);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /ok/i })).toBeInTheDocument();
});

test("Check if email input gets focus when clicking its label", () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const emailLabel = screen.getByText(/email:/i);
  fireEvent.click(emailLabel);
  emailInput.focus();
  expect(emailInput).toHaveFocus();
});

test("Check if password input gets focus when clicking its label", () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText(/password/i);
  const passwordLabel = screen.getByText(/password:/i);
  fireEvent.click(passwordLabel);
  passwordInput.focus();
  expect(passwordInput).toHaveFocus();
});
