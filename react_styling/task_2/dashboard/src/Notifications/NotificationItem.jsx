import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class NotificationItem extends PureComponent {
    render() {
        const { type, value, html, markAsRead } = this.props;
        
        const colorStyle = {
            color: type === 'default' 
                ? 'var(--default-notification-item)' 
                : 'var(--urgent-notification-item)'
        };

        return (
            <li
                style={colorStyle}
                data-notification-type={type}
                dangerouslySetInnerHTML={type === 'urgent' && html !== undefined ? html : undefined}
                onClick={markAsRead}
            >
                {type === 'urgent' && html !== undefined ? null : value}
            </li>
        );
    }
}

NotificationItem.propTypes = {
    type: PropTypes.oneOf(['default', 'urgent']).isRequired,
    value: PropTypes.string,
    html: PropTypes.shape({
        __html: PropTypes.string,
    }),
    markAsRead: PropTypes.func.isRequired,
};

NotificationItem.defaultProps = {
    value: '',
    html: undefined,
};

export default NotificationItem;