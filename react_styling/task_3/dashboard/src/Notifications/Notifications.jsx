import { Component } from "react";
import "./Notifications.css";
import closeButton from "../assets/close-button.png";
import PropTypes from "prop-types";
import NotificationItem from "./NotificationItem";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length !== this.props.notifications.length;
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
  const { notifications = [], displayDrawer = true } = this.props;
    return (
      <>
        <div className="notification-title">Your notifications</div>

        {displayDrawer ? (
          <div className="notifications">
            {notifications.length > 0 ? (
              <>
                <button
                  style={{
                    float: "right",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    flex: 1,
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
                <p style={{marginLeft: "20px"}} >Here is the list of notifications</p>

                <ul>
                  {notifications.map((notif) => (
                    <NotificationItem
                      key={notif.id}
                      id={notif.id}
                      type={notif.type}
                      value={notif.value}
                      html={notif.html}
                      markAsRead={this.markAsRead}
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
