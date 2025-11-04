import React from "react";
import WithLogging from "../HOC/WithLogging";

class Login extends React.Component {
  render() {
    return (
      <div className="App-login flex-1 text-left m-8 border-t-4 border-[var(--main-color)] pt-6">
        <p className="text-lg font-semibold mb-2">Login to access the full dashboard</p>

        <form className="flex flex-wrap items-center gap-4">
          <label htmlFor="email" className="flex items-center gap-2">
            Email
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
            />
          </label>

          <label htmlFor="password" className="flex items-center gap-2">
            Password
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
            />
          </label>

          <button
            type="submit"
            className="px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 cursor-pointer transition"
          >
            Ok
          </button>
        </form>
      </div>
    );
  }
}

export default WithLogging(Login);
