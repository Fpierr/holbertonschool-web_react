import React, { useEffect, useReducer } from "react";
import axios from "axios";
import Notifications from "./components/Notifications/Notifications";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Footer from "./components/Footer/Footer";
import CourseList from "./pages/CourseList/CourseList";
import BodySectionWithMarginBottom from "./components/BodySectionWithMarginBottom/BodySectionWithMarginBottom";
import BodySection from "./components/BodySection/BodySection";
import { getLatestNotification } from "./utils/utils";
import { appReducer, initialState, APP_ACTIONS } from "./appReducer";

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Fetch notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get("/notifications.json");
        const updated = data.map((notif) =>
          notif.html
            ? { ...notif, html: { __html: getLatestNotification() } }
            : notif
        );
        dispatch({ type: APP_ACTIONS.SET_NOTIFICATIONS, payload: updated });
      } catch (error) {
        if (process.env.NODE_ENV === "development") console.error(error);
      }
    };
    fetchNotifications();
  }, []);

  // Fetch courses when user logs in
  useEffect(() => {
    if (!state.user.isLoggedIn) return;

    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("/courses.json");
        dispatch({ type: APP_ACTIONS.SET_COURSES, payload: data });
      } catch (error) {
        if (process.env.NODE_ENV === "development") console.error(error);
      }
    };
    fetchCourses();
  }, [state.user.isLoggedIn]);

  // Handlers
  const handleLogin = (email, password) =>
    dispatch({ type: APP_ACTIONS.LOGIN, payload: { email, password } });

  const handleLogout = () => dispatch({ type: APP_ACTIONS.LOGOUT });

  const handleToggleDrawer = () =>
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });

  const handleMarkNotificationAsRead = (id) =>
    dispatch({ type: APP_ACTIONS.MARK_NOTIFICATION_READ, payload: id });

  return (
    <>
      <Notifications
        notifications={state.notifications}
        displayDrawer={state.displayDrawer}
        handleDisplayDrawer={handleToggleDrawer}
        handleHideDrawer={handleToggleDrawer}
        markNotificationAsRead={handleMarkNotificationAsRead}
      />

      <Header user={state.user} logOut={handleLogout} />

      {!state.user.isLoggedIn ? (
        <BodySectionWithMarginBottom title="Log in to continue">
          <Login logIn={handleLogin} />
        </BodySectionWithMarginBottom>
      ) : (
        <BodySectionWithMarginBottom title="Course list">
          <CourseList courses={state.courses} />
        </BodySectionWithMarginBottom>
      )}

      <BodySection title="News from the School">
        <p>Holberton School News goes here</p>
      </BodySection>

      <Footer user={state.user} logOut={handleLogout} />
    </>
  );
}

export default App;
