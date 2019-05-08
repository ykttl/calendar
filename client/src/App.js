import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
import Log from './components/Log';
import Menu from './components/Menu';
import Chart from './components/Chart';
import SignUp from './components/SignUp/index';
import SignIn from './components/SignIn/index';
import SignOut from './components/SignOut/index';
import Account from './components/Account/index';
import ForgotPW from './components/PasswordForget/index';
import './css/App.css';
import { withFirebase } from './components/Firebase';
import { AuthUserContext } from './components/Session/index';
import { withAuthentication } from './components/Session/index';

const App = () => (
  <div
    className="App"
    style={{ width: '70%', margin: '0 auto', textAlign: 'center' }}
  >
    <BrowserRouter>
      <Menu />
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Route key={1} exact path="/" component={Calendar} />
        <Route key={2} exact path="/log" component={Log} />
        <Route key={3} exact path="/chart" component={Chart} />
        <Route key={4} exact path="/signup" component={SignUp} />
        <Route key={5} exact path="/signin" component={SignIn} />
        <Route key={6} exact path="/signout" component={SignOut} />
        <Route key={7} exact path="/account" component={Account} />
        <Route key={8} exact path="/forgotPW" component={ForgotPW} />
      </div>
      <a href="https://icons8.com/icon/52810/pill">Pill icon by Icons8</a>
    </BrowserRouter>
  </div>
);

// export default App;
// export default withFirebase(App);
export default withAuthentication(App);
