import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "@jest/globals";
import NotificationItem from "./NotificationItem.jsx";

describe("NotificationItem Component", () => {
  test("renders with type=default (blue color)", () => {
    render(<NotificationItem type="default" value="Default notification" />);
    const li = screen.getByText("Default notification");
    expect(li).toHaveAttribute("data-notification-type", "default");
    expect(li).toHaveStyle({ color: "rgb(0, 0, 255)" });
  });

  test("renders with type=urgent (red color)", () => {
    render(<NotificationItem type="urgent" value="Urgent notification" />);
    const li = screen.getByText("Urgent notification");
    expect(li).toHaveAttribute("data-notification-type", "urgent");
    expect(li).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  test("renders HTML content correctly when html prop is passed", () => {
    const html = { __html: "<strong>Test HTML</strong>" };
    render(<NotificationItem type="default" html={html} />);

    const li = screen.getByTestId("notification-item");
    expect(li).toBeInTheDocument();
    expect(li).toHaveAttribute("data-notification-type", "default");
    expect(li.innerHTML).toContain("Test HTML");
  });
});
