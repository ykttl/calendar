// this calendar is made by referring to https://github.com/moodydev/react-calendar
// https://blog.flowandform.agency/create-a-custom-calendar-in-react-3df1bfd0b728

// (>_<)

import React from 'react';
import dateFns from 'date-fns';
import Modal from './Modal';

var gaga;
var opa = false;
var end = false;

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    showModal: false,
    dateID: '',
    dateIDms: '',
    dateIDnum: ''
  };

  renderHeader = () => {
    const dateFormat = 'MMMM YYYY';

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  };

  renderDays = () => {
    const dateFormat = 'dddd';
    let startDate = dateFns.startOfWeek(this.state.currentMonth);
    let days = [];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };

  renderCells = () => {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    console.log('server', dataFromServer);
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = 'D';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    let intercourseIcon;
    let medicineIcon;
    let symptomsIcon;
    let noteIcon;
    let periodToggle = false;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);

        const cloneDay = day;
        const dateID = day.toString().slice(0, 15);
        const dateIDms = dateFns.format(day, 'x');
        const dateIDnum = dateFns.format(day, 'YYYYMD');

        let css = [];

        // ============== adding CSS ==================================
        if (dataFromServer) {
          dataFromServer.find(obj => {
            if (obj.date === dateID) {
              // intercourseIcon = 'aaaa';
              // console.log(intercourseIcon);
              if (obj.periodNew) {
                css.push('period-start');
              }

              if (obj.period.start) {
                gaga = true;
                css.push('period-start');
              }

              if (obj.period.end) {
                gaga = false;
                // end = true;

                css.push('period-end');
              }

              if (obj.medicine) {
                css.push('medicine');
                medicineIcon = (
                  <img src="https://img.icons8.com/ultraviolet/25/000000/pill.png" />
                );
              } else {
                medicineIcon = '';
              }

              if (obj.intercourse) {
                css.push('intercourse');
                intercourseIcon = (
                  <img src="https://img.icons8.com/office/25/000000/hearts.png" />
                );
              } else {
                intercourseIcon = '';
              }

              if (obj.symptoms !== '') {
                symptomsIcon = (
                  <img src="https://img.icons8.com/color/25/000000/question.png" />
                );
              } else {
                symptomsIcon = '';
              }

              if (obj.note !== '') {
                // css.push('note');

                noteIcon = (
                  <img src="https://img.icons8.com/ios/25/000000/note.png" />
                );
              } else {
                noteIcon = '';
              }
            }
          });
        }

        if (!dateFns.isSameMonth(day, monthStart)) {
          css.push('disabled');
        } else if (dateFns.isSameDay(day, selectedDate)) {
          css.push('selected');
        } else {
          css.push('');
        }

        // if (gaga === true) {
        //   css.push('gaga');
        // }

        let today = new Date();
        today = today.toString().slice(0, 15);
        today = dateFns.format(today, 'x');

        // console.log(day, gaga, end, dateIDms >= today);

        if (gaga && dateIDms <= today && dateIDms <= dateIDms + 86400000 * 5) {
          console.log(day);
          css.push('gaga');
        }
        if (gaga && end) {
          console.log('kokokokoko', day);
          css.push('gaga');
        }
        // console.log(css);
        // console.log(css.indexOf('disabled'));
        // console.log(css.indexOf('gaga'));

        // if (css.indexOf('disabled') !== -1 ) {
        //   console.log(day, 'oooo');
        //   css.push('opa');
        // }
        // if (opa) {
        //   css.push('opa');
        //   opa = false;
        // }

        css = css.join(' ');

        // ============== /adding CSS ==================================

        days.push(
          <div
            className={`col cell ${css}`}
            key={dateID}
            id={dateID}
            onClick={() =>
              this.onDateClick(
                dateFns.parse(cloneDay),
                dateID,
                dateIDms,
                dateIDnum
              )
            }
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            <p />
            {intercourseIcon}
            {medicineIcon}
            {symptomsIcon}
            {noteIcon}
          </div>
        );
        intercourseIcon = '';
        medicineIcon = '';
        symptomsIcon = '';
        noteIcon = '';
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    // end = false;
    return <div className="body">{rows}</div>;
  };

  onDateClick = (day, dateID, dateIDms) => {
    this.showModal(dateID, dateIDms);
    this.setState({
      selectedDate: day
    });
  };
  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };
  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  // ============== modal ===========================

  showModal = (dateID, dateIDms, dateIDnum) => {
    this.setState({
      showModal: true,
      dateID: dateID,
      dateIDms: dateIDms,
      dateIDnum: dateIDnum
    });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  // ============== render ===========================
  render() {
    return (
      <div className="calendar">
        <div className="maku">
          <Modal
            showModal={this.state.showModal}
            dateID={this.state.dateID}
            dateIDms={this.state.dateIDms}
            dateIDnum={this.state.dateIDnum}
            handleClose={this.hideModal}
          />
        </div>

        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;
