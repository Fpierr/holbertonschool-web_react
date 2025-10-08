import "./Notifications.css";
import closeButton from "../assets/close-button.png";
import PropTypes from 'prop-types';
import NotificationItem from "./NotificationItem";

function Notifications ({ notifications = [] }) {
    return (
        <>
            <div className="notifications">
                <button
                    style={{
                        float: "right",
                        background: 'transparent',
                        border: "none",
                        cursor: "pointer"
                    }}
                    aria-label="Close"
                    onClick={() => console.log('Close button has been clicked')}
                >
                    <img src={closeButton} alt="Close" style={{ width: "10px", height: "10px" }} />
                </button>
                <p>Here is the list of notifications</p>
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
            </div>
        </>
    );
}

Notifications.propTypes = {
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            value: PropTypes.string,
            html: PropTypes.shape({__html: PropTypes.string }),
        })
    ),
};

Notifications.defaultProps = {
    notifications: [],
};

export default Notifications