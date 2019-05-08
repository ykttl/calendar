import React from 'react';
import dateFns from 'date-fns';
import '../css/Log.css';

// 毎回date関数呼ぶんじゃなくてステートに保存するといいんじゃない
class Log extends React.Component {
  getPeriodData() {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    if (!dataFromServer) return null;

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
    return listOfPeriods.reverse();
  }

  getElapsedDays = () => {
    const data = this.getPeriodData();
    if (data === null) return;
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
        <p>Since previous period</p>
        <p className="elapsed-day-num">{elapsedDays} DAYS</p>
      </div>
    );
  };

  getDuration = () => {
    const data = this.getPeriodData();
    if (data === null) return;

    return data.map(arr => {
      const firstDay = arr[0].month + ' ' + arr[0].day;
      const lastDay = arr[arr.length - 1].month + ' ' + arr[arr.length - 1].day;
      return (
        <p>
          {firstDay} 〜 {lastDay}
        </p>
      );
    });
  };

  getLength = () => {
    const data = this.getPeriodData();
    if (data === null) return;
    return data.map(period => <p>{period.length} days</p>);
  };

  getCycle = () => {
    const data = this.getPeriodData();
    if (data === null) return;

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

    return listOfCycle.map(cycle => <p>{cycle} days</p>);
  };

  averageCycle = () => {
    const data = this.getPeriodData();
    if (data === null) return;

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
      return <p>Cycle　length: {average} days</p>;
    }
  };

  averageLength = () => {
    const data = this.getPeriodData();
    if (data === null) return;
    const listOfLength = data.map(period => period.length);
    const sum = listOfLength.reduce((a, b) => a + b);
    const average = Math.round(sum / listOfLength.length);
    return <p>Period length: {average} days</p>;
  };

  render() {
    return (
      <div>
        <div className="container-1">
          <div className="column elapsed-days-box">{this.getElapsedDays()}</div>
          <div className="column average-box">
            <p>Average</p>
            <div>{this.averageCycle()} </div>
            <div>{this.averageLength()}</div>
          </div>
        </div>

        <div className="container-2">
          <div className="column">
            <p>Duration</p> {this.getDuration()}
          </div>
          <div className="column">
            <p>Length</p> {this.getLength()}
          </div>
          <div className="column">
            <p>Cycle</p> {this.getCycle()}
          </div>
        </div>
      </div>
    );
  }
}

export default Log;
