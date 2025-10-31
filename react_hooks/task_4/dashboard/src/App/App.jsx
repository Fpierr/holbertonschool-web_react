import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import CourseList from "../CourseList/CourseList";
import { getLatestNotification } from "../utils/utils";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import BodySection from "../BodySection/BodySection";
import newContext, { user as initialUser } from "../Context/context";

const App = () => {
  // --- State hooks ---
  const [displayDrawer, setDisplayDrawer] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [notifications, setNotifications] = useState([]);
  const [courses, setCourses] = useState([]);

  // --- Handlers mémorisés ---
  const handleDisplayDrawer = useCallback(() => setDisplayDrawer(true), []);
  const handleHideDrawer = useCallback(() => setDisplayDrawer(false), []);
  const markNotificationAsRead = useCallback(
    (id) => {
      console.log(`Notification ${id} has been marked as read`);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    },
    []
  );

  const logIn = useCallback((email, password) => {
    setUser({ email, password, isLoggedIn: true });
  }, []);

  const logOut = useCallback(() => {
    setUser({ email: "", password: "", isLoggedIn: false });
  }, []);

  // --- Fetch notifications au montage ---
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/notifications.json");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  // --- Fetch courses quand l'utilisateur change ---
  useEffect(() => {
    if (!user.isLoggedIn) {
      setCourses([]);
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await axios.get("/courses.json");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [user.isLoggedIn]);

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
};

export default App;
