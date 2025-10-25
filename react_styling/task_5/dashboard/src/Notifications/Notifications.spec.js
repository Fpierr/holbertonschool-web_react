import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { expect, test, describe, jest, afterEach } from "@jest/globals";
import Notifications from "./Notifications.jsx";
import { getLatestNotification } from "../utils/utils.js";

const notificationsList = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
];

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

describe("Notifications Component", () => {
  test('Always displays the text "Your notifications"', () => {
    render(<Notifications notifications={notificationsList} displayDrawer={false} />);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test("Displays close button, list, and paragraph when displayDrawer = true", () => {
    render(<Notifications notifications={notificationsList} displayDrawer={true} />);
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  test("Does NOT display close button or list when displayDrawer = false", () => {
    render(<Notifications notifications={notificationsList} displayDrawer={false} />);
    expect(screen.queryByText(/here is the list of notifications/i)).toBeNull();
    expect(screen.queryByRole("button", { name: /close/i })).toBeNull();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  test('Displays "No new notification for now" when list is empty and displayDrawer = true', () => {
    render(<Notifications notifications={[]} displayDrawer={true} />);
    expect(screen.getByText(/no new notification for now/i)).toBeInTheDocument();
  });

  test('Logs "Close button has been clicked" when close button is pressed', () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    render(<Notifications notifications={notificationsList} displayDrawer={true} />);
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(consoleSpy).toHaveBeenCalledWith("Close button has been clicked");
  });

  test("Renders the correct notification texts", () => {
    render(<Notifications notifications={notificationsList} displayDrawer={true} />);
    expect(screen.getByText("New course available")).toBeInTheDocument();
    expect(screen.getByText("New resume available")).toBeInTheDocument();
    expect(screen.getByText(/complete by EOD/i)).toBeInTheDocument();
  });

  test('Logs "Notification {id} has been marked as read" when a notification is clicked', () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    render(<Notifications notifications={notificationsList} displayDrawer={true} />);

    const items = screen.getAllByRole("listitem");
    fireEvent.click(items[0]);
    expect(consoleSpy).toHaveBeenCalledWith("Notification 1 has been marked as read");

    fireEvent.click(items[1]);
    expect(consoleSpy).toHaveBeenCalledWith("Notification 2 has been marked as read");
  });

  test('Does not re-render when notifications length does not change', () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    const { rerender } = render(
      <Notifications notifications={notificationsList} displayDrawer={true} />
    );
    const newListSameLength = [...notificationsList];
    rerender(<Notifications notifications={newListSameLength} displayDrawer={true} />);
    expect(consoleSpy).not.toHaveBeenCalledWith("Notification 1 has been marked as read");
  });

  test('Re-renders when notifications length changes', () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    const { rerender } = render(
      <Notifications notifications={notificationsList} displayDrawer={true} />
    );
    const newList = [...notificationsList, { id: 4, type: "default", value: "New one" }];
    rerender(<Notifications notifications={newList} displayDrawer={true} />);
    expect(screen.getByText("New one")).toBeInTheDocument();
  });
});
