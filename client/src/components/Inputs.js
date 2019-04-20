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
      const theData = this.data.findIndex(
        item => item.date === this.props.dateID
      );
      if (theData != -1) {
        this.data.splice(theData, 1);
      }

      this.data.push(this.state);
      localStorage.setItem('data', JSON.stringify(this.data));
    });
  };
  render() {
    return (
      <form>
        <div>
          Period: start
          <input
            checked={this.state.period.start === 'on' ? 'checked' : false}
            type="radio"
            name="period"
            onChange={e => {
              this.setState({ period: { start: e.target.value } });
            }}
          />
          end
          <input
            checked={this.state.period.end === 'on' ? 'checked' : false}
            type="radio"
            name="period"
            onChange={e => {
              this.setState({ period: { end: e.target.value } });
            }}
          />
        </div>
        <div>
          ovulation: start
          <input
            checked={this.state.ovulation.start === 'on' ? 'checked' : false}
            type="radio"
            name="ovulation"
            onChange={e => {
              this.setState({
                ovulation: { start: e.target.value }
              });
            }}
          />
          end
          <input
            checked={this.state.ovulation.end === 'on' ? 'checked' : false}
            type="radio"
            name="ovulation"
            onChange={e => {
              this.setState({
                ovulation: { end: e.target.value }
              });
            }}
          />
        </div>
        <div>
          Temperature:
          <input
            type="text"
            onChange={e => {
              this.setState({ temperature: e.target.value });
            }}
            value={this.state.temperature}
          />
        </div>
        <div>
          any symptoms?
          <input
            type="text"
            onChange={e => {
              this.setState({ symptoms: e.target.value });
            }}
            value={this.state.symptoms}
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
          <input
            type="checkbox"
            onClick={() => {
              this.setState({ intercourse: !this.state.intercourse });
            }}
          />
        </div>
        <div>
          moods:
          <input
            type="text"
            onChange={e => {
              this.setState({ moods: e.target.value });
            }}
            value={this.state.moods}
          />
        </div>
        <div>
          Note:
          <input
            type="text"
            onChange={e => {
              this.setState({ note: e.target.value });
            }}
            value={this.state.note}
          />
        </div>
        <button style={{ color: 'red' }} onClick={this.saveToServer}>
          SAVE
        </button>

        <p>symptoms:{this.state.symptoms}</p>
        <p>note:{this.state.note}</p>
        <p>moods:{this.state.moods}</p>
        <p>temperature:{this.state.temperature}</p>
      </form>
    );
  }
}

export default Inputs;
