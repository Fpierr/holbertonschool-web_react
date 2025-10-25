import React from "react";
import WithLogging from "../HOC/WithLogging";

class Login extends React.Component {
  render() {
    return (
      <div className="App-login border-t-2 border-[var(--main-color)] mt-6 w-full flex flex-col items-start px-4 md:px-8">
        <p className="mb-4 text-base font-medium">
          Login to access the full dashboard
        </p>
        <form className="flex flex-wrap items-center gap-2">
          <label htmlFor="email" className="mr-2 font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-gray-400 rounded-sm px-2 py-1"
          />
          <label htmlFor="password" className="mx-2 font-medium">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border border-gray-400 rounded-sm px-2 py-1"
          />
          <button
            type="submit"
            className="ml-2 bg-[var(--main-color)] text-white px-3 py-1 rounded-sm hover:opacity-90"
          >
            OK
          </button>
        </form>
      </div>
    );
  }
}

export default WithLogging(Login);
