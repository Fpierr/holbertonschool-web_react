import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      enableSubmit: false,
      isLoggedIn: false,
    };
  }

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value }, this.validateForm);
  };

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value }, this.validateForm);
  };

  validateForm = () => {
    const { email, password } = this.state;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const enableSubmit = emailRegex.test(email) && password.length >= 8;
    this.setState({ enableSubmit });
  };

  handleLoginSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoggedIn: true });
  };

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className="App-login">
        <p>Login to access the full dashboard</p>
        <form onSubmit={this.handleLoginSubmit}>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.handleChangeEmail}
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={this.handleChangePassword}
            />
          </label>
          <input
            type="submit"
            value="OK"
            disabled={!enableSubmit}
          />
        </form>
      </div>
    );
  }
}

export default Login;
