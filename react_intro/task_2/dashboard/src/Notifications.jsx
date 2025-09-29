import "./Notifications.css";
import closeIcon from "./assets/close-button.png";
import { getLatestNotification } from "./utils";

function Notifications() {
  return (
    <div className="notifications">
      <button
        style={{
          position: "absolute",
          top: "25px",
          right: "25px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Close"
        onClick={() => console.log("Close button has been clicked")}
      >
        <img
          src={closeIcon}
          alt="close"
          style={{ width: "10px", height: "10px" }}
        />
      </button>
      <p>Here is the list of notifications</p>
      <ul>
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li
          dangerouslySetInnerHTML={{ __html: getLatestNotification() }}
        ></li>
      </ul>
    </div>
  );
}

export default Notifications;
