import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "@jest/globals";
import NotificationItem from "./NotificationItem.jsx";
import { getLatestNotification } from "../utils/utils";

describe("NotificationItem Component", () => {
  test("renders without crashing", () => {
    render(<NotificationItem />);
  });

  test('renders with type="urgent" and html content correctly', () => {
    const props = {
      type: "urgent",
      html: { __html: getLatestNotification() },
    };
    render(<NotificationItem {...props} />);
    const li = screen.getByTestId("notification-item");
    expect(li).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(li).toHaveAttribute("data-notification-type", "urgent");
    expect(li.innerHTML).toContain("Urgent");
  });

  test('renders with type="default" and value correctly', () => {
    const props = {
      type: "default",
      value: "Default notification",
    };
    render(<NotificationItem {...props} />);
    const li = screen.getByText("Default notification");
    expect(li).toHaveStyle({ color: "rgb(0, 0, 255)" });
    expect(li).toHaveAttribute("data-notification-type", "default");
  });
});
