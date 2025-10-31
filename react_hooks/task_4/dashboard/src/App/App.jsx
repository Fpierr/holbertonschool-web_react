import React, { useState, useCallback, useMemo, useEffect } from "react";
import axios from "axios";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import CourseList from "../CourseList/CourseList";
import { getLatestNotification } from "../utils/utils";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import BodySection from "../BodySection/BodySection";
import newContext, { user as defaultUser } from "../Context/context";

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState(defaultUser);
  const [notifications, setNotifications] = useState([]);
  const [courses, setCourses] = useState([]);

  /** 🔹 Fetch notifications on mount */
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("http://localhost:5173/notifications.json");

        // keep getLatestNotification() behavior
        const data = res.data.map((n) =>
          n.html && n.html.__html
            ? { ...n, html: { __html: getLatestNotification() } }
            : n
        );
        setNotifications(data);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching notifications:", error);
        }
      }
    };

    fetchNotifications();
  }, []);

  /** 🔹 Fetch courses whenever user changes (login/logout) */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5173/courses.json");
        setCourses(res.data);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching courses:", error);
        }
      }
    };

    fetchCourses();
  }, [user]);

  /** 🔹 Handlers */
  const handleDisplayDrawer = useCallback(() => setDisplayDrawer(true), []);
  const handleHideDrawer = useCallback(() => setDisplayDrawer(false), []);
  const logIn = useCallback((email, password) => {
    setUser({ email, password, isLoggedIn: true });
  }, []);
  const logOut = useCallback(() => {
    setUser({ email: "", password: "", isLoggedIn: false });
  }, []);
  const markNotificationAsRead = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  /** 🔹 Context value memoized */
  const contextValue = useMemo(
    () => ({ user, logOut, logIn }),
    [user, logOut, logIn]
  );

  /** 🔹 Render */
  return (
    <newContext.Provider value={contextValue}>
      <>
        <Notifications
          notifications={notifications}
          displayDrawer={displayDrawer}
          handleDisplayDrawer={handleDisplayDrawer}
          handleHideDrawer={handleHideDrawer}
          markNotificationAsRead={markNotificationAsRead}
        />
        <>
          <Header />
          {!user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login logIn={logIn} email={user.email} password={user.password} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Course list">
              <CourseList courses={courses} />
            </BodySectionWithMarginBottom>
          )}
          <BodySection title="News from the School">
            <p>Holberton School News goes here</p>
          </BodySection>
          <Footer />
        </>
      </>
    </newContext.Provider>
  );
}

export default App;
