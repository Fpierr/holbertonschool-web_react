import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, describe, jest } from "@jest/globals";
import Notifications from "./Notifications.jsx";
import { getLatestNotification } from "../utils/utils.js";

const notificationsList = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  {
    id: 3,
    type: "urgent",
    html: { __html: getLatestNotification() },
  },
];

describe("Notifications Component", () => {
  test('Always displays the text "Your notifications"', () => {
    render(<Notifications notifications={notificationsList} displayDrawer={false} />);
    const headerText = screen.getByText(/your notifications/i);
    expect(headerText).toBeInTheDocument();
  });

  test('Displays close button, list, and paragraph when displayDrawer = true', () => {
    render(<Notifications notifications={notificationsList} displayDrawer={true} />);
    const title = screen.getByText(/here is the list of notifications/i);
    const button = screen.getByRole("button", { name: /close/i });
    const items = screen.getAllByRole("listitem");

    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(items).toHaveLength(3);
  });

  test('Does NOT display close button or list when displayDrawer = false', () => {
    render(<Notifications notifications={notificationsList} displayDrawer={false} />);
    const title = screen.queryByText(/here is the list of notifications/i);
    const button = screen.queryByRole("button", { name: /close/i });
    const items = screen.queryAllByRole("listitem");

    expect(title).toBeNull();
    expect(button).toBeNull();
    expect(items).toHaveLength(0);
  });

  test('Displays "No new notification for now" when list is empty and displayDrawer = true', () => {
    render(<Notifications notifications={[]} displayDrawer={true} />);
    const message = screen.getByText(/no new notification for now/i);
    expect(message).toBeInTheDocument();
  });

  test('Logs "Close button has been clicked" when close button is pressed', () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    render(<Notifications notifications={notificationsList} displayDrawer={true} />);
    const button = screen.getByRole("button", { name: /close/i });

    fireEvent.click(button);
    expect(consoleSpy).toHaveBeenCalledWith("Close button has been clicked");
    consoleSpy.mockRestore();
  });

  test("Renders the correct notification texts", () => {
    render(<Notifications notifications={notificationsList} displayDrawer={true} />);
    expect(screen.getByText("New course available")).toBeInTheDocument();
    expect(screen.getByText("New resume available")).toBeInTheDocument();
    expect(screen.getByText(/complete by EOD/i)).toBeInTheDocument();
  });
});
