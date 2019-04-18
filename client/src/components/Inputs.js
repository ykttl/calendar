import React from 'react';
import { format } from 'date-fns';
class Inputs extends React.Component {
  state = {
    date: format(new Date(), 'ddd MMM DD YYYY'),
    period: { start: false, end: false },
    ovulation: { start: false, end: false },
    temperature: '',
    moods: [],
    symptoms: [],
    medicine: false,
    intercourse: false,
    note: ''
  };
  componentDidUpdate() {
    console.log(this.state);
  }
  saveToServer = () => {
    localStorage.setItem('data', JSON.stringify(this.state));
  };
  render() {
    console.log(this.state.date);
    return (
      <div>
        <div> {this.state.date}</div>
        <div>
          Period:
          <button>START</button>
          <button>END</button>
        </div>
        <div>
          ovulation:
          <button>START</button>
          <button>END</button>
        </div>
        <div>
          Temperature:
          <input type="text" />
        </div>
        <div>
          any symptoms?
          <input type="text" />
        </div>
        <div>
          Took any medicine?
          <input
            type="checkbox"
            onClick={() => {
              this.setState({ medicine: !this.state.medicine });
            }}
          />
        </div>
        <div>
          intercourse?
          <input type="checkbox" />
        </div>
        <div>
          moods:
          <input type="text" />
        </div>
        <div>
          Note:
          <input type="text" />
        </div>
        <button style={{ color: 'red' }} onClick={this.saveToServer}>
          SAVE
        </button>
      </div>
    );
  }
}

export default Inputs;
