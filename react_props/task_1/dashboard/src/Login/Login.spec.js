import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "@jest/globals";
import Login from "./Login.jsx";

test("Check if email input gets focus when clicking its label", async () => {
  render(<Login />);
  const emailLabel = screen.getByText(/email:/i);
  const emailInput = screen.getByLabelText(/email/i);

  await userEvent.click(emailLabel);
  expect(emailInput).toHaveFocus();
});

test("Check if password input gets focus when clicking its label", async () => {
  render(<Login />);
  const passwordLabel = screen.getByText(/password:/i);
  const passwordInput = screen.getByLabelText(/password/i);

  await userEvent.click(passwordLabel);
  expect(passwordInput).toHaveFocus();
});
