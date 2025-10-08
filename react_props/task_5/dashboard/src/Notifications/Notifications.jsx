import "./Notifications.css";
import closeButton from "../assets/close-button.png";
import PropTypes from "prop-types";
import NotificationItem from "./NotificationItem";

function Notifications({ notifications = [], displayDrawer = true }) {
  return (
    <>
      <div className="notification-title">Your notifications</div>

      {displayDrawer ? (
        <div className="Notifications">
          {notifications.length > 0 ? (
            <>
              <p>Here is the list of notifications</p>
              <button
                style={{
                  float: "right",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label="Close"
                onClick={() => console.log("Close button has been clicked")}
              >
                <img
                  src={closeButton}
                  alt="Close"
                  style={{ width: "10px", height: "10px" }}
                />
              </button>

              <ul>
                {notifications.map((notif) => (
                  <NotificationItem
                    key={notif.id}
                    type={notif.type}
                    value={notif.value}
                    html={notif.html}
                  />
                ))}
              </ul>
            </>
          ) : (
            <p>No new notification for now</p>
          )}
        </div>
      ) : null}
    </>
  );
}

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string,
      value: PropTypes.string,
      html: PropTypes.shape({
        __html: PropTypes.string,
      }),
    })
  ),
  displayDrawer: PropTypes.bool,
};

Notifications.defaultProps = {
  notifications: [],
  displayDrawer: true,
};

export default Notifications;
