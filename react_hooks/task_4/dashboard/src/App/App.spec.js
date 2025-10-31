import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { describe, test, expect, jest, afterEach, beforeEach } from "@jest/globals";
import App from "./App";

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

describe("App Component (Functional)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the News from the School section", () => {
    render(<App />);
    expect(screen.getByText(/news from the school/i)).toBeInTheDocument();
    expect(screen.getByText(/holberton school news goes here/i)).toBeInTheDocument();
  });

  test("login and logout flow works correctly", () => {
    render(<App />);
    expect(screen.getByText(/login to access/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /ok/i }));

    expect(screen.getByText(/course list/i)).toBeInTheDocument();
    expect(screen.queryByText(/login to access/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(/logout/i));
    expect(screen.getByText(/login to access/i)).toBeInTheDocument();
  });

  test("handleDisplayDrawer and handleHideDrawer toggle the notification drawer", async () => {
    render(<App />);

    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(/your notifications/i));
    expect(await screen.findByText(/here is the list of notifications/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    await waitFor(() => {
      expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
    });
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

    const propsBefore = screen.getByText(/your notifications/i)._owner.memoizedProps;
    const beforeDisplay = propsBefore.handleDisplayDrawer;
    const beforeHide = propsBefore.handleHideDrawer;
    const beforeMark = propsBefore.markNotificationAsRead;

    rerender(<App />);

    const propsAfter = screen.getByText(/your notifications/i)._owner.memoizedProps;
    const afterDisplay = propsAfter.handleDisplayDrawer;
    const afterHide = propsAfter.handleHideDrawer;
    const afterMark = propsAfter.markNotificationAsRead;

    expect(beforeDisplay).toBe(afterDisplay);
    expect(beforeHide).toBe(afterHide);
    expect(beforeMark).toBe(afterMark);
  });
});
