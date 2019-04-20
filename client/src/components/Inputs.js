import React from 'react';
import { format } from 'date-fns';
class Inputs extends React.Component {
  constructor(props) {
    super(props);
  }
  data = [];
  state = {
    date: '',
    period: { start: false, end: false },
    ovulation: { start: false, end: false },
    temperature: '',
    moods: [],
    symptoms: [],
    medicine: false,
    intercourse: false,
    note: ''
  };
  componentDidUpdate(prevPro) {
    if (prevPro.dateID === this.props.dateID) return;
    this.setState({
      date: '',
      period: { start: false, end: false },
      ovulation: { start: false, end: false },
      temperature: '',
      moods: [],
      symptoms: [],
      medicine: false,
      intercourse: false,
      note: ''
    });
    let dataFromServer = JSON.parse(localStorage.getItem('data'));
    if (!dataFromServer) {
      return [];
    }

    this.data = [...dataFromServer];

    const theData = dataFromServer.find(
      item => item.date === this.props.dateID
    );
    if (theData) {
      this.setState({
        date: this.props.dataID,
        period: { start: theData.period.start, end: theData.period.end },
        ovulation: {
          start: theData.ovulation.start,
          end: theData.ovulation.end
        },
        temperature: theData.temperature,
        moods: theData.moods,
        symptoms: theData.symptoms,
        medicine: theData.medicine,
        intercourse: theData.intercourse,
        note: theData.note
      });
    }
    console.log(this.state.symptoms);
  }

  saveToServer = () => {
    this.setState({ date: this.props.dateID }, () => {
      this.data.push(this.state);
      localStorage.setItem('data', JSON.stringify(this.data));
    });
  };
  render() {
    return (
      <div>
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
          <input
            type="text"
            onChange={e => {
              this.setState({ symptoms: e.target.value });
            }}
          />
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

        <p>{this.state.symptoms}</p>
      </div>
    );
  }
}

export default Inputs;
