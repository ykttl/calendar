import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Menu.css';
import firebase from '../firebase';

const Menu = () => <div />;
export default Menu;
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
