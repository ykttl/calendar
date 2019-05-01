import React from 'react';
import dateFns from 'date-fns';
// import PropTypes from 'prop-types';

class Home extends React.Component {
  state = { day: '' };
  arr = [];
  sinceHowManyDay = () => {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    if (!dataFromServer) return '';
    let today = new Date();
    today = today.toString().slice(0, 15);
    today = dateFns.format(today, 'x');

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
  };
  showList = () => {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    if (!dataFromServer) return '';

    // const arr = [];
    // const arr2 = [];

    // dataFromServer.map(obj => {
    //   if (obj.period.start) {
    //     arr.push(obj);
    //   }
    //   if (obj.period.end) {
    //     arr.push(obj);
    //   }
    //   console.log(arr);
    // });

    // for (let i = 0; i < arr.length; i += 2) {
    //   console.log(i);
    //   console.log(arr[i]);
    //   arr2.push([arr[i], arr[i + 1]]);
    // }
    // console.log('arr2', arr2);

    // return arr2.map(item => {
    //   return (
    //     <div>
    //       {item[0].month}-{item[0].day} 〜 {item[1].month}-{item[1].day}
    //     </div>
    //   );
    // });
  };
  render() {
    return (
      <div>
        <p>{this.sinceHowManyDay()}...DAYS SINCE LAST PERIOD</p>
        {this.showList()}
      </div>
    );
  }
}

export default Home;
