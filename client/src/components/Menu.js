import React from 'react';
import { Link } from 'react-router-dom';
import '../Menu.css';

class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <div className="lgoo">
          <h1>Period Tracker</h1>
        </div>

        <ul>
          <li>
            <Link to="/">Calendar</Link>
          </li>
          <li>
            <Link to="/log">Log</Link>
          </li>
          <li>
            <Link to="/chart">Chart</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Menu;
