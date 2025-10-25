import React from 'react';
import WithLogging from '../HOC/WithLogging';

class Login extends React.Component {
  render() {
    return (
      <div className="App-login flex-1 m-5 text-left border-t-4 border-[var(--main-color)] pt-4">
        <p className="text-lg font-semibold">Login to access the full dashboard</p>

        <form className="mt-4 flex flex-col gap-4 max-w-sm">
          <label htmlFor="email" className="flex flex-col">
            <span className="mb-1">Email:</span>
            <input
              type="email"
              name="email"
              id="email"
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
            />
          </label>

          <label htmlFor="password" className="flex flex-col">
            <span className="mb-1">Password:</span>
            <input
              type="password"
              name="password"
              id="password"
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
            />
          </label>

          <button
            type="submit"
            className="self-start px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 cursor-pointer transition"
          >
            Ok
          </button>
        </form>
      </div>
    );
  }
}

export default WithLogging(Login);
