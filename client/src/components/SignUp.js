import React from 'react';
import firebase from '../firebase';

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
        // Create a user in your Firebase realtime database
        return firebase
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
      <div>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="username"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="email"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="text"
          placeholder="passwordOne"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="text"
          placeholder="passwordTwo"
        />
        <button disabled={isInvalid} onClick={this.onSubmit}>
          Sign Up
        </button>
        {error && <p>{error.message}</p>}
      </div>
    );
  }
}

export default SignUp;
