import React from 'react';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';
import '../css/Auth.css';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = e => {
    const { username, email, passwordOne } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        console.log(authUser);
        this.props.updateAuth(authUser);
        // Create a user in your Firebase realtime database
        firebase
          .database()
          .ref('users/' + authUser.user.uid)
          .set({
            username,
            email
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/calendar');
      })
      .catch(error => this.setState({ error }));

    e.preventDefault();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div className="signup-container">
        <h2>Create Account</h2>
        <div className="inputs-box">
          <input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="username"
            className="input"
          />
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="email"
            className="input"
          />
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="text"
            placeholder="password"
            className="input"
          />
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="text"
            placeholder="confirm password"
            className="input"
          />
          <button
            disabled={isInvalid}
            onClick={this.onSubmit}
            className="btn signup-btn"
          >
            Sign Up
          </button>
        </div>

        {error && <p className="error-message">{error.message}</p>}
      </div>
    );
  }
}

export default withRouter(SignUp);
