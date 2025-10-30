import React, { Component } from "react";
import holbertonLogo from "../assets/holberton-logo.jpg";
import newContext from "../Context/context";

class Header extends Component {
  // Utilisation du Context
  static contextType = newContext;

  render() {
    const { user, logOut } = this.context;

    return (
      <header className="App-header flex items-center border-b border-gray-200 p-6">
        <img src={holbertonLogo} className="h-20 w-20" alt="Holberton logo" />
        <h1 className="text-[var(--main-color)] text-4xl font-bold ml-4">
          School dashboard
        </h1>

        {/* Section logout if isLoggedIn */}
        {user.isLoggedIn && (
          <section id="logoutSection" className="ml-auto text-right">
            <p>
              Welcome {user.email} (
              <span
                onClick={logOut}
                style={{ cursor: "pointer", color: "blue" }}
              >
                logout
              </span>
              )
            </p>
          </section>
        )}
      </header>
    );
  }
}

export default Header;
