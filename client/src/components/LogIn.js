import React from 'react';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';

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
        console.log(authUser);
        this.props.updateAuth(authUser);
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/log');
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
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withRouter(LogIn);
