import React from "react";
import WithLogging from "../HOC/WithLogging";

class Login extends React.Component {
  render() {
    return (
      <div className="App-login flex-1 text-left border-t-4 border-[var(--main-color)] pt-6 px-8 
                      max-[520px]:px-4">
        <p className="text-lg font-semibold mb-2">Login to access the full dashboard</p>

        <form className="flex flex-wrap items-center gap-4 max-[520px]:flex-col max-[520px]:items-stretch">
          <label htmlFor="email" className="flex items-center gap-2 max-[520px]:flex-col max-[520px]:items-start">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 rounded px-2 py-1 
                         focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] w-auto max-[520px]:w-full"
            />
          </label>

          <label htmlFor="password" className="flex items-center gap-2 max-[520px]:flex-col max-[520px]:items-start">
            Password:
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 rounded px-2 py-1 
                         focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] w-auto max-[520px]:w-full"
            />
          </label>

          <button
            type="submit"
            className="px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 
                       cursor-pointer transition max-[520px]:w-full"
          >
            Ok
          </button>
        </form>
      </div>
    );
  }
}

export default WithLogging(Login);
