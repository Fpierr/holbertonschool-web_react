import React from "react";
import holbertonLogo from "../assets/holberton-logo.jpg";

function Header() {
  return (
    <header className="App-header flex items-center border-b border-gray-200 p-6">
      <img src={holbertonLogo} className="h-20 w-20" alt="Holberton logo" />
      <h1 className="text-[var(--main-color)] text-4xl font-bold ml-4">
        School dashboard
      </h1>
    </header>
  );
}

export default Header;
