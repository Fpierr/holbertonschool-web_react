import React from "react";
import PropTypes from "prop-types";

function NotificationItem({ type, value, html }) {
  if (html) {
    return (
      <li
        data-testid="notification-item"
        data-notification-type={type}
        style={{ color: type === "urgent" ? "red" : "blue" }}
        dangerouslySetInnerHTML={html}
      ></li>
    );
  }

  return (
    <li
      data-testid="notification-item"
      data-notification-type={type}
      style={{ color: type === "urgent" ? "red" : "blue" }}
    >
      {value}
    </li>
  );
}

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
};

NotificationItem.defaultProps = {
  type: "default",
  value: "",
  html: null,
};

export default NotificationItem;
