import React, { useState, useEffect, useCallback } from "react";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import CourseList from "../CourseList/CourseList";
import { getLatestNotification } from "../utils/utils";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import BodySection from "../BodySection/BodySection";
import newContext, { user as defaultUser } from "../Context/context";
import axios from "axios";

function App() {
  // --- STATE ---
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState(defaultUser);
  const [notifications, setNotifications] = useState([]);
  const [courses, setCourses] = useState([]);

  // --- HANDLERS (memoized) ---
  const handleDisplayDrawer = useCallback(() => setDisplayDrawer(true), []);
  const handleHideDrawer = useCallback(() => setDisplayDrawer(false), []);

  const logIn = useCallback((email, password) => {
    setUser({ email, password, isLoggedIn: true });
  }, []);

  const logOut = useCallback(() => {
    setUser({ email: "", password: "", isLoggedIn: false });
  }, []);

  const markNotificationAsRead = useCallback(
    (id) => setNotifications((prev) => prev.filter((n) => n.id !== id)),
    []
  );

  // --- FETCH NOTIFICATIONS ON MOUNT ---
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("/notifications.json");
        const data = res.data.map((notif) =>
          notif.html
            ? { ...notif, html: { __html: getLatestNotification() } }
            : notif
        );
        setNotifications(data);
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching notifications:", err);
        }
      }
    };
    fetchNotifications();
  }, []);

  // --- FETCH COURSES WHEN USER LOGS IN ---
  useEffect(() => {
    if (!user.isLoggedIn) {
      setCourses([]);
      return;
    }

    const fetchCourses = async () => {
      try {
        const res = await axios.get("/courses.json");
        setCourses(res.data);
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching courses:", err);
        }
      }
    };
    fetchCourses();
  }, [user]);

  // --- RENDER ---
  return (
    <newContext.Provider value={{ user, logOut }}>
      <>
        <Notifications
          notifications={notifications}
          displayDrawer={displayDrawer}
          handleDisplayDrawer={handleDisplayDrawer}
          handleHideDrawer={handleHideDrawer}
          markNotificationAsRead={markNotificationAsRead}
        />

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
    </newContext.Provider>
  );
}

export default App;
