import React from "react";
import WithLogging from "../HOC/WithLogging";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email || "",
      password: props.password || "",
      enableSubmit: false,
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    const { logIn } = this.props;
    const { email, password } = this.state;

    if (logIn) {
      logIn(email, password);
    }
  }

  handleChangeEmail(e) {
    this.setState({ email: e.target.value }, this.validateForm);
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value }, this.validateForm);
  }

  validateForm() {
    const { email, password } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const enableSubmit = emailRegex.test(email) && password.length >= 8;
    this.setState({ enableSubmit });
  }

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className="App-login flex-1 text-left m-8 border-t-4 border-[var(--main-color)] pt-6">
        <p className="text-lg font-semibold mb-2">
          Login to access the full dashboard
        </p>

        <form
          className="flex flex-wrap items-center gap-4"
          onSubmit={this.handleLoginSubmit}
        >
          <label htmlFor="email" className="flex items-center gap-2">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.handleChangeEmail}
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
            />
          </label>

          <label htmlFor="password" className="flex items-center gap-2">
            Password:
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={this.handleChangePassword}
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
            />
          </label>

          <input
            type="submit"
            value="OK"
            disabled={!enableSubmit}
            className={`px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 cursor-pointer transition ${
              !enableSubmit ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        </form>
      </div>
    );
  }
}

export default WithLogging(Login);
