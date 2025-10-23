import React from 'react';
import './Login.css';
import WithLogging from '../HOC/WithLogging';

class Login extends React.Component {
  render() {
    return (
      <div className="App-login">
        <p>Login to access the full dashboard</p>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Ok</button>
      </div>
    );
  }
}

export default WithLogging(Login);
