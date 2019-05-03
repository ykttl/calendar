import React from 'react';
import dateFns from 'date-fns';

class Log extends React.Component {
  getPeriodData() {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    if (!dataFromServer) return '';

    let today = new Date();
    today = today.toString().slice(0, 15);
    today = dateFns.format(today, 'x');

    let daysOfPeriod = [];
    let listOfPeriods = [];

    const periodArr = dataFromServer.filter(data => data.periodNew);

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
    const firstDayOfPrevPeriod = data[0][0].dateIDms;

    let today = new Date();
    today = today.toString().slice(0, 15);
    today = dateFns.format(today, 'x');

    const latestDayOfPeriod = data[0][data[0].length - 1].dateIDms;
    if (latestDayOfPeriod === today) {
      return 'During period now';
    }

    const elapsedDays = (today - firstDayOfPrevPeriod) / 86400000;

    return `${elapsedDays} DAYS SINCE PREVIOUS PERIOD HAD STARTED`;
  };

  getDuration = () => {
    const data = this.getPeriodData();

    return data.map(arr => {
      const firstDay = arr[0].date;
      const lastDay = arr[arr.length - 1].date;
      return (
        <p>
          {firstDay} 〜 {lastDay}
        </p>
      );
    });
  };

  getLength = () => {
    const data = this.getPeriodData();
    return data.map(period => <p>{period.length}days</p>);
  };

  getCycle = () => {
    const data = this.getPeriodData();

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

    return listOfCycle.map(cycle => <p>cycle:{cycle}days</p>);
  };

  averageCycle = () => {
    const data = this.getPeriodData();

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

    const sum = listOfCycle.reduce((a, b) => a + b);
    const average = Math.round(sum / listOfCycle.length);
    return <p>Average Cycle：every {average} days</p>;
  };

  averageLength = () => {
    const data = this.getPeriodData();
    const listOfLength = data.map(period => period.length);
    const sum = listOfLength.reduce((a, b) => a + b);
    const average = Math.round(sum / listOfLength.length);
    return <p>Average length: for {average} days</p>;
  };

  render() {
    return (
      <div>
        <p>{this.getElapsedDays()}</p>
        <div>{this.averageCycle()} </div>
        <div>{this.averageLength()}</div>
        <div style={{ display: 'flex' }}>
          <div> {this.getDuration()}</div>
          <div style={{ border: 'solid 2px' }}> {this.getLength()}</div>
          <div> {this.getCycle()}</div>
        </div>
      </div>
    );
  }
}

export default Log;
