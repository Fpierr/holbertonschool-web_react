import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, describe, jest } from "@jest/globals";
import Notifications from "./Notifications.jsx";

const notificationsList = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  {
    id: 3,
    type: "urgent",
    html: { __html: "<strong>Urgent requirement</strong> - complete by EOD" },
  },
];

describe("Notifications Component", () => {
  test("renders the notifications title", () => {
    render(<Notifications notifications={notificationsList} />);
    const titleElement = screen.getByText(/here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the close button", () => {
    render(<Notifications notifications={notificationsList} />);
    const closeButton = screen.getByRole("button", { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  test("renders exactly three list items from props", () => {
    render(<Notifications notifications={notificationsList} />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });

  test('logs "Close button has been clicked" when the close button is clicked', () => {
    render(<Notifications notifications={notificationsList} />);
    const consoleLog = jest.spyOn(console, "log").mockImplementation();
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(consoleLog).toHaveBeenCalledWith(
      expect.stringMatching(/close button has been clicked/i)
    );
  });
});
