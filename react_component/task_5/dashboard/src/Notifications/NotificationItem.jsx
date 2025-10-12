import PropTypes from 'prop-types';
import { PureComponent } from 'react';

class NotificationItem extends PureComponent {
  render() {
    const { type, html, value, markAsRead, id } = this.props;

    if (type === 'default') {
      return (
        <li
          data-testid="notification-item"
          style={{ color: "blue" }}
          data-notification-type={type}
          onClick={() => markAsRead(id)}
        >
          {value}
        </li>
      );
    } else if (type === 'urgent' && html !== undefined) {
      return (
        <li
          data-testid="notification-item"
          style={{ color: "red" }}
          data-notification-type={type}
          dangerouslySetInnerHTML={html}
          onClick={() => markAsRead(id)}
        ></li>
      );
    } else {
      return (
        <li
          data-testid="notification-item"
          style={{ color: "red" }}
          data-notification-type={type}
          onClick={() => markAsRead(id)}
        >
          {value}
        </li>
      );
    }
  }
}

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  value: PropTypes.string,
  markAsRead: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

NotificationItem.defaultProps = {
  type: 'default',
  html: undefined,
  value: '',
};

export default NotificationItem;
