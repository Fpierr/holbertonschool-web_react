import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { beforeEach, afterEach, describe, test, expect, jest } from "@jest/globals";
import mockAxios from "jest-mock-axios";
import App from "./App";

afterEach(() => {
  cleanup();
  mockAxios.reset();
});

describe("App Component (Functional)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the News from the School section with correct paragraph", () => {
    render(<App />);
    expect(screen.getByText(/news from the school/i)).toBeInTheDocument();
    expect(screen.getByText(/holberton school news goes here/i)).toBeInTheDocument();
  });

  test("fetches notifications on mount", async () => {
    render(<App />);
    expect(mockAxios.get).toHaveBeenCalledWith("/notifications.json");

    const mockNotifications = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
    ];
    await act(async () => {
      mockAxios.mockResponse({ data: mockNotifications });
    });

    expect(await screen.findByText(/new course available/i)).toBeInTheDocument();
  });

  test("does not show CourseList when user is not logged in", () => {
    render(<App />);
    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
    expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
  });

  test("login flow: shows CourseList after logging in, then Login again after logout", async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "user@test.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });
    const submitButton = screen.getByRole("button", { name: /ok/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/course list/i)).toBeInTheDocument();
    expect(screen.queryByText(/login to access/i)).not.toBeInTheDocument();

    // simulate fetching courses
    expect(mockAxios.get).toHaveBeenCalledWith("/courses.json");
    const mockCourses = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: 20 },
    ];
    await act(async () => {
      mockAxios.mockResponse({ data: mockCourses });
    });

    // verify logout link works
    const logoutLink = screen.getByText(/logout/i);
    fireEvent.click(logoutLink);

    // back to login screen
    expect(screen.getByText(/login to access/i)).toBeInTheDocument();
    expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
  });

  test("handleDisplayDrawer and handleHideDrawer toggle visibility", async () => {
    render(<App />);

    const notifLabel = screen.getByText(/your notifications/i);
    // open drawer
    fireEvent.click(notifLabel);
    expect(await screen.findByText(/here is the list of notifications/i)).toBeInTheDocument();

    // close drawer
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
  });
});
