import React from 'react';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';
import '../css/Auth.css';
import { Route, Redirect } from 'react-router-dom';
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.props.updateAuth(authUser);
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });

        this.props.history.push('/calendar');
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit} className="login-container">
        <h2>Log in</h2>

        <div className="sample-msg">
          <p className="sample-p">* For sample data *</p>
          <p className="sample-p">Email: shw67wdg5n6c@sute.jp</p>
          <p className="sample-p">Password: sample</p>
        </div>

        <div className="inputs-box">
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
            className="input"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
            className="input"
          />
          <button disabled={isInvalid} type="submit" className="btn login-btn">
            Sign In
          </button>
        </div>
        {error && <p className="error-message">{error.message}</p>}
      </form>
    );
  }
}

export default withRouter(LogIn);
