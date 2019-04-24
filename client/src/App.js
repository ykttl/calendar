import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
import Home from './components/Home';
import Header from './components/Header';
import Chart from './components/Chart';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App" style={{ textAlign: 'center' }}>
        <BrowserRouter>
          <Header />
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <Route key={1} exact path="/" component={Home} />
            <Route key={2} exact path="/calendar" component={Calendar} />
            <Route key={3} exact path="/chart" component={Chart} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
