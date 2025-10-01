import Notifications from "../Notifications/Notifications";
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';


function App() {
  return (
    <>
      <div className="root-notifications">
        <Notifications />
        <Header />
        <Login />
        <Footer />
      </div>
    </>
  );
}

export default App;