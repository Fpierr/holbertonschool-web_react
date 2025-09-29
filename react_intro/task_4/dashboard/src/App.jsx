import holbertonLogo from "./assets/holberton-logo.jpg"
import './App.css'
import { getCurrentYear, getFooterCopy } from "./utils";
import Notifications from "./Notifications";

function App() {
  return (
    <>
      <div className="root-notifications">
        <Notifications />
      </div>

      <div className="App-header">
        <img className="logo" src={holbertonLogo} alt="holberton logo" />
        <h1>School dashboard</h1>
      </div>

      <div className="App-body">
        <p>Login to access the full dashboard</p>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />
        <button role="button" type="submit">Ok</button>
      </div>

      <div className="App-footer">
        <p>Copyright {getCurrentYear()} {getFooterCopy(true)}</p>
      </div>
  </>
  );
}

export default App