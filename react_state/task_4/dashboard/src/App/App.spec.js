import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { beforeEach, afterEach, describe, test, expect, jest } from "@jest/globals";
import App from "./App";

describe("App Component keyboard event", () => {
  let originalAlert;

  beforeEach(() => {
    originalAlert = window.alert;
    window.alert = jest.fn();
    jest.spyOn(document, "addEventListener");
    jest.spyOn(document, "removeEventListener");
  });

  afterEach(() => {
    window.alert = originalAlert;
    document.addEventListener.mockRestore();
    document.removeEventListener.mockRestore();
    cleanup();
  });

  test("adds and removes event listeners on mount/unmount", () => {
    const { unmount } = render(<App />);
    expect(document.addEventListener).toHaveBeenCalledWith("keydown", expect.any(Function));
    unmount();
    expect(document.removeEventListener).toHaveBeenCalledWith("keydown", expect.any(Function));
  });

  test('calls alert with "Logging you out" and logOut when Ctrl+H is pressed', () => {
    render(<App />);
    const appInstance = document.querySelector("#root")._reactRootContainer._internalRoot.current.child.stateNode;
    const logOutSpy = jest.spyOn(appInstance, "logOut");

    fireEvent.keyDown(document, { key: "h", ctrlKey: true });

    expect(window.alert).toHaveBeenCalledWith("Logging you out");
    expect(logOutSpy).toHaveBeenCalled();
  });

  test("renders the News from the School section with correct paragraph", () => {
    render(<App />);
    expect(screen.getByText(/news from the school/i)).toBeInTheDocument();
    expect(screen.getByText(/holberton school news goes here/i)).toBeInTheDocument();
  });

  test("login flow: shows Login, then CourseList after logging in, then Login again after logout", () => {
    render(<App />);
    expect(screen.getByText(/login to access/i)).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /ok/i });

    fireEvent.change(emailInput, { target: { value: "user@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);
    expect(screen.getByText(/course list/i)).toBeInTheDocument();
    expect(screen.queryByText(/login to access/i)).not.toBeInTheDocument();
    const logoutLink = screen.getByText(/logout/i);
    fireEvent.click(logoutLink);
    expect(screen.getByText(/login to access/i)).toBeInTheDocument();
    expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
  });
});
