import { Component } from "react";
import closeIcon from "../assets/close-button.png";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";

class Notifications extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length !== this.props.notifications.length;
  }

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  render() {
    const { notifications = [], displayDrawer = true } = this.props;

    const borderStyle = {
      borderColor: "var(--main-color)",
    };

    return (
      <>
        {/* Menu text hidden on mobile */}
        <div className="text-right pr-8 pt-2 max-[912px]:hidden">
          Your notifications
        </div>

        {displayDrawer && (
          <div
            className="border-2 border-dashed bg-white p-6 relative float-right mr-8 mt-2 max-w-4xl
                       max-[912px]:fixed max-[912px]:inset-0 max-[912px]:z-50 max-[912px]:m-0 
                       max-[912px]:max-w-none max-[912px]:border-0 max-[912px]:p-4"
            style={borderStyle}
          >
            <button
              onClick={() => console.log("Close button has been clicked")}
              aria-label="Close"
              className="absolute cursor-pointer right-3 top-3 bg-transparent border-none p-0"
            >
              <img src={closeIcon} alt="close icon" className="w-5 h-5" />
            </button>

            {notifications.length > 0 ? (
              <>
                <p className="font-bold mb-3 max-[912px]:text-lg">
                  Here is the list of notifications
                </p>
                <ul className="list-disc pl-6 space-y-1 
                               max-[912px]:list-none max-[912px]:pl-0 max-[912px]:space-y-0">
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      type={notification.type}
                      value={notification.value}
                      html={notification.html}
                      markAsRead={() => this.markAsRead(notification.id)}
                    />
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-center max-[912px]:text-left">
                No new notification for now
              </p>
            )}
          </div>
        )}
      </>
    );
  }
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
};

export default Notifications;
