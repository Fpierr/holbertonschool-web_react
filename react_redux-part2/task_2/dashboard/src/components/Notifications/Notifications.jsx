import React, { memo, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotificationItem from "../NotificationItem/NotificationItem";
import { fetchNotifications, markNotificationAsRead } from "../../features/notifications/notificationsSlice";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  drawer: { opacity: 0, visibility: "hidden", transition: "opacity 0.3s" },
  visible: { opacity: 1, visibility: "visible" },
});

function Notifications() {
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector((state) => state.notifications);
  const drawerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const toggleDrawer = () => setIsVisible(!isVisible);

  return (
    <>
      <div className="cursor-pointer text-right pr-8 pt-2" onClick={toggleDrawer}>
        Your notifications
      </div>

      <div
        ref={drawerRef}
        data-testid="Notifications"
        className={css(styles.drawer, isVisible && styles.visible)}
        style={{ border: "2px dashed var(--main-color)", background: "white", padding: "1.5rem", position: "relative", float: "right", marginRight: "2rem", marginTop: "0.5rem", maxWidth: "40rem" }}
      >
        <button
          onClick={toggleDrawer}
          aria-label="Close"
          className="absolute cursor-pointer right-3 top-3 bg-transparent border-none p-0"
        >
          ✖
        </button>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : notifications.length > 0 ? (
          <>
            <p className="font-bold mb-3">Here is the list of notifications</p>
            <ul className="list-disc pl-6 space-y-1">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  type={notification.type}
                  value={notification.value}
                  html={notification.html}
                  markAsRead={() => dispatch(markNotificationAsRead(notification.id))}
                  read={notification.read}
                />
              ))}
            </ul>
          </>
        ) : (
          <p className="text-center">No new notification for now</p>
        )}
      </div>
    </>
  );
}

export default memo(Notifications);
