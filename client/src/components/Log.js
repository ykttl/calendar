import React from 'react';
import dateFns from 'date-fns';
import '../css/Log.css';
import firebase from '../firebase';
import loading from '../loading.gif';

class Log extends React.Component {
  state = {
    dataFromServer: '',
    periodData: '',
    user: ''
  };

  getDataFromServer = async () => {
    const data = await firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        firebase
          .database()
          .ref('data/' + authUser.uid)
          .on('value', snapshot => {
            if (snapshot.val() === null) {
              this.setState(
                {
                  dataFromServer: []
                },
                () => {
                  this.setState({ user: true });
                }
              );
            } else {
              this.setState(
                {
                  dataFromServer: snapshot.val().map(item => item)
                },
                () => {
                  this.getPeriodData();
                }
              );
            }
          });
      }
    });
  };
  componentWillMount() {
    this.getDataFromServer();
  }
  getPeriodData() {
    const dataFromServer = this.state.dataFromServer;

    if (dataFromServer.length === 0) return;

    let today = new Date();
    today = today.toString().slice(0, 15);
    today = dateFns.format(today, 'x');

    let daysOfPeriod = [];
    let listOfPeriods = [];

    const periodArr = dataFromServer.filter(data => data.period);

    periodArr.findIndex((day, index) => {
      let nextDayInArr = periodArr[index + 1];

      if (nextDayInArr) {
        let dayDifference = Math.round(
          (nextDayInArr.dateIDms - day.dateIDms) / 86400000
        );
        if (dayDifference === 1) {
          daysOfPeriod.push(day);
        } else {
          daysOfPeriod.push(day);
          listOfPeriods.push(daysOfPeriod);
          daysOfPeriod = [];
        }
      }

      if (!nextDayInArr) {
        daysOfPeriod.push(day);
        listOfPeriods.push(daysOfPeriod);
        daysOfPeriod = [];
      }
    });

    this.setState({
      periodData: listOfPeriods.reverse()
    });
  }

  getElapsedDays = () => {
    const data = this.state.periodData;
    if (data.length === 0)
      return <p className="elapsed-day-num days">0 Days</p>;
    const firstDayOfPrevPeriod = data[0][0].dateIDms;

    let today = new Date();
    today = today.toString().slice(0, 15);
    today = dateFns.format(today, 'x');

    const latestDayOfPeriod = data[0][data[0].length - 1].dateIDms;

    if (latestDayOfPeriod === today) {
      return <p>During period now</p>;
    }

    const elapsedDays = (today - firstDayOfPrevPeriod) / 86400000;

    return (
      <div>
        <p className="elapsed-day-num days">{elapsedDays} Days</p>
      </div>
    );
  };

  getDuration = () => {
    const data = this.state.periodData;
    if (data.length === 0) return <p>---</p>;

    return data.map(arr => {
      const firstDay = arr[0].month + ' ' + arr[0].day;
      const lastDay = arr[arr.length - 1].month + ' ' + arr[arr.length - 1].day;
      return (
        <p className="days">
          {firstDay} - {lastDay}
        </p>
      );
    });
  };

  getLength = () => {
    const data = this.state.periodData;
    if (data.length === 0) return <p className="days">0 Day</p>;
    return data.map(period => <p className="days">{period.length} Days</p>);
  };

  getCycle = () => {
    const data = this.state.periodData;
    if (data.length === 0) return <p className="days">0 Day</p>;

    const listOfCycle = data.map((period, index) => {
      let prevPeriod = data[index + 1];

      if (prevPeriod) {
        const cycle = Math.round(
          (period[0].dateIDms - prevPeriod[0].dateIDms) / 86400000
        );
        return cycle;
      } else {
        return '---';
      }
    });

    return listOfCycle.map(cycle => <p className="days">{cycle} Days</p>);
  };

  averageCycle = () => {
    const data = this.state.periodData;
    if (data.length === 0) return <span className="days">0 Day</span>;

    let listOfCycle = data.map((period, index) => {
      let prevPeriod = data[index + 1];

      if (prevPeriod) {
        const cycle = Math.round(
          (period[0].dateIDms - prevPeriod[0].dateIDms) / 86400000
        );
        return cycle;
      } else {
        return '---';
      }
    });

    listOfCycle = listOfCycle.filter(cycle => typeof cycle === 'number');

    if (listOfCycle.length !== 0) {
      const sum = listOfCycle.reduce((a, b) => a + b);
      const average = Math.round(sum / listOfCycle.length);
      return <span className="days"> {average} Days</span>;
    } else {
      return <span className="days">--- Day</span>;
    }
  };

  averageLength = () => {
    const data = this.state.periodData;
    if (data.length === 0) return <span>0 Day</span>;
    const listOfLength = data.map(period => period.length);
    const sum = listOfLength.reduce((a, b) => a + b);
    const average = Math.round(sum / listOfLength.length);
    return <span className="days">{average} Days</span>;
  };

  render() {
    return (
      <div className="log-container">
        {this.state.user === '' && !this.state.dataFromServer ? (
          <img src={loading} />
        ) : (
          <div>
            <div className="container-1">
              <div className="elapsed-days-box">
                <p className="title">Since previous period</p>
                {this.getElapsedDays()}
              </div>
              <div className="average-box">
                <p className="title">Average</p>
                <div>Cycle Length {this.averageCycle()} </div>
                <div>Period Length {this.averageLength()}</div>
              </div>
            </div>

            <div className="container-2">
              <p className="title">History</p>

              <div className="column-box">
                <div className="column">
                  <p className="column-title">Duration</p> {this.getDuration()}
                </div>
                <div className="column">
                  <p className="column-title">Length</p> {this.getLength()}
                </div>
                <div className="column">
                  <p className="column-title">Cycle</p> {this.getCycle()}
                </div>
              </div>
            </div>
          </div>
        )}{' '}
      </div>
    );
  }
}

export default Log;
