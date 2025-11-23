import React, { memo } from "react";
import PropTypes from "prop-types";

function NotificationItem({ id, type, value, markAsRead }) {
  const colorStyle = {
    color: type === "urgent" ? "var(--urgent-notification-item)" : "var(--default-notification-item)",
  };

  const handleClick = () => {
    markAsRead(id);
  };

  return (
    <li
      data-testid="notification-item"
      style={colorStyle}
      data-notification-type={type}
      onClick={handleClick}
    >
      {value}
    </li>
  );
}

NotificationItem.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["default", "urgent"]).isRequired,
  value: PropTypes.string.isRequired,
  markAsRead: PropTypes.func.isRequired,
};

NotificationItem.defaultProps = {
  type: "default",
};

export default memo(NotificationItem);
