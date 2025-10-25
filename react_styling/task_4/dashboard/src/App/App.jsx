import { Component } from 'react';
import Notifications from "../Notifications/Notifications";
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from "../CourseList/CourseList";
import PropTypes from 'prop-types';
import { getLatestNotification } from "../utils/utils";
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() }}
]

const coursesList = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'h') {
      alert("Logging you out");
      this.props.logOut();
    }
  }

  render() {
    const { isLoggedIn = false } = this.props;

    return (
      <>
        <Notifications notifications = {notificationsList} />
        <>
          <Header />
          {
            !isLoggedIn ? (
              <BodySectionWithMarginBottom title='Log in to continue'>
                <Login />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title='Course list'>
                <CourseList courses = {coursesList} />
              </BodySectionWithMarginBottom>
            )
          }
          <BodySection title="News from the School">
            <p>Holberton School News goes here</p>
          </BodySection>
        </>
        <Footer />
      </>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func,
};

App.defaultProps = {
  isLoggedIn: true,
  logOut: () => {},
};

export default App;