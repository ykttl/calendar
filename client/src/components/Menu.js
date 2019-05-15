import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Menu.css';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';

class Menu extends React.Component {
  state = { user: true };

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.history.push('/');
        this.setState({ user: null });
      });
  };

  renderMenuItem = () => (
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
      <li style={{ cursor: 'pointer' }}>
        <a type="button" onClick={this.signOut}>
          Sign-out
        </a>
      </li>
    </ul>
  );

  render() {
    return (
      <div className="menu">
        <div className="lgoo">
          <h1>Period Tracker</h1>
        </div>
        {this.state.user && this.renderMenuItem()}
      </div>
    );
  }
}
export default withRouter(Menu);
