import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <nav>
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
      </nav>
    );
  }
}

export default Header;
