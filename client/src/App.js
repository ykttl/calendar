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
        <Route key={Auth} exact path="/" component={Auth} />
        <Route key={Calendar} exact path="/calendar" component={Calendar} />
        <Route key={Log} exact path="/log" component={Log} />
        <Route key={Chart} exact path="/chart" component={Chart} />
      </div>
    </BrowserRouter>
  </div>
);

export default App;
