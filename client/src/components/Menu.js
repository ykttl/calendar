import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Menu.css';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';
import authContext from './Auth';

class Menu extends React.Component {
  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.history.push('/');
      });
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user, 'user2');
      } else {
        console.log('noooo user2');
      }
    });
  }
  render() {
    return (
      <ul>
        <li>
          <Link to="/calendar">Calendar</Link>
        </li>
        <li>
          <Link to="/log">Log</Link>
        </li>
        <li>
          <Link to="/chart">Chart</Link>
        </li>
        <button type="button" onClick={this.signOut}>
          Sign Out
        </button>
      </ul>
    );
  }
}
export default withRouter(Menu);
// import SignOutButton from './SignOut/index';

// import { AuthUserContext } from './Session/index';

// const Menu = () => (
//   <div className="menu">
//     <div className="lgoo">
//       <h1>Period Tracker</h1>
//     </div>
//     <div>
//       <AuthUserContext.Consumer>
//         {authUser => (authUser ? <MenuAuth /> : <MenuNonAuth />)}
//       </AuthUserContext.Consumer>
//     </div>
//   </div>
// );

// const MenuAuth = () => (
//   <ul>
//     <li>
//       <Link to="/">Calendar</Link>
//     </li>
//     <li>
//       <Link to="/log">Log</Link>
//     </li>
//     <li>
//       <Link to="/chart">Chart</Link>
//     </li>
//     <li>
//       <Link to="/account">Account</Link>
//     </li>
//     <li>
//       <Link to="/signin">Sign-In</Link>
//     </li>
//     <li>
//       <SignOutButton />
//     </li>
//   </ul>
// );

// const MenuNonAuth = () => (
//   <ul>
//     <li>
//       <Link to="/">Calendar</Link>
//     </li>
//     <li>
//       <Link to="/signup">Sign-Up</Link>
//     </li>
//     <li>
//       <Link to="/signin">Sign-In</Link>
//     </li>
//   </ul>
// );
