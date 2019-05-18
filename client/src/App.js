import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
import Log from './components/Log';
import Menu from './components/Menu';
import Chart from './components/Chart';
import Auth from './components/Auth';
import './css/App.css';
import './css/Calendar.css';

const App = () => (
  <div className="app-container">
    <BrowserRouter>
      <Menu />
      <div className="routes-container">
        <Route key={0} exact path="/" component={Auth} />
        <Route key={1} exact path="/calendar" component={Calendar} />
        <Route key={2} exact path="/log" component={Log} />
        <Route key={3} exact path="/chart" component={Chart} />
      </div>
    </BrowserRouter>
  </div>
);

export default App;

// <Route key={4} exact path="/signup" component={SignUp} />
// <Route key={5} exact path="/signin" component={SignIn} />
// <Route key={6} exact path="/signout" component={SignOut} />
// <Route key={7} exact path="/account" component={Account} />
// <Route key={8} exact path="/forgotPW" component={ForgotPW} />
