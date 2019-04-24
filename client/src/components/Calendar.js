import React from 'react';
import dateFns from 'date-fns';
import Modal from './Modal';
class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    show: false,
    dateID: ''
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
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
    let days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

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
    console.log(dataFromServer);

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        const dateID = day.toString().slice(0, 15);
        let css = [];

        if (dataFromServer[i].medicine) {
          css.push('pills');
        } else {
          css.push('aaa');
        }

        if (!dateFns.isSameMonth(day, monthStart)) {
          css.push('disabled ');
        } else if (dateFns.isSameDay(day, selectedDate)) {
          css.push('selected ');
        } else {
          css.push('');
        }

        css = css.join(' ');

        days.push(
          <div
            className={`col cell ${css}`}
            key={dateID}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay), dateID)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };
  showModal = dateID => {
    this.setState({ show: true, dateID: dateID });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  onDateClick = (day, dateID) => {
    console.log(dateID);
    this.showModal(dateID);
    this.setState({
      selectedDate: day
    });
  };
  nextMonth = () => {
    console.log('next');
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };
  prevMonth = () => {
    console.log('prev');
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };
  render() {
    return (
      <div className="calendar">
        <Modal
          show={this.state.show}
          dateID={this.state.dateID}
          handleClose={this.hideModal}
        />
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;
