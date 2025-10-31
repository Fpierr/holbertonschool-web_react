import { useContext } from "react";
import newContext from "../Context/context";
import { getCurrentYear, getFooterCopy } from "../utils/utils";

function Footer() {
  const { user, logOut } = useContext(newContext);

  return (
    <footer className="App-footer text-center text-sm border-t-4 border-[var(--main-color)] mt-10 py-4 text-gray-600">
      <p>
        Copyright {getCurrentYear()} - {getFooterCopy(true)}
      </p>

      {/* Display countact us if loggedIn*/}
      {user.isLoggedIn ? (
        <p>
          Welcome {user.email} (
          <a href="#logout" onClick={logOut}>
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
