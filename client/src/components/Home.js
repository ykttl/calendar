import React from 'react';
import dateFns from 'date-fns';
// import PropTypes from 'prop-types';

class Home extends React.Component {
  state = { day: '' };
  sinceHowManyDay = () => {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    if (!dataFromServer) return '';

    let today = new Date();
    today = today.toString().slice(0, 15);
    // console.log(today);
    // let dayOfToday = today.slice();
    today = dateFns.format(today, 'x');

    console.log(dataFromServer);
    const index = dataFromServer.findIndex(obj => obj.dateIDms >= today);
    for (let i = index; i > 0; i--) {
      if (dataFromServer[i].period.start) {
        console.log(dataFromServer[i]);
        let dayday = today - dataFromServer[i].dateIDms;
        const a = dayday / 86400000;
        console.log(a);
        return a;
      }
    }
    console.log(index);
    console.log(today);
    // while (dataFromServer[i].dateIDms <= today) {}
  };
  render() {
    return (
      <div>
        <p>{this.sinceHowManyDay()}...DAYS SINCE LAST PERIOD</p>
      </div>
    );
  }
}

export default Home;
