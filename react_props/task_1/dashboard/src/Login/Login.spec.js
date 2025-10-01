import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";

describe("Login component", () => {
  beforeEach(() => render(<Login />));

  test("renders 2 labels, 2 inputs, and 1 button", () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i).type).toBe("password");
    expect(screen.getByRole("button", { name: /ok/i })).toBeInTheDocument();
  });

  test.each([
    [/email:/i, /email/i],
    [/password:/i, /password/i],
  ])("focuses input when clicking label %s", async (labelText, inputLabel) => {
    const label = screen.getByText(labelText);
    const input = screen.getByLabelText(inputLabel);

    await userEvent.click(label);
    expect(input).toHaveFocus();
  });
});
