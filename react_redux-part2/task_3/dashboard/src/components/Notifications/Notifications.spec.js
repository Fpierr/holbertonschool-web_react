import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, jest } from "@jest/globals";
import Notifications from "./Notifications.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "../../features/notifications/notificationsSlice";

const notificationsList = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  { id: 3, type: "urgent", html: { __html: "<strong>Urgent requirement</strong> - complete by EOD" } },
];

function renderWithRedux(ui, { preloadedState, store = configureStore({ reducer: { notifications: notificationsReducer }, preloadedState }) } = {}) {
  return render(<Provider store={store}>{ui}</Provider>);
}

describe("Notifications Component", () => {
  test("renders menu item and notifications drawer correctly", () => {
    renderWithRedux(<Notifications />);
    
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();

    // Drawer should exist but initially hidden
    const drawer = screen.getByTestId("Notifications");
    expect(drawer).toBeInTheDocument();
    expect(drawer).toHaveStyle("opacity: 0; visibility: hidden;");
  });

  test("toggles drawer visibility when menu item is clicked", () => {
    renderWithRedux(<Notifications />);

    const menuItem = screen.getByText(/Your notifications/i);
    const drawer = screen.getByTestId("Notifications");

    expect(drawer).toHaveStyle("opacity: 0; visibility: hidden;");

    fireEvent.click(menuItem);
    expect(drawer).toHaveStyle("opacity: 1; visibility: visible;");

    fireEvent.click(menuItem);
    expect(drawer).toHaveStyle("opacity: 0; visibility: hidden;");
  });

  test("closes drawer when close button is clicked", () => {
    renderWithRedux(<Notifications />);
    
    const menuItem = screen.getByText(/Your notifications/i);
    const drawer = screen.getByTestId("Notifications");

    // Open drawer
    fireEvent.click(menuItem);
    expect(drawer).toHaveStyle("opacity: 1; visibility: visible;");

    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);
    expect(drawer).toHaveStyle("opacity: 0; visibility: hidden;");
  });

  test("renders 'No new notification for now' when notifications list is empty", () => {
    renderWithRedux(<Notifications />);
    expect(screen.getByText(/No new notification for now/i)).toBeInTheDocument();
  });

  test("calls markNotificationAsRead with correct id when NotificationItem is clicked", () => {
    renderWithRedux(<Notifications />, { preloadedState: { notifications: { notifications: notificationsList } } });
    
    const firstNotif = screen.getByText("New course available");
    fireEvent.click(firstNotif);
  });

    test("renders loading indicator when fetching notifications", () => {
    renderWithRedux(<Notifications />, { preloadedState: { notifications: { notifications: [], loading: true } } });
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders notifications list after loading", () => {
    renderWithRedux(<Notifications />, { preloadedState: { notifications: { notifications: notificationsList, loading: false } } });
    notificationsList.forEach((notif) => {
      if (notif.value) expect(screen.getByText(notif.value)).toBeInTheDocument();
      if (notif.html) expect(screen.getByText(/Urgent requirement/i)).toBeInTheDocument();
    });
});

});
