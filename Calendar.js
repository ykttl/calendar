import React, { Component } from 'react';
import moment from 'moment';
import './style.css';
class Calendar extends Component {
  state = {
    dateObject: moment()
  };

  getFirstDatOfMonth = () => {
    const firstDay = moment()
      .startOf('month')
      .format('d');
    return firstDay;
  };
  getDaysInMonth = () => {
    return moment().daysInMonth();
  };
  getCurrentDay = () => {
    return moment().format('D');
  };
  render() {
    const daysOfTheWeek = moment.weekdaysShort().map(day => {
      return (
        <th key={day} className="week-day">
          {day}
        </th>
      );
    });

    const blanks = [];
    for (let i = 0; i < this.getFirstDatOfMonth(); i++) {
      blanks.push(<td className="calendar-day empty">{''}</td>);
    }

    let daysInMonth = [];
    for (let i = 1; i < this.getDaysInMonth(); i++) {
      let currentDay = i == this.getCurrentDay() ? 'today' : '';
      daysInMonth.push(
        <td key={i} className={`calendar-day ${currentDay}`}>
          {i}
        </td>
      );
    }

    const blanksANDdays = [...blanks, ...daysInMonth];
    let calendarRows = [];
    let week = [];

    blanksANDdays.forEach((item, index) => {
      if (index % 7 !== 0) {
        week.push(item);
      } else {
        calendarRows.push(week);
        week = [];
        week.push(item);
      }
      if (index === blanksANDdays.length - 1) {
        calendarRows.push(week);
      }
    });

    daysInMonth = calendarRows.map((day, index) => {
      return <tr>{day}</tr>;
    });

    return (
      <div>
        <table className="calendar-day">
          <thead>
            <tr>{daysOfTheWeek}</tr>
          </thead>
          <tbody>{daysInMonth}</tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
