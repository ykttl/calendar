import React from 'react';
import SignUp from './SignUp';
import LogIn from './LogIn';
import '../css/Auth.css';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase';

class Auth extends React.Component {
  async componentDidMount() {
    const data = firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        this.props.history.push('/calendar');
      }
    });
  }

  render() {
    return (
      <div className="auth-container">
        <SignUp updateAuth={this.updateAuth} />
        <LogIn updateAuth={this.updateAuth} />
      </div>
    );
  }
}

export default withRouter(Auth);
