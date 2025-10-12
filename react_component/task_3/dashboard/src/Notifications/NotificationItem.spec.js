import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, jest } from "@jest/globals";
import NotificationItem from "./NotificationItem.jsx";
import { getLatestNotification } from "../utils/utils.js";

describe("NotificationItem Component", () => {
  test("renders without crashing", () => {
    const mockMarkAsRead = jest.fn();
    render(<NotificationItem id={1} markAsRead={mockMarkAsRead} />);
    const item = screen.getByTestId("notification-item");
    expect(item).toBeInTheDocument();
  });

  test('renders correctly with type="urgent" and html content', () => {
    const props = {
      id: 2,
      type: "urgent",
      html: { __html: getLatestNotification() },
      markAsRead: jest.fn(),
    };

    render(<NotificationItem {...props} />);
    const li = screen.getByTestId("notification-item");

    expect(li).toHaveAttribute("data-notification-type", "urgent");
    expect(li.style.color).toContain("red");
    expect(li.innerHTML).toContain("Urgent requirement");
  });

  test('renders correctly with type="urgent" and html content', () => {
  const props = {
    id: 2,
    type: "urgent",
    html: { __html: getLatestNotification() },
    markAsRead: jest.fn(),
  };

  render(<NotificationItem {...props} />);
  const li = screen.getByTestId("notification-item");

  expect(li).toHaveAttribute("data-notification-type", "urgent");
  expect(li).toHaveStyle({ color: "rgb(255, 0, 0)" });
  expect(li.innerHTML).toContain("Urgent requirement");
});


  test("calls markAsRead with the correct id when clicked", () => {
    const mockMarkAsRead = jest.fn();
    const props = {
      id: 4,
      type: "default",
      value: "Click me",
      markAsRead: mockMarkAsRead,
    };

    render(<NotificationItem {...props} />);
    const li = screen.getByText("Click me");

    fireEvent.click(li);
    expect(mockMarkAsRead).toHaveBeenCalledWith(4);
  });
});
