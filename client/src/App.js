import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
import Log from './components/Log';
import Menu from './components/Menu';
import Chart from './components/Chart';
import './App.css';

class App extends React.Component {
  render() {
    return (
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
          </div>
          <a href="https://icons8.com/icon/52810/pill">Pill icon by Icons8</a>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
