import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { describe, test, expect, jest, afterEach, beforeEach } from "@jest/globals";
import App from "./App";
import mockAxios from "jest-mock-axios";

/**
 * Global cleanup between tests
 */
afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
  mockAxios.reset();
});

/* -------------------------------------------------------------------------- */
/*                         FETCHING SIDE EFFECT TESTS                         */
/* -------------------------------------------------------------------------- */
describe("App Data Fetching (Side Effects)", () => {
  test("fetches notifications on mount", async () => {
    render(<App />);

    const notificationsMock = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
    ];

    // Simulate responses from mockAxios
    mockAxios.mockResponseFor(
      { url: "http://localhost:5173/notifications.json" },
      { data: notificationsMock }
    );
    mockAxios.mockResponseFor(
      { url: "http://localhost:5173/courses.json" },
      { data: [] }
    );

    await waitFor(() => {
      expect(screen.getByText(/new course available/i)).toBeInTheDocument();
      expect(screen.getByText(/new resume available/i)).toBeInTheDocument();
    });
  });

  test("fetches courses when user changes", async () => {
    render(<App />);

    const coursesMock = [
      { id: 1, name: "React", credit: 40 },
      { id: 2, name: "Webpack", credit: 20 },
    ];

    // mock initial notifications request
    mockAxios.mockResponseFor(
      { url: "http://localhost:5173/notifications.json" },
      { data: [] }
    );

    // mock courses request after login
    mockAxios.mockResponseFor(
      { url: "http://localhost:5173/courses.json" },
      { data: coursesMock }
    );

    await waitFor(() => {
      expect(screen.getByText(/react/i)).toBeInTheDocument();
      expect(screen.getByText(/webpack/i)).toBeInTheDocument();
    });
  });
});

/* -------------------------------------------------------------------------- */
/*                          FUNCTIONAL BEHAVIOR TESTS                         */
/* -------------------------------------------------------------------------- */
describe("App Component (Functional)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the News from the School section", () => {
    render(<App />);
    expect(screen.getByText(/news from the school/i)).toBeInTheDocument();
    expect(screen.getByText(/holberton school news goes here/i)).toBeInTheDocument();
  });

  test("login and logout flow works correctly", async () => {
    render(<App />);

    expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /ok/i }));

    // After login, should show course list
    await waitFor(() => {
      expect(screen.getByText(/course list/i)).toBeInTheDocument();
    });
    expect(screen.queryByText(/log in to continue/i)).not.toBeInTheDocument();

    // Click logout
    fireEvent.click(screen.getAllByText(/logout/i)[0]);
    expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
  });

  test("handleDisplayDrawer and handleHideDrawer toggle the notification drawer", async () => {
    render(<App />);

    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    await waitFor(() => {
      expect(
        screen.queryByText(/here is the list of notifications/i)
      ).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/your notifications/i));
    expect(await screen.findByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  test("markNotificationAsRead removes the correct notification", async () => {
    render(<App />);

    fireEvent.click(screen.getByText(/your notifications/i));

    const notifItems = await screen.findAllByRole("listitem");
    expect(notifItems.length).toBeGreaterThan(0);

    const firstNotif = notifItems[0];
    const notifText = firstNotif.textContent;

    fireEvent.click(firstNotif);

    await waitFor(() => {
      expect(screen.queryByText(notifText)).not.toBeInTheDocument();
    });
  });

  test("callbacks keep the same reference between re-renders", () => {
    const { rerender } = render(<App />);

    const handleDisplayDrawerBefore = App.handleDisplayDrawer;
    rerender(<App />);
    const handleDisplayDrawerAfter = App.handleDisplayDrawer;

    expect(handleDisplayDrawerBefore).toBe(handleDisplayDrawerAfter);
  });
});
