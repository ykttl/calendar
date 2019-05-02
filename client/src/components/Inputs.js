import React from 'react';

let message = {
  periodEnd: null
};

class Inputs extends React.Component {
  data = [];
  state = {
    date: '',
    dateIDms: '',
    dateNumID: '',
    month: '',
    day: '',
    year: '',
    period: { start: false, end: false },
    ovulation: { start: false, end: false },
    temperature: '',
    moods: [],
    symptoms: '',
    suggestions: [],
    medicine: false,
    intercourse: false,
    note: '',
    err: '',
    periodNew: false
  };
  componentDidUpdate(prevPro, prevState) {
    if (prevPro.dateID === this.props.dateID && prevState !== this.state)
      return;
    this.setState({
      date: '',
      dateIDms: '',
      dateNumID: '',
      month: '',
      day: '',
      year: '',
      period: { start: false, end: false },
      ovulation: { start: false, end: false },
      temperature: '',
      moods: [],
      symptoms: '',
      medicine: false,
      intercourse: false,
      note: '',
      err: '',
      periodNew: false
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
        dateIDms: this.props.dateIDms,
        dateNumID: this.props.dateIDnum,
        month: this.props.dateID.slice(4, 7),
        day: this.props.dateID.slice(8, 10),
        year: this.props.dateID.slice(11, 15),
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
        note: theData.note,
        periodNew: theData.periodNew
      });
    }
    console.log(dataFromServer);
  }

  saveToServer = () => {
    this.setState(
      {
        date: this.props.dateID,
        dateIDms: this.props.dateIDms,
        dateNumID: this.props.dateIDnum,
        month: this.props.dateID.slice(4, 7),
        day: this.props.dateID.slice(8, 10),
        year: this.props.dateID.slice(11, 15)
      },
      () => {
        const theData = this.data.findIndex(
          item => item.date === this.props.dateID
        );

        if (theData !== -1) {
          this.data.splice(theData, 1);
        }
        this.data.push(this.state);

        function compare(a, b) {
          a = parseInt(a.dateIDms);
          b = parseInt(b.dateIDms);
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        }

        this.data.sort(compare);
        // this.data.sort();
        console.log(this.data);

        localStorage.setItem('data', JSON.stringify(this.data));
      }
    );
  };
  componentDidMount() {
    this.handlePeriodStart();
  }
  handlePeriodStart = e => {
    this.setState({ period: { start: !this.state.period.start } });

    // const dataFromServer = JSON.parse(localStorage.getItem('data'));

    // const index = dataFromServer.findIndex(
    //   obj => obj.dateIDms >= this.props.dateIDms
    // );

    // if (index === -1 && dataFromServer.length === 1) {
    //   this.setState({ period: { start: !this.state.period.start } });
    //   return;
    // } else {
    //   this.setState({
    //     err: 'input ending date first!!!!',
    //     period: { start: false }
    //   });
    // }

    // if (index === -1) {
    //   for (let i = dataFromServer.length - 1; i > 0; i--) {
    //     if (dataFromServer[i].period && !dataFromServer[i].period.end) {
    //       this.setState({
    //         err: 'input ending date first!!!!',
    //         period: { start: false }
    //       });
    //       return;
    //     } else {
    //       this.setState({ period: { start: !this.state.period.start } });
    //       return;
    //     }
    //   }
    // }
  };
  handlePeriodEnd = e => {
    this.setState({ period: { end: !this.state.period.end } });
    // const dataFromServer = JSON.parse(localStorage.getItem('data'));

    // const index = dataFromServer.findIndex(
    //   obj => obj.dateIDms >= this.props.dateIDms
    // );

    // if (
    //   index === -1 &&
    //   dataFromServer.length === 1 &&
    //   dataFromServer[0].period.start
    // ) {
    //   this.setState({ period: { end: !this.state.period.end } });
    //   return;
    // } else {
    //   this.setState({
    //     err: 'input starting date first!!!!',
    //     period: { end: false }
    //   });
    // }

    // if (index === -1) {
    //   for (let i = dataFromServer.length - 1; i > 0; i--) {
    //     if (dataFromServer[i].period && !dataFromServer[i].period.start) {
    //       this.setState({
    //         err: 'input starting date first!!!!',
    //         period: { end: false }
    //       });
    //       return;
    //     } else {
    //       this.setState({ period: { end: !this.state.period.end } });
    //       return;
    //     }
    //   }
    // }
    // if (index === 0) {
    //   console.log('DAME!! index 0');
    //   this.setState({
    //     err: 'input starting date first!!!!',
    //     period: { end: false }
    //   });
    //   return;
    // }
    // else {
    //   console.log('ok index 0 ');
    //   this.setState({ period: { end: !this.state.period.end } });
    // }

    // const index2 = dataFromServer.findIndex(
    //   obj => obj.dateIDms >= this.props.dateIDms
    // );
    // for (let i = index2; i > 0; i--) {
    //   if (dataFromServer[i].period && !dataFromServer[i].period.start) {
    //     console.log('dame index');
    //     this.setState({
    //       err: 'input starting date first!!!!',
    //       period: { end: false }
    //     });
    //     return;
    //   } else {
    //     console.log('ok index');
    //     this.setState({ period: { end: !this.state.period.end } });
    //   }
    //   return;
    // }
  };
  render() {
    return (
      <div>
        <div>
          <p>{this.state.err !== '' && this.state.err}</p>
          <div>
            period:
            <input
              type="checkbox"
              checked={this.state.periodNew === true ? 'checked' : false}
              onChange={() => {
                this.setState({ periodNew: !this.state.periodNew });
              }}
            />
          </div>

          <div>
            ovulation:start
            <input
              checked={this.state.ovulation.start === true ? 'checked' : false}
              type="radio"
              name="ovulation"
              onChange={e => {
                this.setState({
                  ovulation: { start: !this.state.ovulation.start }
                });
              }}
            />
            end
            <input
              checked={this.state.ovulation.end === true ? 'checked' : false}
              type="radio"
              name="ovulation"
              onChange={e => {
                this.setState({
                  ovulation: { end: !this.state.ovulation.end }
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
            <select
              onChange={e => {
                this.setState({ symptoms: e.target.value });
              }}
              value={this.state.symptoms}
            >
              <option value="">-</option>
              <option value="headache">headache</option>
              <option value="crump">crump</option>
              <option value="heavy">heavy</option>
            </select>
          </div>

          <div>
            Took any medicine?
            <input
              type="checkbox"
              checked={this.state.medicine === true ? 'checked' : false}
              onChange={() => {
                this.setState({ medicine: !this.state.medicine });
              }}
            />
          </div>
          <div>
            intercourse?
            <input
              type="checkbox"
              checked={this.state.intercourse === true ? 'checked' : false}
              onChange={() => {
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
        </div>
      </div>
    );
  }
}

export default Inputs;

// <input
// type="text"
// onChange={e => {
//   this.setState({ symptoms: e.target.value });
// }}
// value={this.state.symptoms}
// />
