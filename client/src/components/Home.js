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
        console.log(dataFromServer[i].dateIDms);
        let dayday = today - dataFromServer[i].dateIDms;

        const a = dayday / 86400000;

        return a;
      }
    }
  };
  showLength = () => {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    if (!dataFromServer) return '';

    const pAll = dataFromServer.filter(obj => obj.period);
    const arr = [];
    pAll.map((item, index) => {
      if (item.period.start && pAll[index + 1].period.end) {
        arr.push((pAll[index + 1].dateIDms - item.dateIDms) / 86400000);
      } else {
        if (item.period.start && pAll[index + 1].period.start) {
          arr.push('?');
        }
      }
    });
    console.log('arr', arr);

    return arr.map(item => <p>for -{item}-days</p>);
    // const pS = dataFromServer.filter(obj => obj.period.start);

    // const startIndexs = pS.map(item => pAll.findIndex(obj => obj === item));
    // console.log(startIndexs);

    // const eIndexs = [];

    // startIndexs.map(index => {
    //   for (let i = index; i < dataFromServer.length; i++) {
    //     console.log(i);
    //     if (dataFromServer[i].period.end) {
    //       eIndexs.push(i);
    //     }
    //   }
    // });

    // console.log(eIndexs);
  };
  showDays = () => {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    if (!dataFromServer) return '';

    const arr = [];

    const a = dataFromServer.filter(obj => obj.period.start);
    console.log(a);

    //もしendが記入されてなかった場合は「？」にしたい

    const b = a.map((item, index) => {
      if (a[index + 1]) {
        return (a[index + 1].dateIDms - item.dateIDms) / 86400000;
      } else {
        return '';
      }
    });
    console.log(b);

    return b.map(item => <p>{item}</p>);
  };
  showList = () => {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    if (!dataFromServer) return '';

    const arr = [];

    const a = dataFromServer.filter(obj => obj.period.start);
    console.log(a);

    //もしendが記入されてなかった場合は「？」にしたい

    const b = a.map((item, index) => {
      if (a[index + 1]) {
        return (a[index + 1].dateIDms - item.dateIDms) / 86400000;
      } else {
        return '?';
      }
    });
    console.log(b);

    return a.map(item => (
      <p>
        {item.month}-{item.day}
      </p>
    ));

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
        {this.showDays()}
        {this.showLength()}
      </div>
    );
  }
}

export default Home;
