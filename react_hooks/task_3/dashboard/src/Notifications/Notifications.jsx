import React, { memo } from "react";
import PropTypes from "prop-types";
import closeIcon from "../assets/close-button.png";
import NotificationItem from "./NotificationItem";

function Notifications({
  notifications = [],
  displayDrawer = true,
  handleDisplayDrawer,
  handleHideDrawer,
}) {
  // --- Styles ---
  const borderStyle = {
    borderColor: "var(--main-color)",
  };

  const titleClassName = `text-right pr-8 pt-2 ${
    notifications.length > 0 && !displayDrawer ? "animate-bounce" : ""
  }`;

  // --- Handlers ---
  const markNotificationAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  return (
    <>
      <div
        className={`${titleClassName} cursor-pointer`}
        onClick={handleDisplayDrawer}
      >
        Your notifications
      </div>

      {displayDrawer && (
        <div
          className="border-2 border-dashed bg-white p-6 relative float-right mr-8 mt-2 max-w-4xl"
          style={borderStyle}
        >
          <button
            onClick={() => {
              console.log("Close button has been clicked");
              handleHideDrawer();
            }}
            aria-label="Close"
            className="absolute cursor-pointer right-3 top-3 bg-transparent border-none p-0"
          >
            <img src={closeIcon} alt="close icon" className="w-5 h-5" />
          </button>

          {notifications.length > 0 ? (
            <>
              <p className="font-bold mb-3">
                Here is the list of notifications
              </p>
              <ul className="list-disc pl-6 space-y-1">
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                    markAsRead={() => markNotificationAsRead(notification.id)}
                  />
                ))}
              </ul>
            </>
          ) : (
            <p className="text-center">No new notification for now</p>
          )}
        </div>
      )}
    </>
  );
}

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.string,
      html: PropTypes.shape({ __html: PropTypes.string }),
    })
  ).isRequired,
  displayDrawer: PropTypes.bool.isRequired,
  handleDisplayDrawer: PropTypes.func.isRequired,
  handleHideDrawer: PropTypes.func.isRequired,
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.notifications.length === nextProps.notifications.length &&
         prevProps.displayDrawer === nextProps.displayDrawer;
};

export default memo(Notifications, areEqual);
