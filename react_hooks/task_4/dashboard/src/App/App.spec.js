import { render, screen, fireEvent, cleanup, waitFor, act } from "@testing-library/react";
import { describe, test, expect, jest, afterEach, beforeEach } from "@jest/globals";
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

  test("renders News from the School section", () => {
    render(<App />);
    expect(screen.getByText(/news from the school/i)).toBeInTheDocument();
    expect(screen.getByText(/holberton school news goes here/i)).toBeInTheDocument();
  });

  test("fetches notifications on mount", async () => {
    await act(async () => {
      render(<App />);
    });

    // Notifications fetch should happen
    expect(mockAxios.get).toHaveBeenCalledWith("/notifications.json");

    const mockNotifications = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
    ];

    // Respond with mock notifications
    await act(async () => {
      mockAxios.mockResponse({ data: mockNotifications });
    });

    // Check that notifications appear
    expect(await screen.findByText(/new course available/i)).toBeInTheDocument();
    expect(await screen.findByText(/new resume available/i)).toBeInTheDocument();
  });

  test("login flow: shows CourseList after login, back to Login after logout", async () => {
    await act(async () => {
      render(<App />);
    });

    // Fill login form
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "user@test.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /ok/i }));

    // Courses should fetch after login
    expect(mockAxios.get).toHaveBeenCalledWith("/courses.json");

    const mockCourses = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: 20 },
    ];

    await act(async () => {
      mockAxios.mockResponse({ data: mockCourses });
    });

    expect(await screen.findByText(/course list/i)).toBeInTheDocument();
    expect(screen.queryByText(/login to access/i)).not.toBeInTheDocument();

    // Logout
    const logoutLink = screen.getByText(/logout/i);
    fireEvent.click(logoutLink);

    // Back to login screen
    expect(screen.getByText(/login to access/i)).toBeInTheDocument();
    expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
  });

  test("handleDisplayDrawer and handleHideDrawer toggle notification drawer", async () => {
    await act(async () => {
      render(<App />);
    });

    const notifLabel = screen.getByText(/your notifications/i);
    fireEvent.click(notifLabel);

    // Drawer opens
    expect(await screen.findByText(/here is the list of notifications/i)).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    // Drawer closes
    await waitFor(() => {
      expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
    });
  });

  test("markNotificationAsRead removes notification", async () => {
    const mockNotifications = [
      { id: 1, type: "default", value: "Notification 1" },
      { id: 2, type: "urgent", value: "Notification 2" },
    ];

    await act(async () => {
      render(<App />);
      mockAxios.mockResponse({ data: mockNotifications });
    });

    // Drawer open
    fireEvent.click(screen.getByText(/your notifications/i));

    const notifItems = await screen.findAllByRole("listitem");
    expect(notifItems).toHaveLength(2);

    // Click first notification to remove
    fireEvent.click(notifItems[0]);
    await waitFor(() => {
      expect(screen.queryByText(/notification 1/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/notification 2/i)).toBeInTheDocument();
  });
});
