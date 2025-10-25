import React from "react";
import holbertonLogo from "../assets/holberton-logo.jpg";

export default function Header() {
  return (
    <header
      className="App-header flex items-center justify-start border-b border-gray-200 p-6 
                 max-[520px]:flex-col max-[520px]:text-center max-[520px]:p-4"
    >
      <img src={holbertonLogo} className="h-20 w-20 max-[520px]:mb-2" alt="Holberton logo" />
      <h1
        className="text-4xl font-bold text-[var(--main-color)] ml-4 
                   max-[520px]:ml-0 max-[520px]:text-2xl"
      >
        School dashboard
      </h1>
    </header>
  );
}
