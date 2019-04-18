import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
import Inputs from './components/Inputs';
import Header from './components/Header';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App" style={{ textAlign: 'center' }}>
        <BrowserRouter>
          <Header />
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <Route key={1} exact path="/" component={Inputs} />
            <Route key={2} exact path="/calendar" component={Calendar} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
