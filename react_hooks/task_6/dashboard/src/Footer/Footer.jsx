import React from "react";
import { getCurrentYear, getFooterCopy } from "../utils/utils";

function Footer({ user, logOut }) {
  return (
    <footer className="App-footer text-center text-sm border-t-4 border-[var(--main-color)] mt-10 py-4 text-gray-600">
      <p>
        Copyright {getCurrentYear()} - {getFooterCopy(true)}
      </p>

      {/* Display contact / logout based on login status */}
      {user?.isLoggedIn ? (
        <p>
          Welcome {user.email} (
          <a
            href="#logout"
            onClick={(e) => {
              e.preventDefault();
              logOut();
            }}
          >
            Logout
          </a>
          )
        </p>
      ) : (
        <p>
          <a href="#contact">Contact us</a>
        </p>
      )}
    </footer>
  );
}

export default Footer;
