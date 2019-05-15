import React from 'react';
import SignUp from './SignUp';
import LogIn from './LogIn';
import '../css/Auth.css';

//ここにステートつくって認証データ保存してわたす？コンテクスト？

// export const authContext = React.createContext(null);

class Auth extends React.Component {
  state = {
    auth: ''
  };
  componentDidUpdate() {
    console.log(this.state);
  }
  updateAuth = auth => {
    this.setState({ auth });
  };
  render() {
    return (
      <div className="auth-container">
        <SignUp updateAuth={this.updateAuth} />
        <LogIn updateAuth={this.updateAuth} />
      </div>
    );
  }
}

export default Auth;
// export default authContext;
